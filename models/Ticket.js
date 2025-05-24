const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'closed'],
        default: 'open'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
            content: { type: String, required: true },
            author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            createdAt: { type: Date, default: Date.now },
            status: { type: String, enum: ['open', 'in_progress', 'closed'], required: false }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
