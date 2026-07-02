import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  get title(): Locator {
    return this.page.getByTestId('title');
  }

  get inventoryItemNames(): Locator {
    return this.page.getByTestId('inventory-item-name');
  }

  get checkoutButton(): Locator {
    return this.page.getByTestId('checkout');
  }

  get continueShoppingButton(): Locator {
    return this.page.getByTestId('continue-shopping');
  }

  removeButtonForItem(itemName: string): Locator {
    return this.page
      .locator('.cart_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: 'Remove' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectContainsItem(itemName: string): Promise<void> {
    await expect(this.inventoryItemNames.filter({ hasText: itemName })).toHaveCount(1);
  }

  async removeItem(itemName: string): Promise<void> {
    await this.removeButtonForItem(itemName).click();
    await expect(this.inventoryItemNames.filter({ hasText: itemName })).toHaveCount(0);
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/inventory/);
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
