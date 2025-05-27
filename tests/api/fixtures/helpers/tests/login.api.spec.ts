import { test, expect } from '../../api-fixture';

test('Get user profile after login', async ({ request, authToken }) => {
  const res = await request.get('https://your-api.com/api/profile', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.username).toBe('valid_user');
});
