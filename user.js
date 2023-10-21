const PasswordClass = require('./password');

// In-memory user data stored as an array of user objects
const userData = [];

class User {
  constructor() {}

  registerUser(username, email, password) {
    // Check if the username is unique
    if (!this.isUsernameUnique(username)) {
      return "Username already exists. Please choose a different one.";
    }

    // Hash the password using the static method of PasswordClass
    const hashedPassword = PasswordClass.hashPassword(password);

    // Create a user object and store it in the userData array
    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      balance: 0, // Initial account balance
    };
    userData.push(user);

    return "Registration successful. You can now log in.";
  }

  login(username, password) {
    // Find the user with the provided username
    const user = this.findUserByUsername(username);

    if (!user) {
      return "User not found. Please register.";
    }

    // Verify the password (In practice, use a secure hashing library)
    if (PasswordClass.verifyPassword(password, user.password)) {
      return `Welcome, ${username}!`;
    } else {
      return "Incorrect password. Please try again.";
    }
  }

  isUsernameUnique(username) {
    let isUnique = true;
    userData.forEach((user) => {
      if (user.username === username) {
        isUnique = false;
      }
    });
    return isUnique;
  }

  findUserByUsername(username) {
    let foundUser = null;
    userData.forEach((user) => {
      if (user.username === username) {
        foundUser = user;
      }
    });
    return foundUser;
  }
}

module.exports = [User, userData];