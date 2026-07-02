import { test, expect } from '../support/fixtures';
import { buildCheckoutCustomer, PRODUCTS, VALID_CHECKOUT_CUSTOMER, VALIDATION_MESSAGES } from '../support/test-data';

function currencyFromText(text: string): number {
  const amount = text.match(/\$([0-9]+\.[0-9]{2})/);
  expect(amount).not.toBeNull();
  return Number(amount?.[1]);
}

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

  test('Checkout requires last name', async ({ cartPage, checkoutPage, header, inventoryPage, page }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await header.openCart();
    await cartPage.startCheckout();

    // 1. Fill first name and postal code.
    await checkoutPage.fillCustomerInformation(buildCheckoutCustomer({ lastName: '' }));

    // 2. Leave last name blank.
    await expect(checkoutPage.lastNameInput).toHaveValue('');

    // 3. Click `Continue`.
    await checkoutPage.continueButton.click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await checkoutPage.expectValidationMessage(VALIDATION_MESSAGES.missingLastName);
  });

  test('Checkout requires postal code', async ({ cartPage, checkoutPage, header, inventoryPage, page }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await header.openCart();
    await cartPage.startCheckout();

    // 1. Fill first name and last name.
    await checkoutPage.fillCustomerInformation(buildCheckoutCustomer({ postalCode: '' }));

    // 2. Leave postal code blank.
    await expect(checkoutPage.postalCodeInput).toHaveValue('');

    // 3. Click `Continue`.
    await checkoutPage.continueButton.click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await checkoutPage.expectValidationMessage(VALIDATION_MESSAGES.missingPostalCode);
  });

  test('Checkout cancel returns to cart without losing items', async ({ cartPage, checkoutPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await header.openCart();
    await cartPage.startCheckout();

    // 1. Click `Cancel`.
    await checkoutPage.cancelCheckout();

    // 2. Verify the cart page is shown.
    await cartPage.expectLoaded();

    // 3. Verify the selected product remains in the cart.
    await cartPage.expectContainsItem(PRODUCTS.backpack);

    // 4. Verify the cart badge still shows `1`.
    await expect(header.cartBadge).toHaveText('1');
  });

  test('Checkout overview shows accurate item subtotal, tax, and total', async ({ cartPage, checkoutPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await header.openCart();
    await cartPage.startCheckout();

    // 1. Proceed to checkout overview with valid customer information.
    await checkoutPage.fillCustomerInformation(VALID_CHECKOUT_CUSTOMER);
    await checkoutPage.continueToOverview();

    // 2. Capture the product price shown in the overview.
    await expect(checkoutPage.inventoryItemNames).toContainText(PRODUCTS.backpack);
    const itemPrice = currencyFromText(await checkoutPage.inventoryItemPrices.first().innerText());

    // 3. Verify item subtotal equals the product price.
    const subtotal = currencyFromText(await checkoutPage.itemSubtotal.innerText());
    expect(subtotal).toBe(itemPrice);

    // 4. Verify tax is visible and numeric.
    const tax = currencyFromText(await checkoutPage.taxLabel.innerText());
    expect(tax).toBeGreaterThanOrEqual(0);

    // 5. Verify total equals subtotal plus tax.
    const total = currencyFromText(await checkoutPage.summaryTotal.innerText());
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});
