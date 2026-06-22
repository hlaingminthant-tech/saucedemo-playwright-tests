import { test, expect } from '@playwright/test';

test.describe('API mocking examples @api', () => {
  test('mock a fetch response and assert page receives mocked data', async ({ page }) => {
    // Intercept the fetch to /api/example and return a mocked JSON
    await page.route('**/api/example', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'mocked', value: 42 }),
      });
    });

    // Evaluate a fetch on the page context to demonstrate the mock
    const result = await page.evaluate(async () => {
      const res = await fetch('https://example.com/api/example');
      return res.json();
    });

    expect(result).toEqual({ message: 'mocked', value: 42 });
  });
});
