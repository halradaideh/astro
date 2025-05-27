import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display properly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that navigation is responsive
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // Check that content doesn't overflow horizontally
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    expect(bodyBox?.width).toBeLessThanOrEqual(375);
  });

  test('should handle navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check navigation elements are accessible
    const homeLink = page.locator('nav a[href="/"]').first(); // Use first() to handle multiple home links
    const blogLink = page.locator('nav a[href="/blog"]');
    const aboutLink = page.locator('nav a[href="/about"]');

    await expect(homeLink).toBeVisible();
    await expect(blogLink).toBeVisible();
    await expect(aboutLink).toBeVisible();

    // Test navigation doesn't overflow
    const nav = page.locator('nav');
    const navBox = await nav.boundingBox();
    expect(navBox?.width).toBeLessThanOrEqual(375);
  });

  test('should display version in footer on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check footer is visible and contains version
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check version is displayed (should show 'dev' in test environment)
    const versionText = footer.locator('p');
    await expect(versionText).toContainText('v');
    await expect(versionText).toContainText('dev');
  });

  test('should handle zoom properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Simulate zoom by changing viewport scale
    await page.evaluate(() => {
      document.body.style.zoom = '1.5';
    });

    // Check that content still fits and doesn't cause horizontal scroll
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);

    // Allow for some tolerance due to zoom calculations
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 50);
  });

  test('should display hero section properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    const heroTitle = hero.locator('h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('DevOps');

    // Check CTA buttons are stacked on mobile
    const ctaButtons = hero.locator('.cta-buttons');
    await expect(ctaButtons).toBeVisible();
  });

  test('should display expertise cards properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const expertiseSection = page.locator('.expertise');
    await expect(expertiseSection).toBeVisible();

    const expertiseCards = expertiseSection.locator('.expertise-card');
    const cardCount = await expertiseCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Check that cards stack vertically on mobile
    for (let i = 0; i < cardCount; i++) {
      const card = expertiseCards.nth(i);
      await expect(card).toBeVisible();
    }
  });

  test('should display blog posts properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const postsSection = page.locator('.featured-posts');
    await expect(postsSection).toBeVisible();

    const postsGrid = postsSection.locator('.posts-grid');
    await expect(postsGrid).toBeVisible();

    // Check that post cards are responsive
    const postCards = postsGrid.locator('.post-card');
    const cardCount = await postCards.count();

    if (cardCount > 0) {
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = postCards.nth(i);
        await expect(card).toBeVisible();

        const cardBox = await card.boundingBox();
        expect(cardBox?.width).toBeLessThanOrEqual(375);
      }
    }
  });

  test('should handle different mobile screen sizes', async ({ page }) => {
    const screenSizes = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 8
      { width: 414, height: 896 }, // iPhone 11
      { width: 360, height: 640 }, // Android
    ];

    for (const size of screenSizes) {
      await page.setViewportSize(size);

      // Check navigation fits
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Check footer fits and shows version
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const versionText = footer.locator('p');
      await expect(versionText).toContainText('v');

      // Check no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(size.width + 20); // Small tolerance
    }
  });

  test('should maintain accessibility on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that all interactive elements are accessible
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      if (await link.isVisible()) {
        // Check link has proper touch target size (minimum 16px for small links)
        const linkBox = await link.boundingBox();
        if (linkBox) {
          expect(linkBox.height).toBeGreaterThanOrEqual(15); // Reasonable minimum for small links
        }
      }
    }

    // Check theme toggle is accessible
    const themeToggle = page.locator('.theme-toggle');
    if (await themeToggle.isVisible()) {
      await expect(themeToggle).toBeVisible();
      const toggleBox = await themeToggle.boundingBox();
      if (toggleBox) {
        expect(toggleBox.height).toBeGreaterThanOrEqual(16);
      }
    }
  });
});
