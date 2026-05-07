# Sauce Demo Playwright QA Suite

<!-- CI badge: replace <OWNER>/<REPO> with your GitHub path -->
![CI](https://github.com/hlaingminthant-tech/saucedemo-playwright-tests/actions/workflows/playwright.yml/badge.svg)

This repository is a compact QA automation demo built with Playwright and TypeScript. It is designed to show practical testing patterns that are easy to explain in a resume or portfolio.

## Badges

- **CI:** Use the workflow badge above (replace `<OWNER>/<REPO>` with your GitHub repository). When the repo is pushed to GitHub the badge shows the current status automatically.

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

Open the HTML report after a run:

```bash
npm run report
```

## Resume-friendly highlights

This project shows that you can build maintainable UI tests, create reusable abstractions, validate common error paths, and run the suite in CI. It also gives you a clean story around test architecture rather than just a set of scripts.
