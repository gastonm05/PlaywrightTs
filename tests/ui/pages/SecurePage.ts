import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/**
 * SecurePage - Page Object for secure area after successful login
 * Represents the restricted area page that appears after authentication
 * Adapted from Kotlin SecurePage class
 */
export class SecurePage extends BasePage {
  // Page element locators - matching Kotlin implementation
  readonly heading = 'h2'; // Secure area heading
  readonly flash = '#flash'; // Flash message element
  readonly logoutLink = 'a[href="/logout"]'; // Logout button

  constructor(page: Page) {
    super(page);
  }

  /**
   * Check if page is loaded (heading is visible)
   * Equivalent to Kotlin: fun isLoaded(): Boolean
   */
  async isLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.heading, 5000);
      return await this.isElementVisible(this.heading);
    } catch (e) {
      return false;
    }
  }

  /**
   * Get heading text
   * Equivalent to Kotlin: fun getHeadingText(): String
   */
  async getHeadingText(): Promise<string> {
    try {
      return await this.getText(this.heading);
    } catch (e) {
      return '';
    }
  }

  /**
   * Get flash message text
   * Equivalent to Kotlin: fun getFlashMessage(): String
   * Cleans up the message by removing newlines and close button symbol (×)
   */
  async getFlashMessage(): Promise<string> {
    try {
      await this.waitForElement(this.flash, 5000);
      let text = await this.getText(this.flash);
      // Remove newlines and close button symbol (×), then trim
      text = text.replace(/\n/g, ' ').replace(/×/g, '').trim();
      return text;
    } catch (e) {
      return '';
    }
  }

  /**
   * Click logout link
   * Equivalent to Kotlin: fun clickLogout()
   */
  async clickLogout(): Promise<void> {
    try {
      await this.clickElement(this.logoutLink);
      await this.page.waitForLoadState('networkidle');
    } catch (e) {
      // Silently fail if logout link not found
    }
  }

  /**
   * Navigate to secure page directly
   */
  async navigateToSecurePage(): Promise<void> {
    await this.goto('/secure');
    await this.waitForPageLoad();
  }

  /**
   * Check if user is logged in (secure page is accessible)
   * Equivalent to isLoaded()
   */
  async isSecurePageLoaded(): Promise<boolean> {
    return await this.isLoaded();
  }

  /**
   * Get page title (alias for getHeadingText)
   */
  async getPageTitle(): Promise<string> {
    return await this.getHeadingText();
  }

  /**
   * Get success message (alias for getFlashMessage)
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getFlashMessage();
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    try {
      return await this.isElementVisible(this.flash);
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if logout button is visible
   */
  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.logoutLink);
  }

  /**
   * Get page content
   */
  async getPageContent(): Promise<string> {
    try {
      return await this.getText('.content');
    } catch (e) {
      return '';
    }
  }

  /**
   * Get sub heading text
   */
  async getSubHeadingText(): Promise<string> {
    try {
      return await this.getText('h4');
    } catch (e) {
      return '';
    }
  }

  /**
   * Verify logout was successful by checking if redirected to login
   */
  async isRedirectedToLogin(): Promise<boolean> {
    try {
      await this.waitForURL('/login', 5000);
      return await this.getCurrentURL().then(url => url.includes('/login'));
    } catch (e) {
      return false;
    }
  }

  /**
   * Get current URL path
   */
  async getCurrentPath(): Promise<string> {
    try {
      const url = await this.getCurrentURL();
      return new URL(url).pathname;
    } catch (e) {
      return '';
    }
  }

  /**
   * Verify page elements are present
   */
  async arePageElementsPresent(): Promise<boolean> {
    return await this.isElementVisible(this.heading);
  }
}
