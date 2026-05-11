import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UsersFactory, ValidationMessages } from './factory';

const invalidLoginCases = [
  {
    name: 'locked out user',
    username: UsersFactory.lockedOut().username,
    password: UsersFactory.lockedOut().password,
    message: ValidationMessages.lockedOut,
  },
  {
    name: 'wrong password',
    username: UsersFactory.wrongPassword().username,
    password: UsersFactory.wrongPassword().password,
    message: ValidationMessages.wrongPassword,
  },
  {
    name: 'missing username',
    username: UsersFactory.missingUsername().username,
    password: UsersFactory.missingUsername().password,
    message: ValidationMessages.missingUsername,
  },
] as const;

test.describe('Login functionality', () => {

  test('standard user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('Sign in with valid credentials', async () => {
      const std = UsersFactory.standard();
      await loginPage.login(std.username, std.password);
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