import { test, expect } from '@playwright/test';

test.describe('Audience smoke checks', () => {
  test('home page presents the profile and primary actions', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Adeel\s+Arshad/i })).toBeVisible();
    await expect(page.getByText(/Cloud Solution Architect/i).first()).toBeVisible();
    await expect(page.locator('a[href="/assets/resume.pdf"], a[href$="/assets/resume.pdf"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://www.linkedin.com/in/muhammmad-adeel-arshad-b2337880/"]').first()).toBeVisible();
    await expect(page.getByText(/AI-ready platforms/i).first()).toBeVisible();
    await expect(page.getByText(/Production readiness/i).first()).toBeVisible();
  });

  test('key detail pages are reachable from the navigation surface', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('a[href="/experience/"], a[href$="/experience/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/certifications/"], a[href$="/certifications/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/projects/"], a[href$="/projects/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/education/"], a[href$="/education/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/awards/"], a[href$="/awards/"]').first()).toBeVisible();
  });

  test('resume asset is downloadable', async ({ request }) => {
    const response = await request.get('/assets/resume.pdf');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type'] ?? '').toContain('pdf');
  });
});
