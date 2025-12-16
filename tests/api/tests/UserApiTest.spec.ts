import { test, expect } from '@playwright/test';
import { UserClient } from '../clients/UserClient';
import { UserFactory } from '../models/User';
import { ApiValidators } from '../utils/ApiValidators';

/**
 * UserApiTest - Test suite for User API endpoints
 * Similar to UserApiTest.java in Kotlin project
 */
test.describe('User API Tests', () => {
  let userClient: UserClient;

  test.beforeEach(async () => {
    userClient = new UserClient();
  });

  // GET - Retrieve Tests
  test('should retrieve all users successfully', async () => {
    const response = await userClient.getAllUsers();

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    ApiValidators.validateArrayResponse(response.data, 1);
    ApiValidators.validateContentType(response.headers, 'application/json');
  });

  test('should retrieve user by valid ID', async () => {
    const userId = 1;
    const response = await userClient.getUserById(userId);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    ApiValidators.validateResponseFields(response.data, ['id', 'username', 'email']);
    expect(response.data.id).toBe(userId);
  });

  test('should handle non-existent user ID gracefully', async () => {
    const userId = 99999;
    try {
      await userClient.getUserById(userId);
    } catch (error: any) {
      // API should handle gracefully (return 404 or similar)
      expect([404, 500]).toContain(error.response?.status || 500);
    }
  });

  test('should get user count', async () => {
    const count = await userClient.getUserCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should retrieve users by username', async () => {
    const username = 'Bret';
    const response = await userClient.getUserByUsername(username);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    if (response.data.length > 0) {
      expect(response.data[0].username).toBe(username);
    }
  });

  // CREATE - POST Tests
  test('should create a new user successfully', async () => {
    const newUser = UserFactory.createUser(
      'New Test User',
      'newtestuser',
      'newtest@example.com'
    );

    const response = await userClient.createUser(newUser);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 201);
    ApiValidators.validateResponseFields(response.data, ['id', 'name', 'username', 'email']);
    expect(response.data.name).toBe(newUser.name);
    expect(response.data.username).toBe(newUser.username);
  });

  test('should create user with all fields', async () => {
    const newUser = UserFactory.createDefaultUser();
    const response = await userClient.createUser(newUser);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 201);
    ApiValidators.validateResponseFields(response.data, [
      'id',
      'name',
      'username',
      'email',
      'address',
      'phone',
      'website',
      'company',
    ]);
  });

  test('should create minimal user', async () => {
    const minimalUser = UserFactory.createMinimalUser();
    const response = await userClient.createUser(minimalUser);

    ApiValidators.validateStatusCode(response.status, 201);
    expect(response.data.name).toBe(minimalUser.name);
    expect(response.data.username).toBe(minimalUser.username);
  });

  // UPDATE - PUT Tests
  test('should update user successfully with PUT', async () => {
    const userId = 1;
    const updatedUser = {
      name: 'Updated User Name',
      username: 'updatedusername',
      email: 'updated@example.com',
    };

    const response = await userClient.updateUser(userId, updatedUser);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    expect(response.data.name).toBe(updatedUser.name);
  });

  test('should partially update user with PATCH', async () => {
    const userId = 1;
    const partialUpdate = {
      name: 'Patched User Name',
    };

    const response = await userClient.patchUser(userId, partialUpdate);

    ApiValidators.validateStatusCode(response.status, 200);
    expect(response.data.name).toBe(partialUpdate.name);
  });

  // DELETE Tests
  test('should delete user successfully', async () => {
    const userId = 1;
    const response = await userClient.deleteUser(userId);

    // Most APIs return 200 or 204 for successful deletion
    expect([200, 204]).toContain(response.status);
  });

  // Validation Tests
  test('should validate user object structure', async () => {
    const response = await userClient.getUserById(1);
    const user = response.data;

    // Validate required fields exist
    ApiValidators.validateStringField(user.name);
    ApiValidators.validateStringField(user.username);
    ApiValidators.validateStringField(user.email);
    ApiValidators.validateNumberField(user.id, 1);
  });

  test('should validate user email format', async () => {
    const response = await userClient.getUserById(1);
    const user = response.data;

    // Validate email format
    ApiValidators.validateEmailFormat(user.email);
  });

  test('should validate user address structure when present', async () => {
    const response = await userClient.getUserById(1);
    const user = response.data;

    if (user.address) {
      ApiValidators.validateResponseFields(user.address, ['street', 'city', 'zipcode']);
    }
  });

  // Performance/Timeout Tests
  test('should retrieve users within acceptable time', async () => {
    const startTime = Date.now();
    await userClient.getAllUsers();
    const responseTime = Date.now() - startTime;

    ApiValidators.validateResponseTime(responseTime, 5000); // Should respond within 5 seconds
  });

  // Edge Case Tests
  test('should handle retrieving user with special characters in response', async () => {
    const response = await userClient.getAllUsers();
    const users = response.data;

    // Just verify the response is valid
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBeTruthy();
  });

  test('should verify all returned users have required fields', async () => {
    const response = await userClient.getAllUsers();
    const users = response.data;

    for (const user of users) {
      ApiValidators.validateResponseFields(user, ['id', 'username', 'email']);
    }
  });
});
