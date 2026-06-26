import { test, expect } from '../support/fixtures';
import { buildCheckoutCustomer, PRODUCTS, VALID_CHECKOUT_CUSTOMER, VALIDATION_MESSAGES } from '../support/test-data';

test.describe('Checkout flow @regression', () => {
  test('completes a purchase and logs out', async ({ cartPage, checkoutPage, header, inventoryPage, page }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await expect(header.cartBadge).toHaveText('1');

    await header.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectContainsItem(PRODUCTS.backpack);

    await cartPage.startCheckout();
    await checkoutPage.fillCustomerInformation(VALID_CHECKOUT_CUSTOMER);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();

    await header.logout();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('requires first name before checkout overview', async ({ cartPage, checkoutPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await header.openCart();
    await cartPage.startCheckout();

    await checkoutPage.fillCustomerInformation(buildCheckoutCustomer({ firstName: '' }));
    await checkoutPage.continueButton.click();

    await checkoutPage.expectValidationMessage(VALIDATION_MESSAGES.missingFirstName);
  });
});
