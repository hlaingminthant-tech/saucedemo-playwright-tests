import { expect, publicTest as test } from '../support/fixtures';
import { PRODUCTS, USERS } from '../support/test-data';

test.describe('UI network mocking @regression', () => {
  test('inventory remains usable when product images fail', async ({ header, inventoryPage, loginPage, page }) => {
    await page.route('**/*sauce-backpack*', (route) => route.abort());

    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();

    await expect(page.getByText(PRODUCTS.backpack)).toBeVisible();
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await expect(header.cartBadge).toHaveText('1');
  });
});
