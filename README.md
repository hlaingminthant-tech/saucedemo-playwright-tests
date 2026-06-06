# Sauce Demo Playwright QA Suite

<!-- CI badge: replace <OWNER>/<REPO> with your GitHub path -->
![CI](https://github.com/hlaingminthant-tech/saucedemo-playwright-tests/actions/workflows/playwright.yml/badge.svg)

This repository is a compact QA automation demo built with Playwright and TypeScript.

## What it demonstrates

- Page Object Model for UI reuse and cleaner specs.
- Custom fixtures for authenticated setup.
- Data-driven validation for login edge cases.
- Shared test data for credentials and product names.
- Real user flow coverage for inventory and cart behavior.
- API smoke testing with Playwright's request fixture.
- CI automation with GitHub Actions.

## Project structure

- `pages/` contains page objects such as `LoginPage` and `InventoryPage`.
- `tests/login.spec.ts` covers positive and negative login behavior.
- `tests/inventory.spec.ts` covers authenticated shopping flow and sorting.
- `tests/api.spec.ts` covers a lightweight API contract check.
- `tests/fixtures.ts` provides an authenticated fixture shared by UI tests.
- `tests/test-data.ts` centralizes reusable credentials and product names.

## Quick start

Install dependencies:

```bash
npm ci
```

Run the full test suite (headless):

```bash
npm test
```

Run tests headed (visible browser):

```bash
npm run test:headed
```

Run the reporting demo suite to see an intentional failure, a flaky retry example, and a timeout failure:

```bash
npm run test:failure-demo
```

Open the HTML report after a run:

```bash
npm run report
```
