import { request, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const ENV = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(`./env/.env.${ENV}`) });

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const context = await request.newContext();

  const response = await context.post(`${process.env.API_URL}/login`, {
    data: {
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS
    }
  });

  if (!response.ok()) {
    throw new Error('Global admin login failed!');
  }

  await context.storageState({ path: storageState as string });
  console.log(`Global admin auth saved at ${storageState}`);
}

export default globalSetup;
