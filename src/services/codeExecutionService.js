// src/services/codeExecutionService.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.execute = async (code, language = 'auto') => {
  // Detect language if not specified
  if (language === 'auto') {
    language = this.detectLanguage(code);
  }

  return new Promise((resolve, reject) => {
    // Generate a unique filename to prevent conflicts
    const uniqueId = crypto.randomBytes(16).toString('hex');
    let tempFilePath;
    let executionCommand;

    // Determine file extension and execution command based on language
    switch (language.toLowerCase()) {
      case 'python':
        tempFilePath = path.join(__dirname, `temp_${uniqueId}.py`);
        executionCommand = `python ${tempFilePath}`;
        break;
      case 'javascript':
      case 'js':
        tempFilePath = path.join(__dirname, `temp_${uniqueId}.js`);
        executionCommand = `node ${tempFilePath}`;
        break;
      default:
        return reject(new Error(`Unsupported language: ${language}`));
    }

    // Write the code to the temporary file
    fs.writeFile(tempFilePath, code, (err) => {
      if (err) {
        return reject(new Error(`Failed to save the ${language} code to a file.`));
      }

      // Configure execution with timeout and resource limits
      const executionOptions = {
        timeout: 10000, // 10 seconds max execution time
        maxBuffer: 1024 * 1024, // 1MB max output
      };

      // Run the script
      exec(executionCommand, executionOptions, (error, stdout, stderr) => {
        // Always try to delete the temporary file
        try {
          fs.unlinkSync(tempFilePath);
        } catch (cleanupError) {
          console.error('Failed to delete temporary file:', cleanupError);
        }

        if (error) {
          // Detailed error handling
          const errorMessage = stderr || error.message;
          return reject(new Error(`Execution error: ${errorMessage}`));
        }

        // Return the standard output
        resolve({ 
          output: stdout.trim(),
          language: language.toLowerCase()
        });
      });
    });
  });
};

// Language detection method
exports.detectLanguage = (code) => {
  // Trim whitespace and remove leading comments
  const cleanedCode = code.trim().replace(/^\/\/.*\n/gm, '').replace(/^#.*\n/gm, '');

  // Python-specific indicators
  const pythonIndicators = [
    /^\s*def\s+\w+\(/,  // Function definition
    /^\s*class\s+\w+:/,  // Class definition
    /^\s*import\s+\w+/,  // Import statement
    /^\s*from\s+\w+\s+import\s+\w+/,  // From import
    /^\s*print\(/,  // Print function
  ];

  // JavaScript-specific indicators
  const jsIndicators = [
    /^\s*const\s+\w+\s*=/,  // Const declaration
    /^\s*let\s+\w+\s*=/,    // Let declaration
    /^\s*var\s+\w+\s*=/,    // Var declaration
    /^\s*function\s+\w+\(/,  // Function declaration
    /^\s*console\.log\(/,   // Console log
    /^\s*=>\s*{/,           // Arrow function
  ];

  // Check Python indicators first
  if (pythonIndicators.some(indicator => indicator.test(cleanedCode))) {
    return 'python';
  }

  // Then check JavaScript indicators
  if (jsIndicators.some(indicator => indicator.test(cleanedCode))) {
    return 'javascript';
  }

  // Default to JavaScript if no clear indicators
  return 'javascript';
};