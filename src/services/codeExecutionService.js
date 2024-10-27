const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute Python code
exports.execute = async (code) => {
  return new Promise((resolve, reject) => {
    // Save the code to a temporary Python file
    const tempFilePath = path.join(__dirname, 'temp.py');
    fs.writeFile(tempFilePath, code, (err) => {
      if (err) {
        return reject(new Error('Failed to save the Python code to a file.'));
      }

      // Run the Python script using exec
      exec(`python ${tempFilePath}`, (error, stdout, stderr) => {
        // Delete the temporary file
        fs.unlinkSync(tempFilePath);

        if (error) {
          // If there is an error, return the error message
          return reject(new Error(`Execution error: ${stderr || error.message}`));
        }

        // Return the standard output (the result of the code execution)
        resolve({ output: stdout });
      });
    });
  });
};
