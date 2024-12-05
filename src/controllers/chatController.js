// File path: controllers/chatController.js

const Chat = require('../models/chatModels');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');
const cacheManager = require('../services/cacheManager');
const authController = require('./authController');

exports.sendChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    console.log("userId for send message:", userId);

    if (message.toLowerCase() === "let's begin") {
      await handleWelcomeMessage(userId, message, res);
    } else {
      await handleUserMessage(userId, message, res);
    }
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json(apiResponse.error('Failed to send message', error.message));
  }
};

const handleWelcomeMessage = async (userId, message, res) => {
  const aiResponse = authController.getWelcomeMessage(userId);

  await saveChat(userId, message, aiResponse);
  cacheManager.updateCache(userId, { userMessage: message, aiResponse : aiResponse });

  res.json(apiResponse.success({ aiResponse }, 'Message sent successfully'));
};

const handleUserMessage = async (userId, message, res) => {
  const genAIConnection = userGenAIManager.activeConnections.get(userId);
  let pastConversations = cacheManager.getConversations(userId);

  if (!pastConversations.length) {
    pastConversations = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(5);
  }

  const prompt = generatePrompt(pastConversations, message);
  const result = await genAIConnection.chat.sendMessage(prompt);
  const aiResponse = result.response.text();

  await saveChat(userId, message, aiResponse);
  cacheManager.updateCache(userId, { userMessage: message, aiResponse : aiResponse });

  res.json(apiResponse.success({ aiResponse }, 'Message sent successfully'));
};

const generatePrompt = (pastConversations, message) => {
  const pastMessages = pastConversations.map(conv => 
    `User: ${conv.userMessage || "No user message"}\nAI: ${conv.aiResponse || "No AI response"}`
  ).join('\n');

  return `
content for teacher:
Follow system instruction for your behavior.
Refer to past 5 conversations and improve your responses following system instructions.

If "done with" the challenge refer to this type of answer:
- Introduce next topic in brief.
- Give one example for better understanding.
- Give a challenge on the topic to solve.

If "need help" refer to this type of answer:
- Refer to past conversations and pick the most recent challenge. Track how many times the user asked for help on that challenge.
- Provide a hint (no solution) for the first request, including code snippets in the hint.
- If the user asks for help more than twice, provide the solution.
- Encourage the user to try again or modify the challenge slightly.

Here are the last 5 conversations (newest to oldest):
${pastMessages}

This is the student prompt:
User: ${message}

Now generate your answer to the student prompt.
  `;
};

const saveChat = async (userId, userMessage, aiResponse) => {
  const chat = new Chat({ userId, userMessage, aiResponse });
  await chat.save();
};

exports.getPastConversations = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId:", userId);

    const conversations = await Chat.find({ userId })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(apiResponse.success(conversations, 'Past conversations retrieved successfully'));
  } catch (error) {
    console.error('Error fetching past conversations:', error);
    res.status(500).json(apiResponse.error('Failed to retrieve past conversations'));
  }
};
