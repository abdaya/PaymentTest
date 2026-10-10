import { test, expect } from '@playwright/test';

test('Payment test', async ({ page }) => {
  await page.goto('https://dashboard.stripe.com/acct_1UMaogK1iS1bPQAv/test/dashboard'); 
  await page.getByTestId("uab-trigger").click();

})