// src/middleware/errorHandler.js
const logger = require('../utils/logger');
const apiResponse = require('../utils/apiResponse');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(apiResponse.error(message));
};