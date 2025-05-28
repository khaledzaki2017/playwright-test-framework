import { test, expect } from '../../ui/fixtures/role-fixture';

test.use({ role: 'technician' });

test('Technician API: Can view assigned jobs', async ({ request }) => {
  const res = await request.get('/api/jobs', {
    headers: { Authorization: 'Bearer <inject-your-token-here>' }
  });

  expect(res.status()).toBe(200);
});
