import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

    //Replace #username, #password, etc., with the actual selectors for your login page
  private usernameField = this.page.locator('#username');
  private passwordField = this.page.locator('#password');
  private loginButton = this.page.locator('button[type="submit"]');

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page.locator('text=Dashboard')).toBeVisible();
  }

  async assertLoginFailed() {
    await expect(this.page.locator('text=Invalid credentials')).toBeVisible();
  }
}
