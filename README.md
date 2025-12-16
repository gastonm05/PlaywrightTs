# Playwright UI & API Test Project

A comprehensive test automation project built with **Playwright** and **TypeScript**, featuring both UI and API testing capabilities. This project implements the **Page Object Model (POM)** pattern for UI tests and provides robust API testing utilities similar to REST Assured in Java.

## Overview

This project showcases professional test automation practices including:
- **UI Testing**: Selenium WebDriver-like functionality with Playwright
- **API Testing**: RESTful API testing with axios
- **Page Object Model**: Clean separation of test logic and page interactions
- **CI/CD Pipeline**: GitHub Actions for automated test execution
- **Test Data Management**: Factory patterns for reusable test data
- **Response Validation**: Comprehensive API response validators

## Project Structure

```
playwright-ts/
├── tests/
│   ├── ui/
│   │   ├── core/
│   │   │   ├── BasePage.ts          # Base page object with common methods
│   │   │   └── BaseTest.ts          # Test fixtures and setup/teardown
│   │   ├── pages/
│   │   │   ├── HomePage.ts          # Home page object (45+ link locators)
│   │   │   ├── LoginPage.ts         # Login page object
│   │   │   └── SecurePage.ts        # Secure area page object
│   │   └── tests/
│   │       ├── HomePageTest.spec.ts # Home page tests
│   │       └── LoginPageTest.spec.ts # Login tests (valid + invalid scenarios)
│   ├── api/
│   │   ├── clients/
│   │   │   ├── ApiClient.ts         # Base API client
│   │   │   ├── UserClient.ts        # User API endpoints
│   │   │   └── PostClient.ts        # Post API endpoints
│   │   ├── models/
│   │   │   ├── User.ts              # User model + UserFactory
│   │   │   └── Post.ts              # Post model + PostFactory
│   │   ├── utils/
│   │   │   ├── ApiConfig.ts         # API configuration
│   │   │   ├── RestAssuredConfig.ts # HTTP client wrapper
│   │   │   └── ApiValidators.ts     # Response validators
│   │   └── tests/
│   │       ├── UserApiTest.spec.ts  # User API test suite
│   │       └── PostApiTest.spec.ts  # Post API test suite
│   └── example.spec.ts              # Example Playwright test
├── .github/
│   └── workflows/
│       └── tests.yml                # GitHub Actions CI/CD pipeline
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Dependencies and scripts
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.57.0 | Browser automation & test execution |
| **TypeScript** | ^5.7.2 | Type-safe test code |
| **Axios** | ^1.7.2 | HTTP client for API testing |
| **Node.js** | 18+ / 20+ | Runtime environment |
| **GitHub Actions** | - | CI/CD pipeline |

## Features

### UI Testing Features
- ✅ Page Object Model pattern implementation
- ✅ WebDriver-like API with Playwright
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Screenshot and trace collection on failures
- ✅ Element locators and interaction methods
- ✅ Headless and headed execution modes
- ✅ Test data management

### API Testing Features
- ✅ RESTful API client with axios
- ✅ CRUD operations support (GET, POST, PUT, PATCH, DELETE)
- ✅ Request/response validation
- ✅ Factory pattern for test data
- ✅ Custom validators for API responses
- ✅ Email and UUID format validation
- ✅ Performance/timeout testing

### CI/CD Features
- ✅ GitHub Actions workflow
- ✅ Multi-node version testing (18.x, 20.x)
- ✅ Multiple test execution paths (UI, API, All)
- ✅ Artifact collection (reports, screenshots, traces)
- ✅ Test reporter integration
- ✅ Failure handling and error reporting

## Installation

### Prerequisites
- Node.js 18.x or 20.x
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   BASE_URL=https://the-internet.herokuapp.com
   API_BASE_URL=https://jsonplaceholder.typicode.com
   ```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run UI Tests Only
```bash
npm run test:ui-only
```

### Run API Tests Only
```bash
npm run test:api-only
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:headed
```

### Debug Tests
```bash
npm run test:debug
```

### Run Tests on Specific Browser
```bash
npm run test:chrome
```

### View HTML Report
After tests complete:
```bash
npm run report
```

## Test Scenarios

### UI Tests

#### HomePage Tests (HomePageTest.spec.ts)
- ✅ Homepage loads successfully
- ✅ All examples are displayed
- ✅ Navigation to different pages works
- ✅ Links are clickable and functional
- ✅ Page is responsive

#### LoginPage Tests (LoginPageTest.spec.ts)

**Valid Login Scenarios:**
- ✅ Login with correct credentials
- ✅ Success message is displayed
- ✅ User is redirected to secure page
- ✅ Logout functionality works

**Invalid Login Scenarios:**
- ✅ Invalid username shows error
- ✅ Invalid password shows error
- ✅ Empty username shows error
- ✅ Empty password shows error
- ✅ Empty both fields shows error

**UI/UX Tests:**
- ✅ Form fields can be cleared
- ✅ Form elements are properly aligned
- ✅ Direct navigation to secure page redirects to login

### API Tests

#### User API Tests (UserApiTest.spec.ts)
- ✅ Retrieve all users
- ✅ Retrieve user by ID
- ✅ Create new user (POST)
- ✅ Update user (PUT)
- ✅ Partially update user (PATCH)
- ✅ Delete user (DELETE)
- ✅ Retrieve users by username
- ✅ Validate user object structure
- ✅ Validate email format
- ✅ Handle non-existent users gracefully
- ✅ Response performance validation

