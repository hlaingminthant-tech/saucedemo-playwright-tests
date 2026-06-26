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
});
