# Repository Guidelines

## Project Structure & Module Organization

This is a Playwright + TypeScript QA suite for Sauce Demo. Page objects live in `pages/`, with shared fragments in `pages/components/`. Tests are under `tests/`: browser coverage in `tests/ui/`, API and mocking examples in `tests/api/`, setup state in `tests/setup/`, fixtures and data in `tests/support/`, and demo failure specs in `tests/demo/`. Visual baselines are stored beside `tests/ui/visual.spec.ts`. Reports go to `playwright-report/`; run artifacts go to `test-results/artifacts/`.

## Build, Test, and Development Commands

- `npm ci`: install exact dependencies from `package-lock.json`.
- `npm run install-browsers`: install Playwright browser binaries.
- `npm test`: run the full default Playwright suite headlessly.
- `npm run test:headed`: run tests in a visible browser.
- `npm run test:smoke`, `npm run test:regression`, `npm run test:ui`, `npm run test:api`, `npm run test:visual`: run tagged subsets.
- `npm run typecheck`: run `tsc --noEmit` with strict TypeScript settings.
- `npm run report`: open the latest Playwright HTML report.

Use `BASE_URL=https://www.saucedemo.com npm test` for another compatible environment.

## Coding Style & Naming Conventions

Use TypeScript strict mode. Follow the existing style: two-space indentation, single quotes, semicolons, explicit return types on page object methods, and `readonly` constructor dependencies. Name page objects and components in PascalCase, such as `LoginPage` and `HeaderComponent`. Keep specs named by feature with `.spec.ts`, for example `checkout.spec.ts`. Prefer user-facing locators and `data-test` locators over brittle CSS selectors.

## Testing Guidelines

Import `test` and `expect` from `tests/support/fixtures.ts` unless a spec needs raw Playwright fixtures. Reuse page objects for workflows and shared data from `tests/support/test-data.ts`. Tag suites or tests with `@smoke`, `@regression`, `@api`, and `@visual` so package scripts remain useful. Authenticated UI tests should rely on setup-generated `playwright/.auth/standard-user.json` instead of repeating login.

## Commit & Pull Request Guidelines

Recent history uses short imperative subjects with conventional prefixes, for example `refactor: centralize Playwright fixtures and test structure` and `fix: Update README.md`. Keep commits focused.

Pull requests should describe the scenario changed, list commands run, and link any relevant issue. Include screenshots or report notes when visual, UI, or failure-evidence behavior changes. Call out intentional snapshot updates.

## Security & Configuration Tips

Do not commit generated reports, trace artifacts, videos, or local credentials. Keep environment-specific values in environment variables such as `BASE_URL`. Treat `playwright/.auth/` as generated test state, not reusable secret material.
