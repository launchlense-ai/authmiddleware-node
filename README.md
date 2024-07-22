Here is a `README.md` file to demonstrate the implementation of the `authmiddleware` package:

```markdown
# AuthMiddlewareService

`AuthMiddlewareService` is a Node.js package for handling authentication middleware. This package provides methods to initialize authentication, login with email, verify authentication, and authorize a user. The package uses Axios for making HTTP requests.

## Installation

To install the package, use npm:

```bash
npm install @launchlense-ai/authmiddleware

```

## Usage

## Get Access Token

1. Login to (https://portal.amw.launchlense.tech) 
2. Create a new project
3. you will receive the token, please store it in a secure place you if lost cannot be regenerated again.


### Importing the Package

First, import the `AuthMiddlewareService` class:

```javascript
const AuthMiddlewareService = require('authmiddleware');
```

### Initializing the Service

Before using any methods, initialize the service with your access key:

```javascript
const authMiddleware = new AuthMiddlewareService();
authMiddleware.initAuthMiddleware('your-access-key-here');
```

### Login with Email

Use the `loginWithEmail` method to login with an email and password:

```javascript
authMiddleware.loginWithEmail(
  'user@example.com',
  'password123',
  (data) => {
    console.log('Login successful:', data);
  },
  (error) => {
    console.error('Login failed:', error);
  }
);
```

### Initialize Login

Use the `initLogin` method to initiate login with an OTP:

```javascript
authMiddleware.initLogin(
  'user@example.com',
  6, // OTP length
  (data) => {
    console.log('Login initialized:', data);
  },
  (error) => {
    console.error('Login initialization failed:', error);
  }
);
```

### Verify Authentication

Use the `verifyAuth` method to verify authentication with the received OTP:

```javascript
authMiddleware.verifyAuth(
  'user@example.com',
  'otp123456',
  (data) => {
    console.log('Verification successful:', data);
  },
  (error) => {
    console.error('Verification failed:', error);
  }
);
```

### Authorize User

Use the `authorizeUser` method to authorize a user with a token:

```javascript
authMiddleware.authorizeUser(
  'user-token-here',
  (data) => {
    console.log('User authorized:', data);
  },
  (error) => {
    console.error('Authorization failed:', error);
  }
);
```

### Getting IP Address

The package internally uses the `getIpAddress` method to fetch the client's IP address when required.

## Example

Here is a complete example demonstrating how to use the `AuthMiddlewareService`:

```javascript
const AuthMiddlewareService = require('authmiddleware');

async function main() {
  const authMiddleware = new AuthMiddlewareService();
  await authMiddleware.initAuthMiddleware('your-access-key-here');

  // Login with email
  await authMiddleware.loginWithEmail(
    'user@example.com',
    'password123',
    (data) => {
      console.log('Login successful:', data);
    },
    (error) => {
      console.error('Login failed:', error);
    }
  );

  // Initialize login
  await authMiddleware.initLogin(
    'user@example.com',
    6, // OTP length
    (data) => {
      console.log('Login initialized:', data);
    },
    (error) => {
      console.error('Login initialization failed:', error);
    }
  );

  // Verify authentication
  await authMiddleware.verifyAuth(
    'user@example.com',
    'otp123456',
    (data) => {
      console.log('Verification successful:', data);
    },
    (error) => {
      console.error('Verification failed:', error);
    }
  );

  // Authorize user
  await authMiddleware.authorizeUser(
    'user-token-here',
    (data) => {
      console.log('User authorized:', data);
    },
    (error) => {
      console.error('Authorization failed:', error);
    }
  );
}

main();
```
## Support
For issues or questions, please open an issue on [GitHub](https://github.com/launchlense-ai/authmiddleware-node/issues).

## License

This project is licensed under the MIT License.
```