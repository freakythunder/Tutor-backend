const codeExecutionService = require('../services/codeExecutionService');
const apiResponse = require('../utils/apiResponse');

exports.executeCode = async (req, res, next) => {
  try {
    const { code } = req.body; // Get the Python code from the request body

    // Call the service to execute the Python code
    const result = await codeExecutionService.execute(code);

    // Send the output back to the frontend
    res.json(apiResponse.success(result));
  } catch (error) {
    // Return the error message in case of failure
    res.json(apiResponse.error(error.message));
  }
};
