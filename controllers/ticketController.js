// Import Ticket model
const Ticket = require('../models/Ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
    const { title, description } = req.body;
    try {
        // Create a ticket in the database
        const ticket = await Ticket.create({ title, description, createdBy: req.user.id });
        res.status(201).json({ success: true, ticket });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update an existing ticket
exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    try {
        // Update ticket in the database
        const ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, ticket });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        // Remove ticket from the database
        await Ticket.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Ticket deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Retrieve all tickets
exports.getTickets = async (req, res) => {
    try {
        // Fetch all tickets from the database
        const tickets = await Ticket.find().populate('createdBy assignedTo');
        res.status(200).json({ success: true, tickets });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
