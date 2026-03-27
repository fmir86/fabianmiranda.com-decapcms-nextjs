import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
});

const FAB = 'button[aria-label="Open chat"]';
const CLOSE = 'button[aria-label="Close chat"]';

test('FAB is visible on page load', async ({ page }) => {
  await expect(page.locator(FAB)).toBeVisible();
});

test('clicking FAB opens chat panel', async ({ page }) => {
  await page.click(FAB);
  await expect(page.locator(CLOSE)).toBeVisible();
  // FAB has opacity 0 via fabHidden class but is still in DOM
  await expect(page.locator(FAB)).toHaveCSS('opacity', '0');
});

test('header shows Alfred AI with bot icon', async ({ page }) => {
  await page.click(FAB);
  const header = page.locator('[class*="chatHeaderTitle"]');
  await expect(header).toContainText('Alfred AI');
  await expect(header.locator('svg')).toBeVisible();
});

test('welcome message is displayed', async ({ page }) => {
  await page.click(FAB);
  await expect(page.locator('[class*="chatMessages"]')).toContainText(
    "I'm Alfred AI"
  );
});

test('close button closes panel and FAB reappears', async ({ page }) => {
  await page.click(FAB);
  await expect(page.locator(CLOSE)).toBeVisible();

  await page.click(CLOSE);
  // Panel transitions to opacity 0 + pointer-events none
  await expect(page.locator(FAB)).toHaveCSS('opacity', '1');
  await expect(page.locator('[class*="chatWindow"]')).toHaveCSS('opacity', '0');
});

test('opening adds chat-open class to html', async ({ page }) => {
  await page.click(FAB);
  await expect(page.locator('html.chat-open')).toBeAttached();
});

test('closing removes chat-open class', async ({ page }) => {
  await page.click(FAB);
  await expect(page.locator('html.chat-open')).toBeAttached();

  await page.click(CLOSE);
  await expect(page.locator('html.chat-open')).not.toBeAttached();
});
