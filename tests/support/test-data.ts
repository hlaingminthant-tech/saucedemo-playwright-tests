import type { CheckoutCustomer } from '../../pages/CheckoutPage';

export type UserCredentials = {
  username: string;
  password: string;
};

export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  wrongPassword: { username: 'standard_user', password: 'wrong_password' },
  missingUsername: { username: '', password: 'secret_sauce' },
} as const satisfies Record<string, UserCredentials>;

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
} as const;

export const VALID_CHECKOUT_CUSTOMER = {
  firstName: 'QA',
  lastName: 'Automation',
  postalCode: '10110',
} as const satisfies CheckoutCustomer;

export function buildCheckoutCustomer(overrides: Partial<CheckoutCustomer> = {}): CheckoutCustomer {
  return { ...VALID_CHECKOUT_CUSTOMER, ...overrides };
}

export const VALIDATION_MESSAGES = {
  lockedOut: 'locked out',
  wrongPassword: 'Username and password do not match',
  missingUsername: 'Username is required',
  missingFirstName: 'First Name is required',
};
