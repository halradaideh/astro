# Test info

- Name: Blog Homepage >> should display blog posts
- Location: /Users/hamdanradaideh/sourcegit/astro/tests/e2e/basic.spec.ts:15:3

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/blog", waiting until "load"

    at /Users/hamdanradaideh/sourcegit/astro/tests/e2e/basic.spec.ts:16:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Blog Homepage', () => {
   4 |   test('should load homepage successfully', async ({ page }) => {
   5 |     await page.goto('/');
   6 |     await expect(page).toHaveTitle(/Hamdan Radaideh/);
   7 |
   8 |     // Check main navigation elements - be more specific with selectors
   9 |     await expect(page.locator('nav')).toBeVisible();
   10 |     await expect(page.locator('nav a.nav-link[href="/"]')).toBeVisible(); // Home link with class
   11 |     await expect(page.locator('nav a[href="/blog"]')).toBeVisible(); // Blog link in nav
   12 |     await expect(page.locator('nav a[href="/about"]')).toBeVisible(); // About link in nav
   13 |   });
   14 |
   15 |   test('should display blog posts', async ({ page }) => {
>  16 |     await page.goto('/blog');
      |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
   17 |     await expect(page).toHaveTitle(/Blog/);
   18 |
   19 |     // Should have at least one blog post
   20 |     const blogPosts = page.locator('article');
   21 |     await expect(blogPosts.first()).toBeVisible();
   22 |   });
   23 |
   24 |   test('should navigate to about page', async ({ page }) => {
   25 |     await page.goto('/');
   26 |     // Be more specific - target the nav About link
   27 |     await page.locator('nav a[href="/about"]').click();
   28 |     await expect(page).toHaveURL(/.*about/);
   29 |     // Look for more specific text that appears on the about page
   30 |     await expect(page.getByText('Principal Site Reliability Engineer')).toBeVisible();
   31 |   });
   32 |
   33 |   test('should have responsive design', async ({ page }) => {
   34 |     // Test mobile viewport
   35 |     await page.setViewportSize({ width: 375, height: 667 });
   36 |     await page.goto('/');
   37 |
   38 |     // Navigation should be responsive
   39 |     await expect(page.locator('nav')).toBeVisible();
   40 |
   41 |     // Test desktop viewport
   42 |     await page.setViewportSize({ width: 1200, height: 800 });
   43 |     await page.goto('/');
   44 |     await expect(page.locator('nav')).toBeVisible();
   45 |   });
   46 | });
   47 |
   48 | test.describe('Blog Post', () => {
   49 |   test('should display visit counter', async ({ page }) => {
   50 |     await page.goto('/blog');
   51 |
   52 |     // Click on first blog post
   53 |     const firstPost = page.locator('article a').first();
   54 |     await firstPost.click();
   55 |
   56 |     // Look for FloatingStats component which contains the visit counter
   57 |     const floatingStats = page.locator('.floatingStats, [class*="floatingStats"]');
   58 |     await expect(floatingStats).toBeVisible({ timeout: 10000 });
   59 |
   60 |     // Also check for the views icon specifically
   61 |     const viewsIcon = page.locator('[aria-label="views"]');
   62 |     await expect(viewsIcon).toBeVisible({ timeout: 10000 });
   63 |   });
   64 |
   65 |   test('should load comments section', async ({ page }) => {
   66 |     await page.goto('/blog');
   67 |
   68 |     // Click on first blog post
   69 |     const firstPost = page.locator('article a').first();
   70 |     await firstPost.click();
   71 |
   72 |     // Should have comments section (Giscus) - check for either the container or iframe
   73 |     const commentsSection = page.locator('.giscus, [data-giscus], iframe[src*="giscus"]');
   74 |     await expect(commentsSection.first()).toBeVisible({ timeout: 15000 });
   75 |   });
   76 | });
   77 |
   78 | test.describe('Accessibility', () => {
   79 |   test('should have proper heading structure', async ({ page }) => {
   80 |     await page.goto('/');
   81 |
   82 |     // Should have h1 tag
   83 |     await expect(page.locator('h1')).toBeVisible();
   84 |
   85 |     // Check heading hierarchy
   86 |     const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
   87 |     expect(headings.length).toBeGreaterThan(0);
   88 |   });
   89 |
   90 |   test('should have alt text for images', async ({ page }) => {
   91 |     await page.goto('/');
   92 |
   93 |     const images = await page.locator('img').all();
   94 |
   95 |     // Skip if no images found
   96 |     if (images.length === 0) {
   97 |       console.log('No images found on homepage');
   98 |       return;
   99 |     }
  100 |
  101 |     for (const img of images) {
  102 |       const alt = await img.getAttribute('alt');
  103 |       const src = await img.getAttribute('src');
  104 |
  105 |       // Allow empty alt for decorative images or provide meaningful message
  106 |       if (!alt || alt.trim() === '') {
  107 |         console.log(`Image without alt text: ${src}`);
  108 |         // Don't fail for decorative images, just log
  109 |       }
  110 |     }
  111 |   });
  112 | });
  113 |
  114 | test.describe('Performance', () => {
  115 |   test('should load quickly', async ({ page }) => {
  116 |     const startTime = Date.now();
```