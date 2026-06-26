import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByTestId('username');
  }

  get passwordInput(): Locator {
    return this.page.getByTestId('password');
  }

  get submitButton(): Locator {
    return this.page.getByTestId('login-button');
  }

  get errorMessage(): Locator {
    return this.page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.submitButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
