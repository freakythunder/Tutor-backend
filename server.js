// server.js
require('dotenv').config();
const app = require('./src/app');
const logger = require('./src/utils/logger');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

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