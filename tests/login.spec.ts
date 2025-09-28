import { test, expect } from '@playwright/test';

test('login page has title', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await expect(page).toHaveTitle(/The Internet/);
});

test('login success', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});