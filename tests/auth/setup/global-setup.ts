import { execSync } from 'child_process';

async function globalSetup() {
  execSync('ts-node tests/auth/setup/generate-auth-storage.ts', {
    stdio: 'inherit',
  });
}

export default globalSetup;
