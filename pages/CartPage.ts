import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get title() {
    return this.page.locator('.title');
  }

  get inventoryItemNames() {
    return this.page.locator('.inventory_item_name');
  }

  get checkoutButton() {
    return this.page.locator('#checkout');
  }

  removeButtonForItem(itemName: string) {
    return this.page
      .locator('.cart_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: 'Remove' });
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectContainsItem(itemName: string) {
    await expect(this.inventoryItemNames).toContainText(itemName);
  }

  async removeItem(itemName: string) {
    await this.removeButtonForItem(itemName).click();
    await expect(this.inventoryItemNames.filter({ hasText: itemName })).toHaveCount(0);
  }

  async startCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
