import { test, expect, Page } from '@playwright/test';

async function registerUser(page: Page, name: string, email: string, password: string) {
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByText('New User Signup!')).toBeVisible();

  await page.locator('input[data-qa="signup-name"]').fill(name);
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.locator('button[data-qa="signup-button"]').click();

  await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

  await page.locator('#id_gender1').check(); // Mr.
  await page.locator('input[data-qa="password"]').fill(password);
  await page.locator('select[data-qa="days"]').selectOption('15');
  await page.locator('select[data-qa="months"]').selectOption({ value: '6' }); // June
  await page.locator('select[data-qa="years"]').selectOption('1995');

  await page.locator('#newsletter').check();
  await page.locator('#optin').check();

  await page.locator('input[data-qa="first_name"]').fill('Test');
  await page.locator('input[data-qa="last_name"]').fill('User');
  await page.locator('input[data-qa="address"]').fill('123 Test Street');
  await page.locator('select[data-qa="country"]').selectOption('India');
  await page.locator('input[data-qa="state"]').fill('Maharashtra');
  await page.locator('input[data-qa="city"]').fill('Mumbai');
  await page.locator('input[data-qa="zipcode"]').fill('400001');
  await page.locator('input[data-qa="mobile_number"]').fill('9876543210');

  await page.locator('button[data-qa="create-account"]').click();
  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
}

test.describe('AutomationExercise - First 5 Test Cases', () => {

  test('TC001 - Register User', async ({ page }) => {
    const timestamp = Date.now();
    const name = `TestUser${timestamp}`;
    const email = `test${timestamp}@yopmail.com`;
    const password = '12345';

    await page.goto('https://automationexercise.com/');
    await expect(page.locator('.features_items')).toBeVisible();

    await registerUser(page, name, email, password);

    await expect(page.getByText('Logged in as')).toBeVisible();

    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.locator('a[data-qa="continue-button"]').click();
  });

  test('TC002 - Login User with correct email and password', async ({ page }) => {
    const timestamp = Date.now();
    const name = `LoginUser${timestamp}`;
    const email = `login${timestamp}@yopmail.com`;
    const password = '12345';

    await page.goto('https://automationexercise.com/');
    await expect(page.locator('.features_items')).toBeVisible();

    // Create user first
    await registerUser(page, name, email, password);
    await expect(page.getByText('Logged in as')).toBeVisible();

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();

    // Now perform login (core of TC002)
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByText('Login to your account')).toBeVisible();

    await page.locator('input[data-qa="login-email"]').fill(email);
    await page.locator('input[data-qa="login-password"]').fill(password);
    await page.locator('button[data-qa="login-button"]').click();

    await expect(page.getByText('Logged in as')).toBeVisible();

    // Cleanup
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    await page.locator('a[data-qa="continue-button"]').click();
  });

  test('TC003 - Login User with incorrect email and password', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page.locator('.features_items')).toBeVisible();

    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByText('Login to your account')).toBeVisible();

    await page.locator('input[data-qa="login-email"]').fill('wrongemail@yopmail.com');
    await page.locator('input[data-qa="login-password"]').fill('wrongpass123');
    await page.locator('button[data-qa="login-button"]').click();

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('TC004 - Logout User', async ({ page }) => {
    const timestamp = Date.now();
    const name = `LogoutUser${timestamp}`;
    const email = `logout${timestamp}@yopmail.com`;
    const password = '12345';

    await page.goto('https://automationexercise.com/');
    await expect(page.locator('.features_items')).toBeVisible();

    await registerUser(page, name, email, password);
    await expect(page.getByText('Logged in as')).toBeVisible();

    await page.getByRole('link', { name: 'Logout' }).click();

    // Verify logged out
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
  });

  test('TC005 - Register User with existing email', async ({ page }) => {
    const timestamp = Date.now();
    const name = `ExistingUser${timestamp}`;
    const email = `existing${timestamp}@yopmail.com`;
    const password = '12345';

    await page.goto('https://automationexercise.com/');
    await expect(page.locator('.features_items')).toBeVisible();

    // Create user first
    await registerUser(page, name, email, password);
    await expect(page.getByText('Logged in as')).toBeVisible();

    await page.getByRole('link', { name: 'Logout' }).click();

    // Try to register with same email again
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByText('New User Signup!')).toBeVisible();

    await page.locator('input[data-qa="signup-name"]').fill('NewName');
    await page.locator('input[data-qa="signup-email"]').fill(email);
    await page.locator('button[data-qa="signup-button"]').click();

    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});