const Ticket = require('../models/Ticket');

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
exports.createTicket = async (req, res) => {
    const { title, description, status, assignedTo } = req.body;

    try {
        const ticket = new Ticket({
            title,
            description,
            status,
            assignedTo,
            createdBy: req.user._id
        });

        await ticket.save();
        res.status(201).json({ success: true, data: ticket });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
exports.getTickets = async (req, res) => {
    try {
        let query;
        // If the user is a customer, show only their tickets
        if (req.user.role === 'customer') {
            query = Ticket.find({ createdBy: req.user._id });
        }
        // If the user is an admin or support agent, show all tickets
        else if (req.user.role === 'admin') {
            query = Ticket.find();
        }
        // If the user role is not recognized, deny access
        else {
            return res.status(403).json({ success: false, message: 'User role not authorized' });
        }
        const tickets = await query.populate('createdBy').populate('assignedTo');
        res.status(200).json({ success: true, count: tickets.length, tickets });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get a single ticket
// @route   GET /api/tickets/:id
// @access  Private
exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Private
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

