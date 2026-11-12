import { expect, Locator, TestInfo } from '@playwright/test';
import { TestData } from '../resource/allreource';


export const assertion = {
  // เช็คว่า Error Message ขึ้นหรือไม่
  async loginError(page: any, message: string) {

    const expected = page.getByText(message, { exact: false });
    await expect(expected).toBeVisible();

  },

  async checkUrl(page: any, Url: string) {

    
    const targetUrl = new RegExp(Url)
    await expect(page).toHaveURL(targetUrl);

  },
  
}