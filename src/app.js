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
const testRoutes = require('./routes/testRoutes'); // Import the test routes

const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Add authentication routes
app.use('/code', codeExecutionRoutes);
app.use('/chat', chatRoutes);
app.use('/test', testRoutes); // Access test routes without authentication
app.get('/database-status', (req, res) => {
    const dbStatus = {
      connected: mongoose.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    };
    res.json(dbStatus);
});

// Error handling
app.use(errorHandler);

module.exports = app;