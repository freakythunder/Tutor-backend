// src/controllers/codeExecutionController.js

const apiResponse = require('../utils/apiResponse');
const codeExecutionService = require('../services/codeExecutionService');
const userGenAIManager = require('../services/userGenAIManager');
const Chat = require('../models/chatModels');

exports.executeCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const userId = req.userId;
    

    // Try to execute the code
    try {
      const executionResult = await codeExecutionService.execute(code);
      // If execution is successful, send both output and feedback
      res.json(apiResponse.success({ 
        output: executionResult.output,
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