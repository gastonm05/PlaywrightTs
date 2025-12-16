import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiConfig } from './ApiConfig';

/**
 * RestAssuredConfig - HTTP Client wrapper similar to REST Assured in Kotlin
 * Provides helper methods for making HTTP requests
 */
export class RestAssuredConfig {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: ApiConfig.TIMEOUT,
      headers: ApiConfig.getDefaultHeaders(),
    });
  }

  /**
   * Make GET request
   */
  async get(path: string, params?: any): Promise<AxiosResponse> {
    try {
      return await this.client.get(path, { params });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Make POST request
   */
  async post(path: string, data?: any, headers?: any): Promise<AxiosResponse> {
    try {
      return await this.client.post(path, data, { headers });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Make PUT request
   */
  async put(path: string, data?: any, headers?: any): Promise<AxiosResponse> {
    try {
      return await this.client.put(path, data, { headers });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Make PATCH request
   */
  async patch(path: string, data?: any, headers?: any): Promise<AxiosResponse> {
    try {
      return await this.client.patch(path, data, { headers });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Make DELETE request
   */
  async delete(path: string, params?: any): Promise<AxiosResponse> {
    try {
      return await this.client.delete(path, { params });
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Handle errors
   */
  private handleError(error: any): void {
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      console.error(`Response: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * Get axios instance for advanced usage
   */
  getClient(): AxiosInstance {
    return this.client;
  }
}
