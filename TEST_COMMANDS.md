# Test Execution Commands Guide

## NPM Scripts (Recommended - Use These!)

### API Tests Only
```bash
npm run test:api
```
**Result**: 39 API tests on default browser
**Time**: ~20-30 seconds

---

### UI Tests - Chromium Only
```bash
npm run test:ui:chrome
```
**Result**: 30 UI tests on Chromium
**Time**: ~30-45 seconds

---

### UI Tests - All Three Browsers
```bash
npm run test:ui
```
**Result**: 30 UI tests × 3 browsers = 90 tests
- Chromium
- Firefox
- WebKit

**Time**: ~2-3 minutes

---

## Alternative Direct Commands

### API Tests
```bash
npx playwright test tests/api
```

### UI Tests - Chromium Only
```bash
npx playwright test tests/ui --project=chromium
```

### UI Tests - All Browsers
```bash
npx playwright test tests/ui --project=chromium --project=firefox --project=webkit
```

---

## All Available Commands

| Command | What It Does | Time |
|---------|-------------|------|
| `npm test` | All 69 tests on Chromium | ~1-1.5 min |
| `npm run test:api` | 39 API tests | ~20-30 sec |
| `npm run test:api-only` | 39 API tests (alt) | ~20-30 sec |
| `npm run test:ui:chrome` | 30 UI tests on Chromium | ~30-45 sec |
| `npm run test:ui-only` | 30 UI tests on Chromium (alt) | ~30-45 sec |
| `npm run test:ui` | 30 UI tests on all 3 browsers | ~2-3 min |
| `npm run test:chrome` | All 69 tests on Chromium | ~1-1.5 min |
| `npm run test:headed` | Tests in headed mode (see browser) | ~varies |
| `npm run test:debug` | Debug mode (interactive) | ~varies |
| `npm run report` | View HTML test report | - |

---

## Examples

### Quick API Validation
```bash
npm run test:api
```
Fast check if API endpoints are working correctly.

### Single Browser UI Testing (Fast Development)
```bash
npm run test:ui:chrome
```
Quick UI test run during development.

### Full Cross-Browser UI Testing (Before Merge)
```bash
npm run test:ui
```
Verify UI works on all browsers before committing.

### Full Suite
```bash
npm test
```
Run complete test suite (API + UI on Chromium).

### Debug Failing Test
```bash
npm run test:debug
```
Opens Playwright Inspector for debugging.

### View Test Results
```bash
npm run report
```
Opens HTML report in browser.

---

## In GitHub Actions

The optimized workflow runs:
```
Job 1: npm run test:api       (39 tests, ~30 sec)
Job 2: npm run test:ui:chrome (30 tests, ~45 sec)
Parallel execution: ~1.5-2 minutes total
```

---

## Tips

✅ **During Development**: Use `npm run test:ui:chrome` for speed
✅ **Before Commit**: Use `npm run test:api && npm run test:ui:chrome`
✅ **Pre-Merge PR**: Use `npm run test:ui` for full browser coverage
✅ **Debug Issues**: Use `npm run test:debug` with `--headed` flag
✅ **View Reports**: Use `npm run report` after test runs

---

## Full Test Run (All 99 Tests)
```bash
# Run all tests (API on 1 browser + UI on 3 browsers)
npm test && npm run test:ui
```
**Result**: 39 API + 90 UI = 129 tests
**Time**: ~4-5 minutes

---

**Last Updated**: December 16, 2025
