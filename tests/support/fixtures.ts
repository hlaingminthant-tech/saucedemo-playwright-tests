import { test as base, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { HeaderComponent } from '../../pages/components/HeaderComponent';

type PageFixtures = {
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  header: HeaderComponent;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  productDetailsPage: ProductDetailsPage;
};

const pageTest = base.extend<PageFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
});

export const publicTest = pageTest;
export const test = pageTest.extend<{ authenticatedInventory: void }>({
  storageState: 'playwright/.auth/standard-user.json',
  authenticatedInventory: [async ({ inventoryPage }, use) => {
    await inventoryPage.goto();
    await use();
  }, { auto: true }],
});

export { expect };

