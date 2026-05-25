export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  wrongPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
  missingUsername: {
    username: '',
    password: 'secret_sauce',
  },
} as const;

export const products = {
  backpack: 'Sauce Labs Backpack',
} as const;

export const validationMessages = {
  lockedOut: 'locked out',
  wrongPassword: 'Username and password do not match',
  missingUsername: 'Username is required',
} as const;

export const checkout = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
} as const;