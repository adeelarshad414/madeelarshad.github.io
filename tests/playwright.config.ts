import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration — SEO & Audience Infrastructure Tests
 * Site: madeelarshad.github.io
 *
 * Targets a local Jekyll server by default.
 * For production testing: BASE_URL=https://madeelarshad.github.io npx playwright test
 * Run only SEO:      npx playwright test seo.spec.ts
 * Run only Audience: npx playwright test audience.spec.ts
 */
export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  timeout: 60_000,
  retries: 1,
  workers: 2,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:4000',
    extraHTTPHeaders: {
      // Identify the test bot in server logs
      'User-Agent': 'Playwright-Test/1.0 (madeelarshad.github.io regression suite)',
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
