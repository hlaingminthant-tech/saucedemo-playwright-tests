# Additional Sauce Demo Test Plan

## Scope

This plan extends the current Playwright coverage for Sauce Demo. The existing suite already covers basic login, one cart add/remove flow, product sorting except Z-A, one successful checkout, one checkout validation, accessibility smoke, visual snapshots, and a small network-mocking example.

All scenarios assume a fresh browser context unless stated otherwise. Authenticated scenarios can use the existing `playwright/.auth/standard-user.json` setup state.

## Priority 1: Critical User Flow Coverage

### 1. Login rejects a missing password

**Starting state:** Logged out on the login page.

**Steps**

1. Open `/`.
2. Enter `standard_user` in the username field.
3. Leave the password field blank.
4. Click `Login`.

**Expected outcome**

- User remains on the login page.
- Error message contains `Password is required`.
- Username field value is preserved.
- Password field remains empty.

**Failure conditions**

- User reaches inventory.
- No visible validation appears.
- Validation reports the wrong missing field.

### 2. Login error can be dismissed

**Starting state:** Logged out on the login page.

**Steps**

1. Open `/`.
2. Submit invalid credentials.
3. Verify the validation message is visible.
4. Click the error close button.

**Expected outcome**

- Validation message is removed or hidden.
- Login form remains usable.
- User can subsequently submit valid credentials and reach inventory.

**Failure conditions**

- Error cannot be dismissed.
- Inputs become disabled.
- Valid login still fails after dismissing the error.

### 3. Product details page opens from inventory and returns back

**Starting state:** Authenticated on `/inventory.html`.

**Steps**

1. Click the `Sauce Labs Backpack` product name.
2. Verify the product details page opens.
3. Confirm product name, price, description, image, and `Add to cart` button are visible.
4. Click `Back to products`.

**Expected outcome**

- URL changes to the inventory item details route.
- Details match the selected inventory item.
- `Back to products` returns to `/inventory.html`.

**Failure conditions**

- Wrong product details appear.
- Back navigation loses authentication state.
- Product details controls are missing.

### 4. Add and remove an item from product details

**Starting state:** Authenticated on a product details page.

**Steps**

1. Click `Add to cart`.
2. Verify the cart badge shows `1`.
3. Verify the button changes to `Remove`.
4. Click `Remove`.

**Expected outcome**

- Cart badge appears after adding.
- Cart badge disappears after removing.
- Button state returns to `Add to cart`.

**Failure conditions**

- Badge count is wrong.
- Product cannot be removed from details.
- Button label does not reflect cart state.

### 5. Cart persists selected items across navigation

**Starting state:** Authenticated on `/inventory.html`.

**Steps**

1. Add `Sauce Labs Backpack` to the cart.
2. Open the cart and verify the item is present.
3. Click `Continue Shopping`.
4. Verify inventory is shown.
5. Open the cart again.

**Expected outcome**

- Cart still contains the selected item.
- Cart badge remains `1` throughout navigation.
- Continue shopping returns to inventory.

**Failure conditions**

- Cart is cleared unintentionally.
- Badge disappears while the item remains in the cart.
- Continue shopping leads to the wrong page.

## Priority 2: Checkout Validation and Totals

### 6. Checkout requires last name

**Starting state:** Authenticated with one product in the cart on checkout step one.

**Steps**

1. Fill first name and postal code.
2. Leave last name blank.
3. Click `Continue`.

**Expected outcome**

- User remains on checkout step one.
- Error message contains `Last Name is required`.

**Failure conditions**

- User reaches checkout overview.
- Validation reports the wrong field.

### 7. Checkout requires postal code

**Starting state:** Authenticated with one product in the cart on checkout step one.

**Steps**

1. Fill first name and last name.
2. Leave postal code blank.
3. Click `Continue`.

**Expected outcome**

- User remains on checkout step one.
- Error message contains `Postal Code is required`.

**Failure conditions**

- User reaches checkout overview.
- Validation reports the wrong field.

### 8. Checkout cancel returns to cart without losing items

**Starting state:** Authenticated with one product in the cart on checkout step one.

**Steps**

1. Click `Cancel`.
2. Verify the cart page is shown.
3. Verify the selected product remains in the cart.
4. Verify the cart badge still shows `1`.

**Expected outcome**

- User returns to `/cart.html`.
- Cart contents and badge are unchanged.

**Failure conditions**

- Cart is cleared.
- User returns to inventory instead of cart.
- Badge and cart contents disagree.

### 9. Checkout overview shows accurate item subtotal, tax, and total

**Starting state:** Authenticated with one known product in the cart.

**Steps**

1. Proceed to checkout overview with valid customer information.
2. Capture the product price shown in the overview.
3. Verify item subtotal equals the product price.
4. Verify tax is visible and numeric.
5. Verify total equals subtotal plus tax.

**Expected outcome**

- Overview pricing is internally consistent.
- Total uses two decimal places.
- Product name and quantity are correct.

**Failure conditions**

- Total math is incorrect.
- Tax or subtotal labels are missing.
- Overview lists the wrong product.

### 10. Finished checkout cannot be completed twice with stale state

**Starting state:** Authenticated with one product and completed checkout.

**Steps**

1. Complete an order.
2. Click browser back to return to checkout overview.
3. Attempt to finish again.
4. Inspect cart state.

**Expected outcome**

- Application handles back navigation consistently.
- Cart is empty or checkout completion remains stable.
- No duplicate order confirmation ambiguity appears.

**Failure conditions**

- Same cart can be submitted repeatedly with inconsistent UI state.
- Cart badge reappears incorrectly.
- User lands on a broken route.

## Priority 3: Inventory and Cart Edge Cases

