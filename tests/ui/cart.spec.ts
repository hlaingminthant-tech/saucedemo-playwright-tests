import { test, expect } from '../support/fixtures';
import { CartPage } from '../../pages/CartPage';
import { HeaderComponent } from '../../pages/components/HeaderComponent';
import { ProductsFactory } from '../support/test-data';

test.describe('Cart behavior @regression', () => {
  test('removes a product from the cart', async ({ page, inventoryPage }) => {
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addItemToCart(ProductsFactory.backpack);
    await expect(header.cartBadge).toHaveText('1');

    await header.openCart();
    await cartPage.expectLoaded();
    await cartPage.removeItem(ProductsFactory.backpack);

    await expect(header.cartBadge).toHaveCount(0);
  });
});
