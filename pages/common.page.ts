import { Page ,expect } from '@playwright/test';

export const commonPage = {

    async navigateToUrl(page: Page, url: string) {
        await page.goto(url);
    },

    async fillByTestID(page: Page, locator: string, text: string) {

        await page.locator(locator).clear();
        await page.locator(locator).fill(text)
    },

    async clickElement(page: Page, locator: string){

        await expect(page.locator(locator)).toBeVisible();
        await page.locator(locator).click();

    }

}