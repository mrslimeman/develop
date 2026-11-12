import { Page ,expect } from '@playwright/test';
import { commonPage, CommonWording} from '../resource/allreource';

export const inventoryPage = {

    async productAddToCart(page: Page, product: string) {

        const btnAddToCart = page.locator('.inventory_item_description')
        .filter({ has: page.locator('.inventory_item_name', { hasText: product}) })
        .locator('button:has-text("Add to cart")')

        const btnChangeToRemove = page.locator('.inventory_item_description')
        .filter({ has: page.locator('.inventory_item_name', { hasText: product}) })
        .locator('button:has-text("Remove")')

        await btnAddToCart.click()
        await expect(btnChangeToRemove).toBeVisible()

    },

    async btnGoToCart(page: Page) {

        await commonPage.clickElement(page, '[data-test="shopping-cart-link"]')

    },

}