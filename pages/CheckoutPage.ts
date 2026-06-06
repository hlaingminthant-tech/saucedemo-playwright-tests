import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  get firstName() {
    return this.page.locator('#first-name');
  }

  get lastName() {
    return this.page.locator('#last-name');
  }

  get postalCode() {
    return this.page.locator('#postal-code');
  }

  get continueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  get finishButton() {
    return this.page.getByRole('button', { name: 'Finish' });
  }

  get completeHeader() {
    return this.page.locator('.complete-header');
  }

  async fillCustomerInfo(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
  }

  async continueToOverview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two|checkout-step-two.html|checkout\/step-two/);
  }

  async finishCheckout() {
    await this.finishButton.click();
    await expect(this.completeHeader).toHaveText(/THANK YOU FOR YOUR ORDER/i);
  }
}
