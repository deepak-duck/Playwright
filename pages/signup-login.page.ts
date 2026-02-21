import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class SignupLoginPage extends BasePage {
  private nameInput = this.page.locator('input[data-qa="signup-name"]');
  private emailInput = this.page.locator('input[data-qa="signup-email"]');
  private signupBtn = this.page.locator('button[data-qa="signup-button"]');

  private loginEmail = this.page.locator('input[data-qa="login-email"]');
  private loginPassword = this.page.locator('input[data-qa="login-password"]');
  private loginBtn = this.page.locator('button[data-qa="login-button"]');

  async attemptToSignup(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupBtn.click();
  }

  async registerNewUser(name: string, email: string, password = '12345') {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupBtn.click();

    await expect(this.page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

    await this.page.locator('#id_gender1').check();
    await this.page.locator('input[data-qa="password"]').fill(password);
    await this.page.locator('select[data-qa="days"]').selectOption('15');
    await this.page.locator('select[data-qa="months"]').selectOption({ value: '6' });
    await this.page.locator('select[data-qa="years"]').selectOption('1995');

    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();

    await this.page.locator('input[data-qa="first_name"]').fill('Test');
    await this.page.locator('input[data-qa="last_name"]').fill('User');
    await this.page.locator('input[data-qa="address"]').fill('123 Test Street');
    await this.page.locator('select[data-qa="country"]').selectOption('India');
    await this.page.locator('input[data-qa="state"]').fill('Maharashtra');
    await this.page.locator('input[data-qa="city"]').fill('Mumbai');
    await this.page.locator('input[data-qa="zipcode"]').fill('400001');
    await this.page.locator('input[data-qa="mobile_number"]').fill('9876543210');

    await this.page.locator('button[data-qa="create-account"]').click();
    await expect(this.page.getByText('ACCOUNT CREATED!')).toBeVisible();
    await this.page.locator('a[data-qa="continue-button"]').click();
  }

  async login(email: string, password = '12345') {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
  }

  async expectErrorMessage(msg: string) {
    await expect(this.page.getByText(msg)).toBeVisible();
  }
}