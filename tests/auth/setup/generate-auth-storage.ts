import { chromium } from '@playwright/test';

const roles = [
  { username: 'admin', password: 'adminpass', file: 'admin.json' },
  { username: 'viewer', password: 'viewerpass', file: 'viewer.json' },
  { username: 'tech_user', password: 'techpass', file: 'technician.json' },
];

(async () => {
  const browser = await chromium.launch();

  for (const { username, password, file } of roles) {
    const page = await browser.newPage();
    await page.goto('https://your-app.com/login');
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    const path = `tests/auth/storage/${file}`;
    await page.context().storageState({ path });
    console.log(`Saved auth state for ${username} to ${file}`);

    await page.close();
  }

  await browser.close();
})();
