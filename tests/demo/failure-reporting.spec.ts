import { publicTest as test, expect } from '../support/fixtures';
import { PRODUCTS, USERS } from '../support/test-data';

test.describe('Reporting demo', () => {
  test('fails: missing UI state is surfaced in the report', async ({ header, inventoryPage, loginPage }, testInfo) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.addItemToCart(PRODUCTS.backpack);

    await expect(header.cartBadge).toHaveText('1');
    await testInfo.attach('demo-note', {
      body: 'Intentional failure: this assertion expects the wrong cart count so the report captures the artifact flow.',
      contentType: 'text/plain',
    });

    await expect(header.cartBadge).toHaveText('2');
  });

  test('flaky-style case retries and lands in the flaky report bucket', async ({ header, inventoryPage, loginPage, page }, testInfo) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await inventoryPage.expectLoaded();

    await testInfo.attach('demo-note', {
      body: 'This case fails on the first run and passes on retry so the report shows it as flaky.',
      contentType: 'text/plain',
    });

    if (testInfo.retry === 0) {
      await expect(page.getByRole('heading', { name: 'This heading does not exist' })).toBeVisible();
    }

    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await expect(header.cartBadge).toHaveText('1');
  });

  test('timeout-style case waits for a missing element', async ({ inventoryPage, loginPage, page }, testInfo) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await inventoryPage.expectLoaded();

    await testInfo.attach('timeout-note', {
      body: 'This case demonstrates a timeout failure when an expected element never appears.',
      contentType: 'text/plain',
    });

    await expect(page.getByRole('heading', { name: 'This heading does not exist' })).toBeVisible({ timeout: 3000 });
  });
});
