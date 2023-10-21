// npx mocha test/user-tests.js for running tests

const chai = require('chai');
const expect = chai.expect;
const Userr = require('../user'); // Adjust the path as needed

const User = Userr[0]

describe('User', () => {
  let userInstance;

  beforeEach(() => {
    // Create a new user instance before each test
    userInstance = new User();
  });

  describe('registerUser', () => {
    it('should register a new user', () => {
      const result = userInstance.registerUser("alice", "alice@example.com", "secret_password");
      expect(result).to.equal("Registration successful. You can now log in.");
    });

    it('should reject a duplicate username', () => {
      // Register the same user twice to simulate a duplicate username
      userInstance.registerUser("alice", "alice@example.com", "secret_password");
      const result = userInstance.registerUser("alice", "another@example.com", "another_password");
      expect(result).to.equal("Username already exists. Please choose a different one.");
    });
  });

  describe('login', () => {
    it('should allow a registered user to log in with the correct password', () => {
      userInstance.registerUser("alice", "alice@example.com", "secret_password");
      const result = userInstance.login("alice", "secret_password");
      expect(result).to.equal("Welcome, alice!");
    });

    it('should reject login with an incorrect password', () => {
      userInstance.registerUser("alice", "alice@example.com", "secret_password");
      const result = userInstance.login("alice", "wrong_password");
      expect(result).to.equal("Incorrect password. Please try again.");
    });

    it('should reject login for an unregistered user', () => {
      const result = userInstance.login("bob", "some_password");
      expect(result).to.equal("User not found. Please register.");
    });
  });
});
