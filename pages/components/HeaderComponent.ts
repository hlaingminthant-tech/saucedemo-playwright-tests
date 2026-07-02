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

  get allItemsLink(): Locator {
    return this.page.getByTestId('inventory-sidebar-link');
  }

  get resetAppStateLink(): Locator {
    return this.page.getByTestId('reset-sidebar-link');
  }

  get closeMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'Close Menu' });
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }

  async resetAppState(): Promise<void> {
    await this.menuButton.click();
    await expect(this.resetAppStateLink).toBeVisible();
    await this.resetAppStateLink.click();
    await this.closeMenuButton.click();
  }

  async openAllItems(): Promise<void> {
    await this.menuButton.click();
    await expect(this.allItemsLink).toBeVisible();
    await this.allItemsLink.click();
    await expect(this.page).toHaveURL(/inventory/);
  }
}
