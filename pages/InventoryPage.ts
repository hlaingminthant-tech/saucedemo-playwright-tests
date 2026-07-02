import { expect, Locator, Page } from '@playwright/test';

export type ProductSortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  get title(): Locator {
    return this.page.getByTestId('title');
  }

  get sortSelect(): Locator {
    return this.page.getByTestId('product-sort-container');
  }

  get inventoryItemNames(): Locator {
    return this.page.getByTestId('inventory-item-name');
  }

  get inventoryItemPrices(): Locator {
    return this.page.getByTestId('inventory-item-price');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  addButtonForItem(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: 'Add to cart' });
  }

  removeButtonForItem(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: 'Remove' });
  }

  productLinkForItem(itemName: string): Locator {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: itemName });
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
    await this.expectLoaded();
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.addButtonForItem(itemName).click();
  }

  async openProductDetails(itemName: string): Promise<void> {
    await this.productLinkForItem(itemName).click();
    await expect(this.page).toHaveURL(/inventory-item/);
  }

  async sortProductsBy(option: ProductSortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async getVisibleProductNames(): Promise<string[]> {
    return this.inventoryItemNames.allTextContents();
  }

  async getVisibleProductPrices(): Promise<number[]> {
    const prices = await this.inventoryItemPrices.allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }
}

