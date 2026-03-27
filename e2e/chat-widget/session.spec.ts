import { test, expect } from '@playwright/test';
import { mockChatAPI } from '../fixtures/chat-mock';

const FAB = 'button[aria-label="Open chat"]';
const CLOSE = 'button[aria-label="Close chat"]';
const INPUT = 'form input';
const SUBMIT = 'form button[type="submit"]';

test('messages persist across page navigation', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await mockChatAPI(page, 'I am Alfred, your AI assistant.');
  await page.click(FAB);
  await page.fill(INPUT, 'Hello');
  await page.click(SUBMIT);
  // Wait for bot response
  await expect(page.locator('[class*="assistant"]').last()).toContainText('Alfred', { timeout: 10000 });

  // Navigate to another page
  await page.goto('/about');
  await expect(page.locator('[class*="chatMessages"]')).toContainText('Hello');
  await expect(page.locator('[class*="chatMessages"]')).toContainText('Alfred');
});

test('open state persists across navigation', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.click(FAB);
  await expect(page.locator('[class*="chatOpen"]')).toBeVisible();

  await page.goto('/about');
  await expect(page.locator('[class*="chatOpen"]')).toBeVisible();
});

test('closed state persists across navigation', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.click(FAB);
  await page.click(CLOSE);

  await page.goto('/about');
  await expect(page.locator(FAB)).toBeVisible();
  await expect(page.locator('[class*="chatOpen"]')).toBeHidden();
});
