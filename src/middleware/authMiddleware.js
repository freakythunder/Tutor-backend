// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json(apiResponse.error('No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json(apiResponse.error('Failed to authenticate token'));
    }
    req.userId = decoded.userId; // Save userId from the token
    req.username = decoded.username; // Optionally save username as well
    next();
  });
};

module.exports = authMiddleware;