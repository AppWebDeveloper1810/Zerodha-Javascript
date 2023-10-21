const User = require('../user');


// Example usage
const userInstance = new User();
console.log(userInstance.registerUser("alice", "alice@example.com", "secret_password"));
console.log(userInstance.login("alice", "wrong_password"));
console.log(userInstance.login("bob", "some_password"));