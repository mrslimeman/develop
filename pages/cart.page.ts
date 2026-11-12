import { Page ,expect } from '@playwright/test';
import { commonPage, CommonWording} from '../resource/allreource';

export const cartPage = {

    async itemQuantity(page: Page, qty: string, product: string) {

        await expect(
        page.locator('.cart_item')
        .filter({ has: page.locator('.inventory_item_name', { hasText: product }) })
        .locator('.cart_quantity')
        ).toHaveText( qty );

    },

    async itemName(page: Page, product: string) {

        // ดึงชื่อสินค้าทั้งหมดในตะกร้าเก็บไว้ในอาเรย์
        const itemNames = await page.locator('.cart_item .inventory_item_name').allTextContents();

        // 1. เช็คว่ามีสินค้าทั้งหมด 2 ชิ้น
        // expect(itemNames.length).toBe(2);

        // 2. เช็คว่ามีชื่อสินค้าทั้งสองชิ้นนี้ปรากฏอยู่
        expect(itemNames).toContain(product);     

    },

    async btnRemove(page: Page) {

       await page.getByRole('button', { name: 'Remove' }).click();

    },

    async findItemAndRemove(page: Page, product: string, ) {

       const targetItem = page.locator('.cart_item').filter({ has: page.locator('.inventory_item_name', { hasText: product })})
       const itemName = await page.locator('.cart_item .inventory_item_name').allTextContents()
       
       await targetItem.getByRole('button', { name: 'Remove' }).click();
       expect(itemName).not.toContain(product); 

    },

}