// Tab Group AI - Backend Server
// Main entry point for the Express.js server

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./utils/logger');
const categorizeRoutes = require('./routes/categorize');

// --- Initialization ---

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// --- CORS Configuration ---

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., server-to-server, mobile apps) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'), false);
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// --- Middleware ---

app.use(helmet()); // Set security-related HTTP headers
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '1mb' })); // Parse JSON request bodies
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); // HTTP request logging

// --- Routes ---

app.use('/api', categorizeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Error Handling ---

// Centralized error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'An unexpected error occurred.';
  const errorName = err.name || 'InternalServerError';

  res.status(statusCode).json({
    error: errorName,
    message: errorMessage,
  });
});

// --- Server Activation ---

const server = app.listen(PORT, () => {
  logger.info(`Backend server running on port ${PORT} in ${NODE_ENV} mode.`);
});

// --- Process-wide Error Handling ---

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  // Optionally, gracefully shut down the server
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', { error: err });
  // Perform cleanup and exit
  process.exit(1);
});

module.exports = { app, server }; // Export for testing and programmatic use
