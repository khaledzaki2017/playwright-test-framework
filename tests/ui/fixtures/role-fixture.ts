import { test as base } from '@playwright/test';

export type Role = 'admin' | 'viewer' | 'technician';

interface RoleFixtures {
  role: Role;
}

const roleToStoragePath: Record<Role, string> = {
  admin: 'tests/auth/storage/admin.json',
  viewer: 'tests/auth/storage/viewer.json',
  technician: 'tests/auth/storage/technician.json',
};

export const test = base.extend<RoleFixtures>({
  storageState: async ({ role }, use) => {
    await use(roleToStoragePath[role]);
  },
});

export { expect } from '@playwright/test';
