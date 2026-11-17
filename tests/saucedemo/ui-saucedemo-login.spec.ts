import { Page ,test ,expect } from '@playwright/test';
import { loginPage, TestData, assertion ,CommonWording } from '../../resource/allreource';

test.describe('Test Suite - Login Fail', () => {

    test('Validate Login-fail user not exist', async ({ page }, testInfo) => {

        await test.step('Login And Validate Error', async () => {
            
            await loginPage.loginFail(page, 'user', 'pass')
            await assertion.loginError(page, CommonWording.login_wording.login_err_user_not_exist)
        });
    });

    test('Validate Login-fail username is required', async ({ page }, testInfo) => {

        await test.step('Login And Validate Error', async () => {
            
            await loginPage.loginFail(page, '', 'pass')
            await assertion.loginError(page, CommonWording.login_wording.login_err_username_required)
        });
    });

    test('Validate Login-fail password is required', async ({ page }, testInfo) => {

        await test.step('Login And Validate Error', async () => {
            
            await loginPage.loginFail(page, 'user', '')
            await assertion.loginError(page, CommonWording.login_wording.login_err_password_required)
        });
    });

    test('Validate Login-fail user already lockout', async ({ page }, testInfo) => {

        await test.step('Login And Validate Error', async () => {
            
            await loginPage.loginFail(page, TestData.user_credentials.locked_username, TestData.user_credentials.main_password)
            await assertion.loginError(page, CommonWording.login_wording.login_err_lockout_user)
        });
    });

});

test.describe('Test Suite - Login Success', () => {

    test('Validate Login-success user standard', async ({ page }, testInfo) => {

        await test.step('Login And Validate Navigate to Inventory Page', async () => {
            
            await loginPage.loginSaucedemo(page, TestData.user_credentials.std_username, TestData.user_credentials.main_password)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);
        });
    });

    test('Validate Login-success problem user', async ({ page }, testInfo) => {

        await test.step('Login And Validate Navigate to Inventory Page', async () => {
            
            await loginPage.loginSaucedemo(page, TestData.user_credentials.problem_username, TestData.user_credentials.main_password)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);
        });
    });

    test('Validate Login-success performance_username', async ({ page }, testInfo) => {

        await test.step('Login And Validate Navigate to Inventory Page', async () => {
            
            //const start = performance.now();
            await loginPage.loginSaucedemo(page, TestData.user_credentials.performance_username, TestData.user_credentials.main_password)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);
            //const end = performance.now();

            //console.log(`Login time ${((end - start) / 1000).toFixed(2)}s`);

        });
    });

    test('Validate Login-success error_username', async ({ page }, testInfo) => {

        await test.step('Login And Validate Navigate to Inventory Page', async () => {
            
            await loginPage.loginSaucedemo(page, TestData.user_credentials.error_username, TestData.user_credentials.main_password)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);
        });
    });

    test('Validate Login-success visual_username', async ({ page }, testInfo) => {

        await test.step('Login And Validate Navigate to Inventory Page', async () => {
            
            await loginPage.loginSaucedemo(page, TestData.user_credentials.visual_username, TestData.user_credentials.main_password)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);
        });
    });

});