import { test, expect } from '@playwright/test';
import { PostClient } from '../clients/PostClient';
import { PostFactory } from '../models/Post';
import { ApiValidators } from '../utils/ApiValidators';

/**
 * PostApiTest - Test suite for Post API endpoints
 * Similar to PostApiTest.java in Kotlin project
 */
test.describe('Post API Tests', () => {
  let postClient: PostClient;

  test.beforeEach(async () => {
    postClient = new PostClient();
  });

  // GET - Retrieve Tests
  test('should retrieve all posts successfully', async () => {
    const response = await postClient.getAllPosts();

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    ApiValidators.validateArrayResponse(response.data, 1);
    ApiValidators.validateContentType(response.headers, 'application/json');
  });

  test('should retrieve post by valid ID', async () => {
    const postId = 1;
    const response = await postClient.getPostById(postId);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    ApiValidators.validateResponseFields(response.data, ['id', 'userId', 'title', 'body']);
    expect(response.data.id).toBe(postId);
  });

  test('should handle non-existent post ID gracefully', async () => {
    const postId = 99999;
    try {
      await postClient.getPostById(postId);
    } catch (error: any) {
      // API should handle gracefully (return 404 or similar)
      expect([404, 500]).toContain(error.response?.status || 500);
    }
  });

  test('should get post count', async () => {
    const count = await postClient.getPostCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should retrieve posts by user ID', async () => {
    const userId = 1;
    const response = await postClient.getPostsByUserId(userId);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    if (response.data.length > 0) {
      expect(response.data[0].userId).toBe(userId);
    }
  });

  test('should retrieve comments for a post', async () => {
    const postId = 1;
    const response = await postClient.getPostComments(postId);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    ApiValidators.validateArrayResponse(response.data, 0); // May have 0 or more comments
  });

  // CREATE - POST Tests
  test('should create a new post successfully', async () => {
    const newPost = PostFactory.createPost(1, 'New Test Post', 'This is a new test post body.');

    const response = await postClient.createPost(newPost);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 201);
    ApiValidators.validateResponseFields(response.data, ['id', 'userId', 'title', 'body']);
    expect(response.data.userId).toBe(newPost.userId);
    expect(response.data.title).toBe(newPost.title);
    expect(response.data.body).toBe(newPost.body);
  });

  test('should create post with long content', async () => {
    const longPost = PostFactory.createLongPost(1);
    const response = await postClient.createPost(longPost);

    ApiValidators.validateStatusCode(response.status, 201);
    expect(response.data.body.length).toBeGreaterThan(100);
  });

  test('should create post with special characters', async () => {
    const specialPost = PostFactory.createPostWithSpecialChars(1);
    const response = await postClient.createPost(specialPost);

    ApiValidators.validateStatusCode(response.status, 201);
    expect(response.data.title).toContain('@');
  });

  test('should create multiple posts in batch', async () => {
    const postsToCreate = PostFactory.createPosts(1, 3);
    const responses = [];

    for (const post of postsToCreate) {
      const response = await postClient.createPost(post);
      responses.push(response);
    }

    // Verify all posts created successfully
    for (const response of responses) {
      ApiValidators.validateStatusCode(response.status, 201);
    }
  });

  // UPDATE - PUT Tests
  test('should update post successfully with PUT', async () => {
    const postId = 1;
    const updatedPost = {
      title: 'Updated Post Title',
      body: 'This is an updated post body.',
    };

    const response = await postClient.updatePost(postId, updatedPost);

    // Validate response
    ApiValidators.validateStatusCode(response.status, 200);
    expect(response.data.title).toBe(updatedPost.title);
  });

  test('should partially update post with PATCH', async () => {
    const postId = 1;
    const partialUpdate = {
      title: 'Patched Post Title',
    };

    const response = await postClient.patchPost(postId, partialUpdate);

    ApiValidators.validateStatusCode(response.status, 200);
    expect(response.data.title).toBe(partialUpdate.title);
  });

  // DELETE Tests
  test('should delete post successfully', async () => {
    const postId = 1;
    const response = await postClient.deletePost(postId);

    // Most APIs return 200 or 204 for successful deletion
    expect([200, 204]).toContain(response.status);
  });

  // Validation Tests
  test('should validate post object structure', async () => {
    const response = await postClient.getPostById(1);
    const post = response.data;

    // Validate required fields exist
    ApiValidators.validateNumberField(post.id, 1);
    ApiValidators.validateNumberField(post.userId, 1);
    ApiValidators.validateStringField(post.title);
    ApiValidators.validateStringField(post.body);
  });

  test('should validate all posts have required fields', async () => {
    const response = await postClient.getAllPosts();
    const posts = response.data;

    for (const post of posts) {
      ApiValidators.validateResponseFields(post, ['id', 'userId', 'title', 'body']);
    }
  });

  // Performance/Timeout Tests
  test('should retrieve posts within acceptable time', async () => {
    const startTime = Date.now();
    await postClient.getAllPosts();
    const responseTime = Date.now() - startTime;

    ApiValidators.validateResponseTime(responseTime, 5000); // Should respond within 5 seconds
  });

  test('should retrieve post comments within acceptable time', async () => {
    const startTime = Date.now();
    await postClient.getPostComments(1);
    const responseTime = Date.now() - startTime;

    ApiValidators.validateResponseTime(responseTime, 5000);
  });

  // Data Integrity Tests
  test('should verify post userId is numeric', async () => {
    const response = await postClient.getPostById(1);
    const post = response.data;

    expect(typeof post.userId).toBe('number');
    expect(post.userId).toBeGreaterThan(0);
  });

  test('should verify post title is not empty', async () => {
    const response = await postClient.getAllPosts();
    const posts = response.data;

    for (const post of posts.slice(0, 10)) {
      // Check first 10 posts
      expect(post.title).toBeTruthy();
      expect(post.title.length).toBeGreaterThan(0);
    }
  });

  test('should verify post body is not empty', async () => {
    const response = await postClient.getAllPosts();
    const posts = response.data;

    for (const post of posts.slice(0, 10)) {
      // Check first 10 posts
      expect(post.body).toBeTruthy();
      expect(post.body.length).toBeGreaterThan(0);
    }
  });

  // Content Type Tests
  test('should return JSON content type for all post endpoints', async () => {
    const response = await postClient.getAllPosts();
    ApiValidators.validateContentType(response.headers, 'application/json');
  });

  // Edge Cases
  test('should handle retrieving posts from user with many posts', async () => {
    const response = await postClient.getPostsByUserId(1);

    // Should return array regardless of count
    expect(Array.isArray(response.data)).toBeTruthy();
  });
});
