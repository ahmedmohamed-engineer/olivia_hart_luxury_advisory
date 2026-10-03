import { test, expect, Browser } from '@playwright/test';
import {
  navigateToPage,
  scrollToSection,
  scrollSmooth,
  hoverElement,
  clickElement,
  setViewport,
  openMobileMenu,
  closeMobileMenu,
  takeScreenshot,
  waitForImages,
  expectNoConsoleErrors,
  delay,
} from './helpers/demo-helpers';

test.describe('Olivia Hart — Luxury Real Estate Demo Showcase', () => {
  let page: any;

  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await navigateToPage(page);
    await waitForImages(page);
    await expectNoConsoleErrors(page);
  });

  test.afterAll(async () => {
    if (page && !page.isClosed()) {
      await page.close();
    }
  });

  test.beforeEach(async ({ browser }: { browser: Browser }) => {
    if (page.isClosed()) {
      page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
      await navigateToPage(page);
      await waitForImages(page);
    }
  });

  test.describe.configure({ mode: 'serial' });

  // ============================================================
  // SCENE 1 — Opening
  // ============================================================
  test('Scene 1 — Opening: Show navigation and brand identity', async () => {
    await setViewport(page, 1920, 1080);
    await takeScreenshot(page, '01-opening');
    await expect(page.locator('[data-purpose="primary-navigation"]')).toBeVisible();
    await expect(page.locator('[data-purpose="logo"]')).toBeVisible();
    await expect(page.locator('[data-purpose="header-cta"]')).toBeVisible();
  });

  // ============================================================
  // SCENE 2 — Hero Reveal
  // ============================================================
  test('Scene 2 — Hero Reveal: Show full hero composition', async () => {
    await scrollToSection(page, 'hero');
    await delay(1500);
    await takeScreenshot(page, '02-hero');

    await expect(page.locator('[data-purpose="hero-portrait"]')).toBeVisible();
    await expect(page.locator('[data-purpose="hero-cta-properties"]')).toBeVisible();
    await expect(page.locator('[data-purpose="hero-cta-consult"]')).toBeVisible();

    await hoverElement(page, '[data-purpose="hero-portrait"]');
    await takeScreenshot(page, '02-hero-portrait-hover');
    await delay(500);
  });

  // ============================================================
  // SCENE 3 — About / Personal Brand
  // ============================================================
  test('Scene 3 — About: Show personal brand and trust elements', async () => {
    await scrollToSection(page, 'about');
    await delay(1000);
    await takeScreenshot(page, '03-about');

    await expect(page.locator('#about [data-purpose="about-quote-card"]')).toBeVisible();
    await hoverElement(page, '[data-purpose="about-image"]');
    await takeScreenshot(page, '03-about-hover');
    await delay(500);
  });

  // ============================================================
  // SCENE 4 — Services
  // ============================================================
  test('Scene 4 — Services: Show three-pillar service model', async () => {
    await scrollToSection(page, 'services');
    await delay(800);
    await takeScreenshot(page, '04-services');

    await hoverElement(page, '[data-purpose="services-section"] >> text=01 / BUY');
    await delay(400);
    await hoverElement(page, '[data-purpose="services-section"] >> text=02 / SELL');
    await delay(400);
    await hoverElement(page, '[data-purpose="services-section"] >> text=03 / INVEST');
    await delay(400);
    await takeScreenshot(page, '04-services-hover');
  });

  // ============================================================
  // SCENE 5 — Featured Properties (longest showcase)
  // ============================================================
  test('Scene 5 — Properties: Showcase all four curated listings', async () => {
    await scrollToSection(page, 'properties');
    await delay(1500);
    await takeScreenshot(page, '05-properties');

    const cards = page.locator('[data-purpose="property-card"]');
    const count = await cards.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await hoverElement(page, `[data-purpose="property-card"] >> nth=${i}`);
      await delay(300);
    }
    await takeScreenshot(page, '05-properties-hover');
    await delay(500);
  });

  // ============================================================
  // SCENE 6 — Areas of Expertise
  // ============================================================
  test('Scene 6 — Areas: Show four geographic markets', async () => {
    await scrollToSection(page, 'areas');
    await delay(800);
    await takeScreenshot(page, '06-areas');

    const areaCards = page.locator('[data-purpose="area-card"]');
    const count = await areaCards.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await hoverElement(page, `[data-purpose="area-card"] >> nth=${i}`);
      await delay(400);
    }
    await takeScreenshot(page, '06-areas-hover');
  });

  // ============================================================
  // SCENE 7 — Client Stories / Testimonials
  // ============================================================
  test('Scene 7 — Testimonials: Show dark-section social proof', async () => {
    await scrollToSection(page, 'testimonials');
    await delay(1500);
    await takeScreenshot(page, '07-testimonials');

    const testimonials = page.locator('[data-purpose="testimonial-card"]');
    const count = await testimonials.count();
    expect(count).toBe(3);

    await delay(1000);
    await takeScreenshot(page, '07-testimonials-hold');
  });

  // ============================================================
  // SCENE 8 — Market Insights
  // ============================================================
  test('Scene 8 — Insights: Show three article cards', async () => {
    await scrollToSection(page, 'insights');
    await delay(800);
    await takeScreenshot(page, '08-insights');

    const articles = page.locator('[data-purpose="insights-article"]');
    const count = await articles.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await hoverElement(page, `[data-purpose="insights-article"] >> nth=${i}`);
      await delay(400);
    }
    await takeScreenshot(page, '08-insights-hover');
  });

  // ============================================================
  // SCENE 9 — Social Media Presence
  // ============================================================
  test('Scene 9 — Social: Show Instagram grid with hover overlays', async () => {
    await scrollToSection(page, 'social-grid');
    await delay(800);
    await takeScreenshot(page, '09-social');

    const vignettes = page.locator('[data-purpose="social-vignette"]');
    const count = await vignettes.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await hoverElement(page, `[data-purpose="social-vignette"] >> nth=${i}`);
      await delay(400);
    }
    await takeScreenshot(page, '09-social-hover');
  });

  // ============================================================
  // SCENE 10 — Responsive / Mobile Showcase
  // ============================================================
  test('Scene 10 — Responsive: Show desktop then mobile layout', async () => {
    await setViewport(page, 1920, 1080);
    await delay(500);
    await takeScreenshot(page, '10-responsive-desktop');

    await expect(page.locator('[data-purpose="hero-portrait"]')).toBeVisible();

    // Stage B — Tablet
    await setViewport(page, 1280, 800);
    await delay(2000);
    await takeScreenshot(page, '10-responsive-tablet');

    // Stage C — Mobile: Scroll through key sections
    await setViewport(page, 390, 844);
    await delay(1500);
    await takeScreenshot(page, '10-responsive-mobile');

    // Scroll to About
    await scrollSmooth(page, '#about', 1200);
    await delay(2000);
    await takeScreenshot(page, '10-responsive-mobile-about');
    await hoverElement(page, '[data-purpose="about-image"]');
    await delay(1000);

    // Scroll to Properties
    await scrollSmooth(page, '#properties', 1200);
    await delay(2000);
    await takeScreenshot(page, '10-responsive-mobile-properties');
    await hoverElement(page, '[data-purpose="property-card"] >> nth=0');
    await delay(1000);

    // Scroll to CTA
    await scrollSmooth(page, '#contact', 1200);
    await delay(2000);
    await takeScreenshot(page, '10-responsive-mobile-cta');

    // Return to top
    await scrollSmooth(page, '#hero', 1200);
    await delay(1500);

    // Stage D — Open mobile menu
    await openMobileMenu(page);
    await delay(1000);
    await takeScreenshot(page, '10-responsive-mobile-nav-open');

    await expect(page.locator('[data-purpose="mobile-nav"]')).toBeVisible();
    await expect(page.locator('[data-purpose="mobile-nav-about"]')).toBeVisible();

    // Menu interaction: hover over nav items
    await hoverElement(page, '[data-purpose="mobile-nav-about"]');
    await delay(600);
    await hoverElement(page, '[data-purpose="mobile-nav-properties"]');
    await delay(600);
    await hoverElement(page, '[data-purpose="mobile-nav-cta"]');
    await delay(600);

    // Stage E — Close menu cleanly
    await closeMobileMenu(page);
    await delay(1000);
    await takeScreenshot(page, '10-responsive-mobile');

    await expect(page.locator('[data-purpose="hero-cta-properties"]')).toBeVisible();

    // Return to top and desktop viewport
    await scrollSmooth(page, '#hero', 1000);
    await delay(1000);

    await setViewport(page, 1920, 1080);
    await delay(500);
    await takeScreenshot(page, '10-responsive-back-to-desktop');
  });

  // ============================================================
  // SCENE 11 — Final CTA & Closing
  // ============================================================
  test('Scene 11 — Final CTA: Show the conversion moment', async () => {
    await scrollToSection(page, 'contact');
    await delay(1000);
    await takeScreenshot(page, '11-final-cta');

    await expect(page.locator('[data-purpose="final-cta-email"]')).toBeVisible();
    await expect(page.locator('[data-purpose="final-cta-whatsapp"]')).toBeVisible();

    await hoverElement(page, '[data-purpose="final-cta-email"]');
    await delay(400);
    await hoverElement(page, '[data-purpose="final-cta-whatsapp"]');
    await delay(400);
    await takeScreenshot(page, '11-final-cta-hover');

    await expect(page.locator('[data-purpose="page-footer"]')).toBeVisible();
    await delay(2000);
    await takeScreenshot(page, '11-final-cta-end');
  });
});
