import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsFactory, UsersFactory } from '../support/test-data';

test.describe('UI network mocking @regression', () => {
  test('inventory remains usable when product images fail', async ({ page }) => {
    await page.route('**/*sauce-backpack*', (route) => route.abort());

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const user = UsersFactory.standard();

    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await inventoryPage.expectLoaded();

    await expect(page.getByText(ProductsFactory.backpack)).toBeVisible();
    await inventoryPage.addItemToCart(ProductsFactory.backpack);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
