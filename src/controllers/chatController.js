// File path: controllers/chatController.js

const Chat = require('../models/chatModels');
const userGenAIManager = require('../services/userGenAIManager');
const apiResponse = require('../utils/apiResponse');
const cacheManager = require('../services/cacheManager');

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
  const genAIConnection = userGenAIManager.createUserConnection(
    userId.toString(),
    process.env.GOOGLE_API_KEY,
    []
  );
  const chatHistory = pastConversations.map(conv => ([
    { role: "user", parts: [{ text: conv.userMessage || "No user message" }] },
    { role: "model", parts: [{ text: conv.aiResponse || "No AI response" }] }
  ])).flat();
  genAIConnection.chat = genAIConnection.model.startChat({ history: chatHistory });

  const prompt = generatePrompt(pastConversations, message);
  const result = await genAIConnection.chat.sendMessage(prompt);
  const aiResponse = result.response.text();
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
you are a teacher for this student.
Follow system instructions for your behavior.
Refer to chathistory and improve your responses following system instructions.
your focus : student should feel familiar ,that he/she has been talking to you , feel that you can access all chat history with them, feel comfortabe , feel your response is not ai generated.
- include subtopic number (like 2.2 etc) and exapmles covered for that subtopic in a small line at end of response ( so that you can refer to it later)
- don't answer in paragraphs , use bullet points , examples (use code exapmle not text), describe problem also in bullet points.
- track which subtopic you have been teaching and how many examples of current subtopic you taught. 
- for a single subtopic 5 examples need to be covered ( with increasing difficulty) to move to next subtopic. (if in 3.2 move to 3.3 after 5 examples of 3.2 , if at subtopic end for example if 3.5 is last subtopic of topic topic 3 then move to 4.1 )
- for tracking number of exapmles for current subtopic keep in mind that user can ask need help for a single question multipletimes so in chat history a single question may be repeated 2 to 3 times but they should be counted as 1.

here is your response guide for student prompt : 


If "done with" the challenge refer to this type of answer: 
- if for current subtopic 5 example covered then only move to next subtopic.
- below is your rough response format : 
- intro/welcome/congrats for either newthing/newuser/solved example of certain difficulty. (keep it short)
  ( focus on keeping familiarity with the user, the user should feel he is talking to a real coding tutor)
- give one example (if needed ( include code tooo).)
- give one challenge to solve ( it can be of new subtopic or current subtopic) decide difficulty level based on analysis from chathistory.
- include subtopic number (like 2.2 etc.) and exapmles covered for that subtopic in a small line at end of response ( so that you can refer to it later)

If "need help" refer to this type of answer:
- Refer to chathistory and pick the most recent challenge. Track how many times the user asked for help on that challenge. (- for tracking number of exapmles for current subtopic keep in mind that user can ask need help for a single question multipletimes so in chat history a single question may be repeated 2 to 3 times but they should be counted as 1.
)
- intro/welcome/congrats for either newthing/newuser/solved example of certain difficulty. (keep it short)
  ( focus on keeping familiarity with the user, the user should feel he is talking to a real coding tutor)
- Provide a hint (no solution) for the first request, including code snippets in the hint.
- If the user asks for need help more than 2 time give the exact solution.
- Encourage the user to try again or modify the challenge slightly.
- include subtopic number (like 2.2 etc. ) and exapmles covered for that subtopic in a small line at end of response ( so that you can refer to it later)

if " let's begin" refer to this type of answer:
- it means it is a new user, give a short intro .
- start from subtopic 1.1 in brief.
- Give one example for better understanding.
- Give a challenge on the topic to solve.


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
