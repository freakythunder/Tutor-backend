// File path: controllers/chatController.js

const Chat = require('../models/chatModels');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');
const cacheManager = require('../services/cacheManager');
const OpenAI = require("openai"); // Import OpenAI
const openai = new OpenAI({
  defaultRequestTimeout: 60000, // Set timeout to 60 seconds (adjust as needed)
});

const globalContext = require('../utils/globalContext');

const defaultMessages = require('../models/defaultMessages');





exports.sendChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    // Set headers for SSE (Server-Sent Events)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let aiResponse = ""; // Buffer to store the full AI response
    const subtopicId = globalContext.getSubtopicId();

    // Get past conversations from cache or database
    const pastConversations = await getPastConversations(userId, subtopicId);

    const chatHistory = pastConversations.flatMap((conv) => [
      { role: "user", content: conv.userMessage || "No user message" },
      { role: "assistant", content: conv.aiResponse || "No AI response" },
    ]);

    const genAIConnection = userGenAIManager.createUserConnection(
      userId.toString(),
      process.env.OPENAI_API_KEY,
      chatHistory
    );

    const prompt = generatePrompt(subtopicId, message);
    genAIConnection.messages.push({ role: "user", content: prompt });

    // Call OpenAI API with streaming enabled
    const response = await openai.chat.completions.create({
      model: genAIConnection.model,
      messages: genAIConnection.messages,
      stream: true,
    });

    // Handle the stream
    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        aiResponse += content; // Buffer the content
        res.write(`${content}`); // Stream it to the client
      }
    }

    // End the stream and save the full response
    res.write("\n");
    res.end();

    const cleanMessage = extractMessage(message);
    await saveChat(userId, subtopicId, cleanMessage, aiResponse);

    cacheManager.updateCache(userId, subtopicId, { userMessage: cleanMessage, aiResponse });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json(apiResponse.error("Failed to send message", error.message));
  }
};

const getPastConversations = async (userId, subtopicId) => {
  let pastConversations = cacheManager.getConversations(userId, subtopicId);

  if (!pastConversations.length) {
    pastConversations = await Chat.find({ userId, subtopicId })
      .sort({ timestamp: -1 })
      .limit(15);
    cacheManager.initializeCache(userId.toString(), subtopicId, pastConversations);
  }

  return pastConversations;
};

const generatePrompt = (subtopicId, message) => {
  return `User: ${message}. Now generate your answer to the user prompt.
  This is the subtopic user is currently on: ${subtopicId}`;
};

const extractMessage = (message) => {
  return message.includes("Here is my code:")
    ? message.split("Here is my code:")[0].trim()
    : message.trim();
};

const saveChat = async (userId, subtopicId, userMessage, aiResponse) => {
  const chat = new Chat({ userId, subtopicId, userMessage, aiResponse });
  await chat.save();
};



// ...

exports.getPastConversations = async (req, res) => {
  try {
    const subtopicId = req.query.subtopicId;
    const userId = req.userId;
    const language = req.query.backendlanguage; // assuming language is sent in the query parameter




    globalContext.updateSubtopicId(subtopicId);
    // Check if cacheManager has conversations for the given userId and subtopicId
    const cachedConversations = cacheManager.getConversations(userId, subtopicId);
    if (cachedConversations.length) {
      // If cache has conversations, return them
      return res.json(apiResponse.success(cachedConversations, 'Past conversations'));
    }

    // If no conversations found in cache, check database
    const dbConversations = await Chat.find({ userId, subtopicId });
    if (dbConversations.length) {
      // If conversations found in database, return them
      return res.json(apiResponse.success(dbConversations, 'Past conversations'));
    }

    // If no conversations found in database, use default message


    const defaultMessage = defaultMessages?.[language]?.[subtopicId] || null;
    
    console.log("Language:", language);
    console.log("SubtopicID:", subtopicId);
    if (defaultMessage) {
      // Save default message to database
      await saveChat(userId, subtopicId, '', defaultMessage);

      // Initialize cache manager with default message
      cacheManager.initializeCache(userId, subtopicId, [{ userMessage: '', aiResponse: defaultMessage }]);

      // Return default message
      return res.json(apiResponse.success([{ userMessage: '', aiResponse: defaultMessage }], 'Past conversations'));
    }

    // If no default message found, return an error
    return res.json(apiResponse.error('No conversations found for this subtopic ID'));
  } catch (error) {
    console.error(error);
    return res.json(apiResponse.error('Error fetching past conversations'));
  }
};
