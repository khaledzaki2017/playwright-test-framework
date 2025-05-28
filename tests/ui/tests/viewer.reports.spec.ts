import { test, expect } from '../fixtures/role-fixture';

test.use({ role: 'viewer' });

test('Viewer sees read-only reports', async ({ page }) => {
  await page.goto('/reports');
  await expect(page.getByText('Download Report')).toBeVisible();
  await expect(page.locator('button:has-text("Delete")')).toHaveCount(0); // viewer can't delete
});
