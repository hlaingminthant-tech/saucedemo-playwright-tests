import { test, expect } from '../support/fixtures';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { HeaderComponent } from '../../pages/components/HeaderComponent';
import { CheckoutFactory, ProductsFactory, ValidationMessages } from '../support/test-data';

test.describe('Checkout flow @regression', () => {
  test('completes a purchase and logs out', async ({ page, inventoryPage }) => {
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart(ProductsFactory.backpack);
    await expect(header.cartBadge).toHaveText('1');

    await header.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectContainsItem(ProductsFactory.backpack);

    await cartPage.startCheckout();
    await checkoutPage.fillCustomerInformation(CheckoutFactory.validCustomer());
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();

    await header.logout();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('requires first name before checkout overview', async ({ page, inventoryPage }) => {
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const customer = CheckoutFactory.validCustomer();

    await inventoryPage.addItemToCart(ProductsFactory.backpack);
    await header.openCart();
    await cartPage.startCheckout();

    await checkoutPage.fillCustomerInformation({ ...customer, firstName: '' });
    await checkoutPage.continueButton.click();

    await checkoutPage.expectValidationMessage(ValidationMessages.missingFirstName);
  });
});
