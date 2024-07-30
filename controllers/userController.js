const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, data: users });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role
        });

        await user.save();
        res.json({ success: true, data: user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { name, email, role } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        res.json({ success: true, data: user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await User.deleteOne({ _id: req.params.id });
        res.json({ success: true, message: 'User removed' });
    } catch (err) {
        console.error('Server Error:', err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
