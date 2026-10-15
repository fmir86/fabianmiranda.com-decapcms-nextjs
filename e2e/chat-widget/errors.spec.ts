import { test, expect } from '@playwright/test';
import { mockChatAPI, mockChatAPIError } from '../fixtures/chat-mock';

const FAB = 'button[aria-label="Open chat"]';
const INPUT = 'form input';
const SUBMIT = 'form button[type="submit"]';
const UNAVAILABLE = '[data-testid="chat-unavailable"]';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
});

test('shows a fallback with a contact link when the model call fails', async ({ page }) => {
  await mockChatAPIError(page);
  await page.click(FAB);
  await page.fill(INPUT, 'What does Fabian do?');
  await page.click(SUBMIT);
  await expect(page.locator(UNAVAILABLE)).toBeVisible();
  await expect(page.locator(`${UNAVAILABLE} a[href="/contact"]`)).toBeVisible();
  await expect(page.getByText('ALFRED_UNAVAILABLE')).toHaveCount(0);
});

test('fallback is in Spanish on Spanish pages', async ({ page }) => {
  await page.goto('/es');
  await mockChatAPIError(page);
  await page.click(FAB);
  await page.fill(INPUT, 'Hola');
  await page.click(SUBMIT);
  await expect(page.locator(`${UNAVAILABLE} a[href="/es/contacto"]`)).toBeVisible();
});

test('the conversation recovers once the model is back', async ({ page }) => {
  await mockChatAPIError(page);
  await page.click(FAB);
  await page.fill(INPUT, 'Hello');
  await page.click(SUBMIT);
  await expect(page.locator(UNAVAILABLE)).toBeVisible();

  await page.unroute('**/api/chat');
  await mockChatAPI(page, 'Back online.');
  await page.fill(INPUT, 'Hello again');
  await page.click(SUBMIT);
  await expect(page.locator(UNAVAILABLE)).toHaveCount(0);
  await expect(page.getByText('Back online.')).toBeVisible();
});
