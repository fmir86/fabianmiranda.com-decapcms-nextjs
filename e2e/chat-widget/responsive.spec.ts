import { test, expect } from '@playwright/test';

const FAB = 'button[aria-label="Open chat"]';
const CLOSE = 'button[aria-label="Close chat"]';
const CHAT_PANEL = '[class*="chatWindow"]';

// Wait for CSS transitions to settle
const TRANSITION_MS = 400;

test.describe('Desktop (1440x900)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('panel is 400px wide', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    const box = await page.locator(CHAT_PANEL).boundingBox();
    expect(box!.width).toBe(400);
  });

  test('body gets margin-right 400px when chat opens', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    await page.waitForTimeout(TRANSITION_MS);
    const marginRight = await page.evaluate(() => getComputedStyle(document.body).marginRight);
    expect(marginRight).toBe('400px');
  });

  test('nav header shrinks when chat opens', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    await page.waitForTimeout(TRANSITION_MS);
    const headerWidth = await page.evaluate(() => {
      const header = document.querySelector('header[class*="Header-module"]');
      return header ? Math.round(header.getBoundingClientRect().width) : 0;
    });
    expect(headerWidth).toBe(1440 - 400);
  });

  test('content shift reverts on close', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    await page.waitForTimeout(TRANSITION_MS);
    await page.click(CLOSE);
    await page.waitForTimeout(TRANSITION_MS);
    const marginRight = await page.evaluate(() => getComputedStyle(document.body).marginRight);
    expect(marginRight).toBe('0px');
  });
});

test.describe('Tablet (1024x768)', () => {
  test.use({ viewport: { width: 1024, height: 768 } });

  test('panel is 400px wide', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    const box = await page.locator(CHAT_PANEL).boundingBox();
    expect(Math.round(box!.width)).toBe(400);
  });

  test('body has NO margin-right (overlay mode)', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    await page.waitForTimeout(TRANSITION_MS);
    const marginRight = await page.evaluate(() => getComputedStyle(document.body).marginRight);
    expect(marginRight).toBe('0px');
  });
});

test.describe('Mobile (375x667)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('panel is full viewport width', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    const box = await page.locator(CHAT_PANEL).boundingBox();
    expect(Math.round(box!.width)).toBe(375);
  });

  test('no border-left on mobile', async ({ page }) => {
    await page.goto('/');
    await page.click(FAB);
    await expect(page.locator(CLOSE)).toBeVisible();
    const borderLeft = await page.evaluate(() => {
      const panels = document.querySelectorAll('[class*="chatWindow"]');
      return panels[0] ? getComputedStyle(panels[0]).borderLeftWidth : '';
    });
    expect(borderLeft).toBe('0px');
  });
});
