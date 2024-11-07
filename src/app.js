// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const chatRoutes = require('./routes/chatRoutes');
const codeExecutionRoutes = require('./routes/codeExecutionRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the new auth routes
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Add authentication routes
app.use('/api/code', codeExecutionRoutes);
app.use('/api/chat', chatRoutes);
app.get('/api/database-status', (req, res) => {
    const dbStatus = {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    };
    res.json(dbStatus);
});

// Error handling
app.use(errorHandler);

module.exports = app;