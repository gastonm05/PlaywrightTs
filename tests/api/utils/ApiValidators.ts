import { expect } from '@playwright/test';

/**
 * ApiValidators - Common validation utilities for API responses
 * Similar to validators in Kotlin project
 */
export class ApiValidators {
  /**
   * Validate HTTP status code
   */
  static validateStatusCode(statusCode: number, expectedCode: number): void {
    expect(statusCode).toBe(expectedCode);
  }

  /**
   * Validate status code is one of expected values
   */
  static validateStatusCodeIn(statusCode: number, expectedCodes: number[]): void {
    expect(expectedCodes).toContain(statusCode);
  }

  /**
   * Validate response contains required fields
   */
  static validateResponseFields(response: any, requiredFields: string[]): void {
    for (const field of requiredFields) {
      expect(response).toHaveProperty(field);
      expect(response[field]).not.toBeUndefined();
    }
  }

  /**
   * Validate array response
   */
  static validateArrayResponse(response: any[], minLength: number = 0): void {
    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBeGreaterThanOrEqual(minLength);
  }

  /**
   * Validate object not null or undefined
   */
  static validateNotNull(value: any, fieldName: string = 'value'): void {
    expect(value).not.toBeNull();
    expect(value).not.toBeUndefined();
  }

  /**
   * Validate string field
   */
  static validateStringField(value: any, minLength: number = 0): void {
    expect(typeof value).toBe('string');
    if (minLength > 0) {
      expect(value.length).toBeGreaterThanOrEqual(minLength);
    }
  }

  /**
   * Validate number field
   */
  static validateNumberField(value: any, minValue: number = 0): void {
    expect(typeof value).toBe('number');
    expect(value).toBeGreaterThanOrEqual(minValue);
  }

  /**
   * Validate boolean field
   */
  static validateBooleanField(value: any): void {
    expect(typeof value).toBe('boolean');
  }

  /**
   * Validate response content type
   */
  static validateContentType(headers: any, expectedType: string = 'application/json'): void {
    const contentType = headers['content-type'];
    expect(contentType).toContain(expectedType);
  }

  /**
   * Validate response time
   */
  static validateResponseTime(responseTime: number, maxTime: number = 5000): void {
    expect(responseTime).toBeLessThan(maxTime);
  }

  /**
   * Validate empty response
   */
  static validateEmptyResponse(response: any): void {
    if (typeof response === 'object' && response !== null) {
      expect(Object.keys(response).length).toBe(0);
    }
  }

  /**
   * Validate object equality (deep comparison)
   */
  static validateObjectEquality(actual: any, expected: any): void {
    expect(actual).toEqual(expected);
  }

  /**
   * Validate field value matches pattern
   */
  static validateFieldPattern(value: string, pattern: RegExp): void {
    expect(value).toMatch(pattern);
  }

  /**
   * Validate email format
   */
  static validateEmailFormat(email: string): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.validateFieldPattern(email, emailPattern);
  }

  /**
   * Validate UUID format
   */
  static validateUUIDFormat(uuid: string): void {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    this.validateFieldPattern(uuid, uuidPattern);
  }

  /**
   * Validate response contains specific value
   */
  static validateResponseContains(response: any, value: any, fieldName?: string): void {
    if (fieldName) {
      expect(response[fieldName]).toBe(value);
    } else if (Array.isArray(response)) {
      expect(response).toContain(value);
    }
  }

  /**
   * Validate field value matches expected value
   */
  static validateFieldValue(response: any, fieldName: string, expectedValue: any): void {
    expect(response[fieldName]).toBe(expectedValue);
  }

  /**
   * Validate field value is one of expected values
   */
  static validateFieldValueIn(response: any, fieldName: string, expectedValues: any[]): void {
    expect(expectedValues).toContain(response[fieldName]);
  }

  /**
   * Validate nested field exists
   */
  static validateNestedField(response: any, path: string): void {
    const fields = path.split('.');
    let current = response;
    for (const field of fields) {
      expect(current).toHaveProperty(field);
      current = current[field];
    }
  }

  /**
   * Validate array contains object with field value
   */
  static validateArrayContainsFieldValue(array: any[], fieldName: string, expectedValue: any): void {
    const found = array.some(item => item[fieldName] === expectedValue);
    expect(found).toBeTruthy();
  }

  /**
   * Validate all array items have required fields
   */
  static validateArrayItemsHaveFields(array: any[], requiredFields: string[]): void {
    for (const item of array) {
      for (const field of requiredFields) {
        expect(item).toHaveProperty(field);
      }
    }
  }

  /**
   * Validate response is JSON serializable
   */
  static validateJsonSerializable(response: any): void {
    expect(() => JSON.stringify(response)).not.toThrow();
  }

  /**
   * Validate field has specific type
   */
  static validateFieldType(response: any, fieldName: string, expectedType: string): void {
    expect(typeof response[fieldName]).toBe(expectedType);
  }

  /**
   * Validate string length
   */
  static validateStringLength(value: string, minLength: number, maxLength?: number): void {
    expect(value.length).toBeGreaterThanOrEqual(minLength);
    if (maxLength !== undefined) {
      expect(value.length).toBeLessThanOrEqual(maxLength);
    }
  }

  /**
   * Validate numeric range
   */
  static validateNumericRange(value: number, minValue: number, maxValue: number): void {
    expect(value).toBeGreaterThanOrEqual(minValue);
    expect(value).toBeLessThanOrEqual(maxValue);
  }

  /**
   * Validate field is not null
   */
  static validateFieldNotNull(response: any, fieldName: string): void {
    expect(response[fieldName]).not.toBeNull();
  }

  /**
   * Validate field is not undefined
   */
  static validateFieldNotUndefined(response: any, fieldName: string): void {
    expect(response[fieldName]).not.toBeUndefined();
  }

  /**
   * Validate response matches schema
   */
  static validateResponseSchema(response: any, schema: { [key: string]: string }): void {
    for (const [key, expectedType] of Object.entries(schema)) {
      expect(response).toHaveProperty(key);
      expect(typeof response[key]).toBe(expectedType);
    }
  }

  /**
   * Validate array length
   */
  static validateArrayLength(array: any[], expectedLength: number): void {
    expect(array.length).toBe(expectedLength);
  }

  /**
   * Validate array has minimum length
   */
  static validateArrayMinLength(array: any[], minLength: number): void {
    expect(array.length).toBeGreaterThanOrEqual(minLength);
  }

  /**
   * Validate array has maximum length
   */
  static validateArrayMaxLength(array: any[], maxLength: number): void {
    expect(array.length).toBeLessThanOrEqual(maxLength);
  }
}
