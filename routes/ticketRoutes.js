// Import express, ticket controllers, and middleware
const express = require('express');
const { createTicket, updateTicket, deleteTicket, getTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// Define routes for ticket operations
router.route('/')
    .post(protect, authorize('customer', 'admin'), createTicket)
    .get(protect, authorize('support', 'admin'), getTickets);

router.route('/:id')
    .put(protect, authorize('support', 'admin'), updateTicket)
    .delete(protect, authorize('admin'), deleteTicket);

module.exports = router;
