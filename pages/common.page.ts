import { Page ,expect } from '@playwright/test';

export const commonPage = {

    async navigateToUrl(page: Page, url: string) {
        await page.goto(url);
    },

    async clearAndFill(page: Page, locator: string, text: string) {

        const targetLocator = page.locator(locator);

        await expect(targetLocator).toBeVisible();
        await targetLocator.clear();
        await targetLocator.fill(text);
    },

    async clickElement(page: Page, locator: string){

        await expect(page.locator(locator)).toBeVisible();
        await page.locator(locator).click();

    },
    
    async getNumericString(page: Page, locator: string): Promise<number> {
        const targetLocator = page.locator(locator);
        
        // ตรวจสอบความปลอดภัยว่า element แสดงผลอยู่ก่อนดึงข้อความ
        await expect(targetLocator).toBeVisible();

        const fullString = await targetLocator.textContent();

        const priceMatch = fullString?.match(/[\d.]+/);
        const priceString = priceMatch ? priceMatch[0] : '0';
        const priceNumber = Number(priceString);

        // ส่งค่าตัวเลขกลับออกไปเพื่อให้นำไปบวกต่อได้
        return priceNumber;
    }

}