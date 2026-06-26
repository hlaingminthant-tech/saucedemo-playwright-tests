import { expect, Locator, Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private readonly page: Page) {}

  get cartLink(): Locator {
    return this.page.getByTestId('shopping-cart-link');
  }

  get cartBadge(): Locator {
    return this.page.getByTestId('shopping-cart-badge');
  }

  get menuButton(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutLink(): Locator {
    return this.page.getByTestId('logout-sidebar-link');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }
}
