import { test, expect } from '../support/fixtures';
import { ProductsFactory } from '../support/test-data';
import { HeaderComponent } from '../../pages/components/HeaderComponent';
import { CartPage } from '../../pages/CartPage';

test.describe('Inventory flow @regression', () => {
  test('adds a product to cart and shows the badge', async ({ page, inventoryPage }) => {
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();

    await expect(header.cartBadge).toHaveText('1');

    await header.openCart();
    await cartPage.expectContainsItem(ProductsFactory.backpack);
  });

  test('sorts products alphabetically', async ({ inventoryPage }) => {
    await inventoryPage.sortByNameAscending();

    const productNames = await inventoryPage.getVisibleProductNames();
    const sortedNames = [...productNames].sort((left, right) => left.localeCompare(right));

    expect(productNames).toEqual(sortedNames);
  });

  test('sorts products by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getVisibleProductPrices();
    const sortedPrices = [...prices].sort((left, right) => left - right);

    expect(prices).toEqual(sortedPrices);
  });

  test('sorts products by price from high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortByPriceHighToLow();

    const prices = await inventoryPage.getVisibleProductPrices();
    const sortedPrices = [...prices].sort((left, right) => right - left);

    expect(prices).toEqual(sortedPrices);
  });
});
