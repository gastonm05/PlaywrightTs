import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/**
 * LoginPage - Page Object for login/authentication page
 * Handles both valid and invalid login scenarios
 * Adapted from Kotlin LoginPage class
 */
export class LoginPage extends BasePage {
  // Page element locators - matching Kotlin implementation
  readonly heading = 'h2';
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'button[type="submit"]';
  readonly flashMessage = '#flash';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   * Equivalent to Kotlin: fun navigateTo()
   */
  async navigateTo(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to login page (alias for navigateTo)
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo();
  }

  /**
   * Get page heading text
   * Equivalent to Kotlin: fun getPageHeading(): String
   */
  async getPageHeading(): Promise<string> {
    return await this.getText(this.heading);
  }

  /**
   * Check if login form is displayed
   */
  async isLoginFormDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.usernameInput) &&
           await this.isElementVisible(this.passwordInput) &&
           await this.isElementVisible(this.loginButton);
  }

  /**
   * Enter username in the username input field
   * Equivalent to Kotlin: fun enterUsername(username: String)
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  /**
   * Enter password in the password input field
   * Equivalent to Kotlin: fun enterPassword(password: String)
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click the login button
   * Equivalent to Kotlin: fun clickLoginButton()
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform complete login flow
   * Equivalent to Kotlin: fun login(username: String, password: String)
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Perform login (alias for login method)
   */
  async performLogin(username: string, password: string): Promise<void> {
    await this.login(username, password);
    // Wait for navigation or message
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if flash message is displayed
   * Equivalent to Kotlin: fun isFlashMessageDisplayed(): Boolean
   */
  async isFlashMessageDisplayed(): Promise<boolean> {
    try {
      await this.waitForElement(this.flashMessage, 5000);
      return await this.isElementVisible(this.flashMessage);
    } catch (e) {
      return false;
    }
  }

  /**
   * Get flash message text
   * Equivalent to Kotlin: fun getFlashMessage(): String
   * Cleans up the message by removing newlines and close button
   */
  async getFlashMessage(): Promise<string> {
    try {
      await this.waitForElement(this.flashMessage, 5000);
      let text = await this.getText(this.flashMessage);
      // Remove newlines and close button symbol (×), then trim
      text = text.replace(/\n/g, ' ').replace(/×/g, '').trim();
      return text;
    } catch (e) {
      return '';
    }
  }

  /**
   * Check if page is loaded (heading is visible)
   * Equivalent to Kotlin: fun isLoaded(): Boolean
   */
  async isLoaded(): Promise<boolean> {
    try {
      return await this.isElementVisible(this.heading);
    } catch (e) {
      return false;
    }
  }

  /**
   * Get error/flash message text (alias)
   */
  async getErrorMessage(): Promise<string> {
    return await this.getFlashMessage();
  }

  /**
   * Get success message text (alias)
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getFlashMessage();
  }

  /**
   * Check if error message is displayed (alias)
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isFlashMessageDisplayed();
  }

  /**
   * Check if success message is displayed (alias)
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    return await this.isFlashMessageDisplayed();
  }

  /**
   * Get username input placeholder
   */
  async getUsernamePlaceholder(): Promise<string | null> {
    return await this.page.getAttribute(this.usernameInput, 'placeholder');
  }

  /**
   * Get password input placeholder
   */
  async getPasswordPlaceholder(): Promise<string | null> {
    return await this.page.getAttribute(this.passwordInput, 'placeholder');
  }

  /**
   * Clear username field
   */
  async clearUsername(): Promise<void> {
    await this.page.fill(this.usernameInput, '');
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.page.fill(this.passwordInput, '');
  }

  /**
   * Verify login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.isElementClickable(this.loginButton);
  }
}
