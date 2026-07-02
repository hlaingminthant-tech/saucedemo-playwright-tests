import { expect, Locator, Page } from '@playwright/test';

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  get title(): Locator {
    return this.page.getByTestId('title');
  }

  get firstNameInput(): Locator {
    return this.page.getByTestId('firstName');
  }

  get lastNameInput(): Locator {
    return this.page.getByTestId('lastName');
  }

  get postalCodeInput(): Locator {
    return this.page.getByTestId('postalCode');
  }

  get continueButton(): Locator {
    return this.page.getByTestId('continue');
  }

  get finishButton(): Locator {
    return this.page.getByTestId('finish');
  }

  get cancelButton(): Locator {
    return this.page.getByTestId('cancel');
  }

  get errorMessage(): Locator {
    return this.page.getByTestId('error');
  }

  get completeHeader(): Locator {
    return this.page.getByTestId('complete-header');
  }

  get summaryTotal(): Locator {
    return this.page.getByTestId('total-label');
  }

  get inventoryItemNames(): Locator {
    return this.page.getByTestId('inventory-item-name');
  }

  get inventoryItemPrices(): Locator {
    return this.page.getByTestId('inventory-item-price');
  }

  get itemSubtotal(): Locator {
    return this.page.getByTestId('subtotal-label');
  }

  get taxLabel(): Locator {
    return this.page.getByTestId('tax-label');
  }

  async fillCustomerInformation(customer: CheckoutCustomer): Promise<void> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async expectValidationMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async finishOrder(): Promise<void> {
    await expect(this.summaryTotal).toBeVisible();
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

