import { test, expect } from '../fixtures/role-fixture';

test.use({ role: 'admin' });

test('Admin can access dashboard controls', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Admin Controls')).toBeVisible();
});
