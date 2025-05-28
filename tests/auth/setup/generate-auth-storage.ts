import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://your-app.com/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'adminpass');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');

  await page.context().storageState({ path: 'tests/auth/storage/admin.json' });

  await browser.close();
})();
