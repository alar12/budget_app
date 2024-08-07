const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user instance with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        // Handle errors during user registration
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const adminLogIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        // Handle errors during user login
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getAdminDetail = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        // Handle errors when fetching user details
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { adminRegister, adminLogIn, getAdminDetail };
