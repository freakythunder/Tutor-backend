// src/models/chatModel.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  aiResponse: { type: String, required: false, default: null }, // Changed to allow null
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;