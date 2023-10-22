const PortfolioTracker = require('./portfolioTracker'); // Assuming you have a separate file for PortfolioTracker
const PasswordClass = require('./password');

// In-memory user data stored as an array of user objects
const userData = [];

class User {
  constructor() {
    this.portfolioTracker = new PortfolioTracker();
  }
  registerUser(userId, username, email, password, balance, currency) {
    // Check if the username is unique
    if (!this.isUsernameUnique(username)) {
      return "Username already exists. Please choose a different one.";
    }
    // Check if the userId is unique
    if (!this.isUserIdunique(userId)) {
      return "UserId is not unique.";
    }
    // Hash the password using the static method of PasswordClass
    const hashedPassword = PasswordClass.hashPassword(password);
    // Create a user object and store it in the userData array
    const user = {
      userId: userId,
      username: username,
      email: email,
      password: hashedPassword,
      balance: balance, // Initial account balance
      currency: currency
    };
    userData.push(user);
    this.portfolioTracker.createPortfolio(userId, "Main Portfolio")
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
    return !userData.some((user) => user.username === username);
  }
  isUserIdUnique(userId) {
    return !userData.some((user) => user.userId === userId);
  }
  findUserByUsername(username) {
    return userData.find((user) => user.username === username) || null;
  }
  findUserByUserId(userId) {
    return userData.find((user) => user.userId === userId) || null;
  }
}
module.exports = [User, userData];