const Ticket = require('../models/Ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
    const { title, description, status, assignedTo } = req.body;
    try {
        console.log('Creating ticket:', req.body);
        const ticket = await Ticket.create({ title, description, status, assignedTo, createdBy: req.user._id });

        // Notify admin of the new ticket
        const adminUsers = await User.find({ role: 'admin' });
        adminUsers.forEach(async (admin) => {
            admin.notifications.push({ message: `New ticket created: ${title}` });
            await admin.save();
        });

        console.log('Ticket created:', ticket);
        res.status(201).json({ success: true, ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all tickets
exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('createdBy assignedTo');
        res.status(200).json({ success: true, tickets });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('createdBy assignedTo');
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }
        res.status(200).json({ success: true, ticket });
    } catch (error) {
        console.error('Error fetching ticket:', error); // Log any errors
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a ticket
exports.updateTicket = async (req, res) => {
    const { title, description, status, assignedTo } = req.body;
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.status = status || ticket.status;
        ticket.assignedTo = assignedTo || ticket.assignedTo;

        await ticket.save();
        res.status(200).json({ success: true, ticket });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        await Ticket.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Ticket deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
