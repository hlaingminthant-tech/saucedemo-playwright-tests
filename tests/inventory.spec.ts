import { test, expect } from './fixtures';
import { products } from './test-data';

test.describe('Inventory flow', () => {
  test('adds a product to cart and shows the badge', async ({ inventoryPage }) => {
    await inventoryPage.addBackpackToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await inventoryPage.expectCartContainsItem(products.backpack);
  });

  test('sorts products alphabetically', async ({ inventoryPage }) => {
    await inventoryPage.sortByNameAscending();

    const productNames = await inventoryPage.getVisibleProductNames();
    const sortedNames = [...productNames].sort((left, right) => left.localeCompare(right));

    expect(productNames).toEqual(sortedNames);
  });
});