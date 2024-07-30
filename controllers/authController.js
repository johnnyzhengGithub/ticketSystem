const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt

// Register a new user
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('Password before hashing:', password);

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Hashed password during registration:', password); // Log the hashed password

        user = new User({
            name,
            email,
            password,
            role
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ success: true, token, user: { role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Authenticate user & get token
const login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password });

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { user: { id: user.id, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        console.log('token:', token);

        // Set token and user details in localStorage
        res.json({
            success: true,
            token,
            userId: user.id,
            role: user.role
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    register,
    login
};
