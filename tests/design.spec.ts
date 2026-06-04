import { test, expect } from '@playwright/test';

const PAGES = ['/', '/experience/', '/certifications/', '/projects/', '/education/', '/awards/'];

test.describe('Design smoke checks', () => {
  for (const path of PAGES) {
    test(`${path} renders core layout without horizontal overflow`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator('.navbar')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('.site-footer')).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }

  test('theme toggle is present and usable', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#themeToggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});
