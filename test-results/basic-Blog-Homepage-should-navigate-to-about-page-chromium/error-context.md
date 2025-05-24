# Test info

- Name: Blog Homepage >> should navigate to about page
- Location: /Users/hamdanradaideh/pale-parsec/tests/e2e/basic.spec.ts:24:3

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: getByText('Hamdan Radaideh') resolved to 2 elements:
    1) <a href="/" data-astro-cid-pux6a34n="" data-astro-source-loc="9:23" data-astro-source-file="/Users/hamdanradaideh/pale-parsec/src/components/Navigation.astro">Hamdan Radaideh</a> aka getByRole('link', { name: 'Hamdan Radaideh' })
    2) <p data-astro-cid-kh7btl4r="" data-astro-source-loc="23:6" data-astro-source-file="/Users/hamdanradaideh/pale-parsec/src/pages/about.astro">↵Hello! I'm Hamdan Radaideh, a Principal Site Rel…</p> aka getByText('Hello! I\'m Hamdan Radaideh, a')

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText('Hamdan Radaideh')

    at /Users/hamdanradaideh/pale-parsec/tests/e2e/basic.spec.ts:29:53
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
  - article:
    - time: Mar 25, 2024
    - heading "About Me" [level=1]
    - separator
    - img "Hamdan Radaideh"
    - text: 🤖
    - paragraph: This page was crafted with the assistance of Claude AI, helping to create an engaging and informative experience while maintaining technical accuracy.
    - paragraph: Hello! I'm Hamdan Radaideh, a Principal Site Reliability Engineer and Team Lead at Atypon, a Wiley Brand. With a strong background in DevOps practices and system architecture, I specialize in building and maintaining robust, scalable infrastructure solutions.
    - heading "Professional Experience" [level=2]
    - paragraph: "In my role at Atypon, I lead initiatives to improve system reliability, implement automation solutions, and optimize infrastructure performance. I have extensive experience with:"
    - list:
      - listitem: → Kubernetes orchestration and cluster management
      - listitem: → Cloud infrastructure (AWS, GCP)
      - listitem: → CI/CD pipeline design and implementation
      - listitem: → Infrastructure as Code (Terraform, Ansible)
      - listitem: → Monitoring and observability solutions
      - listitem: → Security best practices and compliance
    - heading "Technical Skills" [level=2]
    - list:
      - listitem: "→ Container Orchestration: Kubernetes, Docker"
      - listitem: "→ Cloud Platforms: AWS, GCP"
      - listitem: "→ Infrastructure as Code: Terraform, Ansible"
      - listitem: "→ CI/CD: Jenkins, GitHub Actions"
      - listitem: "→ Monitoring: Prometheus, Grafana"
      - listitem: "→ Programming: Python, Bash, Go"
    - heading "Certifications" [level=2]
    - list:
      - listitem: → Certified Kubernetes Administrator (CKA)
      - listitem: → AWS Certified Solutions Architect
      - listitem: "→ HashiCorp Certified: Terraform Associate"
    - heading "Philosophy" [level=2]
    - paragraph: "I believe in the power of continuous learning and sharing knowledge. As I often say, \"everything is doable in IT.\" This mindset drives me to tackle complex challenges and find innovative solutions. I'm particularly interested in:"
    - list:
      - listitem: → Building resilient distributed systems
      - listitem: → Implementing DevOps best practices
      - listitem: → Automating repetitive tasks
      - listitem: → Improving system reliability and performance
    - heading "Connect With Me" [level=2]
    - paragraph:
      - text: You can find me on
      - link "GitHub":
        - /url: https://github.com/halradaideh
      - text: and
      - link "LinkedIn":
        - /url: https://www.linkedin.com/in/hamdan-a-radaideh/
      - text: . I'm always interested in discussing technology, sharing experiences, and collaborating on interesting projects.
    - heading "Comments" [level=2]
- contentinfo:
  - text: © 2025 Your name here. All rights reserved.
  - link "Follow Astro on Mastodon":
    - /url: https://m.webtoo.ls/@astro
  - link "Follow Astro on Twitter":
    - /url: https://twitter.com/astrodotbuild
  - link "Go to Astro's GitHub repo":
    - /url: https://github.com/withastro/astro
  - link "Go to Hamdan's GitHub repo":
    - /url: https://github.com/halradaideh
  - link "Follow Hamdan on Twitter":
    - /url: https://twitter.com/halradaideh
  - link "Connect with Hamdan on LinkedIn":
    - /url: https://www.linkedin.com/in/halradaideh
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
>  29 |     await expect(page.getByText('Hamdan Radaideh')).toBeVisible();
      |                                                     ^ Error: expect.toBeVisible: Error: strict mode violation: getByText('Hamdan Radaideh') resolved to 2 elements:
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
   82 |     await expect(page.locator('h1')).toBeVisible();
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
```