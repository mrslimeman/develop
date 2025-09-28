import { test, expect } from '@playwright/test';

test('Verify Landing Header', async ({ page }) => {
  await page.goto('https://ultimateqa.com/automation/');
  await expect(page).toHaveTitle(/Automation Practice/);
});

test('Verify have Element and Click', async ({ page }) => {
  await page.goto('https://ultimateqa.com/automation/');
  await expect(page).toHaveTitle(/Automation Practice/);
  await expect(page.getByText('Interactions with simple elements')).toBeVisible();
  await page.click('text=Interactions with simple elements');

});

test('Verify Navigate To Practice', async ({ page }) => {
    await page.goto('https://ultimateqa.com/automation/');
    await expect(page).toHaveTitle(/Automation Practice/);
    await expect(page.getByText('Interactions with simple elements')).toBeVisible();
    await page.click('text=Interactions with simple elements');
    await expect(page.getByText(/this section has really simple html elements/i)).toBeVisible();

    //interact element 
    // await page.click('id=idExample');
    // await expect(page.getByText(/Button success/i)).toBeVisible();
    // await page.goBack({ waitUntil: 'load' }); 

  });

