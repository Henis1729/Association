/**
 * Controller Wrapper Helper
 * Automatically wraps all controller methods with try-catch error handling
 */

const { response, logger } = require('./index');
const { MESSAGE } = require('./constant.helper');

/**
 * Wraps all controller methods in an object with try-catch error handling
 * @param {Object} controllers - Object containing controller methods
 * @param {string} controllerName - Name of the controller (for logging)
 * @returns {Object} - Wrapped controllers with error handling
 */
const wrapControllers = (controllers, controllerName = 'Unknown') => {
  const wrappedControllers = {};

  for (const [methodName, method] of Object.entries(controllers)) {
    if (typeof method === 'function') {
      wrappedControllers[methodName] = async (req, res, next) => {
        try {
          return await method(req, res, next);
        } catch (error) {
          // Log the error with full context
          logger.error({
            controller: controllerName,
            method: methodName,
            httpMethod: req.method,
            url: req.originalUrl,
            error: error.message,
            stack: error.stack,
            body: req.body,
            query: req.query,
            params: req.params,
            user: req.user ? { _id: req.user._id, role: req.user.role } : null
          });

          // If response was already sent, pass to next error handler
          if (res.headersSent) {
            return next(error);
          }

          // Handle specific error types
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

          if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'field';
            return response.DUPLICATE_VALUE({
              res,
              message: MESSAGE.DUPLICATE_ENTRY,
              payload: {
                context: `Duplicate value for ${field}`,
                field: field
              }
            });
          }

          if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError') {
            return response.BAD_REQUEST({
              res,
              message: 'Database connection error. Please try again later.',
              payload: {
                context: error.message
              }
            });
          }

          // For any other error, return a proper error response instead of crashing
          return response.INTERNAL_SERVER_ERROR({
            res,
            message: error.message || MESSAGE.INTERNAL_SERVER_ERROR,
            payload: {
              context: error.message,
              errorType: error.constructor.name,
              // Only include stack in development
              ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack
              })
            }
          });
        }
      };
    } else {
      // If it's not a function, keep it as is
      wrappedControllers[methodName] = method;
    }
  }

  return wrappedControllers;
};

module.exports = {
  wrapControllers
};

