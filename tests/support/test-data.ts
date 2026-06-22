// Reusable test data for UI and setup specs.
export const UsersFactory = {
  standard() {
    return { username: 'standard_user', password: 'secret_sauce' };
  },
  lockedOut() {
    return { username: 'locked_out_user', password: 'secret_sauce' };
  },
  wrongPassword() {
    return { username: 'standard_user', password: 'wrong_password' };
  },
  missingUsername() {
    return { username: '', password: 'secret_sauce' };
  },
  // generate a deterministic test user when needed
  generated(overrides?: Partial<{ username: string; password: string }>) {
    const base = { username: `user_${Date.now()}`, password: 'auto_pass' };
    return { ...base, ...(overrides || {}) };
  },
};

export const ProductsFactory = {
  backpack: 'Sauce Labs Backpack',
};

export const CheckoutFactory = {
  validCustomer() {
    return {
      firstName: 'QA',
      lastName: 'Automation',
      postalCode: '10110',
    };
  },
};

export const ValidationMessages = {
  lockedOut: 'locked out',
  wrongPassword: 'Username and password do not match',
  missingUsername: 'Username is required',
  missingFirstName: 'First Name is required',
};

export default {
  UsersFactory,
  ProductsFactory,
  CheckoutFactory,
  ValidationMessages,
};
