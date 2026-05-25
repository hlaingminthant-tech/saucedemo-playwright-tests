import { test, expect } from './fixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { products, checkout } from './test-data';

test.describe('Cart and checkout edge cases', () => {
  test('removes item from cart and updates contents', async ({ inventoryPage, page }) => {
    // Add product to cart
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Open cart and verify item present
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.expectLoaded();
    await cartPage.expectItemPresent(products.backpack);

    // Remove item and verify cart is empty
    await cartPage.removeItem(products.backpack);
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('checkout validation prevents navigation when postal code is missing', async ({ inventoryPage, page }) => {
    // Add product and go to checkout
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);
    await cartPage.expectLoaded();
    await cartPage.openCheckout();

    const checkoutPage = new CheckoutPage(page);
    // Fill first and last name only (leave postal code blank)
    await checkoutPage.fillCustomerInfo(checkout.firstName, checkout.lastName, '');

    // Click continue and assert we did not navigate to the overview step
    await checkoutPage.continueButton.click();
    await expect(page).not.toHaveURL(/checkout-step-two/);
    // Ensure first name input still contains the provided value
    await expect(checkoutPage.firstName).toHaveValue(checkout.firstName);
  });
});
