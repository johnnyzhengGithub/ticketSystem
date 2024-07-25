// Middleware to authorize user roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is authorized
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        next();
    };
};
