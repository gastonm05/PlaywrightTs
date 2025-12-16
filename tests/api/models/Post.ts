/**
 * Post - Post data model matching JSONPlaceholder API
 * https://jsonplaceholder.typicode.com/posts
 */
export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

/**
 * Comment - Comment data model for nested comments
 * https://jsonplaceholder.typicode.com/posts/1/comments
 */
export interface Comment {
  postId: number;
  id?: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Post Factory - Provides factory methods for creating test post data
 * Generates data compatible with JSONPlaceholder API
 */
export class PostFactory {
  /**
   * Create a default post with all fields
   */
  static createDefaultPost(): Post {
    return {
      userId: 1,
      title: 'Test Post Title',
      body: 'This is a test post body with meaningful content for testing purposes.',
    };
  }

  /**
   * Create a post with custom user ID, title, and body
   */
  static createPost(userId: number, title: string, body: string): Post {
    return {
      userId,
      title,
      body,
    };
  }

  /**
   * Create multiple posts for batch testing
   */
  static createPosts(userId: number, count: number): Post[] {
    const posts: Post[] = [];
    for (let i = 1; i <= count; i++) {
      posts.push({
        userId,
        title: `Test Post ${i}`,
        body: `This is test post body number ${i} with meaningful content for testing.`,
      });
    }
    return posts;
  }

  /**
   * Create a post with minimal fields
   */
  static createMinimalPost(userId: number): Post {
    return {
      userId,
      title: 'Minimal Post',
      body: 'Minimal post body',
    };
  }

  /**
   * Create a post with long content
   */
  static createLongPost(userId: number): Post {
    const longBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
    return {
      userId,
      title: 'Long Content Post',
      body: longBody,
    };
  }

  /**
   * Create a post with special characters
   */
  static createPostWithSpecialChars(userId: number): Post {
    return {
      userId,
      title: 'Post with Special Chars: @#$%^&*()',
      body: 'Body with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
    };
  }

  /**
   * Create multiple posts for a specific user
   */
  static createPostsByUser(userId: number, count: number): Post[] {
    return this.createPosts(userId, count);
  }

  /**
   * Create a test comment
   */
  static createComment(postId: number): Comment {
    return {
      postId,
      name: 'Test Comment Name',
      email: 'comment@example.com',
      body: 'This is a test comment body for testing purposes.',
    };
  }

  /**
   * Create multiple comments for a post
   */
  static createComments(postId: number, count: number): Comment[] {
    const comments: Comment[] = [];
    for (let i = 1; i <= count; i++) {
      comments.push({
        postId,
        name: `Comment Author ${i}`,
        email: `comment${i}@example.com`,
        body: `This is test comment number ${i}`,
      });
    }
    return comments;
  }

  /**
   * Create a comment with custom data
   */
  static createCustomComment(
    postId: number,
    name: string,
    email: string,
    body: string
  ): Comment {
    return {
      postId,
      name,
      email,
      body,
    };
  }
}
