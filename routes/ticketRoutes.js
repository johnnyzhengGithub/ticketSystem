const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');

const router = express.Router();

router.route('/')
    .post(protect, authorize('admin', 'support', 'customer'), createTicket)  // Allow customers to create tickets
    .get(protect, getTickets);

router.route('/:id')
    .get(protect, getTicketById)
    .put(protect, authorize('admin', 'support'), updateTicket)
    .delete(protect, authorize('admin', 'support'), deleteTicket);

module.exports = router;
