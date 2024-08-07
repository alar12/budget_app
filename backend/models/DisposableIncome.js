// Import the mongoose module to work with MongoDB
const mongoose = require('mongoose');

// Define a schema for the DisposableIncome model with a required 'amount' field of type Number
const disposableIncomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
});

// Export the DisposableIncome model based on the defined schema
module.exports = mongoose.model('DisposableIncome', disposableIncomeSchema);
