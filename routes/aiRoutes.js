const express = require('express');
const router = express.Router();
const { generateSolution } = require('../controllers/aiController');

// @desc    Generate AI solution for a ticket
// @route   POST /api/ai/generate-solution
// @access  Admin/Support (You might want to add auth middleware here)
router.post('/generate-solution', generateSolution);

module.exports = router; 