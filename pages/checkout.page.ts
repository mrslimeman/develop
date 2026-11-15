import { Page ,expect } from '@playwright/test';
import { TestData, CommonWording, assertion, commonPage} from '../resource/allreource';


export const checkOutPage = {

   async clickCheckOut(page: Page) {

      await commonPage.clickElement(page, '[data-test="checkout"]')

   },

   async titleCheckoutInfo(page: Page) {

      await assertion.hasText(page, '[data-test="title"]', CommonWording.checkout_wording.checkout_title)

   },

   async titleCheckoutOverview(page: Page) {

      await assertion.hasText(page, '[data-test="title"]', CommonWording.checkout_wording.checkout_overview)

   },

   async titleCheckoutSuccess(page: Page) {

      await assertion.hasText(page, '[data-test="title"]', CommonWording.checkout_wording.checkout_complete)

   },

   async clickCancel(page: Page) {

      await commonPage.clickElement(page, '[data-test="cancel"]')

   },

   async clickContinue(page: Page) {

      await commonPage.clickElement(page, '[data-test="continue"]')

   },

   async clickFinish(page: Page) {

      await commonPage.clickElement(page, '[data-test="finish"]')

   },

   async clickBackToHome(page: Page){

      await commonPage.clickElement(page, '[data-test="back-to-products"]')

   },

   async clickDownLoadPDF(page: Page){

      await commonPage.clickElement(page, '[data-test="generate-pdf-order"]')

   },

   async inputFirstName(page: Page, text: string | number){

      await commonPage.clearAndFill(page, '[data-test="firstName"]', String(text));

   },

   async inputLastName(page: Page, text: string | number){

      await commonPage.clearAndFill(page, '[data-test="lastName"]', String(text));

   },

   async inputZipCode(page: Page, text: string | number){

      await commonPage.clearAndFill(page, '[data-test="postalCode"]', String(text));

   },

   async verifyOverViewSection(page: Page){

      await assertion.isVisibled(page, '[data-test="payment-info-label"]')
      await assertion.isVisibled(page, '[data-test="payment-info-value"]')
      await assertion.isVisibled(page, '[data-test="shipping-info-label"]')
      await assertion.isVisibled(page, '[data-test="shipping-info-value"]')
      await assertion.isVisibled(page, '[data-test="total-info-label"]')
      await assertion.isVisibled(page, '[data-test="subtotal-label"]')
      await assertion.isVisibled(page, '[data-test="tax-label"]')
      await assertion.isVisibled(page, '[data-test="total-label"]')

      const priceSubTotal = await commonPage.getNumericString(page, '[data-test="subtotal-label"]');
      const priceTax = await commonPage.getNumericString(page, '[data-test="tax-label"]');
      const expectedTotal = await commonPage.getNumericString(page, '[data-test="total-label"]');

      const actualTotal = priceSubTotal + priceTax;
      expect(actualTotal).toBe(expectedTotal);

   },

   async verifyOrderSuccessful(page: Page){

      await assertion.isVisibled(page, '[data-test="pony-express"]')
      await assertion.isVisibled(page, '[data-test="complete-header"]')
      await assertion.isVisibled(page, '[data-test="complete-text"]')
      await assertion.isVisibled(page, '[data-test="back-to-products"]')
      await assertion.isVisibled(page, '[data-test="generate-pdf-order"]')

      await assertion.hasText(page, '[data-test="complete-header"]', CommonWording.checkout_wording.txt_success_msg)
      await assertion.hasText(page, '[data-test="complete-text"]', CommonWording.checkout_wording.txt_success_desc)

   },

}