const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const tempDir = os.tmpdir();

exports.execute = async (code, language, input = '') => {
  return new Promise((resolve, reject) => {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    let tempFilePath;
    let executionCommand;
    let cleanupFiles = [];
    let isCompiledLanguage = false;

    switch (language.toLowerCase()) {
      case 'python':
        tempFilePath = path.join(tempDir, `temp_${uniqueId}.py`);
        executionCommand = 'python';
        cleanupFiles.push(tempFilePath);
        break;

      case 'javascript':
      case 'js':
        tempFilePath = path.join(tempDir, `temp_${uniqueId}.js`);
        executionCommand = 'node';
        cleanupFiles.push(tempFilePath);
        break;

      case 'java':
        isCompiledLanguage = true;
        const javaDir = path.join(tempDir, `java_${uniqueId}`);
        fs.mkdirSync(javaDir);
        tempFilePath = path.join(javaDir, 'Main.java');
        cleanupFiles.push(javaDir);
        break;

      case 'cpp':
      case 'c++':
        isCompiledLanguage = true;
        tempFilePath = path.join(tempDir, `temp_${uniqueId}.cpp`);
        const executablePath = path.join(tempDir, `temp_${uniqueId}_exe`);
        cleanupFiles.push(tempFilePath, executablePath);
        break;

      default:
        return reject(new Error(`Unsupported language: ${language}`));
    }

    // Write code to file for all languages
    fs.writeFileSync(tempFilePath, code);

    if (isCompiledLanguage) {
      switch (language.toLowerCase()) {
        case 'java':
          handleJavaExecution(tempFilePath, input, resolve, reject, cleanupFiles);
          break;
          
        case 'cpp':
        case 'c++':
          handleCppExecution(tempFilePath, input, resolve, reject, cleanupFiles);
          break;
      }
    } else {
      // Handle interpreted languages
      const childProcess = spawn(executionCommand, [tempFilePath], { stdio: ['pipe', 'pipe', 'pipe'] });

      let output = '';
      let errorOutput = '';

      childProcess.stdout.on('data', (data) => output += data.toString());
      childProcess.stderr.on('data', (data) => errorOutput += data.toString());

      childProcess.on('close', (code) => {
        cleanup(cleanupFiles);
        if (code !== 0) {
          return reject(new Error(errorOutput || 'Process exited with an error.'));
        }
        resolve({ output: output.trim() });
      });

      if (input) {
        childProcess.stdin.write(input + '\n');
        childProcess.stdin.end();
      }
    }
  });
};

// Java Execution Handler
function handleJavaExecution(javaPath, input, resolve, reject, cleanupFiles) {
  const javaDir = path.dirname(javaPath);
  let javaCode = fs.readFileSync(javaPath, 'utf-8');

  // Extract the public class name using a regex
  const classNameMatch = javaCode.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
  if (!classNameMatch) {
    cleanup(cleanupFiles);
    return reject(new Error('No public class found in Java code.'));
  }

  const className = classNameMatch[1]; // Extracted class name
  const newJavaPath = path.join(javaDir, `${className}.java`);
  
  // Rename the Java file to match the class name
  fs.renameSync(javaPath, newJavaPath);

  const compileProcess = spawn('javac', [newJavaPath], { cwd: javaDir });

  let compileError = '';
  compileProcess.stderr.on('data', (data) => compileError += data.toString());

  compileProcess.on('close', (compileCode) => {
    if (compileCode !== 0) {
      cleanup(cleanupFiles);
      return reject(new Error(compileError || 'Java compilation failed'));
    }

    const executeProcess = spawn('java', ['-cp', javaDir, className], { cwd: javaDir, stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';
    let errorOutput = '';

    executeProcess.stdout.on('data', (data) => output += data.toString());
    executeProcess.stderr.on('data', (data) => errorOutput += data.toString());

    executeProcess.on('close', (code) => {
      cleanup(cleanupFiles);
      if (code !== 0) {
        reject(new Error(errorOutput || 'Java execution failed'));
      } else {
        resolve({ output: output.trim() });
      }
    });

    if (input) {
      executeProcess.stdin.write(input + '\n');
      executeProcess.stdin.end();
    }
  });
}


// C++ Execution Handler
function handleCppExecution(cppPath, input, resolve, reject, cleanupFiles) {
  const executablePath = cppPath.replace('.cpp', '_exe');
  const compileProcess = spawn('g++', [cppPath, '-o', executablePath]);

  let compileError = '';
  compileProcess.stderr.on('data', (data) => compileError += data.toString());

  compileProcess.on('close', (compileCode) => {
    if (compileCode !== 0) {
      cleanup(cleanupFiles);
      return reject(new Error(compileError || 'C++ compilation failed'));
    }

    const executeProcess = spawn(executablePath, [], { stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '';
    let errorOutput = '';

    executeProcess.stdout.on('data', (data) => output += data.toString());
    executeProcess.stderr.on('data', (data) => errorOutput += data.toString());

    executeProcess.on('close', (code) => {
      cleanup(cleanupFiles);
      if (code !== 0) {
        reject(new Error(errorOutput || 'C++ execution failed'));
      } else {
        resolve({ output: output.trim() });
      }
    });

    if (input) {
      executeProcess.stdin.write(input + '\n');
      executeProcess.stdin.end();
    }
  });
}

// Cleanup function
function cleanup(files) {
  files.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        if (fs.lstatSync(file).isDirectory()) {
          fs.rmSync(file, { recursive: true, force: true });
        } else {
          fs.unlinkSync(file);
        }
      }
    } catch (e) {
      console.error('Error cleaning up file:', e);
    }
  });
}