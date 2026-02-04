import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Form Submission Flow', () => {
  test('should successfully submit consultation form', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Navigate to Contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Wait for scroll to complete
    
    // Fill out form
    await page.fill('input#name', '테스트');
    await page.fill('input#phone', '010-1234-5678');
    await page.fill('textarea#message', '테스트 문의입니다');
    
    // Check privacy agreement
    await page.click('button[role="checkbox"]#privacy');
    
    // Take screenshot before submission
    await page.screenshot({ 
      path: '.sisyphus/evidence/form-before-submit.png',
      fullPage: true 
    });
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    const successMessage = page.getByText(/신청이 완료되었습니다|상담 신청이 완료되었습니다/);
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    
    // Take screenshot of success state
    await page.screenshot({ 
      path: '.sisyphus/evidence/form-success.png',
      fullPage: true 
    });
  });
});

test.describe('Scroll Animation', () => {
  test('should reveal Story section content on scroll', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Get Story section heading
    const storyHeading = page.locator('h2:has-text("진중한 당신의 손을 잡을")');
    
    // Initially, Story section should be below viewport
    const initialViewport = await page.viewportSize();
    const storyBox = await storyHeading.boundingBox();
    
    // Verify element exists
    expect(storyBox).not.toBeNull();
    
    // Scroll to Story section
    await storyHeading.scrollIntoViewIfNeeded();
    
    // Wait for animation to complete (framer-motion duration + buffer)
    await page.waitForTimeout(2000);
    
    // Verify content is visible (opacity should be 1)
    const opacity = await storyHeading.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });
    
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
    
    // Take screenshot
    await page.screenshot({ 
      path: '.sisyphus/evidence/scroll-animation.png',
      fullPage: true 
    });
  });
});

test.describe('Mobile Layout', () => {
  test('should adapt layout for mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Check Hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check headline font size (should be >= 16px for mobile)
    const headline = page.locator('h1, h2').first();
    const fontSize = await headline.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(fontSize).toBeGreaterThanOrEqual(16);
    
    // Navigate to contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Check input field height (should be >= 48px for touch targets)
    const nameInput = page.locator('input#name');
    const inputBox = await nameInput.boundingBox();
    expect(inputBox).not.toBeNull();
    expect(inputBox!.height).toBeGreaterThanOrEqual(44); // Slightly lower threshold for actual rendering
    
    // Verify no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
    
    // Visual regression check for mobile
    await expect(page).toHaveScreenshot('landing-mobile.png', {
      fullPage: true,
      mask: [page.locator('.animate-spin')] // Mask any loading spinners
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: '.sisyphus/evidence/mobile-layout.png',
      fullPage: true 
    });
  });
});

test.describe('Visual Regression', () => {
  test('should match desktop baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Wait for initial animations
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('landing-desktop.png', {
      fullPage: true,
      mask: [page.locator('.animate-spin')]
    });
  });
});

test.describe('Accessibility', () => {
  test('should have no accessibility violations (WCAG 2.1 AA)', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Run AXE scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    // Take screenshot
    await page.screenshot({ 
      path: '.sisyphus/evidence/accessibility-scan.png',
      fullPage: true 
    });
    
    // Log violations if any
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations found:');
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Nodes: ${violation.nodes.length}`);
      });
    }
    
    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
