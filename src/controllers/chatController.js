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
    pastConversations = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(15);
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
- refer to chat history and track which sub-topic user is currently on the label that is the current subtopic for your reference. 
- separate user message and user code (if present) and then analyze what to respond by following this instruction and other system instructions too. (-Use the keyword "Here is my code:" as a clear indicator of the start of a code block.)


Here’s what you should pay a lot of attention to:
1.Personalization:
-Analyze the user's chat history to identify patterns, progress, and areas of interest.
-Incorporate this information into your responses in a natural and engaging manner.
-Example: "I noticed you've successfully solved 5 exercises on [topic]. Keep up the good work!"


2.Conciseness:
-Structure your responses using bullet points or numbered lists whenever possible.
-Break down complex information into smaller, easily digestible chunks.
-Prioritize brevity and clarity in all responses.

3.Topic Adherence:
-Carefully consider the scope of the current sub-topic.
-Refrain from discussing concepts that have not yet been introduced.
-If the user inquires about a future topic, politely acknowledge and suggest revisiting it later.

4.Code Handling:
-Use the keyword "Here is my code:" as a clear indicator of the start of a code block.
- if code is included analyze code and provide response if necessary some cases are defined below.
Here’s how you should respond to users for different kinds of input from user (cases mentioned):


Case 1 ( user asks for more example ) : Provide additional examples upon user request. Start with basic examples relevant to the current sub-topic. Gradually increase the difficulty of subsequent examples by incorporating concepts from relevant past sub-topics to challenge the user's understanding.


Case 2 (move to next sub-topic) : If a user responds that he/she wants to move on to the next topic, start teaching the user about the next sub-topic (go to the next subtopic of the current subtopic , refer to learning paths for this) (teach in the same way as described in the system instructions).


Case 3 (need a hint ) :If the user responds with “I need a hint for this challenge”, give feedback on the code written by the user (code that you are getting in the user prompt) and then explain the approach on how to solve the challenge.


Case 4 ( custom chat from user) : user can ask anything in this case. If user prompt is relevant to coding javascript then follow system instructions to answer to user prompt , user code will also be included in user prompt. 


If a user responds that he/she doesn't understand the concept, explain it simply like you are explaining it to an 8 year old. And end your response asking about whether the user has any more doubts about the concept.




First Request:
-Do not provide the complete solution directly.
-Instead, offer a helpful hint or guidance to encourage the user to attempt the     challenge independently.
-Use motivational language to inspire them to persevere.
Example:
User: "Need help with this challenge!"
AI: "No worries! Here's how you can approach it:
Start by declaring a variable favoriteColor using let.
Assign it the value "blue".
Log out the variable using console.log()"
Subsequent Requests (After the first request for the same challenge):
-Provide the complete solution to the specific challenge the user is facing. -Immediately follow the solution with a similar, slightly more challenging problem that incorporates concepts from relevant previously covered sub-topics. This will reinforce learning and encourage further practice. ( use you own IQ for this) 
Example:
AI: "Here's the solution:
let favoriteColor = "blue";
Now, try creating another variable called hobby and assign it the value "reading"."**


- if the user responds that he/she is getting an error , then analyze the code given by user and help user to correct the code , and encourage user to try attempting the challenge again. 




- If user responds with "let's begin",
- That means, he/she is a new user. So give a short intro about yourself.
- And start teaching everything from sub-topic 1.1




This is the user prompt:
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