### 11. Sort products from Z to A

**Starting state:** Authenticated on `/inventory.html`.

**Steps**

1. Select `Name (Z to A)` in the sort dropdown.
2. Read all visible product names.

**Expected outcome**

- Product names are sorted descending alphabetically.

**Failure conditions**

- Sort order is unchanged.
- Sort order is ascending.
- Product count changes after sorting.

### 12. Add multiple products and verify badge count

**Starting state:** Authenticated on `/inventory.html`.

**Steps**

1. Add two different products.
2. Verify the cart badge shows `2`.
3. Open the cart.
4. Verify both products are present.

**Expected outcome**

- Badge equals the number of selected products.
- Cart lists exactly the selected products.

**Failure conditions**

- Badge count is wrong.
- Only one product appears.
- Wrong products appear.

### 13. Remove one of multiple cart items

**Starting state:** Authenticated with two products in the cart.

**Steps**

1. Open the cart.
2. Remove one product.
3. Verify the removed product is gone.
4. Verify the other product remains.
5. Verify cart badge decrements to `1`.

**Expected outcome**

- Only the selected item is removed.
- Remaining item and badge state are correct.

**Failure conditions**

- Removing one item clears the cart.
- Badge count is stale.
- Removed item is still visible.

### 14. Empty cart checkout entry point

**Starting state:** Authenticated with an empty cart.

**Steps**

1. Open the cart.
2. Inspect the checkout button state.
3. Click `Checkout` if enabled.

**Expected outcome**

- Expected product behavior should be documented.
- If checkout is allowed, checkout step one opens with an empty cart.
- If checkout is blocked, a clear UI signal explains why.

**Failure conditions**

- Empty-cart behavior is inconsistent across browsers.
- User reaches a broken checkout state.

## Priority 4: Navigation, Session, and Access Control

### 15. Sidebar menu navigation works

**Starting state:** Authenticated on `/inventory.html`.

**Steps**

1. Open the sidebar menu.
2. Verify `All Items`, `About`, `Logout`, and `Reset App State` are visible.
3. Navigate to cart, then use `All Items`.

**Expected outcome**

- Sidebar opens and closes reliably.
- `All Items` returns to inventory.
- Menu links are keyboard and mouse accessible.

**Failure conditions**

- Menu traps focus unexpectedly.
- Links are missing.
- Navigation lands on the wrong page.

### 16. Reset app state clears cart

**Starting state:** Authenticated with at least one product in the cart.

**Steps**

1. Open the sidebar menu.
2. Click `Reset App State`.
3. Close the menu.
4. Verify cart badge disappears.
5. Open the cart.

**Expected outcome**

- Cart is empty after reset.
- Inventory buttons return to `Add to cart`.

**Failure conditions**

- Cart badge remains.
- Cart still contains products.
- Inventory button state remains `Remove`.

### 17. Logout prevents access to authenticated pages

**Starting state:** Authenticated on `/inventory.html`.

**Steps**

1. Log out using the sidebar.
2. Navigate directly to `/inventory.html`.
3. Navigate directly to `/cart.html`.

**Expected outcome**

- User is redirected to login or blocked from authenticated content.
- A clear login-required error is shown if Sauce Demo provides one.

**Failure conditions**

- Logged-out user can view inventory or cart.
- Redirect loops occur.

### 18. Browser refresh preserves expected session state

**Starting state:** Authenticated on `/inventory.html` with one cart item.

**Steps**

1. Add one item to the cart.
2. Refresh the page.
3. Verify inventory remains accessible.
4. Verify cart badge state.
5. Open the cart.

**Expected outcome**

- Session remains authenticated.
- Cart state behavior is documented and consistent.

**Failure conditions**

- Refresh logs the user out unexpectedly.
- Badge and cart content disagree.

## Priority 5: Non-Functional and Cross-Browser Coverage

### 19. Accessibility scan for checkout and cart

**Starting state:** Authenticated.

**Steps**

1. Run axe on the cart page.
2. Run axe on checkout step one.
3. Run axe on checkout overview.
4. Filter for critical and serious violations.

**Expected outcome**

- No critical violations.
- Serious violations are either absent or documented with issue references.

**Failure conditions**

- Critical accessibility violations are present.
- Core form controls are missing accessible names.

### 20. Mobile viewport smoke flow

**Starting state:** Fresh context using a mobile viewport project or test override.

**Steps**

1. Log in as standard user.
2. Add a product to cart.
3. Open cart.
4. Complete checkout.

**Expected outcome**

- Core flow works at mobile dimensions.
- Header, cart badge, menu, and checkout controls are visible and usable.

**Failure conditions**

- Controls overlap or are clipped.
- Checkout cannot be completed.

### 21. Visual snapshots for cart and checkout overview

**Starting state:** Authenticated with deterministic cart contents.

**Steps**

1. Capture a cart page snapshot with one product.
2. Capture checkout overview snapshot with the same product.

**Expected outcome**

- Baselines catch layout regressions beyond login and inventory.
- Dynamic content is stable enough for cross-browser comparison.

**Failure conditions**

- Snapshots are flaky due to animation or unstable assets.
- Baselines differ unexpectedly across repeated runs.

## Suggested Implementation Order

1. Add low-cost validation tests: missing password, missing last name, missing postal code, Z-A sorting.
2. Extend page objects for product details, continue shopping, cancel checkout, sidebar reset, and checkout totals.
3. Add multi-product cart coverage after expanding `PRODUCTS` in `tests/support/test-data.ts`.
4. Add mobile and expanded accessibility coverage once functional assertions are stable.
5. Add new visual baselines only after confirming deterministic state across Chromium, Firefox, and WebKit.

