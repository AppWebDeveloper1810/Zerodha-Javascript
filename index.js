// Import necessary modules and packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Middleware setup: bodyParser for parsing JSON data
app.use(bodyParser.json());

// Define your MongoDB connection URL. Replace 'your_database_url' with the actual URL.
const dbURL = 'mongodb://localhost:27017/zerodha';

// Connect to MongoDB using Mongoose
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define your routes and middleware here
// For example, you can set up routes like this:
// app.use('/api/users', require('./routes/users'));

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to your Node.js application with Express and MongoDB!');
});

// Define the port for your server
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
