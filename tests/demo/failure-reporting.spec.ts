import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { HeaderComponent } from '../../pages/components/HeaderComponent';
import { UsersFactory } from '../support/test-data';

test.describe('Reporting demo', () => {
  test('fails: missing UI state is surfaced in the report', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const header = new HeaderComponent(page);
    const user = UsersFactory.standard();

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await inventoryPage.addBackpackToCart();

    await expect(header.cartBadge).toHaveText('1');
    await testInfo.attach('demo-note', {
      body: 'Intentional failure: this assertion expects the wrong cart count so the report captures the artifact flow.',
      contentType: 'text/plain',
    });

    await expect(header.cartBadge).toHaveText('2');
  });

  test('flaky-style case retries and lands in the flaky report bucket', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const header = new HeaderComponent(page);
    const user = UsersFactory.standard();

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await testInfo.attach('demo-note', {
      body: 'This case fails on the first run and passes on retry so the report shows it as flaky.',
      contentType: 'text/plain',
    });

    if (testInfo.retry === 0) {
      await expect(page.getByRole('heading', { name: 'This heading does not exist' })).toBeVisible();
    }

    await inventoryPage.addBackpackToCart();
    await expect(header.cartBadge).toHaveText('1');
  });

  test('timeout-style case waits for a missing element', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const user = UsersFactory.standard();

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();

    await testInfo.attach('flaky-note', {
      body: 'This case demonstrates a timeout failure when an expected element never appears.',
      contentType: 'text/plain',
    });

    await expect(page.getByRole('heading', { name: 'This heading does not exist' })).toBeVisible({ timeout: 3000 });
  });
});
