import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    // Ana sayfa
    await page.goto('/');
    await expect(page).toHaveTitle(/Ahmet Arif/);

    // Blog sayfası
    await page.click('a[href="/blog"]');
    await expect(page).toHaveURL(/.*blog/);
    await expect(page.locator('h1')).toContainText(/Blog/);

    // Hakkımda sayfası
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText(/Hakkımda/);

    // İletişim sayfası
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toContainText(/İletişim/);
  });

  test('should switch languages', async ({ page }) => {
    await page.goto('/');
    
    // Türkçe'den İngilizce'ye geçiş
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=English');
    await expect(page).toHaveURL(/.*en/);
    
    // İngilizce'den Türkçe'ye geçiş
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=Türkçe');
    await expect(page).toHaveURL(/^\//);
  });

  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.locator('h1')).toContainText(/404/);
    await expect(page).toHaveURL(/.*non-existent-page/);
  });
}); 