const express = require('express');
const codeExecutionController = require('../controllers/codeExecutionController');


const router = express.Router();

// Define the route for executing Python code
router.post('/execute', codeExecutionController.executeCode);

module.exports = router;
