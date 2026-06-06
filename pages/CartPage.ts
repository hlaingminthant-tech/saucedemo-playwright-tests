import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get title() {
    return this.page.locator('.title');
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }

  get checkoutButton() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.checkoutButton).toBeVisible();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator(`.cart_item:has-text("${itemName}")`);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async expectItemPresent(itemName: string) {
    await expect(this.cartItems).toContainText(itemName);
  }

  async openCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout/);
  }
}
