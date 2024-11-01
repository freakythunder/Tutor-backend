// src/routes/chatRoutes.js
const express = require('express');
const chatController = require('../controllers/chatController');
const checkApiKey = require('../middleware/apiKeyCheck');
const router = express.Router();

// Route for sending chat
router.get('/test', (req, res) => {
    res.json({ message: 'Chat routes are working' });
  });
  router.post('/send', checkApiKey, chatController.sendChat);
  router.get('/past', chatController.getPastConversations);
router.post('/send', chatController.sendChat);

// Route for fetching past conversations
router.get('/past', chatController.getPastConversations);

module.exports = router;