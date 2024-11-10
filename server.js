// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const app = require('./src/app');
const logger = require('./src/utils/logger');
const connectDB = require('./src/config/database');
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: 'https://platoeducation-git-v1bikash-bikashs-projects-a2dc20d4.vercel.app/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Use CORS middleware with options

// Connect to MongoDB first
connectDB()
    .then(() => {
        // Only start the server after successful DB connection
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        logger.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });