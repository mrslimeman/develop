import { Page ,test ,expect } from '@playwright/test';
import { loginPage, TestData, assertion ,CommonWording ,inventoryPage, cartPage, checkOutPage } from '../../resource/allreource';

test.beforeEach(async ({ page }) => {

    await loginPage.loginSaucedemo(page, 
        TestData.user_credentials.std_username, 
        TestData.user_credentials.main_password);
    await assertion.checkUrl(page, TestData.common_url.inventoryUrl);

  });


test.describe('Test Suite - Shopping Cart', () => {

    const product_list: string[] = Object.values(TestData.product_item);

    console.log(product_list)

    const itemBackPack = product_list[0];
    const itemJacket = product_list[1];

    test('Validate Add item to cart', async ({ page }) => {

        await test.step('Add to Cart', async () => {

            await inventoryPage.productAddToCart(page, itemBackPack);
            await inventoryPage.productAddToCart(page, itemJacket);
            
        });

        await test.step('Click To Cart', async () => {

            await inventoryPage.btnGoToCart(page)
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
            await cartPage.findItemAvilable(page, itemBackPack);

            console.log("Item "+ itemJacket+ " is Removes");
            console.log("Item "+ itemBackPack+ " is Visible");

            await checkOutPage.clickCheckOut(page);

        });

        await test.step('Check Out Step 1', async () => {

            await checkOutPage.titleCheckoutInfo(page);
            
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
            await cartPage.findItemAvilable(page, itemBackPack);

            //Verify Section & Total
            await checkOutPage.verifyOverViewSection(page);
            await checkOutPage.clickFinish(page);

            //Verify Successful Page
            await checkOutPage.verifyOrderSuccessful(page);

        });

        await test.step('back to home', async () => {

            await checkOutPage.clickBackToHome(page)
            await assertion.checkUrl(page, TestData.common_url.inventoryUrl);

        });

    });
});