import { test, expect } from '@playwright/test';

test.describe('Comments', () => {
  test('should not display comments on about page', async ({ page }) => {
    await page.goto('/about');

    // Comments section should not exist on about page
    const commentsContainer = page.locator('.comments-container');
    await expect(commentsContainer).not.toBeVisible();

    // Giscus should not be loaded
    const giscusFrame = page.locator('iframe.giscus-frame');
    await expect(giscusFrame).not.toBeVisible();
  });

  test('should display comments on blog post', async ({ page }) => {
    await page.goto('/blog/blog-site-with-ai/');

    // Comments section should exist on blog post
    const commentsContainer = page.locator('.comments-container');
    await expect(commentsContainer).toBeVisible();

    // Comments heading should be visible
    const commentsHeading = page.locator('.comments-container h2');
    await expect(commentsHeading).toBeVisible();
    await expect(commentsHeading).toHaveText('Comments');

    // Wait for Giscus to load (it may take a moment)
    await page.waitForTimeout(2000);
  });

  test('should handle theme switching for comments', async ({ page }) => {
    await page.goto('/blog/blog-site-with-ai/');

    // Wait for comments to load
    await page.waitForTimeout(2000);

    // Get initial theme
    const initialTheme = await page.getAttribute('html', 'data-theme');

    // Toggle theme
    await page.click('#theme-toggle');
    await page.waitForTimeout(1000);

    // Verify theme changed
    const newTheme = await page.getAttribute('html', 'data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Comments container should still be visible
    const commentsContainer = page.locator('.comments-container');
    await expect(commentsContainer).toBeVisible();
  });

  test('should have proper styling for comments container', async ({ page }) => {
    await page.goto('/blog/blog-site-with-ai/');

    const commentsContainer = page.locator('.comments-container');
    await expect(commentsContainer).toBeVisible();

    // Check that container has proper width constraints
    const containerBox = await commentsContainer.boundingBox();
    expect(containerBox).toBeTruthy();

    if (containerBox) {
      // Container should not be too narrow (indicating shrinking issue is fixed)
      expect(containerBox.width).toBeGreaterThan(200);
    }
  });
});
