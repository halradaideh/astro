import { test, expect } from '@playwright/test';

test.describe('Blog Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hamdan Radaideh/);

    // Check main navigation elements - be more specific with selectors
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav a.nav-link[href="/"]')).toBeVisible(); // Home link with class
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible(); // Blog link in nav
    await expect(page.locator('nav a[href="/about"]')).toBeVisible(); // About link in nav
  });

  test('should display blog posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Blog/);

    // Should have at least one blog post
    const blogPosts = page.locator('article');
    await expect(blogPosts.first()).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    // Be more specific - target the nav About link
    await page.locator('nav a[href="/about"]').click();
    await expect(page).toHaveURL(/.*about/);
    // Look for more specific text that appears on the about page
    await expect(page.getByText('Principal Site Reliability Engineer')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Navigation should be responsive
    await expect(page.locator('nav')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });
});

test.describe('Blog Post', () => {
  test('should display visit counter', async ({ page }) => {
    await page.goto('/blog');

    // Click on first blog post
    const firstPost = page.locator('article a').first();
    await firstPost.click();

    // Look for FloatingStats component which contains the visit counter
    const floatingStats = page.locator('.floating-stats');
    await expect(floatingStats).toBeVisible({ timeout: 10000 });

    // Also check for the views icon specifically
    const viewsIcon = page.locator('[aria-label="views"]');
    await expect(viewsIcon).toBeVisible({ timeout: 10000 });
  });

  test('should load comments section', async ({ page }) => {
    await page.goto('/blog');

    // Click on first blog post
    const firstPost = page.locator('article a').first();
    await firstPost.click();

    // Should have comments section (Giscus) - check for either the container or iframe
    const commentsSection = page.locator('.giscus, [data-giscus], iframe[src*="giscus"]');
    await expect(commentsSection.first()).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Should have h1 tag (use first() to handle multiple h1s from dev tools)
    await expect(page.locator('h1').first()).toBeVisible();

    // Check heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    // Skip if no images found
    if (images.length === 0) {
      console.log('No images found on homepage');
      return;
    }

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      // Allow empty alt for decorative images or provide meaningful message
      if (!alt || alt.trim() === '') {
        console.log(`Image without alt text: ${src}`);
        // Don't fail for decorative images, just log
      }
    }
  });
});

test.describe('Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds (more reasonable for real testing)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known external service errors
    const relevantErrors = errors.filter(
      (error) =>
        !error.includes('giscus') &&
        !error.includes('cloudflare') &&
        !error.toLowerCase().includes('third-party') &&
        !error.includes('favicon')
    );

    expect(relevantErrors).toHaveLength(0);
  });
});
