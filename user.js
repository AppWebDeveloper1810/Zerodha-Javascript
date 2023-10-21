const bcrypt = require('bcrypt');

// In-memory user data stored as an array of user objects
const userData = [];
const saltRounds = 2; // Number of salt rounds (adjust according to your security needs)


function registerUser(username, email, password) {
  // Check if the username is unique
  if (!isUsernameUnique(username)) {
    return "Username already exists. Please choose a different one.";
  }

  // Hash the password (In practice, use a secure hashing library)
  const hashedPassword = hashPassword(password);

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

function login(username, password) {
  // Find the user with the provided username
  const user = findUserByUsername(username);

  if (!user) {
    return "User not found. Please register.";
  }

  // Verify the password (In practice, use a secure hashing library)
  if (verifyPassword(password, user.password)) {
    return `Welcome, ${username}!`;
  } else {
    return "Incorrect password. Please try again.";
  }
}

function isUsernameUnique(username) {
    let isUnique = true;
    userData.forEach((user) => {
      if (user.username === username) {
        isUnique = false;
      }
    });
    return isUnique;
}

function findUserByUsername(username) {
    let foundUser = null;
    userData.forEach((user) => {
      if (user.username === username) {
        foundUser = user;
      }
    });
    return foundUser;
}
  
function hashPassword(password) {
    // Generate a salt and hash the password with bcrypt
    return bcrypt.hashSync(password, saltRounds);
}

function verifyPassword(plainPassword, hashedPassword) {
  // In practice, use a secure hashing library (e.g., bcrypt)
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

// Example usage
console.log(registerUser("alice", "alice@example.com", "secret_password"));
console.log(login("alice", "wrong_password")); // Incorrect password
console.log(login("bob", "some_password")); // User not found. Please register.
