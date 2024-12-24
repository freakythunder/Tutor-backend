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



const handleUserMessage = async (userId, message, res) => {
  //const genAIConnection = userGenAIManager.activeConnections.get(userId);
  let pastConversations = cacheManager.getConversations(userId);

  if (!pastConversations.length) {
    pastConversations = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(10);
    cacheManager.initializeCache(userId.toString(), pastConversations);
  }
 

  const chatHistory = pastConversations.flatMap(conv => ([
    { role: "user", content: conv.userMessage || "No user message" },
    { role: "assistant", content: conv.aiResponse || "No AI response" }
    
  ])).flat();


  const genAIConnection = userGenAIManager.createUserConnection(
    userId.toString(),
    process.env.OPENAI_API_KEY,
    chatHistory
  );
  
  
  console.log(chatHistory);
  const prompt = generatePrompt(pastConversations, message);
  genAIConnection.messages.push({ role: "user", content: prompt });

  const result = await openai.chat.completions.create({
    model: genAIConnection.model,
    messages: genAIConnection.messages
  });
  
  const aiResponse =result.choices[0].message.content;
  userGenAIManager.closeUserConnection(userId);

  const cleanMessage = message.includes("Here is my code:")
  ? message.split("Here is my code:")[0].trim() // Keep only the part before "Here is my code:"
  : message.trim(); // Otherwise, save the full message
  await saveChat(userId, cleanMessage, aiResponse);

  // Update cache with clean message and AI response
  cacheManager.updateCache(userId, { userMessage: cleanMessage, aiResponse });

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
- You should never talk about concepts that are not covered yet strictly. For example, you should never talk about console.log() if you only talked about declaring variables till that point.




Here’s how you should respond to users for different kinds of input from user (cases mentioned):




-If the user responds that he/she wants one more example, give the user one more example to practice for the same sub-topic.
-If a user asks for more examples later on, keep increasing the difficulty of questions following.




- If a user responds that he/she doesn't understand that particular sub-topic (only the most recent sub-topic you explained to the user, you can refer to last assistant role message in chat history), explain only that sub-topic simply like you are explaining it to an 6 year old. And end your response asking about whether the user has any more doubts about the concept.




- If a user responds that he/she wants to move on to the next topic, start teaching the user about the next sub-topic (in the same way as described in the system instructions).


- If the user responds with “I need a hint for this challenge”, give feedback on the code written by the user (code that you are getting in user’s message) and then explain the approach on how to solve the challenge.




- If the user asked for solution for a particular challenge:
- first figure out the most recent challenge (by looking at chathistory) , then track how many times user asked for solution for that challenge.
  - If a user asks for a solution the first time for that particular challenge, don’t give the complete solution but just the hint. Encourage users to try harder in a subtly motivational way.
      * Example for a user asking for help:
            User: "give me solution" / "give full solution"
            AI: "No worries! Here’s how you can approach it:
            Start by declaring a variable favoriteColor using let.
            Assign it the value "blue".
            Log out the variable using console.log()    
  - If the user asks for a solution the second time for the same problem, give the solution for the particular challenge the user is trying to solve and also a similar challenge to practice.
     AI: Here’s the solution:
            let favoriteColor = "blue";
            Now, try creating another variable called hobby and assign it the value "reading".






- If user responds with "let's begin",
- That means, he/she is a new user. So give a short intro about yourself.
- And start teaching everything from sub-topic 1.1




This is the student prompt:
User: ${message}


Now generate your answer to the student prompt.


  `;
}

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
