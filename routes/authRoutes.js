// Import express and auth controllers
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Define routes for registration and login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
