// ticketRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createTicket, getTickets, getTicket, updateTicket, deleteTicket, addComment } = require('../controllers/ticketController');
const router = express.Router();

router.route('/')
    .get(protect, authorize(['admin', 'support', 'customer']), getTickets)  // Allow customers to fetch their own tickets
    .post(protect, authorize(['admin', 'support', 'customer']), createTicket);

router.post('/:id/comments', protect, authorize(['admin', 'support']), addComment);

router.route('/:id')
    .get(protect, authorize(['admin', 'customer', 'support']), getTicket)
    .put(protect, authorize(['admin', 'customer', 'support']), updateTicket)
    .delete(protect, authorize(['admin', 'customer','support']), deleteTicket);

module.exports = router;

