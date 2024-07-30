// server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve static files for HTML pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customer.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.redirect('/login');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
