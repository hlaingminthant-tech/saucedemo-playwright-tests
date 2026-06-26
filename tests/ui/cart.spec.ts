import { test, expect } from '../support/fixtures';
import { PRODUCTS } from '../support/test-data';

test.describe('Cart behavior @regression', () => {
  test('removes a product from the cart', async ({ cartPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await expect(header.cartBadge).toHaveText('1');

    await header.openCart();
    await cartPage.expectLoaded();
    await cartPage.removeItem(PRODUCTS.backpack);

    await expect(header.cartBadge).toHaveCount(0);
  });
});
