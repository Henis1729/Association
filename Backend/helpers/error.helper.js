/**
 * Error Handling Helper
 * Provides utilities for consistent error handling across controllers
 */

const { response, logger } = require('./index');
const { MESSAGE } = require('./constant.helper');

/**
 * Wraps a controller function with try-catch error handling
 * Ensures all errors are caught and properly formatted
 * 
 * @param {Function} controllerFn - The controller function to wrap
 * @param {string} controllerName - Name of the controller for logging
 * @returns {Function} - Wrapped controller function with error handling
 */
const wrapController = (controllerFn, controllerName = 'Unknown') => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      // Log the error with context
      logger.error({
        controller: controllerName,
        method: req.method,
        url: req.originalUrl,
        error: error.message,
        stack: error.stack,
        body: req.body,
        query: req.query,
        params: req.params
      });

      // If response was already sent, pass to next error handler
      if (res.headersSent) {
        return next(error);
      }

      // Check for specific error types
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return response.BAD_REQUEST({
          res,
          message: error.message || MESSAGE.FAILED,
          payload: { 
            context: error.message,
            errors: error.errors || error.reason
          }
        });
      }

      if (error.name === 'MongoServerError' || error.code === 11000) {
        return response.DUPLICATE_VALUE({
          res,
          message: MESSAGE.DUPLICATE_ENTRY,
          payload: { 
            context: error.message,
            field: error.keyPattern ? Object.keys(error.keyPattern)[0] : null
          }
        });
      }

      if (error.name === 'MongooseServerSelectionError') {
        return response.BAD_REQUEST({
          res,
          message: 'Database connection error. Please try again later.',
          payload: { 
            context: error.message
          }
        });
      }

      // Generic error response
      return response.INTERNAL_SERVER_ERROR({
        res,
        message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
        payload: {
          context: error.message,
          // Only include stack in development
          ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack,
            errorType: error.constructor.name
          })
        }
      });
    }
  };
};

/**
 * Creates a safe async controller handler
 * Use this to wrap individual controller methods
 * 
 * @param {string} controllerName - Name of the controller
 * @returns {Function} - Decorator function
 */
const safeHandler = (controllerName) => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = wrapController(originalMethod, `${controllerName}.${propertyKey}`);
    return descriptor;
  };
};

module.exports = {
  wrapController,
  safeHandler,
};

