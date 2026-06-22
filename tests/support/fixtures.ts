import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';

type DemoFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<DemoFixtures>({
  storageState: 'playwright/.auth/standard-user.json',
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    await use(inventoryPage);
  },
});

export { expect };
