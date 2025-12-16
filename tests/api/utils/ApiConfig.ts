/**
 * ApiConfig - Configuration for API testing
 * Similar to ApiConfig.java in the Kotlin project
 */
export class ApiConfig {
  static readonly BASE_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
  static readonly TIMEOUT = 10000;
  static readonly RETRY_COUNT = 3;
  static readonly HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  /**
   * Get full URL for endpoint
   */
  static getEndpointUrl(path: string): string {
    return `${this.BASE_URL}${path}`;
  }

  /**
   * Get default headers
   */
  static getDefaultHeaders() {
    return { ...this.HEADERS };
  }
}
