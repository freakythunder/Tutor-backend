// src/controllers/authController.js
const User = require('../models/userModel');
const Chat = require('../models/chatModels');  // Add this line to import the Chat model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');


    exports.login = async (req, res) => {
      try {
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
          return res.status(400).json(apiResponse.error('Username and password are required'));
        }
        

        const user = await User.findOne({ username });
        
        if (!user) {
          const newUser  = new User({ username, password });
          await newUser.save();
        }

        
        
        // Check if JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
          return res.status(500).json(apiResponse.error('Server configuration error'));
        }
    
        // Check if Google API key is set
        if (!process.env.GOOGLE_API_KEY) {
          return res.status(500).json(apiResponse.error('AI service not configured'));
        }
    
        // Generate token
        const token = jwt.sign({ 
          userId: user._id, 
          username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Fetch past conversations
        const pastConversations = await Chat.find({ userId: user._id })
          .sort({ timestamp: -1 })
          .limit(20);

        
       
        const genAIConnection = userGenAIManager.createUserConnection(
          user._id.toString(), 
          process.env.GOOGLE_API_KEY,
          []
        );

        let welcomeMessage;
    
        if (pastConversations.length > 0) {
          // Handle case with past conversations
          const chatHistory = pastConversations.map(conv => [
            {
              role: "user",
              parts: [{ text: conv.userMessage || "No user message" }],
            },
            {
              role: "model",
              parts: [{ text: conv.aiResponse || "No AI response" }],
            }
          ]).flat();

          
    
          // Update connection with chat history
          genAIConnection.chat = genAIConnection.model.startChat({ history: chatHistory });
    
          const prompt = 
          `
          Follow system instruction while answering and keep chat context in mind. 
          Here are the last 5 conversations with the user:
          ${pastConversations.map(conv => `:User   ${conv.userMessage}\nAI: ${conv.aiResponse}`).join('\n')}
          
          Create a personalized welcome message for the user "${user.username}". 
          respone format for teacher :
          - welcome back message.
          - conclude what user learned in brief (figure out upto how much user learned in comparison to syllabus of system instruction , by refering to past conversation)
          - give a challenge to user to recall his learnings.
          `;
    
          const welcomeMessageResponse = await genAIConnection.chat.sendMessage(prompt);
          welcomeMessage = welcomeMessageResponse.response.text();
        } else {
          // Handle case with no past conversations
          const prompt = `

          Follow system instruction while answering.
          Response Format for teacher : 
          - Welcome message for new user.
          - start from first topic of syllabus of system instruction. and introudce a bit.
          - Give user a challenge to solve.

            username  "${user.username}".

          student prompt:
              Hii i am a beginner. want to learn javascript.
          `;
    
          const welcomeMessageResponse = await genAIConnection.chat.sendMessage(prompt);
          welcomeMessage = welcomeMessageResponse.response.text();
        }
    
        const welcomeChat = new Chat({
          userId: user._id,
          userMessage:  "",// Store the welcome message as the user message
          aiResponse: welcomeMessage, // No AI response for welcome message
        });
    
        await welcomeChat.save();
        // Send response back to frontend
        res.json(apiResponse.success({ 
          token, 
          userId: user._id, 
          username: user.username,
          
        }, 'Login successful'));
    
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json(apiResponse.error('Login failed', error.message));
      }
    };
exports.logout = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Close the user's GenAI connection
    userGenAIManager.closeUserConnection(userId);

    res.json(apiResponse.success(null, 'Logged out successfully'));
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json(apiResponse.error('Logout failed', error.message));
  }
};