import { test, expect, Browser } from '@playwright/test';
import {
  navigateToPage,
  scrollSmooth,
  hoverElement,
  delay,
  setViewport,
  openMobileMenu,
  closeMobileMenu,
  moveCursorTo,
} from './helpers/demo-helpers';

const RECORDINGS_DIR = 'demo/recordings';

test.describe('Olivia Hart — Luxury Real Estate Demo Recording', () => {
  let page: any;
  let context: any;

  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    context = await browser.newContext({
      recordVideo: { dir: RECORDINGS_DIR, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    page = await context.newPage();
    await navigateToPage(page);
  });

  test.afterAll(async () => {
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch {
      // ignore
    }
    try {
      if (context) {
        await context.close();
      }
    } catch {
      // ignore
    }
  });

  test.describe.configure({ mode: 'serial' });

  // ============================================================
  // SCENE 1 — Opening
  // ============================================================
  test('Scene 1 — Opening', async () => {
    await setViewport(page, 1920, 1080);
    await moveCursorTo(page, 960, 45);
    await delay(1000);
  });

  // ============================================================
  // SCENE 2 — Hero Reveal
  // ============================================================
  test('Scene 2 — Hero Reveal', async () => {
    await scrollSmooth(page, '#hero', 1000);
    await delay(1500);

    await moveCursorTo(page, 480, 400);
    await hoverElement(page, '[data-purpose="hero-portrait"]');
    await delay(800);
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 3 — About
  // ============================================================
  test('Scene 3 — About', async () => {
    await scrollSmooth(page, '#about', 1000);
    await delay(1000);

    await moveCursorTo(page, 480, 500);
    await hoverElement(page, '[data-purpose="about-image"]');
    await delay(800);
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 4 — Services
  // ============================================================
  test('Scene 4 — Services', async () => {
    await scrollSmooth(page, '#services', 1000);
    await delay(800);

    await moveCursorTo(page, 500, 400);
    await hoverElement(page, '[data-purpose="services-section"] >> text=01 / BUY');
    await delay(400);
    await hoverElement(page, '[data-purpose="services-section"] >> text=02 / SELL');
    await delay(400);
    await hoverElement(page, '[data-purpose="services-section"] >> text=03 / INVEST');
    await delay(400);
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 5 — Properties (longest showcase)
  // ============================================================
  test('Scene 5 — Properties', async () => {
    await scrollSmooth(page, '#properties', 1000);
    await delay(1500);

    const cards = page.locator('[data-purpose="property-card"]');
    const count = await cards.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await moveCursorTo(page, 600 + i * 120, 400);
      await hoverElement(page, `[data-purpose="property-card"] >> nth=${i}`);
      await delay(500);
    }
    await moveCursorTo(page, 100, 600);
    await delay(500);
  });

  // ============================================================
  // SCENE 6 — Areas
  // ============================================================
  test('Scene 6 — Areas', async () => {
    await scrollSmooth(page, '#areas', 1000);
    await delay(800);

    const areaCards = page.locator('[data-purpose="area-card"]');
    const count = await areaCards.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await moveCursorTo(page, 400 + i * 180, 400);
      await hoverElement(page, `[data-purpose="area-card"] >> nth=${i}`);
      await delay(400);
    }
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 7 — Testimonials
  // ============================================================
  test('Scene 7 — Testimonials', async () => {
    await scrollSmooth(page, '#testimonials', 1000);
    await delay(1500);
    await delay(1000);
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 8 — Insights
  // ============================================================
  test('Scene 8 — Insights', async () => {
    await scrollSmooth(page, '#insights', 1000);
    await delay(800);

    const articles = page.locator('[data-purpose="insights-article"]');
    const count = await articles.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await moveCursorTo(page, 400 + i * 180, 400);
      await hoverElement(page, `[data-purpose="insights-article"] >> nth=${i}`);
      await delay(400);
    }
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 9 — Social
  // ============================================================
  test('Scene 9 — Social', async () => {
    await scrollSmooth(page, '#social-grid', 1000);
    await delay(800);

    const vignettes = page.locator('[data-purpose="social-vignette"]');
    const count = await vignettes.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await moveCursorTo(page, 400 + i * 180, 400);
      await hoverElement(page, `[data-purpose="social-vignette"] >> nth=${i}`);
      await delay(400);
    }
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 10 — Responsive
  // ============================================================
  test('Scene 10 — Responsive', async () => {
    // Stage A — Desktop: Show the Hero section at full resolution
    await setViewport(page, 1920, 1080);
    await moveCursorTo(page, 960, 500);
    await hoverElement(page, '[data-purpose="hero-portrait"]');
    await delay(2000);

    // Stage B — Tablet: Show layout adaptation
    await setViewport(page, 1280, 800);
    await moveCursorTo(page, 640, 400);
    await delay(2000);

    // Stage C — Mobile: Scroll through key sections
    await setViewport(page, 390, 844);
    await moveCursorTo(page, 195, 400);
    await delay(1500);

    // Scroll to About — show content and hover
    await scrollSmooth(page, '#about', 1200);
    await delay(2000);
    await hoverElement(page, '[data-purpose="about-image"]');
    await delay(1000);

    // Scroll to Properties — show a property card
    await scrollSmooth(page, '#properties', 1200);
    await delay(2000);
    await hoverElement(page, '[data-purpose="property-card"] >> nth=0');
    await delay(1000);

    // Scroll to CTA/Contact — show conversion area
    await scrollSmooth(page, '#contact', 1200);
    await delay(2000);
    await moveCursorTo(page, 195, 400);

    // Return to top before opening menu
    await scrollSmooth(page, '#hero', 1200);
    await delay(1500);

    // Stage D — Open mobile menu
    await openMobileMenu(page);
    await delay(1000);

    // Menu interaction: hover over nav items to show hover states
    await hoverElement(page, '[data-purpose="mobile-nav-about"]');
    await delay(600);
    await hoverElement(page, '[data-purpose="mobile-nav-properties"]');
    await delay(600);
    await hoverElement(page, '[data-purpose="mobile-nav-cta"]');
    await delay(600);

    // Stage E — Close menu cleanly
    await closeMobileMenu(page);
    await delay(1000);

    // Return to top and desktop viewport
    await scrollSmooth(page, '#hero', 1000);
    await delay(1000);

    await setViewport(page, 1920, 1080);
    await delay(2000);
    await moveCursorTo(page, 100, 600);
  });

  // ============================================================
  // SCENE 11 — Final CTA
  // ============================================================
  test('Scene 11 — Final CTA', async () => {
    await scrollSmooth(page, '#contact', 1000);
    await delay(1000);

    await moveCursorTo(page, 600, 500);
    await hoverElement(page, '[data-purpose="final-cta-email"]');
    await delay(400);
    await moveCursorTo(page, 800, 500);
    await hoverElement(page, '[data-purpose="final-cta-whatsapp"]');
    await delay(400);

    await delay(2000);
    await moveCursorTo(page, 100, 600);
  });
});
