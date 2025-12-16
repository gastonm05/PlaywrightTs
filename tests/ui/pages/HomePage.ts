import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/**
 * HomePage - Page Object for the Internet Heroku app home page
 * Contains 40+ link locators and common homepage interactions
 * Adapted from Kotlin HomePage class
 */
export class HomePage extends BasePage {
  // Page element locators - matching Kotlin implementation
  readonly heading = '.heading'; // h1 with class "heading"
  readonly header = 'h2'; // "Available Examples" heading
  readonly linkContainer = 'ul'; // UL containing all links
  readonly links = 'a'; // All A tags within UL

  // Individual link locators using linkText approach (By.linkText equivalent)
  readonly abTestingLink = 'a:has-text("A/B Testing")';
  readonly addRemoveElementsLink = 'a:has-text("Add/Remove Elements")';
  readonly basicAuthLink = 'a:has-text("Basic Auth")';
  readonly brokenImagesLink = 'a:has-text("Broken Images")';
  readonly challengingDomLink = 'a:has-text("Challenging DOM")';
  readonly checkboxesLink = 'a:has-text("Checkboxes")';
  readonly contextMenuLink = 'a:has-text("Context Menu")';
  readonly digestAuthLink = 'a:has-text("Digest Authentication")';
  readonly disappearingElementsLink = 'a:has-text("Disappearing Elements")';
  readonly dragAndDropLink = 'a:has-text("Drag and Drop")';
  readonly dropdownLink = 'a:has-text("Dropdown")';
  readonly dynamicContentLink = 'a:has-text("Dynamic Content")';
  readonly dynamicControlsLink = 'a:has-text("Dynamic Controls")';
  readonly dynamicLoadingLink = 'a:has-text("Dynamic Loading")';
  readonly entryAdLink = 'a:has-text("Entry Ad")';
  readonly exitIntentLink = 'a:has-text("Exit Intent")';
  readonly fileDownloadLink = 'a:has-text("File Download")';
  readonly fileUploadLink = 'a:has-text("File Upload")';
  readonly floatingMenuLink = 'a:has-text("Floating Menu")';
  readonly forgotPasswordLink = 'a:has-text("Forgot Password")';
  readonly formAuthenticationLink = 'a:has-text("Form Authentication")';
  readonly framesLink = 'a:has-text("Frames")';
  readonly geolocationLink = 'a:has-text("Geolocation")';
  readonly horizontalSliderLink = 'a:has-text("Horizontal Slider")';
  readonly hoversLink = 'a:has-text("Hovers")';
  readonly infiniteScrollLink = 'a:has-text("Infinite Scroll")';
  readonly inputsLink = 'a:has-text("Inputs")';
  readonly jqueryUIMenusLink = 'a:has-text("JQuery UI Menus")';
  readonly javascriptAlertsLink = 'a:has-text("JavaScript Alerts")';
  readonly javascriptErrorLink = 'a:has-text("JavaScript onload event error")';
  readonly keyPressesLink = 'a:has-text("Key Presses")';
  readonly largeDomLink = 'a:has-text("Large & Deep DOM")';
  readonly multipleWindowsLink = 'a:has-text("Multiple Windows")';
  readonly nestedFramesLink = 'a:has-text("Nested Frames")';
  readonly notificationMessagesLink = 'a:has-text("Notification Messages")';
  readonly redirectLinkLink = 'a:has-text("Redirect Link")';
  readonly secureFileDownloadLink = 'a:has-text("Secure File Download")';
  readonly shadowDomLink = 'a:has-text("Shadow DOM")';
  readonly shiftingContentLink = 'a:has-text("Shifting Content")';
  readonly slowResourcesLink = 'a:has-text("Slow Resources")';
  readonly sortableDataTablesLink = 'a:has-text("Sortable Data Tables")';
  readonly statusCodesLink = 'a:has-text("Status Codes")';
  readonly typosLink = 'a:has-text("Typos")';
  readonly wysiwygEditorLink = 'a:has-text("WYSIWYG Editor")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the homepage
   * Equivalent to Kotlin: fun navigateTo()
   */
  async navigateTo(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the homepage (alias for navigateTo)
   * Equivalent to Kotlin: fun openPage()
   */
  async openPage(): Promise<void> {
    await this.navigateTo();
  }

  /**
   * Navigate to the homepage (another alias for backwards compatibility)
   */
  async navigateToHomepage(): Promise<void> {
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
   * Get header text (h2)
   * Equivalent to Kotlin: fun getHeaderText(): String
   */
  async getHeaderText(): Promise<string> {
    return await this.getText(this.header);
  }

  /**
   * Get all available links on the page
   * Equivalent to Kotlin: fun getAvailableLinks(): List<String>
   */
  async getAvailableLinks(): Promise<string[]> {
    // Get the link container and then all links within it
    const linkElements = await this.page.locator(`${this.linkContainer} ${this.links}`).allTextContents();
    return linkElements.map(text => text.trim()).filter(text => text.length > 0);
  }

  /**
   * Get all available links (alias for backwards compatibility)
   */
  async getAllLinks(): Promise<string[]> {
    return await this.getAvailableLinks();
  }

  /**
   * Click on specific link by text
   * Equivalent to Kotlin: fun clickLinkByText(linkText: String)
   */
  async clickLinkByText(linkText: string): Promise<void> {
    await this.page.getByRole('link', { name: linkText }).click();
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
   * Verify homepage is loaded (alias)
   */
  async isHomepageLoaded(): Promise<boolean> {
    return await this.isLoaded();
  }

  /**
   * Check if specific link exists
   */
  async isLinkPresent(linkText: string): Promise<boolean> {
    const link = await this.page.getByRole('link', { name: linkText });
    return await link.isVisible();
  }

  /**
   * Navigate to authentication page (Form Authentication)
   */
  async navigateToLoginPage(): Promise<void> {
    await this.clickLinkByText('Form Authentication');
  }

  /**
   * Navigate to add/remove elements page
   */
  async navigateToAddRemoveElements(): Promise<void> {
    await this.clickLinkByText('Add/Remove Elements');
  }

  /**
   * Navigate to checkbox page
   */
  async navigateToCheckboxes(): Promise<void> {
    await this.clickLinkByText('Checkboxes');
  }

  /**
   * Navigate to dropdown page
   */
  async navigateToDropdown(): Promise<void> {
    await this.clickLinkByText('Dropdown');
  }

  /**
   * Count total number of examples
   */
  async getExampleCount(): Promise<number> {
    return await this.page.locator(`${this.linkContainer} ${this.links}`).count();
  }

  /**
   * Navigate to A/B Testing page
   */
  async navigateToAbTesting(): Promise<void> {
    await this.clickLinkByText('A/B Testing');
  }

  /**
   * Navigate to Basic Auth page
   */
  async navigateToBasicAuth(): Promise<void> {
    await this.clickLinkByText('Basic Auth');
  }

  /**
   * Navigate to Broken Images page
   */
  async navigateToBrokenImages(): Promise<void> {
    await this.clickLinkByText('Broken Images');
  }

  /**
   * Navigate to Context Menu page
   */
  async navigateToContextMenu(): Promise<void> {
    await this.clickLinkByText('Context Menu');
  }

  /**
   * Navigate to Digest Auth page
   */
  async navigateToDigestAuth(): Promise<void> {
    await this.clickLinkByText('Digest Authentication');
  }

  /**
   * Navigate to Drag and Drop page
   */
  async navigateToDragAndDrop(): Promise<void> {
    await this.clickLinkByText('Drag and Drop');
  }

  /**
   * Navigate to Dynamic Content page
   */
  async navigateToDynamicContent(): Promise<void> {
    await this.clickLinkByText('Dynamic Content');
  }

  /**
   * Navigate to Dynamic Controls page
   */
  async navigateToDynamicControls(): Promise<void> {
    await this.clickLinkByText('Dynamic Controls');
  }

  /**
   * Navigate to File Upload page
   */
  async navigateToFileUpload(): Promise<void> {
    await this.clickLinkByText('File Upload');
  }

  /**
   * Navigate to Frames page
   */
  async navigateToFrames(): Promise<void> {
    await this.clickLinkByText('Frames');
  }

  /**
   * Navigate to Hovers page
   */
  async navigateToHovers(): Promise<void> {
    await this.clickLinkByText('Hovers');
  }

  /**
   * Navigate to JavaScript Alerts page
   */
  async navigateToJavaScriptAlerts(): Promise<void> {
    await this.clickLinkByText('JavaScript Alerts');
  }

  /**
   * Navigate to Key Presses page
   */
  async navigateToKeyPresses(): Promise<void> {
    await this.clickLinkByText('Key Presses');
  }

  /**
   * Navigate to Multiple Windows page
   */
  async navigateToMultipleWindows(): Promise<void> {
    await this.clickLinkByText('Multiple Windows');
  }

  /**
   * Navigate to Nested Frames page
   */
  async navigateToNestedFrames(): Promise<void> {
    await this.clickLinkByText('Nested Frames');
  }

  /**
   * Navigate to Status Codes page
   */
  async navigateToStatusCodes(): Promise<void> {
    await this.clickLinkByText('Status Codes');
  }
}
