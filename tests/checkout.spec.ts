import { test, expect } from './fixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { products, checkout } from './test-data';

test.describe('Checkout flow', () => {
  test('full end-to-end checkout', async ({ inventoryPage, page }) => {
    // Add product to cart from inventory
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Open cart and verify item
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.expectLoaded();
    await cartPage.expectItemPresent(products.backpack);

    // Start checkout
    await cartPage.openCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCustomerInfo(checkout.firstName, checkout.lastName, checkout.postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();
  });
});
