// src/controllers/chatController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require('../models/chatModels');
const model = require('../utils/genAIInstance');
const apiResponse = require('../utils/apiResponse');

// Initialize Google Generative AI

const handleGeminiError = require('../utils/geminiErrorHandler');

// Function to handle chat requests
exports.sendChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.userId; // This will now be available from the authMiddleware
    let aiResponse = null;

    try {
      const result = await model.generateContent(message);
      aiResponse = result.response.text();
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
      const errorMessage = handleGeminiError(apiError);
      return res.json(apiResponse.error(errorMessage));
    }
    
    // Save the chat to MongoDB
    const chat = new Chat({
      userId: userId,
      userMessage: message,
      aiResponse: aiResponse,
    });

    await chat.save();

    // Send response back to frontend
    res.json(apiResponse.success({ 
      savedMessage: aiResponse,
    }));

  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.json(apiResponse.error(error.message));
  }
};

// Function to fetch past conversations
exports.getPastConversations = async (req, res,next) => {
  try {
    const userId = req.userId;

    const chats = await Chat.find({ userId: userId })
      .sort({ timestamp: -1 })
      .limit(5)
      .select('userMessage aiResponse timestamp');
    
    // Consistent response format whether chats are found or not
    res.json(apiResponse.success({ 
      chats: chats.reverse(),
      message: chats.length === 0 ? "No past conversations found" : "Conversations retrieved successfully"
    }));

  } catch (error) {
    console.error('Error fetching past conversations:', error);
    res.status(500).json(apiResponse.error('Failed to fetch past conversations'));
  }
};