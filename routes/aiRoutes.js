const express = require('express');
const router = express.Router();
const { generateSolution } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// @desc    Generate AI solution for a ticket
// @route   POST /api/ai/generate-solution
// @access  Admin/Support (You might want to add auth middleware here)
router.post('/generate-solution', protect, authorize(['admin', 'support']), generateSolution);

module.exports = router;
