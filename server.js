// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const app = require('./src/app');
const logger = require('./src/utils/logger');
const connectDB = require('./src/config/database');
const PORT = process.env.PORT || 5000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for any undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(cors()); 

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