import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  get title() {
    return this.page.locator('.title');
  }

  get cartLink() {
    return this.page.locator('.shopping_cart_link');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  get sortSelect() {
    return this.page.getByRole('combobox');
  }

  get inventoryItemNames() {
    return this.page.locator('.inventory_item_name');
  }

  get addBackpackButton() {
    return this.page.getByRole('button', { name: 'Add to cart' }).first();
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async sortByNameAscending() {
    await this.sortSelect.selectOption('az');
  }

  async getVisibleProductNames() {
    return this.inventoryItemNames.allTextContents();
  }

  async expectCartContainsItem(itemName: string) {
    await expect(this.page.locator('.inventory_item_name')).toContainText(itemName);
  }
}