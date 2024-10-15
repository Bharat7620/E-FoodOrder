const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Ensure this is set correctly
    },
    password: {
        type: String,
        required: true // Ensure this is set correctly
    },
    email: {
        type: String,
        required: true,
        unique: true // Optional: if you want unique email addresses
    },
    location: {
        type: String,
        required: true // Ensure this is set correctly
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
