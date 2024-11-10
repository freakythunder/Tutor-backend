const Chat = require('../models/chatModels');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');

// src/controllers/chatController.js
exports.sendChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    // Get the user's active GenAI connection
    const genAIConnection = userGenAIManager.activeConnections.get(userId);
    const pastConversations = await Chat.find({ userId })
    .sort({ timestamp: -1 })
    .limit(5); // Get the last 5 conversations

    
  // Format the past conversations for the prompt
    const pastMessages = pastConversations.map(conv => `:User  ${conv.userMessage ||"no user message" }\nAI: ${conv.aiResponse || "No ai response"}`).join('\n');

    

  // Combine past messages with the current user message
    const prompt = 
    `
  content for teacher : 
follow system instruction for your behaviour.
refer to past 5 conversations and improve your responses following system instructions.


if "done with" the challenge refer to this type of answer

- introduce next topic in breif short.
- give exapmle to understand (just 1).
- give a challenge on the topics to be solved.

if "need help" refer to this type of answer
- refer to past conversations and pick the most recent challenge. also keep track of how many times user asked need help for that challenge.
- provide hint (no solution) for solution if user asking need help for 1st time, include some code snippets in hint.
- if user asked need help more than 2 times give solution.
- encourage user to try the challenge again or you can modify the challenge a bit.

Here are the last 5 conversations: from newewst to oldest.
${pastMessages}
    

this is the student prompt :
User: ${message}

Now generate your answer to the student prompt.
      `;

        

        // Generate AI response
        const result = await genAIConnection.chat.sendMessage(prompt);
    const aiResponse = result.response.text();

    
    // Save the chat to MongoDB
    const chat = new Chat({
      userId: userId,
      userMessage: message,
      aiResponse: aiResponse,
    });
    await chat.save();

    // Send response ```javascript
    res.json(apiResponse.success({ aiResponse }, 'Message sent successfully'));
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json(apiResponse.error('Failed to send message', error.message));
  }
};


exports.getPastConversations = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Fetch past conversations for the user, sorted by timestamp (most recent first)
    const conversations = await Chat.find({ userId })
      .sort({ timestamp:1 })
      .limit(50); // Limit to last 50 conversations

    res.json(apiResponse.success(conversations, 'Past conversations retrieved successfully'));
  } catch (error) {
    console.error('Error fetching past conversations:', error);
    res.status(500).json(apiResponse.error('Failed to retrieve past conversations'));
  }
};