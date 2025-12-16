import { AxiosResponse } from 'axios';
import { ApiClient } from './ApiClient';
import { User } from '../models/User';

/**
 * UserClient - API client for User endpoints
 * Similar to UserClient.java in Kotlin project
 */
export class UserClient extends ApiClient {
  private baseEndpoint = '/users';

  /**
   * Get all users
   */
  async getAllUsers(): Promise<AxiosResponse<User[]>> {
    return await this.get(this.baseEndpoint);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<AxiosResponse<User>> {
    return await this.get(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Create a new user
   */
  async createUser(user: User): Promise<AxiosResponse<User>> {
    return await this.post(this.baseEndpoint, user);
  }

  /**
   * Update user by ID
   */
  async updateUser(id: number, user: Partial<User>): Promise<AxiosResponse<User>> {
    return await this.put(`${this.baseEndpoint}/${id}`, user);
  }

  /**
   * Partially update user by ID (PATCH)
   */
  async patchUser(id: number, user: Partial<User>): Promise<AxiosResponse<User>> {
    return await this.patch(`${this.baseEndpoint}/${id}`, user);
  }

  /**
   * Delete user by ID
   */
  async deleteUser(id: number): Promise<AxiosResponse> {
    return await this.delete(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Get users by username
   */
  async getUserByUsername(username: string): Promise<AxiosResponse<User[]>> {
    return await this.get(this.baseEndpoint, { username });
  }

  /**
   * Get user count
   */
  async getUserCount(): Promise<number> {
    const response = await this.getAllUsers();
    return response.data.length;
  }
}
