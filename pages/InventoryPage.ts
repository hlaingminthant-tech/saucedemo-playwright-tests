import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  get title() {
    return this.page.locator('.title');
  }

  get sortSelect() {
    return this.page.getByRole('combobox');
  }

  get inventoryItemNames() {
    return this.page.locator('.inventory_item_name');
  }

  get inventoryItemPrices() {
    return this.page.locator('.inventory_item_price');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  addButtonForItem(itemName: string) {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: 'Add to cart' });
  }

  async goto() {
    await this.page.goto('/inventory.html');
    await this.expectLoaded();
  }

  async addItemToCart(itemName: string) {
    await this.addButtonForItem(itemName).click();
  }

  async addBackpackToCart() {
    await this.addItemToCart('Sauce Labs Backpack');
  }

  async sortByNameAscending() {
    await this.sortSelect.selectOption('az');
  }

  async sortByPriceLowToHigh() {
    await this.sortSelect.selectOption('lohi');
  }

  async sortByPriceHighToLow() {
    await this.sortSelect.selectOption('hilo');
  }

  async getVisibleProductNames() {
    return this.inventoryItemNames.allTextContents();
  }

  async getVisibleProductPrices() {
    const prices = await this.inventoryItemPrices.allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }
}
