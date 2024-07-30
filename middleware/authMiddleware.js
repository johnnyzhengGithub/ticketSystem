// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user.id);

        if (!req.user) {
            return res.status(404).json({ success: false, message: 'No user found with this id' });
        }

        next();
    } catch (err) {
        console.error('Error in auth middleware:', err);
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};
