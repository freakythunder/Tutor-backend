const codeExecutionService = require('../services/codeExecutionService');
const apiResponse = require('../utils/apiResponse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const model = require('../utils/genAIInstance');

exports.executeCode = async (req, res, next) => {
  try {
    const { code } = req.body; // Get the Python code from the request body

    // Call the service to execute the Python code
    const executionResult = await codeExecutionService.execute(code);

    // Prepare the prompt for GenAI
    const prompt = `
      Please analyze the following code and provide feedback on its functionality. 
      this code is written in response to the challenge you just gave in the previous response. 
      Here is the code:
      ${code}
    `;

    // Call GenAI to get feedback on the code
    const genAIResponse = await model.generateContent(prompt);
    const feedback = genAIResponse.response.text();

    // Send the output and GenAI feedback back to the frontend
    res.json(apiResponse.success({ 
      output: executionResult.output,
      feedback: feedback
    }));
  } catch (error) {
    // Return the error message in case of failure
    res.json(apiResponse.error(error.message));
  }
};