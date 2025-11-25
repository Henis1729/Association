const { format, transports, createLogger } = require('winston');
const fs = require('fs');
const path = require('path');

const levels = {
  error: 0,   debug: 3,    silly: 6,
  warn: 1,    http: 4,     request: 7,
  info: 2,    verbose: 5,  response: 8,
};

const levelRegex = new RegExp(`(${Object.keys(levels).join('|')})`, 'i');
const devLogFormat = format.printf(({ level, message, timestamp, stack, ms }) => 
    `${level.replace(levelRegex, (level) => level.toUpperCase())} [${timestamp}]: ${stack || message} [${ms}]`
);

// Check if we're in a serverless environment (Vercel, AWS Lambda, etc.)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NOW_REGION;

// Determine log format based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const useFileLogging = !isServerless && !isDevelopment;

// Create transports array
const loggerTransports = [
  new transports.Console({
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      isDevelopment ? devLogFormat : format.json()
    )
  })
];

// Only add file transports if not in serverless environment and not in development
if (useFileLogging) {
  try {
    // Ensure logs directory exists (only for local/server environments)
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    loggerTransports.push(
      new transports.File({ 
        filename: path.join(logsDir, 'error.log'), 
        level: 'error',
        format: format.combine(
          format.timestamp(),
          format.json()
        )
      }),
      new transports.File({ 
        filename: path.join(logsDir, 'combined.log'),
        format: format.combine(
          format.timestamp(),
          format.json()
        )
      })
    );
  } catch (error) {
    // If we can't create log files, just use console (serverless environment)
    console.warn('File logging disabled:', error.message);
  }
}

const logger = createLogger({
  levels,
  level: process.env.LOG_LEVEL || (isServerless ? 'info' : 'debug'),
  format: format.combine(
    format.timestamp({ 
      ...(isDevelopment && { format: 'DD-MM-YYYY HH:mm:ss:ms Z' }) 
    }),
    format.ms(),
    format.errors({ stack: true }),
    isDevelopment ? format.colorize({ all: true }) : format((info) => {
      // In serverless, ensure logs are JSON for better parsing
      return info;
    })()
  ),
  defaultMeta: { 
    service: 'association-api',
    environment: process.env.NODE_ENV || 'unknown',
    serverless: isServerless || false
  },
  transports: loggerTransports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Override console methods in serverless for better logging
if (isServerless) {
  logger.info('📝 Logger initialized for serverless environment (console only)');
}

module.exports = logger;