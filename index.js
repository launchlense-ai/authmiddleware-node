// index.js

const axios = require('axios');

class AuthMiddlewareService {
  constructor() {
    this.baseUrl = 'https://api.amw.launchlense.tech/api/v1/client/';
    this.accessKey = null;
    this.token = null;
  }

  // Initialize the service with an access key
  async initAuthMiddleware(accessKey) {
    this.accessKey = accessKey;
    // Store accessKey in environment variables or a secure store as needed
  }

  // Load the access key from environment variables if not already loaded
//   async loadConfig() {
//     if (!this.accessKey) {
//       this.accessKey = process.env.ACCESS_KEY;
//     }
//   }



  // Helper method to make HTTP POST requests and handle responses
  async postRequest(endpoint, body, onSuccess, onError, token = null) {
    // await this.loadConfig();
    // await this.loadToken();
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.accessKey && { 'Authorization': this.accessKey }),
      ...(token && { 'Authorization': `${this.token}` }),
    };

    try {
      const response = await axios.post(url, body, { headers });
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        const error = response.data.message;
        onError(error);
        console.error('Error:', error);
      }
    } catch (error) {
      onError(`Failed to send request: ${error}`);
      console.error('Error:', error);
    }
  }

  // Get the client's IP address
  async getIpAddress() {
    try {
      const { data } = await axios.get('https://api.ipify.org?format=json');
      return data.ip;
    } catch (error) {
      console.error('Failed to get IP address:', error);
      return null;
    }
  }

  async loginWithEmail(email, password, onSuccess, onError) {
    const ipAddress = await this.getIpAddress() || '';
    await this.postRequest(
      'login_with_email',
      {
        email,
        password,
        ip: ipAddress,
      },
      onSuccess,
      onError
    );
  }

  // Initialize login
  async initLogin(contact, otpLength, onSuccess, onError, isMfa = false, mfaTypes = [], authType = 'otp') {
    const ipAddress = await this.getIpAddress() || '';
    await this.postRequest(
      'init_login',
      {
        contact,
        otp_length: otpLength,
        type: authType,
        ismfa: isMfa.toString(),
        mfaTypes,
        ip: ipAddress,
      },
      onSuccess,
      onError
    );
  }

  // Verify authentication
  async verifyAuth(contact, password, onSuccess, onError, isBiometric = false, biometricsInput = {}) {
    await this.postRequest(
      'verify_auth',
      {
        contact,
        otp: password,
        isbiometric: isBiometric.toString(),
        biometrics_input: biometricsInput,
      },
      async (response) => {
        if (response.Status === true) {
          this.token = response.data;
          // Store token securely as needed
          // await this.loadToken(); // Update the stored token
          onSuccess(response);
        } else if (response.Status === false) {
          const errorMessages = {
            USER_BANNED: 'You have been blocked from access',
            INVALID_USER: 'Please enter correct contact number',
            INVALID_CONTACT: 'Please enter correct contact number',
            UNAUTHORIZED_USER: 'Resources you are trying to find are not found',
            SERVER_ERROR: 'Something went wrong...',
          };
          const errorMsg = errorMessages[response.message] || 'Unknown error';
          onError(response.message);
          console.error('Error:', errorMsg);
        } else {
          onError('Unknown error');
        }
      },
      onError
    );
  }

  async authorizeUser(token,onSuccess, onError) {
    // await this.loadToken();
    await this.postRequest(
      'authorize_user',
      {},
      onSuccess,
      onError,
      token
    );
  }
}

module.exports = AuthMiddlewareService;
