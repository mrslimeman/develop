import { Page ,test ,expect } from '@playwright/test';
import { loginPage, TestData, assertion ,CommonWording ,inventoryPage, cartPage } from '../../resource/allreource';




test.beforeEach(async ({ page }) => {

    

    await loginPage.loginSaucedemo(page, 
        TestData.user_credentials.std_username, 
        TestData.user_credentials.main_password);
    await assertion.checkUrl(page, TestData.common_url.inventoryUrl);

  });


test.describe('Test Suite - Shopping Cart', () => {

    test('Validate Add item to cart', async ({ page }) => {

            const product_list = [

                TestData.product_item.product_jacket,
                TestData.product_item.product_backpack
            ]

        await test.step('Add to Cart', async () => {

            await inventoryPage.productAddToCart(page, TestData.product_item.product_backpack);
            await inventoryPage.productAddToCart(page, TestData.product_item.product_jacket);
            
        });

        await test.step('Click To Cart', async () => {

            await inventoryPage.btnGoToCart(page)
            await assertion.checkUrl(page, TestData.common_url.cartUrl);
            
        });

        await test.step('Check Product Qty. and Product Name', async () => {

            //Check Name
            await cartPage.itemName(page, product_list[0])
            await cartPage.itemName(page, product_list[1])

            //Check Quantity
            await cartPage.itemQuantity(page, '1', product_list[0])
            await cartPage.itemQuantity(page, '1', product_list[1])
            
        });

        await test.step('Remove Item', async () => {

            await cartPage.findItemAndRemove(page, product_list[0])

            //Check ของที่ยังอยู่
            await cartPage.itemName(page, product_list[1])
            
            console.log("Item "+ product_list[0]+ " is Removes")
            console.log("Item "+ product_list[1]+ " is Visible")

        });
    });
});