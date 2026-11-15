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

  async isVisibled(page: any, locator: string) {

    const target = page.locator(locator)
    await expect(target).toBeVisible();

  },

  async isNotVisibled(page: any, locator: Locator) {

    const target = page.locator(locator)
    await expect(target).not.toBeVisible();

  },

  async hasText(page: any, locator: string, expected: string) {

    await expect((page.locator(locator))).toHaveText(expected);

  },

  async hasNoText(page: any, locator: string, expected: string) {

    await expect((page.locator(locator))).not.toHaveText(expected);
    
  },


}