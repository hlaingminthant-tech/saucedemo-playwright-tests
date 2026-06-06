# Sauce Demo Playwright QA Suite

<!-- CI badge: replace <OWNER>/<REPO> with your GitHub path -->
![CI](https://github.com/hlaingminthant-tech/saucedemo-playwright-tests/actions/workflows/playwright.yml/badge.svg)

This repository is a compact QA automation demo built with Playwright and TypeScript, showcasing enterprise-grade testing practices.

## What it demonstrates

### Core Testing Practices
- Page Object Model for UI reuse and cleaner specs.
- Custom fixtures for authenticated setup.
- Data-driven validation for login edge cases.
- Shared test data for credentials and product names.
- Real user flow coverage for inventory and cart behavior.
- API smoke testing with Playwright's request fixture.

### Advanced CI/CD & Reporting (Enterprise-Grade)
- **Parallel Test Execution** - Tests sharded across 4 workers running simultaneously, supporting multiple browsers (Chromium, Firefox, WebKit)
- **Smart Retries** - Automatic retry logic to distinguish flaky tests from real failures
- **Multi-Browser Testing** - Full test coverage across 3 major browsers in parallel
- **Test Analytics** - Custom reporting with flakiness detection and performance metrics
- **PR Integration** - Automatic test result comments on pull requests with pass rates and recommendations
- **Slack Alerts** - Real-time failure notifications to team Slack
- **GitHub Pages Reports** - Deployed HTML reports with videos and screenshots on failures
- **JSON & JUnit Reporting** - Integration with CI systems and analytics platforms

## Project structure

```
├── pages/               # Page Object Model classes
├── tests/
│   ├── login.spec.ts           # Login edge cases
│   ├── inventory.spec.ts        # Shopping flow & sorting
│   ├── api.spec.ts              # API contract testing
│   ├── smoke.spec.ts            # Smoke tests
│   ├── fixtures.ts              # Custom authenticated fixture
│   └── test-data.ts             # Shared credentials & data
├── scripts/
│   └── generate-report.js       # Custom analytics & flakiness detection
├── .github/workflows/
│   └── playwright.yml           # Enhanced CI/CD pipeline
└── playwright.config.ts         # Playwright configuration
```

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

## Reporting & Analytics

### View HTML Report
```bash
npm run report
```
