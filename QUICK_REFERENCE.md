# Quick Reference Guide

## Common Commands

```bash
# Setup
npm install
npx playwright install
cp .env.example .env

# Running Tests
npm test                    # All tests
npm run test:ui-only       # UI tests only
npm run test:api-only      # API tests only
npm run test:headed        # With browser visible
npm run test:debug         # Debug mode
npm run test:chrome        # Chrome only
npm run report             # View HTML report
```

## File Locations

### UI Tests
- Page Objects: `tests/ui/pages/`
- Test Cases: `tests/ui/tests/`
- Base Classes: `tests/ui/core/`

### API Tests
- Clients: `tests/api/clients/`
- Models: `tests/api/models/`
- Tests: `tests/api/tests/`
- Utils: `tests/api/utils/`

## Test Examples

### Simple UI Test
```typescript
import { test, expect } from '../core/BaseTest';
import { HomePage } from '../pages/HomePage';

test('homepage loads', async ({ basePage, page }) => {
  const home = new HomePage(page);
  await home.navigateToHomepage();
  expect(await home.isHomepageLoaded()).toBeTruthy();
});
```

### Simple API Test
```typescript
import { test, expect } from '@playwright/test';
import { UserClient } from '../clients/UserClient';
import { ApiValidators } from '../utils/ApiValidators';

test('get users', async () => {
  const client = new UserClient();
  const response = await client.getAllUsers();
  ApiValidators.validateStatusCode(response.status, 200);
});
```

## Page Object Methods

### Navigate
- `goto(path)` - Navigate to path
- `waitForPageLoad()` - Wait for network idle

### Elements
- `clickElement(selector)` - Click element
- `fillInput(selector, text)` - Fill input
- `getText(selector)` - Get text
- `isElementVisible(selector)` - Check visibility
- `elementExists(selector)` - Check existence

### Advanced
- `switchToFrame(selector)` - Switch to iframe
- `takeScreenshot(name)` - Take screenshot
- `getCurrentURL()` - Get URL
- `waitForElement(selector)` - Wait for element

## API Methods

### CRUD Operations
- `get(endpoint)` - GET request
- `post(endpoint, body)` - POST request
- `put(endpoint, body)` - PUT request
- `patch(endpoint, body)` - PATCH request
- `delete(endpoint)` - DELETE request

### Response Access
- `getStatusCode(response)` - HTTP status
- `getResponseBody(response)` - Response data
- `getResponseHeaders(response)` - Headers

## Validators

```typescript
// Status codes
ApiValidators.validateStatusCode(200, 200);

// Response structure
ApiValidators.validateResponseFields(data, ['id', 'name']);

// Arrays
ApiValidators.validateArrayResponse(data);

// Strings/Numbers
ApiValidators.validateStringField(value);
ApiValidators.validateNumberField(value);

// Formats
ApiValidators.validateEmailFormat(email);
ApiValidators.validateUUIDFormat(uuid);

// Performance
ApiValidators.validateResponseTime(time, 5000);
```

## Factories

### User Factory
```typescript
UserFactory.createDefaultUser()           // Full user
UserFactory.createUser(name, user, email) // Custom user
UserFactory.createMinimalUser()           // Minimal user
UserFactory.createUsers(5)                // Array of 5
```

### Post Factory
```typescript
PostFactory.createDefaultPost()                 // Full post
PostFactory.createPost(userId, title, body)    // Custom
PostFactory.createPosts(userId, 5)             // Array of 5
PostFactory.createLongPost(userId)             // Long content
PostFactory.createPostWithSpecialChars(userId) // Special chars
```

## Configuration

### Environment Variables (.env)
```env
BASE_URL=https://the-internet.herokuapp.com
API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Playwright Config (playwright.config.ts)
- Base URL
- Timeouts
- Retries
- Reporters
- Browsers

## Test Structure

### Arrange-Act-Assert Pattern
```typescript
test('description', async ({ page }) => {
  // Arrange - Setup test data
  const page = new MyPage(page);
  
  // Act - Perform actions
  await page.doSomething();
  
  // Assert - Verify results
  expect(result).toBeTruthy();
});
```

### Describe-Test Pattern
```typescript
test.describe('Feature', () => {
  test.beforeEach(async () => {
    // Setup
  });
  
  test('scenario 1', async () => { });
  test('scenario 2', async () => { });
});
```

## Debugging

### Enable Debug Mode
```bash
npm run test:debug
```

### Add Breakpoints
```typescript
await page.pause(); // Pauses execution
```

### View Traces
Traces are saved on failure, view in:
```bash
npx playwright show-trace trace.zip
```

### Screenshots
Taken on failure automatically in `test-results/`

## CI/CD Pipeline

### Triggered On
- Push to main/develop
- Pull requests
- Manual workflow dispatch

### Test Results
- HTML Report: `playwright-report/`
- JUnit XML: `test-results/*.xml`
- Screenshots: `test-results/`

### Artifacts
Available for 30 days after run

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Browsers not found | `npx playwright install` |
| Tests timeout | Increase timeout in config |
| API 404 | Check BASE_URL/API_BASE_URL |
| Element not found | Use `waitForElement()` |
| Flaky tests | Add waits or retries |

## Best Practices

✅ Use page objects for UI elements
✅ Use factories for test data
✅ Validate response structure
✅ Handle errors gracefully
✅ Use descriptive test names
✅ Group related tests
✅ Keep tests independent
✅ Clean up after tests

## Resources

- [Playwright Docs](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Axios Docs](https://axios-http.com)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- [The Internet App](https://the-internet.herokuapp.com)

---

**Last Updated**: December 2024
