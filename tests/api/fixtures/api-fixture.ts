import { test as base } from '@playwright/test';
import { getAuthToken } from './helpers/auth.helper';

type TestFixtures = {
  authToken: string;
};

export const test = base.extend<TestFixtures>({
  authToken: async ({}, use) => {
    const token = await getAuthToken();
    await use(token);
  },
});

export { expect } from '@playwright/test';
