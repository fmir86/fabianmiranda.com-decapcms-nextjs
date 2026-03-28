import { test, expect } from '@playwright/test';
import { mockChatAPI } from '../fixtures/chat-mock';

const FAB = 'button[aria-label="Open chat"]';
const INPUT = 'form input';
const SUBMIT = 'form button[type="submit"]';

test.describe('English locale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.click(FAB);
  });

  test('header shows "Alfred AI"', async ({ page }) => {
    await expect(page.locator('[class*="chatHeaderTitle"]')).toContainText('Alfred AI');
  });

  test('welcome message in English', async ({ page }) => {
    await expect(page.locator('[class*="chatMessages"]')).toContainText("I'm Alfred AI");
  });

  test('placeholder in English', async ({ page }) => {
    await expect(page.locator(INPUT)).toHaveAttribute('placeholder', 'Ask me anything...');
  });
});

test.describe('Spanish locale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es');
    await page.evaluate(() => sessionStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    await page.click(FAB);
  });

  test('header shows "Alfred AI"', async ({ page }) => {
    await expect(page.locator('[class*="chatHeaderTitle"]')).toContainText('Alfred AI');
  });

  test('welcome message in Spanish', async ({ page }) => {
    await expect(page.locator('[class*="chatMessages"]')).toContainText('Soy Alfred AI');
  });

  test('placeholder in Spanish', async ({ page }) => {
    await expect(page.locator(INPUT)).toHaveAttribute('placeholder', 'Preguntame lo que quieras...');
  });
});

// x-locale header is verified manually — Playwright can't reliably
// intercept custom headers on AI SDK streaming fetch requests.
