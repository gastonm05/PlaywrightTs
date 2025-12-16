import { Page, expect } from '@playwright/test';

/**
 * Base Page Object class providing common functionality for all page objects
 * Implements the Page Object Model pattern with shared methods
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL path
   * Uses Playwright's configured baseURL from playwright.config.ts
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Fill text in an input field
   */
  async fillInput(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Click on an element
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Get text from an element
   */
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element exists
   */
  async elementExists(selector: string): Promise<boolean> {
    return (await this.page.$(selector)) !== null;
  }

  /**
   * Get all text from elements matching selector
   */
  async getAllText(selector: string): Promise<string[]> {
    return await this.page.locator(selector).allTextContents();
  }

  /**
   * Switch to iframe
   */
  async switchToFrame(selector: string) {
    const frameLocator = this.page.frameLocator(selector);
    return frameLocator;
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Verify element is clickable
   */
  async isElementClickable(selector: string): Promise<boolean> {
    const element = await this.page.$(selector);
    if (!element) return false;
    return await element.isEnabled();
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for URL to contain specific text
   */
  async waitForURL(urlPart: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForURL(`**/*${urlPart}*`, { timeout });
  }
}
