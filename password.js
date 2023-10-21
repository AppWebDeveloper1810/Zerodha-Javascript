const bcrypt = require('bcrypt');

class PasswordClass {
    static hashPassword(password) {
      // Generate a salt and hash the password with bcrypt
      const saltRounds = 10; // You can adjust the number of salt rounds
      const salt = bcrypt.genSaltSync(saltRounds);
      return bcrypt.hashSync(password, salt);
    }
  
    static verifyPassword(plainPassword, hashedPassword) {
      // In practice, use a secure hashing library (e.g., bcrypt)
      return bcrypt.compareSync(plainPassword, hashedPassword);
    }
  }


module.exports = PasswordClass;