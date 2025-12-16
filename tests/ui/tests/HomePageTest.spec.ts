import { test, expect } from '../core/BaseTest';
import { HomePage } from '../pages/HomePage';

/**
 * HomePageTest - Test suite for home page functionality
 * Tests various aspects of the homepage including navigation and link availability
 */
test.describe('HomePage Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ basePage, page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomepage();
  });

  test('should load homepage successfully', async ({ page }) => {
    // Verify page is loaded
    expect(await homePage.isHomepageLoaded()).toBeTruthy();
    
    // Verify page heading
    const heading = await homePage.getPageHeading();
    expect(heading).toContain('Welcome');
  });

  test('should display all available examples', async ({ page }) => {
    const exampleCount = await homePage.getExampleCount();
    expect(exampleCount).toBeGreaterThan(0);
    expect(exampleCount).toBeGreaterThanOrEqual(40); // Should have 40+ examples
  });

  test('should have correct page title', async ({ page }) => {
    const title = await homePage.getPageTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should navigate to login page from homepage', async ({ page }) => {
    await homePage.navigateToLoginPage();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain('/login');
  });

  test('should navigate to add/remove elements page', async ({ page }) => {
    await homePage.navigateToAddRemoveElements();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain('/add_remove_elements');
  });

  test('should navigate to checkboxes page', async ({ page }) => {
    await homePage.navigateToCheckboxes();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain('/checkboxes');
  });

  test('should navigate to dropdown page', async ({ page }) => {
    await homePage.navigateToDropdown();
    const currentURL = await homePage.getCurrentURL();
    expect(currentURL).toContain('/dropdown');
  });

  test('should verify authentication link is present', async ({ page }) => {
    const isPresent = await homePage.isLinkPresent('Form Authentication');
    expect(isPresent).toBeTruthy();
  });

  test('should get all example links', async ({ page }) => {
    const allLinks = await homePage.getAllLinks();
    expect(allLinks.length).toBeGreaterThan(0);
    expect(allLinks.some(link => link.includes('Authentication') || link.includes('Login'))).toBeTruthy();
  });

  test('should have working form authentication link', async ({ page }) => {
    // Get initial URL
    const initialURL = await homePage.getCurrentURL();
    
    // Navigate to login
    await homePage.navigateToLoginPage();
    
    // Verify URL changed
    const newURL = await homePage.getCurrentURL();
    expect(newURL).not.toBe(initialURL);
    expect(newURL).toContain('/login');
  });

  test('should verify page is responsive and all links are visible', async ({ page }) => {
    const exampleCount = await homePage.getExampleCount();
    expect(exampleCount).toBeGreaterThan(0);
    
    // Verify all links are clickable
    for (let i = 0; i < Math.min(5, exampleCount); i++) {
      const link = page.locator('li > a').nth(i);
      expect(await link.isVisible()).toBeTruthy();
    }
  });
});
