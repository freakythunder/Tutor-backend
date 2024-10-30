// src/controllers/chatController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require('../models/chatModels');
const apiResponse = require('../utils/apiResponse');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Make sure to add this to your .env file
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const handleGeminiError = require('../utils/geminiErrorHandler');

// Function to handle chat requests
exports.sendChat = async (req, res, next) => {
  try {
    const { message } = req.body;
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
      userMessage: message,
      aiResponse: aiResponse,
    });

    await chat.save();

    // Send response back to frontend
    res.json(apiResponse.success({ 
      response: aiResponse,
      savedMessage: {
        userMessage: message,
        aiResponse: aiResponse,
        timestamp: chat.timestamp
      }
    }));

  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.json(apiResponse.error(error.message));
  }
};

// Function to fetch past conversations
exports.getPastConversations = async (req, res) => {
  try {
    const chats = await Chat.find()
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