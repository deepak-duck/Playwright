import { BasePage } from './base.page';

export class HomePage extends BasePage {
  async isLoaded() {
    await this.page.waitForSelector('.features_items');
  }

  async goToSignupLogin() {
    await this.clickLink('Signup / Login');
  }

  async goToLogout() {
    await this.clickLink('Logout');
  }

  async goToDeleteAccount() {
    await this.clickLink('Delete Account');
  }
}