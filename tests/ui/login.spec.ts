import { test, expect } from '../../fixtures/login-fixture';


test.describe('Login Flow', () => {
    test('Login with valid credentials using fixture', async ({ loginPage }) => {
        await loginPage.goto('https://your-app.com/login');
        await loginPage.login('valid_user', 'valid_pass');
        await loginPage.assertLoginSuccess();
      });

  test('should show error with invalid credentials',  async ({ loginPage })  => {

    await loginPage.goto('https://your-app.com/login');
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.assertLoginFailed();
  });
});
