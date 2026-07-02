import { test, expect } from '../support/fixtures';
import { PRODUCTS } from '../support/test-data';

function expectSorted<T>(values: T[], compare: (left: T, right: T) => number): void {
  expect(values).toEqual([...values].sort(compare));
}

test.describe('Inventory flow @regression', () => {
  test('adds a product to cart and shows the badge', async ({ cartPage, header, inventoryPage }) => {
    await inventoryPage.addItemToCart(PRODUCTS.backpack);

    await expect(header.cartBadge).toHaveText('1');

    await header.openCart();
    await cartPage.expectContainsItem(PRODUCTS.backpack);
  });

  test('sorts products alphabetically', async ({ inventoryPage }) => {
    await inventoryPage.sortProductsBy('az');

    expectSorted(await inventoryPage.getVisibleProductNames(), (left, right) => left.localeCompare(right));
  });

  test('sorts products by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortProductsBy('lohi');

    expectSorted(await inventoryPage.getVisibleProductPrices(), (left, right) => left - right);
  });

  test('sorts products by price from high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortProductsBy('hilo');

    expectSorted(await inventoryPage.getVisibleProductPrices(), (left, right) => right - left);
  });

  test('Sort products from Z to A', async ({ inventoryPage }) => {
    // 1. Select `Name (Z to A)` in the sort dropdown.
    await inventoryPage.sortProductsBy('za');

    // 2. Read all visible product names.
    const productNames = await inventoryPage.getVisibleProductNames();

    expectSorted(productNames, (left, right) => right.localeCompare(left));
  });

  test('Product details page opens from inventory and returns back', async ({ inventoryPage, productDetailsPage }) => {
    // 1. Click the `Sauce Labs Backpack` product name.
    await inventoryPage.openProductDetails(PRODUCTS.backpack);

    // 2. Verify the product details page opens.
    // 3. Confirm product name, price, description, image, and `Add to cart` button are visible.
    await productDetailsPage.expectLoadedFor(PRODUCTS.backpack);

    // 4. Click `Back to products`.
    await productDetailsPage.backToProducts();

    await inventoryPage.expectLoaded();
  });

  test('Add and remove an item from product details', async ({ header, inventoryPage, productDetailsPage }) => {
    // 1. Click `Add to cart`.
    await inventoryPage.openProductDetails(PRODUCTS.backpack);
    await productDetailsPage.addButton.click();

    // 2. Verify the cart badge shows `1`.
    await expect(header.cartBadge).toHaveText('1');

    // 3. Verify the button changes to `Remove`.
    await expect(productDetailsPage.removeButton).toBeVisible();

    // 4. Click `Remove`.
    await productDetailsPage.removeButton.click();

    await expect(header.cartBadge).toHaveCount(0);
    await expect(productDetailsPage.addButton).toBeVisible();
  });
});
