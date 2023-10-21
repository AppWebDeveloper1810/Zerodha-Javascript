// npx mocha test/password-tests.js for running tests

const chai = require('chai');
const expect = chai.expect;
const PasswordClass = require('../password'); // Adjust the path as needed

describe('PasswordClass', () => {
  describe('hashPassword', () => {
    it('should hash a password', () => {
      const plainPassword = 'test_password';
      const hashedPassword = PasswordClass.hashPassword(plainPassword);

      expect(hashedPassword).to.be.a('string');
      expect(hashedPassword).to.not.equal(plainPassword);
    });
  });

  describe('verifyPassword', () => {
    it('should verify a correct password', () => {
      const plainPassword = 'test_password';
      const hashedPassword = PasswordClass.hashPassword(plainPassword);

      const result = PasswordClass.verifyPassword(plainPassword, hashedPassword);

      expect(result).to.be.true;
    });

    it('should reject an incorrect password', () => {
      const correctPassword = 'test_password';
      const incorrectPassword = 'wrong_password';
      const hashedPassword = PasswordClass.hashPassword(correctPassword);

      const result = PasswordClass.verifyPassword(incorrectPassword, hashedPassword);

      expect(result).to.be.false;
    });
  });
});
