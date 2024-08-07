const mongoose = require('mongoose');

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
    username: { 
        type: String, // The unique username for the user
        required: true, 
        unique: true 
    },
    email: { 
        type: String, // The unique email address for the user
        required: true, 
        unique: true 
    },
    password: { 
        type: String, // The hashed password for the user
        required: true 
    }
});

// Export the User model based on the schema
module.exports = mongoose.model('User', userSchema);
