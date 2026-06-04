import { test, expect } from '@playwright/test';

const SITE_URL = process.env.SITE_URL ?? 'https://madeelarshad.github.io';

const PAGES = [
  '/',
  '/experience/',
  '/certifications/',
  '/certifications/yearly/',
  '/projects/',
  '/education/',
  '/awards/',
];

test.describe('SEO smoke checks', () => {
  for (const path of PAGES) {
    test(`${path} has title, description, and canonical metadata`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveTitle(/Adeel Arshad|Cloud|DevOps|Certification|Education|Awards|Projects/);

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length ?? 0).toBeGreaterThan(80);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain(new URL(SITE_URL).host);
    });
  }

  test('home page exposes Person structured data', async ({ page }) => {
    await page.goto('/');
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const person = scripts.map((text) => JSON.parse(text)).find((item) => item['@type'] === 'Person');

    expect(person).toBeTruthy();
    expect(person.name).toBe('Adeel Arshad');
    expect(person.jobTitle).toContain('Cloud Solution Architect');
    expect(person.sameAs).toContain('https://www.linkedin.com/in/yourprofile');
    expect(person.sameAs).toContain('https://github.com/madeelarshad');
  });

  test('robots.txt references the configured sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
