// File path: controllers/chatController.js

const Chat = require('../models/chatModels');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');
const cacheManager = require('../services/cacheManager');
const OpenAI = require("openai"); // Import OpenAI
const openai = new OpenAI(); 
exports.sendChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    console.log("userId for send message:", userId);

    
    await handleUserMessage(userId, message, res);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json(apiResponse.error('Failed to send message', error.message));
  }
};

// const handleWelcomeMessage = async (userId, message, res) => {
//   const aiResponse = authController.getWelcomeMessage(userId);

//   await saveChat(userId, message, aiResponse);
//   cacheManager.updateCache(userId, { userMessage: message, aiResponse : aiResponse });

//   res.json(apiResponse.success({ aiResponse }, 'Message sent successfully'));
// };

const handleUserMessage = async (userId, message, res) => {
  //const genAIConnection = userGenAIManager.activeConnections.get(userId);
  let pastConversations = cacheManager.getConversations(userId);

  if (!pastConversations.length) {
    pastConversations = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(5);
    cacheManager.initializeCache(userId.toString(), pastConversations);
  }
 

  const chatHistory = pastConversations.flatMap(conv => ([
    { role: "assistant", content: conv.aiResponse || "No AI response" },
    { role: "user", content: conv.userMessage || "No user message" }
    
  ])).flat();


  const genAIConnection = userGenAIManager.createUserConnection(
    userId.toString(),
    process.env.OPENAI_API_KEY,
    chatHistory
  );
  
  

  const prompt = generatePrompt(pastConversations, message);
  genAIConnection.messages.push({ role: "user", content: prompt });

  const result = await openai.chat.completions.create({
    model: genAIConnection.model,
    messages: genAIConnection.messages
  });
  
  const aiResponse =result.choices[0].message.content;
  userGenAIManager.closeUserConnection(userId);
  await saveChat(userId, message, aiResponse);
  cacheManager.updateCache(userId, { userMessage: message, aiResponse : aiResponse });

  res.json(apiResponse.success({ aiResponse }, 'Message sent successfully'));
};

const generatePrompt = (pastConversations, message) => {
  const pastMessages = pastConversations.map(conv => 
    `User: ${conv.userMessage || "No user message"}\nAI: ${conv.aiResponse || "No AI response"}`
  ).join('\n');

  return `
Refer to chat history and keep track of user’s progress

Here’s what you should pay a lot of attention to: 
- Students should feel familiar talking to you and you should use the user's chat history to ensure that.
- Don't answer in paragraphs, use bullet points.
- Track the sub-topics you have covered with the user.
- For every sub-topic, you need to give 5 challenges one at a time (one challenge follows after user solves current one) for student’s practice( with increasing difficulty) before moving on to the next sub-topic. (if you are teaching sub-topic 3.2, move to 3.3 after giving 5 challenges for sub-topic 3.2)
- For tracking number of challenges for every sub-topic, count only the number of challenges student got right (that is, user responded with “Next”)


Here’s how you should respond to users for different kinds of input from user (cases mentioned):
- If user responds with "Next",
- If 5 challenges are covered for the particular sub-topic, move on to the next sub-topic. If not, give another challenge (until the user has solved 5 challenges).


- If user responds with "Help",
- Refer to chat history and pick the most recent challenge given by you to the user.
- Track how many times the user asked for help (responded with “Help”) on that challenge 
    - If a user asks for the first time, don’t give the solution but just the hint. Encourage users to try harder in a subtly motivational way.
    - If the user asks for help more than once, give the solution for the particular challenge and also a similar challenge to practice.


- If user responds with "let's begin",
- That means, he/she is a new user. So give a short intro about yourself.
- And start teaching everything from sub-topic 1.1






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

    cacheManager.initializeCache(userId.toString(), conversations);

    res.json(apiResponse.success(conversations, 'Past conversations retrieved successfully'));
  } catch (error) {
    console.error('Error fetching past conversations:', error);
    res.status(500).json(apiResponse.error('Failed to retrieve past conversations'));
  }
};
