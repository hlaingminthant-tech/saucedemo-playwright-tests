import { Page } from '@playwright/test';
import { test, expect } from '../support/fixtures';

const screenshotOptions = {
  fullPage: true,
  animations: 'disabled' as const,
  maxDiffPixels: 100,
};

async function expectPageSnapshot(page: Page, snapshotName: string) {
  await expect(page).toHaveScreenshot(snapshotName, screenshotOptions);
}

test.describe('Visual regression @visual', () => {
  test.use({
    viewport: { width: 1280, height: 720 },
    colorScheme: 'light',
  });

  test('login page matches the baseline snapshot', async ({ loginPage, page }) => {
    await loginPage.goto();

    await expectPageSnapshot(page, 'login-page.png');
  });

  test('inventory page matches the baseline snapshot', async ({ inventoryPage, page }) => {
    await expectPageSnapshot(page, 'inventory-page.png');
  });
});
