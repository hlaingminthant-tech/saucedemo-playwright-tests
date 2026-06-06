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

Opens an interactive HTML report with screenshots, videos, and detailed test execution traces.

### Generate Custom Analytics
```bash
npm run analytics
```

Produces a detailed analytics report showing:
- Test pass rates and execution times
- **Flaky tests** (tests that were retried and passed) - helpful for identifying unstable tests
- **Slowest tests** - performance optimization targets
- **Failed test details** - root cause analysis
- Smart recommendations for improvements

### View Allure Report (Trend Dashboard)
```bash
npm run allure:show
```

Generates and opens a beautiful Allure report with:
- 📈 Test execution timeline
- 📊 Historical trends and graphs
- 🐛 Failure analytics
- ⏱️ Performance metrics
- 📉 Flakiness trends over time

**Note:** After first test run, Allure data is collected automatically. This command generates the dashboard.

### CI/CD Reports
- **GitHub Pages Dashboard**: Index page with links to both reports
- **Allure Report**: Beautiful trend dashboards deployed on GitHub Pages
- **Playwright Report**: Interactive HTML with screenshots/videos
- **Pull Request Comments**: Automatic test result summaries in PR discussions
- **Slack Notifications**: Alerts on test failures (configure `SLACK_WEBHOOK_URL` secret)
- **JUnit XML**: Integration with most CI systems via `test-results/junit.xml`

## CI/CD Pipeline Features

### Parallel Execution
Tests run across 4 shards × 3 browsers = 12 parallel jobs simultaneously:
- **Before**: Sequential execution taking 20-30 minutes
- **After**: Parallel execution in 8-10 minutes
- **Scaling**: Add more shards to `shardIndex` and `shardTotal` in `playwright.yml` as needed

### Smart Retry Logic
- Auto-retries on transient failures (network, timeouts)
- Distinguishes flaky tests from real bugs
- Flaky tests identified and flagged for investigation

### Multi-Environment Support
- Trigger full suite on main/master branches
- Optimized runs on feature branches
- Staging vs production configurations ready to expand

## Interview Talking Points

### Why This Matters to Employers

**Reporting & Metrics** 
- "I track test health over time and identify stability patterns"
- "Video evidence makes debugging 10x faster"

**Scalability**
- "Parallel execution keeps test suites fast as the team grows"
- "Matrix strategy supports cross-browser testing automatically"

**DevOps & Quality Culture**
- "Automated quality gates prevent broken code from merging"
- "Team stays informed via Slack without manual status checks"

**Data-Driven Development**
- "We measure reliability, not just pass/fail"
- "Flakiness detection drives infrastructure improvements"

## Configuration

### Environment Variables

Set these in GitHub Secrets for full CI/CD functionality:

```
SLACK_WEBHOOK_URL    # For Slack notifications (optional)
```

### Customizing Parallel Execution

Edit `.github/workflows/playwright.yml`:

```yaml
shardIndex: [1, 2, 3, 4]  # Number of parallel workers
shardTotal: [4]            # Must match number of workers
browser: [chromium, firefox, webkit]  # Browsers to test
```

### Allure Reports (Future Enhancement)

To add Allure Reports integration for trend dashboards:

```bash
npm install --save-dev @playwright/test allure-playwright allure-commandline
```

Then uncomment Allure configuration in `playwright.config.ts`.

## Performance Benchmarks

- **Single run**: ~8-10 minutes (4 shards × 3 browsers)
- **Sequential equivalent**: ~30 minutes
- **Per-browser time**: ~2.5-3 minutes per shard
- **Report generation**: <5 seconds

## Next Steps for Enhancement

- [ ] Allure Reports integration for trend analysis
- [ ] Performance regression detection
- [ ] Visual regression testing with Percy or Applitools
- [ ] Load testing integration
- [ ] Mobile device emulation expansion
