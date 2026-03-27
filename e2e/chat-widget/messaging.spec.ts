import { test, expect } from '@playwright/test';
import { mockChatAPI } from '../fixtures/chat-mock';

const FAB = 'button[aria-label="Open chat"]';
const INPUT = 'form input';
const SUBMIT = 'form button[type="submit"]';
const BOT_RESPONSE = 'Fabian is a creative technologist based in Costa Rica.';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await mockChatAPI(page, BOT_RESPONSE);
  await page.click(FAB);
});

test('input is focused after opening', async ({ page }) => {
  await expect(page.locator(INPUT)).toBeFocused({ timeout: 2000 });
});

test('can type in input field', async ({ page }) => {
  await page.fill(INPUT, 'Hello');
  await expect(page.locator(INPUT)).toHaveValue('Hello');
});

test('submit disabled when input is empty', async ({ page }) => {
  await expect(page.locator(SUBMIT)).toBeDisabled();
});

test('submit enabled with text', async ({ page }) => {
  await page.fill(INPUT, 'Hello');
  await expect(page.locator(SUBMIT)).toBeEnabled();
});

test('user message bubble appears after send', async ({ page }) => {
  await page.fill(INPUT, 'What does Fabian do?');
  await page.click(SUBMIT);
  await expect(page.locator('[class*="user"]')).toContainText('What does Fabian do?');
});

test('typing indicator appears while waiting', async ({ page }) => {
  await mockChatAPI(page, BOT_RESPONSE, { delay: 2000 });
  await page.fill(INPUT, 'Hi');
  await page.click(SUBMIT);
  await expect(page.locator('[class*="typing"]')).toBeVisible();
});

test('bot response appears with mocked text', async ({ page }) => {
  await page.fill(INPUT, 'Tell me about Fabian');
  await page.click(SUBMIT);
  await expect(page.locator('[class*="assistant"]').last()).toContainText(
    'creative technologist',
    { timeout: 10000 }
  );
});
