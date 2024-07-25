// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const { Server } = require('ws');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define routes for authentication and tickets
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server and listen on the specified port
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

// Initialize WebSocket server
const wss = new Server({ server });

// Handle WebSocket connections
wss.on('connection', ws => {
    console.log('New client connected');

    // Handle incoming messages from clients
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
