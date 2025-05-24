# Test info

- Name: Accessibility >> should have proper heading structure
- Location: /Users/hamdanradaideh/pale-parsec/tests/e2e/basic.spec.ts:78:3

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('h1') resolved to 5 elements:
    1) <h1 data-astro-cid-j7pv25f6="">DevOps & Infrastructure Engineering</h1> aka getByRole('heading', { name: 'DevOps & Infrastructure' })
    2) <h1>…</h1> aka getByText('No islands detected.')
    3) <h1>Audit</h1> aka locator('#header-left').getByText('Audit')
    4) <h1>No accessibility or performance issues detected.</h1> aka getByText('No accessibility or')
    5) <h1>…</h1> aka locator('h1').filter({ hasText: 'Settings' })

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('h1')

    at /Users/hamdanradaideh/pale-parsec/tests/e2e/basic.spec.ts:82:38
```

# Page snapshot

```yaml
- navigation:
  - heading "Hamdan Radaideh" [level=2]:
    - link "Hamdan Radaideh":
      - /url: /
  - link "Home":
    - /url: /
  - link "Blog":
    - /url: /blog
  - link "About":
    - /url: /about
  - link "GitHub":
    - /url: https://github.com/halradaideh
  - link "LinkedIn":
    - /url: https://www.linkedin.com/in/hamdan-a-radaideh/
  - button "Toggle theme"
- main:
  - heading "DevOps & Infrastructure Engineering" [level=1]
  - paragraph: Exploring cloud-native technologies, infrastructure automation, and site reliability engineering best practices
  - link "Read Blog":
    - /url: /blog
  - link "About Me":
    - /url: /about
  - heading "Areas of Expertise" [level=2]
  - heading "Kubernetes & Containers" [level=3]
  - paragraph: Orchestration, deployment strategies, and cluster management
  - heading "Infrastructure as Code" [level=3]
  - paragraph: Automation, configuration management, and cloud architecture
  - heading "CI/CD & DevOps" [level=3]
  - paragraph: Pipeline design, automation, and deployment strategies
  - heading "Site Reliability" [level=3]
  - paragraph: Monitoring, observability, and system optimization
  - heading "Latest Articles" [level=2]
  - article:
    - 'link "Building a Modern Tech Blog with AI: A Journey with Cursor and Claude Mar 23, 2024 An in-depth exploration of creating a full-featured tech blog using Astro, React, and modern DevOps practices, all with AI assistance"':
      - /url: /blog/building-modern-blog-with-ai/
      - 'heading "Building a Modern Tech Blog with AI: A Journey with Cursor and Claude" [level=3]'
      - paragraph: Mar 23, 2024
      - paragraph: An in-depth exploration of creating a full-featured tech blog using Astro, React, and modern DevOps practices, all with AI assistance
  - link "View All Posts":
    - /url: /blog
