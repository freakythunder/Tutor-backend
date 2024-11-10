// src/controllers/codeExecutionController.js

const apiResponse = require('../utils/apiResponse');
const codeExecutionService = require('../services/codeExecutionService');
const userGenAIManager = require('../services/userGenAIManager');
const Chat = require('../models/chatModels');

exports.executeCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const userId = req.userId;
    const pastConversation = await Chat.findOne({ userId })
      .sort({ timestamp: -1 }); // Get the most recent conversation

      //const lastUser Message = pastConversation ? pastConversation.userMessage || "No user message" : "No previous conversation found.";
    const lastAIResponse = pastConversation ? pastConversation.aiResponse || "No AI response" : "No previous AI response found.";

    // Prepare a detailed prompt for GenAI code analysis
    const prompt = `
    content for teacher : 
    follow system instruction for your behaviour.
    to refer to challenge consider Ai response above.

    if user wrote code right : 
    - one line message of congratualtions and what user learned.
    - give a veryshort feedback on how to improve further.
    - move to teach next concept , intorudce in short.
    - give some example code sinppets.
    - give a challenge to be solved.

    if user wrote code wrong :
    - one line message of sorry to inform user that code is wrong.
    - give user hints and pesudo code may be about how to tackle.
    - create a slightly modified challenge for user to solve.

    user message :
    last ai response : ${lastAIResponse}
      The code is written in response to the previous challegne you gave. Kindly
      analyze the code and give feedback.
      
      Code:
      ${code}
    `;

    // Get GenAI feedback
    let feedback;
    try {
      // Use the user's specific chat session
      const genAIConnection = userGenAIManager.activeConnections.get(userId);

      const genAIResponse =await genAIConnection.chat.sendMessage(prompt);
      feedback = genAIResponse.response.text();
    } catch (genAIError) {
      console.error('GenAI Error:', genAIError);
      feedback = "Unable to generate detailed feedback at this time.";
    }

    // Try to execute the code
    try {
      const executionResult = await codeExecutionService.execute(code);
      // If execution is successful, send both output and feedback
      res.json(apiResponse.success({ 
        output: executionResult.output,
        feedback: feedback,
        executionSuccess: true
      }));
    } catch (executionError) {
      // If execution fails, send the error message and feedback
      res.json(apiResponse.success({ 
        output: executionError.message,
        feedback: feedback,
        executionSuccess: false
      }));
    }

  } catch (error) {
    // Handle any other unexpected errors
    console.error('Code Execution Error:', error);
    res.json(apiResponse.error(error.message));
  }
};