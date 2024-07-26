// Import User model and jwt, dotenv modules
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Create a new user in the database
        const user = await User.create({ name, email, password, role });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Respond with the token
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Respond with the token and user details
        res.status(200).json({ success: true, token, user: { role: user.role, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
