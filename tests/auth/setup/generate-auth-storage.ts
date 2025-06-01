import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const ENV = process.env.ENV || 'dev';
const ROLE = process.env.ROLE; // Accept role from CLI
dotenv.config({ path: path.resolve(`./env/.env.${ENV}`) });

if (!ROLE) {
  throw new Error('Please provide a ROLE environment variable (e.g., ROLE=viewer)');
}

const users: Record<string, { username: string; password: string }> = {
  admin: {
    username: process.env.ADMIN_USER!,
    password: process.env.ADMIN_PASS!,
  },
  technician: {
    username: process.env.TECH_USER!,
    password: process.env.TECH_PASS!,
  },
  viewer: {
    username: process.env.VIEWER_USER!,
    password: process.env.VIEWER_PASS!,
  },
};

(async () => {
  const user = users[ROLE];

  if (!user) {
    throw new Error(`Unsupported ROLE: ${ROLE}`);
  }

  const context = await request.newContext();
  const response = await context.post(`${process.env.API_URL}/login`, {
    data: {
      username: user.username,
      password: user.password,
    },
  });

  if (!response.ok()) {
    throw new Error(`Login failed for role: ${ROLE}`);
  }

  const storagePath = path.resolve(`tests/auth/storage/${ENV}/${ROLE}.json`);
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });
  await context.storageState({ path: storagePath });

  console.log(`Storage for ${ROLE} saved to: ${storagePath}`);
})();
