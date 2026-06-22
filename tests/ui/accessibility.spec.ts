import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../support/fixtures';

test.describe('Accessibility smoke @smoke', () => {
  test('inventory page has no critical accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter((violation) => violation.impact === 'critical');

    expect(criticalViolations).toEqual([]);
  });
});
