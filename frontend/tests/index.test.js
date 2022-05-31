const { test, expect } = require('@playwright/test');

test('Index Title', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('head title');
  await expect(title).toHaveText('BarAdvisor');
});