import { Page, Locator } from '@playwright/test';

const BASE_URL = 'http://localhost:8080/code.html';

export async function navigateToPage(page: Page): Promise<void> {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
}

export async function waitForSection(page: Page, sectionId: string): Promise<void> {
  const section = page.locator(`[data-purpose="${sectionId}"]`);
  await section.waitFor({ state: 'visible' });
  await page.waitForTimeout(500);
}

export async function scrollToSection(page: Page, sectionId: string): Promise<void> {
  const section = page.locator(`#${sectionId}`);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
}

export async function scrollSmooth(page: Page, targetSelector: string, duration = 800): Promise<void> {
  await page.evaluate(([sel, dur]) => {
    const el = document.querySelector(sel);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [targetSelector, duration]);
  await page.waitForTimeout(duration / 2);
}

export async function hoverElement(page: Page, selector: string): Promise<void> {
  const el = page.locator(selector);
  await el.hover({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(400);
}

export async function clickElement(page: Page, selector: string): Promise<void> {
  const el = page.locator(selector);
  await el.click();
  await page.waitForTimeout(500);
}

export async function setViewport(page: Page, width: number, height: number): Promise<void> {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(800);
}

export async function openMobileMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const nav = document.getElementById('mobileNav');
    const backdrop = document.getElementById('mobileBackdrop');
    const toggle = document.querySelector('[data-purpose="mobile-menu-toggle"]');
    document.body.classList.add('menu-open');
    if (nav) nav.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  });
  await page.waitForTimeout(600);
}

export async function closeMobileMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const nav = document.getElementById('mobileNav');
    const backdrop = document.getElementById('mobileBackdrop');
    const toggle = document.querySelector('[data-purpose="mobile-menu-toggle"]');
    document.body.classList.remove('menu-open');
    if (nav) nav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
  await page.waitForTimeout(600);
}

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const outputPath = `demo/demo-output/${name}.png`;
  await page.screenshot({ path: outputPath, fullPage: true });
}

export async function takeSectionScreenshot(page: Page, name: string, selector?: string): Promise<void> {
  const outputPath = `demo/demo-output/${name}.png`;
  if (selector) {
    const el = page.locator(selector);
    await el.screenshot({ path: outputPath });
  } else {
    await page.screenshot({ path: outputPath, fullPage: true });
  }
}

export async function waitForImages(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const images = document.querySelectorAll('img');
    return Array.from(images).every(img => img.complete && img.naturalHeight > 0);
  }, { timeout: 15000 });
}

export async function expectNoConsoleErrors(page: Page): Promise<void> {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  await page.waitForTimeout(2000);
  if (errors.length > 0) {
    console.warn('Console errors detected:', errors);
  }
}

export async function getSectionHeight(page: Page, sectionId: string): Promise<number> {
  return page.evaluate((id) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().height : 0;
  }, sectionId);
}

export async function scrollBy(page: Page, pixels: number): Promise<void> {
  await page.mouse.wheel(0, pixels);
  await page.waitForTimeout(800);
}

export async function moveCursorTo(page: Page, x: number, y: number): Promise<void> {
  await page.mouse.move(x, y);
  await page.waitForTimeout(200);
}

export async function delay(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export function getSectionLocator(page: Page, sectionId: string): Locator {
  return page.locator(`#${sectionId}`);
}

export async function ensureNavVisible(page: Page): Promise<void> {
  const nav = page.locator('[data-purpose="primary-navigation"]');
  await nav.waitFor({ state: 'visible' });
}

export async function getViewportDimensions(page: Page): Promise<{ width: number; height: number }> {
  const size = page.viewportSize();
  return { width: size?.width || 1440, height: size?.height || 900 };
}
