import { AxiosResponse } from 'axios';
import { RestAssuredConfig } from '../utils/RestAssuredConfig';

/**
 * ApiClient - Base API client with common HTTP operations
 * Similar to generic API client in Kotlin project
 */
export class ApiClient {
  protected client: RestAssuredConfig;

  constructor() {
    this.client = new RestAssuredConfig();
  }

  /**
   * Get request
   */
  async get(endpoint: string, params?: any): Promise<AxiosResponse> {
    return await this.client.get(endpoint, params);
  }

  /**
   * Post request
   */
  async post(endpoint: string, body?: any, headers?: any): Promise<AxiosResponse> {
    return await this.client.post(endpoint, body, headers);
  }

  /**
   * Put request
   */
  async put(endpoint: string, body?: any, headers?: any): Promise<AxiosResponse> {
    return await this.client.put(endpoint, body, headers);
  }

  /**
   * Patch request
   */
  async patch(endpoint: string, body?: any, headers?: any): Promise<AxiosResponse> {
    return await this.client.patch(endpoint, body, headers);
  }

  /**
   * Delete request
   */
  async delete(endpoint: string, params?: any): Promise<AxiosResponse> {
    return await this.client.delete(endpoint, params);
  }

  /**
   * Get response status code
   */
  getStatusCode(response: AxiosResponse): number {
    return response.status;
  }

  /**
   * Get response body
   */
  getResponseBody(response: AxiosResponse): any {
    return response.data;
  }

  /**
   * Get response headers
   */
  getResponseHeaders(response: AxiosResponse): any {
    return response.headers;
  }
}
