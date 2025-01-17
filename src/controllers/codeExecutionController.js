// src/controllers/codeExecutionController.js

const apiResponse = require('../utils/apiResponse');
const codeExecutionService = require('../services/codeExecutionService');
const Code = require('../models/codeModel');

exports.executeCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const userId = req.userId;
    
    const formattedCode = code.split('\r\n').map(line => line.trim()).filter(line => line).join('\n');
    // Try to execute the code
    try {
      const executionResult = await codeExecutionService.execute(code);
      // If execution is successful, send both output and feedback
      res.json(apiResponse.success({ 
        output: executionResult.output,
        executionSuccess: true
      }));

      const newCodeEntry = new Code({
        userId,
        code: formattedCode,
        executionResult: executionResult.output,
        error: null // No error if execution is successful
      });

      await newCodeEntry.save(); 

    } catch (executionError) {
      // If execution fails, send the error message and feedback
      res.json(apiResponse.success({ 
        output: executionError.message,
        executionSuccess: false
      }));
      const newCodeEntry = new Code({
        userId,
        code: formattedCode,
        executionResult: null, // No output if execution fails
        error: executionError.message // Store the error message
      });

      await newCodeEntry.save(); 
    }

  } catch (error) {
    // Handle any other unexpected errors
    console.error('Code Execution Error:', error);
  }
};