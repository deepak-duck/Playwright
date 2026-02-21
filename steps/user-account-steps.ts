import { createBdd } from 'playwright-bdd';

const {Given, When, Then} = createBdd();
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignupLoginPage } from '../pages/signup-login.page';

let currentUser = { name: '', email: '' };

Given('I am on the Automation Exercise home page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto('/');
  await homePage.isLoaded();
});

When('I register a new user with name {string}', async ({ page }, name: string) => {
  const timestamp = Date.now();
  const email = `test${timestamp}@yopmail.com`;
  currentUser = { name, email };

  const homePage = new HomePage(page);
  const signupPage = new SignupLoginPage(page);

  await homePage.goToSignupLogin();
  await signupPage.registerNewUser(name, email);
});

Then('I should be logged in as {string}', async ({ page }, name: string) => {
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
});

When('I delete my account', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToDeleteAccount();
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
});

Then('account should be deleted successfully', async () => {
  // already asserted above
});

When('I logout', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToLogout();
});

When('I login with the registered email and password', async ({ page }) => {
  const signupPage = new SignupLoginPage(page);
  await signupPage.login(currentUser.email);
});

When('I try to login with email {string} and password {string}', async ({ page }, email: string, password: string) => {
  const signupPage = new SignupLoginPage(page);
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await signupPage.login(email, password);
});

Then('I should see error {string}', async ({ page }, msg: string) => {
  const signupPage = new SignupLoginPage(page);
  await signupPage.expectErrorMessage(msg);
});

When('I try to register again with the same email', async ({ page }) => {
  const signupPage = new SignupLoginPage(page);

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByText('New User Signup!')).toBeVisible();
  await signupPage.attemptToSignup('DuplicateUser', currentUser.email);
});

Then('I should see Signup \\/ Login link', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
});