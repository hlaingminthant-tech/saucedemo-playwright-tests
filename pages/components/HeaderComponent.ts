import { expect, Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private page: Page) {}

  get cartLink() {
    return this.page.locator('.shopping_cart_link');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  get menuButton() {
    return this.page.locator('#react-burger-menu-btn');
  }

  get logoutLink() {
    return this.page.locator('#logout_sidebar_link');
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }
}
