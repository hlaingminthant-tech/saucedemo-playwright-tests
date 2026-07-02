import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  constructor(private readonly page: Page) {}

  get productName(): Locator {
    return this.page.getByTestId('inventory-item-name');
  }

  get productDescription(): Locator {
    return this.page.getByTestId('inventory-item-desc');
  }

  get productPrice(): Locator {
    return this.page.getByTestId('inventory-item-price');
  }

  get productImage(): Locator {
    return this.page.locator('.inventory_details_img');
  }

  get addButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to cart' });
  }

  get removeButton(): Locator {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  get backToProductsButton(): Locator {
    return this.page.getByTestId('back-to-products');
  }

  async expectLoadedFor(itemName: string): Promise<void> {
    await expect(this.productName).toHaveText(itemName);
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.addButton).toBeVisible();
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
    await expect(this.page).toHaveURL(/inventory/);
  }
}