#### Post API Tests (PostApiTest.spec.ts)
- ✅ Retrieve all posts
- ✅ Retrieve post by ID
- ✅ Create new post
- ✅ Create post with long content
- ✅ Create post with special characters
- ✅ Batch post creation
- ✅ Update post (PUT)
- ✅ Partially update post (PATCH)
- ✅ Delete post (DELETE)
- ✅ Retrieve posts by user ID
- ✅ Retrieve post comments
- ✅ Validate post structure
- ✅ Validate response content type

## Configuration

### playwright.config.ts
```typescript
// Key configurations:
- testDir: './tests'              // Test files location
- timeout: 30 * 1000              // Test timeout: 30 seconds
- expect: { timeout: 5000 }        // Assertion timeout: 5 seconds
- retries: 2 (CI), 0 (local)      // Retry failed tests on CI
- workers: 1 (CI), auto (local)   // Parallel execution
- reporter: 'html', 'junit'       // HTML and JUnit reports
```

### Environment Variables (.env)
```env
BASE_URL=https://the-internet.herokuapp.com  # UI test base URL
API_BASE_URL=https://jsonplaceholder.typicode.com  # API test base URL
```

## Page Objects Guide

### Creating a New Page Object

1. **Extend BasePage**
   ```typescript
   export class MyPage extends BasePage {
     readonly myElement = '#my-element';
     
     async myAction(): Promise<void> {
       await this.clickElement(this.myElement);
     }
   }
   ```

2. **Use in Tests**
   ```typescript
   test('my test', async ({ basePage, page }) => {
     const myPage = new MyPage(page);
     await myPage.myAction();
   });
   ```

### Available BasePage Methods
- `goto(path)` - Navigate to URL
- `fillInput(selector, text)` - Fill input field
- `clickElement(selector)` - Click element
- `getText(selector)` - Get element text
- `isElementVisible(selector)` - Check visibility
- `elementExists(selector)` - Check existence
- `waitForElement(selector)` - Wait for element
- `takeScreenshot(name)` - Capture screenshot
- `getCurrentURL()` - Get current URL

## API Testing Guide

### Creating API Clients

1. **Extend ApiClient**
   ```typescript
   export class MyClient extends ApiClient {
     async getMyData(): Promise<AxiosResponse> {
       return await this.get('/my-endpoint');
     }
   }
   ```

2. **Use in Tests**
   ```typescript
   const client = new MyClient();
   const response = await client.getMyData();
   ApiValidators.validateStatusCode(response.status, 200);
   ```

### Using Factories

```typescript
// Create test data using factories
const user = UserFactory.createDefaultUser();
const post = PostFactory.createPost(1, 'Title', 'Body');
const users = UserFactory.createUsers(5); // Create 5 users
```

### Using Validators

```typescript
// Validate API responses
ApiValidators.validateStatusCode(response.status, 200);
ApiValidators.validateResponseFields(response.data, ['id', 'name']);
ApiValidators.validateArrayResponse(response.data);
ApiValidators.validateEmailFormat(email);
ApiValidators.validateContentType(response.headers);
```

## CI/CD Pipeline

### GitHub Actions Workflow (.github/workflows/tests.yml)

The workflow automatically runs on:
- Push to main or develop branches
- Pull requests to main or develop branches
- Manual workflow dispatch

### Test Jobs

1. **Main Test Job**
   - Tests on Node 18.x and 20.x
   - Runs UI tests, API tests, and all tests
   - Uploads HTML reports and JUnit XML

2. **UI Tests Specific**
   - Cross-browser testing (Chromium, Firefox, WebKit)
   - Dedicated UI test artifacts

3. **API Tests Specific**
   - Dedicated API test execution
   - API test result artifacts

### Artifact Collection
- HTML test reports
- JUnit XML reports
- Test results JSON
- Screenshots and traces on failure

## Best Practices

### Page Objects
- ✅ One page object per page/component
- ✅ Locators as private/readonly properties
- ✅ Actions as public methods
- ✅ No test logic in page objects
- ✅ Inherit from BasePage for consistency

### Tests
- ✅ One logical test per test case
- ✅ Use descriptive test names
- ✅ Follow Arrange-Act-Assert pattern
- ✅ Use page objects for element interaction
- ✅ Validate expected outcomes

### API Tests
- ✅ Use factories for test data
- ✅ Validate response structure and content
- ✅ Test both happy and sad paths
- ✅ Include edge cases
- ✅ Validate response times

## Troubleshooting

### Common Issues

**Playwright browsers not found**
```bash
npx playwright install
```

**Tests timing out**
- Increase timeout in playwright.config.ts
- Check if website is accessible
- Verify network connectivity

**API tests failing**
- Verify API_BASE_URL in .env
- Check internet connection
- Verify API endpoint availability

**GitHub Actions failing**
- Check Node version compatibility
- Verify environment variables in Actions secrets
- Review action logs for error details

## Contributing

1. Create a new branch for your feature
2. Write tests for your changes
3. Ensure all tests pass locally
4. Submit a pull request
5. Wait for CI/CD pipeline to pass

## License

ISC

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review test output and logs
3. Check Playwright documentation: https://playwright.dev
4. Check API documentation

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Axios Documentation](https://axios-http.com)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

---

**Last Updated**: December 2024
**Version**: 1.0.0
