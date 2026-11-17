import { Page, Locator, TestInfo } from '@playwright/test';

export async function shot(

  target: Page | Locator | any,
  testInfo: TestInfo,
  name: string,

) {

  let screenshot: Buffer;

  if ('getViewportSize' in target) {
    const page = target as Page;
    
    // หากต้องการบังคับ Viewport เฉพาะตอนแคปภาพ (เช่น อยากได้ภาพกว้างพิเศษ)
    //await page.setViewportSize({ width: 1920, height: 1080 }); 

    screenshot = await page.screenshot({ 
      fullPage: true,
      type: 'jpeg',    
      quality: 80      
    });
  } else {
    // ถ้าเป็น Locator จะแคปเฉพาะส่วน
    screenshot = await (target as Locator).screenshot({
      type: 'jpeg',
      quality: 80
    });
  }

  await testInfo.attach(name, {
    
    body: screenshot,
    contentType: 'image/jpeg'

  });
}