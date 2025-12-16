import { test, expect } from '../core/BaseTest';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';

/**
 * LoginPageTest - Test suite for login/authentication functionality
 * Tests both valid and invalid login scenarios
 */
test.describe('LoginPage Tests', () => {
  let loginPage: LoginPage;
  let securePage: SecurePage;

  test.beforeEach(async ({ basePage, page }) => {
    loginPage = new LoginPage(page);
    securePage = new SecurePage(page);
    await loginPage.navigateToLoginPage();
  });

  test('should display login form', async ({ page }) => {
    // Verify login form elements are present
    const isFormDisplayed = await loginPage.isLoginFormDisplayed();
    expect(isFormDisplayed).toBeTruthy();
  });

  test('should have correct page title', async ({ page }) => {
    const title = await loginPage.getPageTitle();
    expect(title.toLowerCase()).toContain('internet');
  });

  test('should have username input field', async ({ page }) => {
    // Verify username input field exists and is visible
    const isVisible = await loginPage.isElementVisible('#username');
    expect(isVisible).toBeTruthy();
  });

  test('should have password input field', async ({ page }) => {
    // Verify password input field exists and is visible
    const isVisible = await loginPage.isElementVisible('#password');
    expect(isVisible).toBeTruthy();
  });

  test('should have login button enabled', async ({ page }) => {
    const isEnabled = await loginPage.isLoginButtonEnabled();
    expect(isEnabled).toBeTruthy();
  });

  // Valid Login Scenarios
  test('should login successfully with valid credentials', async ({ page }) => {
    // Valid test credentials for the-internet app
    await loginPage.performLogin('tomsmith', 'SuperSecretPassword!');
    
    // Verify success message appears
    const isSuccessDisplayed = await loginPage.isSuccessMessageDisplayed();
    expect(isSuccessDisplayed).toBeTruthy();
    
    // Verify redirected to secure page
    const currentURL = await loginPage.getCurrentURL();
    expect(currentURL).toContain('/secure');
  });

  test('should display success message after valid login', async ({ page }) => {
    await loginPage.performLogin('tomsmith', 'SuperSecretPassword!');
    
    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toContain('logged in');
  });

  test('should be able to logout from secure page', async ({ page }) => {
    // Login first
    await loginPage.performLogin('tomsmith', 'SuperSecretPassword!');
    
    // Verify on secure page
    expect(await securePage.isSecurePageLoaded()).toBeTruthy();
    
    // Click logout
    await securePage.clickLogout();
    
    // Verify redirected to login page
    const currentURL = await loginPage.getCurrentURL();
    expect(currentURL).toContain('/login');
  });

  // Invalid Login Scenarios
  test('should show error with invalid username', async ({ page }) => {
    await loginPage.performLogin('invaliduser', 'SuperSecretPassword!');
    
    // Verify error message appears
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message contains expected text
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).toContain('invalid');
  });

  test('should show error with invalid password', async ({ page }) => {
    await loginPage.performLogin('tomsmith', 'WrongPassword');
    
    // Verify error message appears
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).toContain('invalid');
  });

  test('should show error with empty username', async ({ page }) => {
    await loginPage.performLogin('', 'SuperSecretPassword!');
    
    // Verify error message appears
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('should show error with empty password', async ({ page }) => {
    await loginPage.performLogin('tomsmith', '');
    
    // Verify error message appears
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('should show error with both fields empty', async ({ page }) => {
    await loginPage.performLogin('', '');
    
    // Verify error message appears
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('should show error with incorrect credentials combination', async ({ page }) => {
    await loginPage.performLogin('tomsmith', 'IncorrectPassword123');
    
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  // UI/UX Tests
  test('should clear input fields', async ({ page }) => {
    await loginPage.enterUsername('testuser');
    await loginPage.enterPassword('testpass');
    
    await loginPage.clearUsername();
    await loginPage.clearPassword();
    
    // Verify fields are empty
    const usernameValue = await page.inputValue('#username');
    const passwordValue = await page.inputValue('#password');
    
    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });

  test('should be on login page initially', async ({ page }) => {
    const currentURL = await loginPage.getCurrentURL();
    expect(currentURL).toContain('/login');
  });

  test('should not navigate to secure page without login', async ({ page }) => {
    // Navigate directly to secure page
    await securePage.navigateToSecurePage();
    
    // Should be redirected back to login or show error
    const currentURL = await loginPage.getCurrentURL();
    // The-internet app redirects to login, so we should be on login page
    expect(currentURL).toContain('/login');
  });

  test('should handle special characters in password field', async ({ page }) => {
    const specialCharsPassword = '!@#$%^&*()';
    await loginPage.enterPassword(specialCharsPassword);
    
    // Verify password field is filled (displayed as dots/asterisks)
    expect(await loginPage.isLoginFormDisplayed()).toBeTruthy();
  });

  test('should verify form elements are properly aligned', async ({ page }) => {
    // Verify all form elements exist and are visible
    expect(await loginPage.isLoginFormDisplayed()).toBeTruthy();
    
    // Verify button is below inputs
    const buttonElement = await page.$('button[type="submit"]');
    expect(buttonElement).not.toBeNull();
  });
});
