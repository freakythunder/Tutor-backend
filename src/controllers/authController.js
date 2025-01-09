// File path: src/controllers/authController.js

const User = require('../models/userModel');
const Chat = require('../models/chatModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');
const cacheManager = require('../services/cacheManager');
const defaultTopics = require('../models/topicModel');



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json(apiResponse.error('Username and password are required'));
    }

    // Find or create user
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, password, topics: defaultTopics });
      
      if (!process.env.JWT_SECRET || !process.env.OPENAI_API_KEY) {
        return res.status(500).json(apiResponse.error('Server configuration error'));
      }
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      await user.save();
      const messageCount = await Chat.countDocuments({ userId: user._id });
      
      
      const responseMessage = messageCount === 1 ? 'User  registered' : 'Login successful';
      console.log(messageCount , responseMessage);
      res.json(apiResponse.success(
        { token, userId: user._id, username: user.username, topics: user.topics },
        responseMessage
      ));
    }
    else{
      if (!process.env.JWT_SECRET || !process.env.OPENAI_API_KEY) {
        return res.status(500).json(apiResponse.error('Server configuration error'));
      }
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      const messageCount = await Chat.countDocuments({ userId: user._id });
      const responseMessage = messageCount === 1 ? 'User  registered' : 'Login successful';
      console.log(messageCount , responseMessage);
      res.json(apiResponse.success(
        { token, userId: user._id, username: user.username, topics: user.topics },
        responseMessage
      ));
    }

    // Validate server configuration
    

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(apiResponse.error('Login failed', error.message));
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.userId;

    // Close user connection and clear cache
    userGenAIManager.closeUserConnection(userId);
    cacheManager.clearCache(userId);
    const { topics } = req.body;
    await User.findByIdAndUpdate(userId, { topics }, { new: true });
    
    res.json(apiResponse.success(null, 'Logged out successfully'));
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json(apiResponse.error('Logout failed', error.message));
  }
};

// exports.getWelcomeMessage = (userId) => {
//   return welcomeMessages[userId] || "Welcome message not found.";
// };

const saveWelcomeChat = async (userId, message) => {
  const systemChat = new Chat({
    userId,
    userMessage: "", // Empty user message for the initial welcome
    aiResponse: message,
  });
  await systemChat.save();
};

// const generateWelcomeMessage = async (user) => {
//   const pastConversations = await Chat.find({ userId: user._id })
//     .sort({ timestamp: -1 })
//     .limit(10);

//   // Initialize cache with past conversations
//   cacheManager.initializeCache(user._id.toString(), pastConversations);

//   const genAIConnection = userGenAIManager.createUserConnection(
//     user._id.toString(),
//     process.env.GOOGLE_API_KEY,
//     []
//   );

//   if (pastConversations.length > 0) {
//     // Generate welcome message with context from past conversations
//     return await generateMessageWithContext(genAIConnection, pastConversations, user.username);
//   } else {
//     // Generate welcome message for new users
//     return await generateMessageForNewUser(genAIConnection, user.username);
//   }
// };

// const generateMessageWithContext = async (genAIConnection, pastConversations, username) => {
//   const chatHistory = pastConversations.map(conv => ([
//     { role: "user", parts: [{ text: conv.userMessage || "No user message" }] },
//     { role: "model", parts: [{ text: conv.aiResponse || "No AI response" }] }
//   ])).flat();

//   genAIConnection.chat = genAIConnection.model.startChat({ history: chatHistory });

//   const prompt = `
//     Follow system instruction while answering and keep chat context in mind.
//     Here are the last 5 conversations with the user:
//     ${pastConversations.map(conv => `User: ${conv.userMessage}\nAI: ${conv.aiResponse}`).join('\n')}
    
//     Create a personalized welcome message for the user "${username}".
//     Response format for teacher:
//     - Welcome back message.
//     - Conclude what the user learned in brief (based on syllabus progress).
//     - Give a challenge to recall learnings.
//   `;

//   const response = await genAIConnection.chat.sendMessage(prompt);
//   return response.response.text();
// };

// const generateMessageForNewUser = async (genAIConnection, username) => {
//   const prompt = `
//     Follow system instruction while answering.
//     Response format for teacher:
//     - Welcome message for new user.
//     - Start with the first topic of the syllabus and introduce it briefly.
//     - Give a challenge for the user to solve.

//     Username: "${username}"
//     Student prompt: "Hi, I am a beginner and want to learn JavaScript."
//   `;

//   const response = await genAIConnection.chat.sendMessage(prompt);
//   return response.response.text();
// };
