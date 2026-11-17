import { Page ,expect } from '@playwright/test';
import { commonPage, CommonWording, TestData, assertion } from '../resource/allreource';



export const loginPage = {

    async loginSaucedemo(page: Page, username: string, password: string) {

        await commonPage.navigateToUrl(page, TestData.common_url.baseUrl);
        await expect(page).toHaveTitle(CommonWording.login_wording.login_title);

        await commonPage.clearAndFill(page, '[data-test="username"]', username)
        await commonPage.clearAndFill(page, '[data-test="password"]', password)
        await commonPage.clickElement(page, '[data-test="login-button"]');

    },

    async loginFail(page: Page, username: string, password: string) {
        await this.loginSaucedemo(page, username, password)
    },

}