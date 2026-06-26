import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { USERS } from '../support/test-data';

const authFile = 'playwright/.auth/standard-user.json';

setup('authenticate standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const standardUser = USERS.standard;

  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
  await page.waitForURL(/inventory/);
  await page.context().storageState({ path: authFile });
});
