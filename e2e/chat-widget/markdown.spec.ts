import { test, expect } from '@playwright/test';
import { mockChatAPIWithMarkdown } from '../fixtures/chat-mock';

const FAB = 'button[aria-label="Open chat"]';
const INPUT = 'form input';
const SUBMIT = 'form button[type="submit"]';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await mockChatAPIWithMarkdown(page);
  await page.click(FAB);
  // Send a message to trigger the mocked markdown response
  await page.fill(INPUT, 'What services?');
  await page.click(SUBMIT);
  // Wait for response to render (AIWriter completes + ReactMarkdown takes over)
  await expect(page.locator('[class*="assistant"]').last()).toContainText('AI Consulting', { timeout: 10000 });
});

test('bold text renders as <strong>', async ({ page }) => {
  const lastAssistant = page.locator('[class*="assistant"]').last();
  await expect(lastAssistant.locator('strong')).toContainText('AI Consulting');
});

test('links render as <a> with correct href', async ({ page }) => {
  const lastAssistant = page.locator('[class*="assistant"]').last();
  const link = lastAssistant.locator('a[href="/services"]');
  await expect(link).toBeVisible();
  await expect(link).toContainText('services');
});

test('lists render as <ul> and <li>', async ({ page }) => {
  const lastAssistant = page.locator('[class*="assistant"]').last();
  await expect(lastAssistant.locator('ul')).toBeVisible();
  await expect(lastAssistant.locator('li').first()).toContainText('Web Development');
});

test('code renders in <code> tags', async ({ page }) => {
  const lastAssistant = page.locator('[class*="assistant"]').last();
  await expect(lastAssistant.locator('code')).toContainText('Next.js');
});
