#!/usr/bin/env node

/**
 * Generate custom test analytics from Playwright test results
 * Detects flaky tests, performance regressions, and generates summary
 */

const fs = require('fs');
const path = require('path');

const RESULTS_FILE = path.join(__dirname, '../test-results/results.json');

function generateReport() {
  if (!fs.existsSync(RESULTS_FILE)) {
    console.warn('⚠️  No test results found. Run tests first.');
    return;
  }

  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));
  const stats = analyzeResults(results);

  console.log('\n📊 TEST ANALYTICS REPORT\n');
  console.log('═══════════════════════════════════════════');

  // Summary
  console.log(`✅ Passed:  ${stats.passed}`);
  console.log(`❌ Failed:  ${stats.failed}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`⏱️  Total Duration: ${(stats.totalDuration / 1000).toFixed(2)}s`);
  console.log(`📈 Pass Rate: ${stats.passRate}%\n`);

  // Slowest tests
  if (stats.slowestTests.length > 0) {
    console.log('🐢 SLOWEST TESTS:');
    stats.slowestTests.slice(0, 5).forEach((test, i) => {
      console.log(`  ${i + 1}. ${test.title} - ${(test.duration / 1000).toFixed(2)}s`);
    });
    console.log();
  }

  // Flaky tests (retried)
  if (stats.flakyTests.length > 0) {
    console.log('⚡ POTENTIALLY FLAKY TESTS (Retried):');
    stats.flakyTests.forEach((test) => {
      console.log(`  • ${test.title} (${test.attempts} attempts)`);
    });
    console.log();
  }

  // Failed tests details
  if (stats.failedTests.length > 0) {
    console.log('💥 FAILED TESTS:');
    stats.failedTests.forEach((test) => {
      console.log(`  • ${test.title}`);
      if (test.error) console.log(`    Error: ${test.error.substring(0, 80)}...`);
    });
    console.log();
  }

  console.log('═══════════════════════════════════════════\n');

  // Generate JSON summary for CI integration
  const summary = {
    timestamp: new Date().toISOString(),
    stats,
    recommendations: generateRecommendations(stats),
  };

  fs.writeFileSync(
    path.join(__dirname, '../test-results/summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('✅ Report saved to test-results/summary.json\n');

  return stats.passRate === 100 ? 0 : 1;
}

function analyzeResults(results) {
  const tests = results.suites.flatMap((suite) => suite.tests || []);

  const passed = tests.filter((t) => t.status === 'passed').length;
  const failed = tests.filter((t) => t.status === 'failed').length;
  const skipped = tests.filter((t) => t.status === 'skipped').length;
  const totalDuration = results.stats.duration;
  const passRate = Math.round((passed / (passed + failed)) * 100) || 0;

  // Find slowest tests
  const slowestTests = tests
    .filter((t) => t.status === 'passed')
    .sort((a, b) => (b.duration || 0) - (a.duration || 0));

  // Find flaky tests (retried and passed)
  const flakyTests = tests
    .filter((t) => t.status === 'passed' && t.retries && t.retries > 0)
    .map((t) => ({
      title: t.title,
      attempts: t.retries + 1,
    }));

  // Failed test details
  const failedTests = tests
    .filter((t) => t.status === 'failed')
    .map((t) => ({
      title: t.title,
      error: t.error?.message || 'Unknown error',
      location: t.location?.file || 'Unknown',
    }));

  return {
    passed,
    failed,
    skipped,
    total: tests.length,
    totalDuration,
    passRate,
    slowestTests,
    flakyTests,
    failedTests,
  };
}

function generateRecommendations(stats) {
  const recommendations = [];

  if (stats.passRate < 100) {
    recommendations.push('❌ Fix failing tests before merging.');
  }

  if (stats.flakyTests.length > 0) {
    recommendations.push(
      `⚡ ${stats.flakyTests.length} tests are flaky. Consider adding waits or improving selectors.`
    );
  }

  if (stats.slowestTests.length > 0 && stats.slowestTests[0].duration > 30000) {
    recommendations.push('🐢 Some tests are slow (>30s). Consider optimizing or parallelizing.');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ All tests passed and stable. Great job!');
  }

  return recommendations;
}

process.exit(generateReport());
