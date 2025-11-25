// Vercel Serverless Function Entry Point
// This file exports the Express app as a serverless function for Vercel

// For Vercel serverless functions, we need to ensure the database connection
// is established but doesn't block the function from starting

let app;
let dbConnectionPromise = null;

// Initialize database connection (lazy loading)
const initializeDatabase = async () => {
  if (!dbConnectionPromise) {
    try {
      const connectdb = require('../config/database.config');
      dbConnectionPromise = connectdb.catch((error) => {
        console.error('Database connection error:', error.message);
        // Don't throw - let routes handle the error
        return null;
      });
      await dbConnectionPromise;
    } catch (error) {
      console.error('Failed to load database config:', error.message);
      return null;
    }
  }
  return dbConnectionPromise;
};

// Initialize app with error handling
try {
  // Ensure database connection is started (non-blocking)
  initializeDatabase();
  
  // Import the Express app
  app = require('../app');
  
  // Add a health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  });
  
} catch (error) {
  // If app initialization fails, create a minimal error handler app
  console.error('❌ Failed to initialize app:', error.message);
  console.error('Stack:', error.stack);
  
  const express = require('express');
  app = express();
  
  // Error handler route
  app.use('*', async (req, res) => {
    const missingEnvVars = [];
    const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'PROJECT_NAME', 'NODE_ENV'];
    
    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        missingEnvVars.push(varName);
      }
    });
    
    res.status(500).json({
      success: false,
      message: 'Server initialization failed',
      error: 'FUNCTION_INVOCATION_FAILED',
      details: {
        message: error.message,
        missingEnvironmentVariables: missingEnvVars.length > 0 ? missingEnvVars : undefined,
        hint: missingEnvVars.length > 0 
          ? `Please set the following environment variables in Vercel: ${missingEnvVars.join(', ')}`
          : 'Check Vercel function logs for more details'
      },
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
  });
}

// Export the app for Vercel serverless functions
module.exports = app;

// For local development, you can still run the server normally
if (require.main === module) {
  const http = require('http');
  try {
    const env = require('../config/env.config');
    const connectdb = require('../config/database.config');
    const { logger } = require('../helpers');
    
    const port = env.PORT || 3000;
    const server = http.createServer(app);
    
    connectdb.then(() => {
      server.listen(port, () => {
        logger.info(`Server running on port ${port}`);
      });
    }).catch((error) => {
      logger.error('Database connection failed:', error);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

