import {expect, test } from '@playwright/test';


test("log in", async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto("https://dashboard.stripe.com/login")
    await page.locator("#email").fill(process.env.TEST_EMAIL!)
    await page.locator("#old-password").fill(process.env.TEST_PASSWORD!)
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page.getByText('abd sandbox',{exact:true})).toBeVisible({timeout: 120000})
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    console.log("Authentication state saved to playwright/.auth/user.json")
})
