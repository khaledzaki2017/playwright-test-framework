import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import allure from 'allure-playwright';


const ENV = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `env/.env.${ENV}`) });

export default defineConfig({
  reporter: [ ['list'],['allure-playwright'],['./utils/jira-reporter.ts']],
  outputDir: `./tests/results/${ENV}`,
  

  globalSetup: './tests/auth/setup/global-setup.ts',
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  workers: 4,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
});
