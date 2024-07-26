const User = require('../models/User');

// Get notifications for the logged-in user
exports.getNotifications = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('notifications');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, notifications: user.notifications });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
