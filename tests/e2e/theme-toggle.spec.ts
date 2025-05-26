import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should display theme toggle slider with day/night icons', async ({ page }) => {
    await page.goto('/');

    // Check that theme toggle button exists
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();

    // Check that toggle track exists
    const toggleTrack = page.locator('.toggle-track');
    await expect(toggleTrack).toBeVisible();

    // Check that toggle thumb exists
    const toggleThumb = page.locator('.toggle-thumb');
    await expect(toggleThumb).toBeVisible();

    // Check that both sun and moon icons exist
    const sunIcon = page.locator('.sun-icon');
    const moonIcon = page.locator('.moon-icon');
    await expect(sunIcon).toBeVisible();
    await expect(moonIcon).toBeVisible();
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');

    // Get initial theme
    const initialTheme = await page.getAttribute('html', 'data-theme');

    // Click theme toggle
    await page.click('#theme-toggle');

    // Wait for theme change
    await page.waitForTimeout(500);

    // Check that theme has changed
    const newTheme = await page.getAttribute('html', 'data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Click again to toggle back
    await page.click('#theme-toggle');
    await page.waitForTimeout(500);

    // Should be back to original theme
    const finalTheme = await page.getAttribute('html', 'data-theme');
    expect(finalTheme).toBe(initialTheme);
  });

  test('should show day/night icons in toggle', async ({ page }) => {
    await page.goto('/');

    // Both icons should be present in the DOM
    const sunIcon = page.locator('.sun-icon');
    const moonIcon = page.locator('.moon-icon');

    await expect(sunIcon).toBeVisible();
    await expect(moonIcon).toBeVisible();

    // Toggle should work and change theme
    const initialTheme = await page.getAttribute('html', 'data-theme');
    await page.click('#theme-toggle');
    await page.waitForTimeout(500);

    const newTheme = await page.getAttribute('html', 'data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Focus the theme toggle directly
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.focus();
    await expect(themeToggle).toBeFocused();

    // Should be able to activate with Enter or Space
    const initialTheme = await page.getAttribute('html', 'data-theme');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    const newTheme = await page.getAttribute('html', 'data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Test with Space key as well
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);

    const finalTheme = await page.getAttribute('html', 'data-theme');
    expect(finalTheme).toBe(initialTheme); // Should toggle back
  });
});
