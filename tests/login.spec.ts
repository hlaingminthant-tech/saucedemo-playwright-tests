import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, validationMessages } from './test-data';

const invalidLoginCases = [
  {
    name: 'locked out user',
    username: users.lockedOut.username,
    password: users.lockedOut.password,
    message: validationMessages.lockedOut,
  },
  {
    name: 'wrong password',
    username: users.wrongPassword.username,
    password: users.wrongPassword.password,
    message: validationMessages.wrongPassword,
  },
  {
    name: 'missing username',
    username: users.missingUsername.username,
    password: users.missingUsername.password,
    message: validationMessages.missingUsername,
  },
] as const;

test.describe('Login functionality', () => {

  test('standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('Sign in with valid credentials', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  for (const loginCase of invalidLoginCases) {
    test(`${loginCase.name} sees the right validation message`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(loginCase.username, loginCase.password);

      await loginPage.expectErrorMessage(loginCase.message);
    });
  }

});