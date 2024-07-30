// ticketRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createTicket, getTickets, getTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();

router.route('/')
    .get(protect, authorize(['admin', 'support', 'customer']), getTickets)  // Allow customers to fetch their own tickets
    .post(protect, authorize(['admin', 'support', 'customer']), createTicket);

router.route('/:id')
    .get(protect, authorize(['admin', 'customer']), getTicket)
    .put(protect, authorize(['admin', 'customer']), updateTicket)
    .delete(protect, authorize(['admin', 'customer']), deleteTicket);

module.exports = router;

