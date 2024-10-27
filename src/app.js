// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const codeExecutionRoutes = require('./routes/codeExecutionRoutes');


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes

app.use('/api/code', codeExecutionRoutes);


// Error handling
app.use(errorHandler);

module.exports = app;