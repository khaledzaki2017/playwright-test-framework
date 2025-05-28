// tests/ui/tests/dashboard.ui.spec.ts
import { test, expect } from '../fixtures/ui-fixture';

test('Admin can view dashboard directly', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();
});
