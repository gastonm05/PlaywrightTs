/**
 * Geo - Geolocation data for address
 */
export interface Geo {
  lat: string;
  lng: string;
}

/**
 * Address - Address information for User
 */
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

/**
 * Company - Company information for User
 */
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/**
 * User - User data model matching JSONPlaceholder API
 * https://jsonplaceholder.typicode.com/users
 */
export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

/**
 * User Factory - Provides factory methods for creating test user data
 * Generates data compatible with JSONPlaceholder API
 */
export class UserFactory {
  /**
   * Create a default user with all fields
   */
  static createDefaultUser(): User {
    return {
      name: 'Test User',
      username: 'testuser',
      email: 'testuser@example.com',
      address: {
        street: '123 Test St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345-6789',
        geo: {
          lat: '40.7128',
          lng: '-74.0060',
        },
      },
      phone: '1-123-456-7890',
      website: 'https://testuser.com',
      company: {
        name: 'Test Company',
        catchPhrase: 'Test tagline',
        bs: 'test business service',
      },
    };
  }

  /**
   * Create a user with custom name, username, and email
   */
  static createUser(name: string, username: string, email: string): User {
    return {
      name,
      username,
      email,
      address: {
        street: '123 Test St',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345-6789',
        geo: {
          lat: '40.7128',
          lng: '-74.0060',
        },
      },
      phone: '1-123-456-7890',
      website: 'https://testuser.com',
      company: {
        name: 'Test Company',
        catchPhrase: 'Test tagline',
        bs: 'test business service',
      },
    };
  }

  /**
   * Create multiple users for batch testing
   */
  static createUsers(count: number): User[] {
    const users: User[] = [];
    for (let i = 1; i <= count; i++) {
      users.push(
        this.createUser(
          `User ${i}`,
          `user${i}`,
          `user${i}@example.com`
        )
      );
    }
    return users;
  }

  /**
   * Create a user with minimal required fields
   */
  static createMinimalUser(): User {
    return {
      name: 'Minimal User',
      username: 'minimaluser',
      email: 'minimal@example.com',
    };
  }

  /**
   * Create a user for specific use case (e.g., with custom data)
   */
  static createUserWithCustomData(
    name: string,
    username: string,
    email: string,
    phone?: string,
    website?: string
  ): User {
    return {
      name,
      username,
      email,
      phone,
      website,
    };
  }
}
