// npx mocha test/user-tests.js for running tests

const chai = require('chai');
const expect = chai.expect;
const UserModule = require('../user'); // Adjust the path as needed

let username1 = "alice";
let username2 = "bob";
let email1 = "alice@example.com";
let email2 = "another@example.com"
let password1 = "secret_password";
let password2 = "another_password"
let balance = 10000;
let currency = "inr";

const User = UserModule[0];
const userData = UserModule[1];
const { getStockSummary, generateHexUserId } = require('../miscellaneous');

describe('User', () => {
  let userInstance;

  beforeEach(() => {
    // Create a new user instance before each test
    userInstance = new User();
  });

  describe('registerUser', () => {
    it('should register a new user', () => {
      const result = userInstance.registerUser(username1, email1, password1, balance, currency);
      expect(result).to.equal("Registration successful. You can now log in.");
    });

    it('should reject a duplicate username', () => {
      // Register the same user twice to simulate a duplicate username
      const result = userInstance.registerUser(username1, email2, password2, balance, currency);
      expect(result).to.equal("Username already exists. Please choose a different one.");
    });
  });

  describe('login', () => {
    it('should allow a registered user to log in with the correct password', () => {
      userInstance.registerUser(username1, email1, password1, balance, currency);
      const result = userInstance.login(username1, password1);
      expect(result).to.equal("Welcome, " + username1 + "!");
    });

    it('should reject login with an incorrect password', () => {
      userInstance.registerUser(username1, email1, password1);
      const result = userInstance.login(username1, password2);
      expect(result).to.equal("Incorrect password. Please try again.");
    });

    it('should reject login for an unregistered user', () => {
      const result = userInstance.login(username2, password2);
      expect(result).to.equal("User not found. Please register.");
    });
  });
});