- contentinfo:
  - paragraph: © 2025 Hamdan Radaideh. All rights reserved.
  - link "GitHub":
    - /url: https://github.com/halradaideh
  - link "LinkedIn":
    - /url: https://www.linkedin.com/in/hamdan-a-radaideh/
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
   10 |     await expect(page.locator('nav a[href="/"]')).toBeVisible(); // Home link
   11 |     await expect(page.locator('nav a[href="/blog"]')).toBeVisible(); // Blog link in nav
   12 |     await expect(page.locator('nav a[href="/about"]')).toBeVisible(); // About link in nav
   13 |   });
   14 |
   15 |   test('should display blog posts', async ({ page }) => {
   16 |     await page.goto('/blog');
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
   29 |     await expect(page.getByText('Hamdan Radaideh')).toBeVisible();
   30 |   });
   31 |
   32 |   test('should have responsive design', async ({ page }) => {
   33 |     // Test mobile viewport
   34 |     await page.setViewportSize({ width: 375, height: 667 });
   35 |     await page.goto('/');
   36 |
   37 |     // Navigation should be responsive
   38 |     await expect(page.locator('nav')).toBeVisible();
   39 |
   40 |     // Test desktop viewport
   41 |     await page.setViewportSize({ width: 1200, height: 800 });
   42 |     await page.goto('/');
   43 |     await expect(page.locator('nav')).toBeVisible();
   44 |   });
   45 | });
   46 |
   47 | test.describe('Blog Post', () => {
   48 |   test('should display visit counter', async ({ page }) => {
   49 |     await page.goto('/blog');
   50 |
   51 |     // Click on first blog post
   52 |     const firstPost = page.locator('article a').first();
   53 |     await firstPost.click();
   54 |
   55 |     // Look for FloatingStats component which contains the visit counter
   56 |     const floatingStats = page.locator('.floatingStats, [class*="floatingStats"]');
   57 |     await expect(floatingStats).toBeVisible({ timeout: 10000 });
   58 |     
   59 |     // Also check for the views icon specifically
   60 |     const viewsIcon = page.locator('[aria-label="views"]');
   61 |     await expect(viewsIcon).toBeVisible({ timeout: 10000 });
   62 |   });
   63 |
   64 |   test('should load comments section', async ({ page }) => {
   65 |     await page.goto('/blog');
   66 |
   67 |     // Click on first blog post
   68 |     const firstPost = page.locator('article a').first();
   69 |     await firstPost.click();
   70 |
   71 |     // Should have comments section (Giscus) - check for either the container or iframe
   72 |     const commentsSection = page.locator('.giscus, [data-giscus], iframe[src*="giscus"]');
   73 |     await expect(commentsSection.first()).toBeVisible({ timeout: 15000 });
   74 |   });
   75 | });
   76 |
   77 | test.describe('Accessibility', () => {
   78 |   test('should have proper heading structure', async ({ page }) => {
   79 |     await page.goto('/');
   80 |
   81 |     // Should have h1 tag
>  82 |     await expect(page.locator('h1')).toBeVisible();
      |                                      ^ Error: expect.toBeVisible: Error: strict mode violation: locator('h1') resolved to 5 elements:
   83 |
   84 |     // Check heading hierarchy
   85 |     const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
   86 |     expect(headings.length).toBeGreaterThan(0);
   87 |   });
   88 |
   89 |   test('should have alt text for images', async ({ page }) => {
   90 |     await page.goto('/');
   91 |
   92 |     const images = await page.locator('img').all();
   93 |     
   94 |     // Skip if no images found
   95 |     if (images.length === 0) {
   96 |       console.log('No images found on homepage');
   97 |       return;
   98 |     }
   99 |
  100 |     for (const img of images) {
  101 |       const alt = await img.getAttribute('alt');
  102 |       const src = await img.getAttribute('src');
  103 |       
  104 |       // Allow empty alt for decorative images or provide meaningful message
  105 |       if (!alt || alt.trim() === '') {
  106 |         console.log(`Image without alt text: ${src}`);
  107 |         // Don't fail for decorative images, just log
  108 |       }
  109 |     }
  110 |   });
  111 | });
  112 |
  113 | test.describe('Performance', () => {
  114 |   test('should load quickly', async ({ page }) => {
  115 |     const startTime = Date.now();
  116 |     await page.goto('/');
  117 |     const loadTime = Date.now() - startTime;
  118 |
  119 |     // Should load within 5 seconds (more reasonable for real testing)
  120 |     expect(loadTime).toBeLessThan(5000);
  121 |   });
  122 |
  123 |   test('should have no console errors', async ({ page }) => {
  124 |     const errors: string[] = [];
  125 |     page.on('console', (msg) => {
  126 |       if (msg.type() === 'error') {
  127 |         errors.push(msg.text());
  128 |       }
  129 |     });
  130 |
  131 |     await page.goto('/');
  132 |     await page.waitForLoadState('networkidle');
  133 |
  134 |     // Filter out known external service errors
  135 |     const relevantErrors = errors.filter(
  136 |       (error) =>
  137 |         !error.includes('giscus') &&
  138 |         !error.includes('cloudflare') &&
  139 |         !error.toLowerCase().includes('third-party') &&
  140 |         !error.includes('favicon')
  141 |     );
  142 |
  143 |     expect(relevantErrors).toHaveLength(0);
  144 |   });
  145 | });
  146 |
```