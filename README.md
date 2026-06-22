# Sauce Demo Playwright QA Suite

<!-- CI badge: replace <OWNER>/<REPO> with your GitHub path -->
![CI](https://github.com/hlaingminthant-tech/saucedemo-playwright-tests/actions/workflows/playwright.yml/badge.svg)

This repository is a compact QA automation demo built with Playwright and TypeScript.

## What it demonstrates

- Page Object Model for UI reuse and cleaner specs.
- Custom fixtures for authenticated setup.
- Reused authenticated browser state with Playwright `storageState`.
- Data-driven validation for login edge cases.
- Shared test data for credentials and product names.
- Real user flow coverage for inventory, cart, checkout, and logout behavior.
- Accessibility smoke checks with axe.
- Browser network mocking for resilient UI scenarios.
- Visual regression testing with Playwright snapshots.
- API smoke testing with Playwright's request fixture.
- CI automation with a browser matrix, report artifacts, and cross-repo release triggers.
- Built-in Playwright HTML reports with screenshots, videos, and traces on failure.
- CI-only retries and separate Chromium, Firefox, and WebKit jobs.

## Project structure

- `pages/` contains page objects, while `pages/components/` contains UI shared across pages.
- `tests/ui/` groups browser tests by product feature: login, inventory, cart, checkout, accessibility, network resilience, and visual regression.
- `tests/api/` contains API smoke, contract, and request-mocking specs with behavior-specific filenames.
- `tests/setup/` creates reusable authenticated storage state before dependent browser projects run.
- `tests/support/` centralizes custom fixtures and reusable test-data factories.
- `.github/workflows/playwright.yml` runs the suite on push, PR, manual dispatch, and a release dispatch from the main repo.

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

Run focused suites by tag:

```bash
npm run test:smoke
npm run test:regression
npm run test:ui
npm run test:api
npm run test:visual
```

Target another Sauce Demo-compatible environment:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

Open the HTML report after a run:

```bash
npm run report
```

## Test strategy

This suite is designed as a compact QA automation portfolio project. It balances happy-path business coverage with targeted negative cases, visual checks, accessibility smoke tests, API contract checks, and browser network mocking.

UI tests use stable user-facing locators where possible and page objects/components for repeated workflows. Authenticated inventory, cart, checkout, visual, and accessibility specs reuse a setup-generated `storageState` file so the suite does not repeat login in every test.

Failure evidence is enabled in Playwright config: screenshots are captured only on failure, videos are retained on failure, and traces are collected on first retry. CI runs Chromium, Firefox, and WebKit separately and uploads each built-in HTML report as an artifact.

Out of scope: this project does not attempt exhaustive Sauce Demo coverage, load testing, real payment validation, or backend ownership checks. The goal is to show maintainable automation design and useful risk-based coverage.

## Main repo trigger

This project can be triggered from the main application repo when a new release is published.

The main repo workflow should send a `repository_dispatch` event to this repo with the event type `main_repo_release` and a payload such as:

```json
{
	"event_type": "main_repo_release",
	"client_payload": {
		"source_repo": "owner/main-repo",
		"release_tag": "v1.2.3"
	}
}
```

After that dispatch arrives, this repo runs the Playwright suite and publishes the HTML report automatically.
