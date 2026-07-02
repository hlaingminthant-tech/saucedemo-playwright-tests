import { publicTest as test, expect } from '../support/fixtures';
import { USERS, VALIDATION_MESSAGES } from '../support/test-data';

const invalidLoginCases = [
  {
    name: 'locked out user',
    credentials: USERS.lockedOut,
    message: VALIDATION_MESSAGES.lockedOut,
  },
  {
    name: 'wrong password',
    credentials: USERS.wrongPassword,
    message: VALIDATION_MESSAGES.wrongPassword,
  },
  {
    name: 'missing username',
    credentials: USERS.missingUsername,
    message: VALIDATION_MESSAGES.missingUsername,
  },
] as const;

test.describe('Login functionality @smoke', () => {
  test('login page displays the expected entry points', async ({ loginPage, page }) => {
    await loginPage.goto();

    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('standard user can log in successfully', async ({ loginPage, page }) => {
    await test.step('Open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('Sign in with valid credentials', async () => {
      await loginPage.login(USERS.standard.username, USERS.standard.password);
    });

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  for (const loginCase of invalidLoginCases) {
    test(`${loginCase.name} sees the right validation message`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(loginCase.credentials.username, loginCase.credentials.password);

      await loginPage.expectErrorMessage(loginCase.message);
    });
  }

  test('Login rejects a missing password', async ({ loginPage, page }) => {
    // 1. Open `/`.
    await loginPage.goto();

    // 2. Enter `standard_user` in the username field.
    await loginPage.usernameInput.fill(USERS.missingPassword.username);

    // 3. Leave the password field blank.
    await expect(loginPage.passwordInput).toHaveValue('');

    // 4. Click `Login`.
    await loginPage.submitButton.click();

    await expect(page).toHaveURL('/');
    await loginPage.expectErrorMessage(VALIDATION_MESSAGES.missingPassword);
    await expect(loginPage.usernameInput).toHaveValue(USERS.missingPassword.username);
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('Login error can be dismissed', async ({ loginPage, page }) => {
    // 1. Open `/`.
    await loginPage.goto();

    // 2. Submit invalid credentials.
    await loginPage.login(USERS.wrongPassword.username, USERS.wrongPassword.password);

    // 3. Verify the validation message is visible.
    await loginPage.expectErrorMessage(VALIDATION_MESSAGES.wrongPassword);

    // 4. Click the error close button.
    await page.getByTestId('error-button').click();

    await expect(loginPage.errorMessage).toBeHidden();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });
});
