import { test, expect } from '@playwright/test';

test.describe('API contract checks @api', () => {
  test('jsonplaceholder post contract', async ({ request }) => {
    const res = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);

    const body = await res.json();
    // Basic contract assertions
    expect(body).toHaveProperty('userId');
    expect(typeof body.userId).toBe('number');
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
    expect(body).toHaveProperty('title');
    expect(typeof body.title).toBe('string');
    expect(body).toHaveProperty('body');
    expect(typeof body.body).toBe('string');
  });
});
