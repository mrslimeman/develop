import { Page ,test ,expect } from '@playwright/test';
import { loginPage, TestData, assertion ,CommonWording ,inventoryPage, cartPage, checkOutPage, commonPage } from '../../resource/allreource';
import { shot } from '../../utills/screenshot';

test.beforeEach(async ({ page }) => {

    await loginPage.loginSaucedemo(page, 
        TestData.user_credentials.std_username, 
        TestData.user_credentials.main_password);
    await assertion.checkUrl(page, TestData.common_url.inventoryUrl);

  });


test.describe('Test Suite - Shopping Cart', () => {

    const itemBackPack: string = TestData.product_item.product_backpack;
    const itemJacket: string = TestData.product_item.product_jacket;
    //const itemBikeLight: string = TestData.product_item.product_bike_light;

    test('Validate Add item to cart And Check Out Success', async ({ page }, TestInfo) => {

        let backPackPrice = 0;
        let bikeLightPrice = 0;
        let jacketPrice = 0;
        

        await test.step('Add to Cart', async () => {

            await inventoryPage.productAddToCart(page, itemBackPack);
            await inventoryPage.productAddToCart(page, itemJacket);
            //await inventoryPage.productAddToCart(page, itemBikeLight);
            
        });

        await test.step('Click To Cart', async () => {

            await inventoryPage.goToCart(page)
            await assertion.checkUrl(page, TestData.common_url.cartUrl);
            
        });

        await test.step('Check Product Qty. and Product Name', async () => {

            //Check Name
            await cartPage.itemName(page, itemBackPack)
            await cartPage.itemName(page, itemJacket)

            //Check Quantity
            await cartPage.itemQuantity(page, '1', itemBackPack)
            await cartPage.itemQuantity(page, '1', itemJacket)
            
        });

        await test.step('Remove Item', async () => {

            await cartPage.findItemAndRemove(page, itemJacket);

            //Check ของที่ยังอยู่
            await cartPage.findItemNotAvailable(page, itemJacket);
            await cartPage.findItemAvilable(page, itemBackPack);
            await checkOutPage.clickCheckOut(page);

        });

        await test.step('Check Out Step 1', async () => {

            await checkOutPage.titleCheckoutInfo(page);
            
            //fill - infomation
            await checkOutPage.inputFirstName(page, TestData.test_userinfo_demo.firstname);
            await checkOutPage.inputLastName(page, TestData.test_userinfo_demo.lastname);
            await checkOutPage.inputZipCode(page, TestData.test_userinfo_demo.zipcode);

            await checkOutPage.clickCancel(page);
            await commonPage.clickElement(page, '[data-test="continue-shopping"]')
            await inventoryPage.productAddToCart(page, itemJacket);

            await inventoryPage.goToCart(page)
            await assertion.checkUrl(page, TestData.common_url.cartUrl);
            await checkOutPage.clickCheckOut(page);

            //fill - infomation
            await checkOutPage.inputFirstName(page, TestData.test_userinfo_demo.firstname);
            await checkOutPage.inputLastName(page, TestData.test_userinfo_demo.lastname);
            await checkOutPage.inputZipCode(page, TestData.test_userinfo_demo.zipcode);
            await checkOutPage.clickContinue(page); 

        });

        await test.step('Check Out Step 2', async () => {

            await checkOutPage.titleCheckoutOverview(page);
            
            //overview - check item & quantity
            await cartPage.itemName(page, itemBackPack);
            await cartPage.itemQuantity(page, '1', itemBackPack);
            await cartPage.itemName(page, itemJacket);
            await cartPage.itemQuantity(page, '1', itemJacket);
            //await cartPage.findItemAvilable(page, itemBackPack);
            //await cartPage.findItemNotAvailable(page, itemJacket);
            backPackPrice = await cartPage.getItemPrice(page, itemBackPack);
            jacketPrice = await cartPage.getItemPrice(page, itemJacket);
            //bikeLightPrice = await cartPage.getItemPrice(page, itemBikeLight);

            //overview - check price matches product price
            expect(await cartPage.getItemPrice(page, itemBackPack)).toBeCloseTo(backPackPrice, 2);
            expect(await cartPage.getItemPrice(page, itemJacket)).toBeCloseTo(jacketPrice, 2);
            //expect(await cartPage.getItemPrice(page, itemBikeLight)).toBeCloseTo(bikeLightPrice, 2);
            await checkOutPage.verifySubtotal(page, jacketPrice+backPackPrice);

            //Verify Section & Total
            await checkOutPage.verifyOverViewSection(page);
            await shot(page, TestInfo, 'Overview_page')



        });

        await test.step('Check Out Complete Order', async () => {

            await checkOutPage.clickFinish(page);

            //Verify Successful Page
            await checkOutPage.verifyOrderSuccessful(page);
            await shot(page, TestInfo, 'Successful_page')
        });

        await test.step('back to home', async () => {

            await checkOutPage.clickBackToHome(page)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);

        });

    });
});