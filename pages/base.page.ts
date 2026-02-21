import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async clickLink(text: string) {
    await this.page.getByRole('link', { name: text }).click();
  }
}