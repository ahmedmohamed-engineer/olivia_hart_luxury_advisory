import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const launchOptions = {
  channel: 'chrome-headless-shell',
  executablePath: '/home/ahmed/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-web-security', '--disable-features=IsolateOrigins', '--disable-site-isolation-trials', '--force-color-profile=srgb'],
};

export default defineConfig({
  testDir: './demo',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  timeout: 120000,
  expect: { timeout: 10000 },
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        launchOptions,
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 12 Pro'],
        launchOptions,
      },
    },
  ],
  webServer: {
    command: `cd ${path.resolve(__dirname, 'stitch_olivia_hart_luxury_advisory/olivia_hart_luxury_real_estate_advisor_cairo')} && python3 -m http.server 8080`,
    port: 8080,
    reuseExistingServer: true,
    timeout: 15000,
  },
});
