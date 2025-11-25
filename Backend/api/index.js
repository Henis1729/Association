// Vercel Serverless Function Entry Point
// This file exports the Express app as a serverless function for Vercel

// Import the Express app
const app = require('../app');

// Export the app for Vercel serverless functions
// Vercel will automatically handle this as a serverless function
module.exports = app;

// For local development, you can still run the server normally
if (require.main === module) {
  const http = require('http');
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
}

