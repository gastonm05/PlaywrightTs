import { Page, test as baseTest, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Custom test fixture for UI tests
 * Provides page instance and browser management similar to WebDriver setup/teardown
 */
export const test = baseTest.extend({
  basePage: async ({ page }, use) => {
    // Setup - equivalent to @BeforeEach in JUnit
    const basePage = new BasePage(page);
    
    // Use the fixture
    await use(basePage);
    
    // Teardown - equivalent to @AfterEach in JUnit
    // Clean up if needed (handled by Playwright automatically)
  },
});

// Re-export expect for convenient access
export { expect };

/**
 * Global test setup/teardown - equivalent to @BeforeAll and @AfterAll in JUnit
 */
export const setup = baseTest.beforeAll(async () => {
  // Global setup before any tests run
  console.log('Starting test suite...');
});

export const teardown = baseTest.afterAll(async () => {
  // Global cleanup after all tests complete
  console.log('Test suite completed.');
});
