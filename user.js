const PortfolioTracker = require('./portfolioTracker'); // Assuming you have a separate file for PortfolioTracker
const PasswordClass = require('./password');
const TradeHistory = require('./tradeHistory');
const { getStockSummary, generateHexUserId } = require('./miscellaneous');

console.log(generateHexUserId(16));
// In-memory user data stored as an array of user objects
const userData = [];

class User {
  constructor() {
    this.portfolioTracker = new PortfolioTracker();
    this.tradeHistory = new TradeHistory();
    this.generateHexUserId = generateHexUserId;
    
  }
  registerUser(username, email, password, balance, currency) {
    // Check the data types of parameters
    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof balance !== 'number' ||
      typeof currency !== 'string'
    ) {
      return "Invalid parameter data types.";
    }
    // Check if the username is unique
    if (!this.isUsernameUnique(username)) {
      return "Username already exists. Please choose a different one.";
    }
    // Hash the password using the static method of PasswordClass
    const hashedPassword = PasswordClass.hashPassword(password);
    // Create a user object and store it in the userData array
    const userId = this.generateHexUserId(16)
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
    // Check the data types of parameters
    if (typeof username !== 'string' || typeof password !== 'string') {
      return "Invalid parameter data types.";
    }
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
    // Check the data type of the parameter
    if (typeof username !== 'string') {
      return false;
    }
    return !userData.some((user) => user.username === username);
  }
  isUserIdUnique(userId) {
    // Check the data type of the parameter
    if (typeof userId !== 'string') {
      return false;
    }
    return !userData.some((user) => user.userId === userId);
  }
  findUserByUsername(username) {
    // Check the data type of the parameter
    if (typeof username !== 'string') {
      return null;
    }
    return userData.find((user) => user.username === username) || null;
  }
  findUserByUserId(userId) {
    // Check the data type of the parameter
    if (typeof userId !== 'string') {
      return null;
    }
    return userData.find((user) => user.userId === userId) || null;
  }
}
const user = new User();
module.exports = [User, userData];