import { AxiosResponse } from 'axios';
import { ApiClient } from './ApiClient';
import { Post } from '../models/Post';

/**
 * PostClient - API client for Post endpoints
 * Similar to PostClient.java in Kotlin project
 */
export class PostClient extends ApiClient {
  private baseEndpoint = '/posts';

  /**
   * Get all posts
   */
  async getAllPosts(): Promise<AxiosResponse<Post[]>> {
    return await this.get(this.baseEndpoint);
  }

  /**
   * Get post by ID
   */
  async getPostById(id: number): Promise<AxiosResponse<Post>> {
    return await this.get(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Create a new post
   */
  async createPost(post: Post): Promise<AxiosResponse<Post>> {
    return await this.post(this.baseEndpoint, post);
  }

  /**
   * Update post by ID
   */
  async updatePost(id: number, post: Partial<Post>): Promise<AxiosResponse<Post>> {
    return await this.put(`${this.baseEndpoint}/${id}`, post);
  }

  /**
   * Partially update post by ID (PATCH)
   */
  async patchPost(id: number, post: Partial<Post>): Promise<AxiosResponse<Post>> {
    return await this.patch(`${this.baseEndpoint}/${id}`, post);
  }

  /**
   * Delete post by ID
   */
  async deletePost(id: number): Promise<AxiosResponse> {
    return await this.delete(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Get posts by user ID
   */
  async getPostsByUserId(userId: number): Promise<AxiosResponse<Post[]>> {
    return await this.get(this.baseEndpoint, { userId });
  }

  /**
   * Get post count
   */
  async getPostCount(): Promise<number> {
    const response = await this.getAllPosts();
    return response.data.length;
  }

  /**
   * Get comments for a specific post
   */
  async getPostComments(postId: number): Promise<AxiosResponse> {
    return await this.get(`${this.baseEndpoint}/${postId}/comments`);
  }
}
