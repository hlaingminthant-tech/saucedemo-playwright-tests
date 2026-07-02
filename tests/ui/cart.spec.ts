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

  test('Cart persists selected items across navigation', async ({ cartPage, header, inventoryPage }) => {
    // 1. Add `Sauce Labs Backpack` to the cart.
    await inventoryPage.addItemToCart(PRODUCTS.backpack);

    // 2. Open the cart and verify the item is present.
    await expect(header.cartBadge).toHaveText('1');
    await header.openCart();
    await cartPage.expectContainsItem(PRODUCTS.backpack);

    // 3. Click `Continue Shopping`.
    await cartPage.continueShopping();

    // 4. Verify inventory is shown.
    await inventoryPage.expectLoaded();
    await expect(header.cartBadge).toHaveText('1');

    // 5. Open the cart again.
    await header.openCart();

    await cartPage.expectContainsItem(PRODUCTS.backpack);
  });

  test('Add multiple products and verify badge count', async ({ cartPage, header, inventoryPage }) => {
    // 1. Add two different products.
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.addItemToCart(PRODUCTS.bikeLight);

    // 2. Verify the cart badge shows `2`.
    await expect(header.cartBadge).toHaveText('2');

    // 3. Open the cart.
    await header.openCart();

    // 4. Verify both products are present.
    await cartPage.expectContainsItem(PRODUCTS.backpack);
    await cartPage.expectContainsItem(PRODUCTS.bikeLight);
  });

  test('Remove one of multiple cart items', async ({ cartPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.addItemToCart(PRODUCTS.bikeLight);

    // 1. Open the cart.
    await header.openCart();

    // 2. Remove one product.
    await cartPage.removeItem(PRODUCTS.backpack);

    // 3. Verify the removed product is gone.
    await expect(cartPage.inventoryItemNames.filter({ hasText: PRODUCTS.backpack })).toHaveCount(0);

    // 4. Verify the other product remains.
    await cartPage.expectContainsItem(PRODUCTS.bikeLight);

    // 5. Verify cart badge decrements to `1`.
    await expect(header.cartBadge).toHaveText('1');
  });

  test('Reset app state clears cart', async ({ cartPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await expect(header.cartBadge).toHaveText('1');

    // 1. Open the sidebar menu.
    // 2. Click `Reset App State`.
    // 3. Close the menu.
    await header.resetAppState();

    // 4. Verify cart badge disappears.
    await expect(header.cartBadge).toHaveCount(0);

    // 5. Open the cart.
    await header.openCart();

    await expect(cartPage.inventoryItemNames).toHaveCount(0);
    await inventoryPage.goto();
    await expect(inventoryPage.addButtonForItem(PRODUCTS.backpack)).toBeVisible();
  });
});
