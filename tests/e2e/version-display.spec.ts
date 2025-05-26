import { test, expect } from '@playwright/test';

test.describe('Version Display', () => {
  test('should display version in footer on home page', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const versionText = footer.locator('p');
    await expect(versionText).toBeVisible();
    await expect(versionText).toContainText('©');
    await expect(versionText).toContainText('Hamdan Radaideh');
    await expect(versionText).toContainText('v');

    // In test environment, should show 'dev' as fallback
    await expect(versionText).toContainText('dev');
  });

  test('should display version in footer on blog page', async ({ page }) => {
    await page.goto('/blog');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const versionText = footer.locator('p');
    await expect(versionText).toContainText('v');
    await expect(versionText).toContainText('dev');
  });

  test('should display version consistently across pages', async ({ page }) => {
    // Test home page
    await page.goto('/');
    const homeFooter = page.locator('footer p');
    const homeVersionText = await homeFooter.textContent();

    // Test blog page
    await page.goto('/blog');
    const blogFooter = page.locator('footer p');
    const blogVersionText = await blogFooter.textContent();

    // Version should be consistent
    expect(homeVersionText).toContain('v');
    expect(blogVersionText).toContain('v');

    // Extract version part for comparison
    const homeVersion = homeVersionText?.match(/v([^|\s]+)/)?.[1];
    const blogVersion = blogVersionText?.match(/v([^|\s]+)/)?.[1];

    expect(homeVersion).toBe(blogVersion);
  });

  test('should handle version display on different screen sizes', async ({ page }) => {
    const screenSizes = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 }, // Tablet
      { width: 375, height: 667 }, // Mobile
    ];

    for (const size of screenSizes) {
      await page.setViewportSize(size);
      await page.goto('/');

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const versionText = footer.locator('p');
      await expect(versionText).toBeVisible();
      await expect(versionText).toContainText('v');

      // Check that version text doesn't overflow
      const textBox = await versionText.boundingBox();
      expect(textBox?.width).toBeLessThanOrEqual(size.width);
    }
  });

  test('should display version with proper formatting', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer p');
    const footerText = await footer.textContent();

    // Check format: "© YEAR Hamdan Radaideh. All rights reserved. | vVERSION"
    expect(footerText).toMatch(/© \d{4} Hamdan Radaideh\. All rights reserved\. \| v.+/);

    // Check that version comes after the pipe
    const parts = footerText?.split('|');
    expect(parts).toHaveLength(2);
    expect(parts?.[1]?.trim()).toMatch(/^v.+/);
  });

  test('should display current year in copyright', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer p');
    const footerText = await footer.textContent();

    const currentYear = new Date().getFullYear();
    expect(footerText).toContain(`© ${currentYear}`);
  });

  test('should have accessible version information', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check that footer has proper semantic structure
    const footerParagraph = footer.locator('p');
    await expect(footerParagraph).toBeVisible();

    // Check that version is part of the main footer text (not hidden)
    const versionText = await footerParagraph.textContent();
    expect(versionText).toContain('v');

    // Ensure it's not using display: none or visibility: hidden
    const isVisible = await footerParagraph.isVisible();
    expect(isVisible).toBe(true);
  });

  test('should maintain version display during theme changes', async ({ page }) => {
    await page.goto('/');

    // Check version in light theme
    const footer = page.locator('footer p');
    await expect(footer).toContainText('v');

    // Toggle to dark theme if theme toggle exists
    const themeToggle = page.locator('.theme-toggle');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Wait for theme change
      await page.waitForTimeout(500);

      // Check version is still visible in dark theme
      await expect(footer).toContainText('v');
      await expect(footer).toBeVisible();
    }
  });
});
