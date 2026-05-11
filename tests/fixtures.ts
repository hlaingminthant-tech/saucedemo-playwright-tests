import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { UsersFactory } from './factory';

type DemoFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<DemoFixtures>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const std = UsersFactory.standard();
    await loginPage.login(std.username, std.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await use(inventoryPage);
  },
});

export { expect };