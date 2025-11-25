// Simple health check endpoint for debugging
// This endpoint doesn't require database connection

module.exports = (req, res) => {
  const missingVars = [];
  const requiredVars = {
    'PROJECT_NAME': 'Required',
    'NODE_ENV': 'Required',
    'PORT': 'Required',
    'MONGODB_URI': 'Required - MongoDB connection string',
    'JWT_SECRET': 'Required - JWT authentication secret',
    'BASE_URL': 'Required - API base path',
    'JSON_BODY_LIMIT': 'Required',
    'JWT_EXPIRES_IN': 'Required'
  };
  
  Object.keys(requiredVars).forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push({ name: varName, description: requiredVars[varName] });
    }
  });
  
  res.json({
    status: missingVars.length === 0 ? 'healthy' : 'misconfigured',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'not set',
    missingEnvironmentVariables: missingVars.length > 0 ? missingVars : undefined,
    allVariablesSet: missingVars.length === 0,
    message: missingVars.length > 0 
      ? `Missing ${missingVars.length} required environment variable(s). Please set them in Vercel project settings.`
      : 'All required environment variables are set.'
  });
};

