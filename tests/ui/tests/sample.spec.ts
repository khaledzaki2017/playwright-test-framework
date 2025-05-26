// tests/ui/tests/sample.spec.ts
import { test, expect } from '@playwright/test';

test('Sample test - Open Google and check title', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});
