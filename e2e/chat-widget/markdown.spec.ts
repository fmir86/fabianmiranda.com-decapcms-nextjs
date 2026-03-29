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
  await page.fill(INPUT, 'What services?');
  await page.click(SUBMIT);
  await expect(page.locator('[class*="assistant"]').last()).toContainText('AI Consulting', { timeout: 15000 });
});

test('bot response contains formatted content', async ({ page }) => {
  const lastAssistant = page.locator('[class*="assistant"]').last();
  await expect(lastAssistant).toContainText('AI Consulting');
  await expect(lastAssistant).toContainText('Web Development');
  await expect(lastAssistant).toContainText('Mobile Apps');
  await expect(lastAssistant).toContainText('services');
  await expect(lastAssistant).toContainText('Next.js');
});
