import { expect, Page } from '@playwright/test';

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  constructor(private page: Page) {}

  get title() {
    return this.page.locator('.title');
  }

  get firstNameInput() {
    return this.page.locator('#first-name');
  }

  get lastNameInput() {
    return this.page.locator('#last-name');
  }

  get postalCodeInput() {
    return this.page.locator('#postal-code');
  }

  get continueButton() {
    return this.page.locator('#continue');
  }

  get finishButton() {
    return this.page.locator('#finish');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  get completeHeader() {
    return this.page.locator('.complete-header');
  }

  get summaryTotal() {
    return this.page.locator('.summary_total_label');
  }

  async fillCustomerInformation(customer: CheckoutCustomer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async expectValidationMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async finishOrder() {
    await expect(this.summaryTotal).toBeVisible();
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
