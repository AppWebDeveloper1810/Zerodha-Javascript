// npx mocha test/user-tests.js for running tests

const chai = require('chai');
const expect = chai.expect;
const Userr = require('../user'); // Adjust the path as needed
const crypto = require('crypto');

let username1 = "alice";
let username2 = "bob";
let email1 = "alice@example.com";
let email2 = "another@example.com"
let password1 = "secret_password";
let password2 = "another_password"
let balance = 10000;
let currency = "inr";

const User = Userr[0]
const userData = Userr[1]

function generateHexUserId(length) {
  const numBytes = Math.ceil(length / 2); // Each byte corresponds to 2 hex digits
  const randomBytes = crypto.randomBytes(numBytes);
  const hexUserId = randomBytes.toString('hex').slice(0, length);
  return hexUserId;
}

describe('User', () => {
  let userInstance;

  beforeEach(() => {
    // Create a new user instance before each test
    userInstance = new User();
  });

  describe('registerUser', () => {
    it('should register a new user', () => {
      const userId = generateHexUserId(16);
      const result = userInstance.registerUser(userId, username1, email1, password1, balance, currency);
      expect(result).to.equal("Registration successful. You can now log in.");
    });

    it('should reject a duplicate username', () => {
      // Register the same user twice to simulate a duplicate username
      const userId = generateHexUserId(16)
      const result = userInstance.registerUser(userId, username1, email2, password2, balance, currency);
      expect(result).to.equal("Username already exists. Please choose a different one.");
      //region console.log("asdfg"+userData)
    });
  });

  describe('login', () => {
    it('should allow a registered user to log in with the correct password', () => {
      const userId = generateHexUserId(16);
      userInstance.registerUser(userId, username1, email1, password1, balance, currency);
      const result = userInstance.login(username1, password1);
      expect(result).to.equal("Welcome, "+username1+"!");
      console.log("asdfghjkl;"+userData)
    });

    it('should reject login with an incorrect password', () => {
      const userId = generateHexUserId(16);
      userInstance.registerUser(userId, username1, email1, password1);
      const result = userInstance.login(username1, password2);
      expect(result).to.equal("Incorrect password. Please try again.");
    });

    it('should reject login for an unregistered user', () => {
      const result = userInstance.login(username2, password2);
      expect(result).to.equal("User not found. Please register.");
    });
  });
});
