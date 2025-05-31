import { test as base } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export const test = base.extend<{}, { role: string }>({
  storageState: async ({}, use, testInfo) => {
    const tagMatches = testInfo.title.match(/@[\w:-]+/g) || [];
    const roleTag = tagMatches.find(tag => tag.startsWith('@role:'));
    const role = roleTag ? roleTag.replace('@role:', '') : 'admin';

    const ENV = process.env.ENV || 'dev';
    const storagePath = path.resolve(`tests/auth/storage/${ENV}/${role}.json`);

    if (!fs.existsSync(storagePath)) {
      throw new Error(`Storage file not found for role: ${role} at ${storagePath}`);
    }

    await use(storagePath);
  },
});

export { expect } from '@playwright/test';
