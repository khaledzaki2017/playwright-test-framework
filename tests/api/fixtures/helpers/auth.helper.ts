import { APIRequestContext, request } from '@playwright/test';

export async function getAuthToken(): Promise<string> {
  const context = await request.newContext();
  const response = await context.post('https://your-api.com/api/login', {
    data: {
      username: 'valid_user',
      password: 'valid_pass',
    },
  });

  const body = await response.json();

  if (response.ok()) {
    return body.token; // Adjust to match your response shape
  } else {
    throw new Error(`Failed to login: ${body.message}`);
  }
}
