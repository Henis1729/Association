const { MulterError } = require('multer');
const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = require('jsonwebtoken');
const {
  Error: {
    CastError,               StrictModeError,                OverwriteModelError,
    DivergentArrayError,     VersionError,                   ValidationError,
    DocumentNotFoundError,   MongooseServerSelectionError,   ValidatorError,
    MissingSchemaError,      StrictPopulateError,            ParallelSaveError,
  },
} = require('mongoose');

const { response, logger } = require('../helpers');
const { MESSAGE } = require('../helpers/constant.helper');

module.exports = async (error, req, res, next) => {
  // Log the error first
  logger.error({
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    errorName: error.name,
    errorType: error.constructor.name
  });

  // Ensure response hasn't been sent already
  if (res.headersSent) {
    return next(error);
  }

  // Handle different error types
  if (error instanceof JsonWebTokenError || error instanceof NotBeforeError || error instanceof TokenExpiredError) {
    return response.UNAUTHORIZED({
      res,
      message: MESSAGE.UNAUTHORIZED,
      payload: { context: error.message },
    });
  }

  if (error instanceof MulterError) {
    return response.BAD_REQUEST({
      res,
      message: MESSAGE.FILE_UPLOAD_FAILED,
      payload: { context: error.code },
    });
  }

  if (
    error instanceof DivergentArrayError ||      error instanceof VersionError ||
    error instanceof DocumentNotFoundError ||    error instanceof MongooseServerSelectionError ||
    error instanceof MissingSchemaError ||       error instanceof StrictPopulateError ||
    error instanceof OverwriteModelError ||      error instanceof ValidationError ||
    error instanceof ParallelSaveError ||        error instanceof ValidatorError ||
    error instanceof StrictModeError ||          error instanceof CastError ||
    /Mongo/gi.test(error.name) ||                /Mongoose/gi.test(error.name)
  ) {
    return response.BAD_REQUEST({
      res,
      message: MESSAGE.FAILED,
      payload: { 
        context: error.message,
        errorType: error.constructor.name,
        // Only show stack in development
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
    });
  }

  if (/Stripe/gi.test(error.type)) {
    return response.BAD_REQUEST({
      res,
      message: MESSAGE.FAILED,
      payload: { context: error.message },
    });
  }

  if (/entity.parse.failed/gi.test(error.type)) {
    return response.BAD_REQUEST({
      res,
      message: MESSAGE.FAILED,
      payload: { context: error.message },
    });
  }

  // Handle PayloadTooLargeError (request body too large)
  if (
    error.type === 'entity.too.large' || 
    error.statusCode === 413 || 
    error.name === 'PayloadTooLargeError' ||
    /payload.*too.*large|entity.*too.*large|request.*entity.*too.*large/i.test(error.message || '')
  ) {
    return response.BAD_REQUEST({
      res,
      message: MESSAGE.PAYLOAD_TOO_LARGE,
      payload: { 
        context: error.message || 'Request entity too large',
        errorType: 'PayloadTooLargeError',
        maxSize: process.env.JSON_BODY_LIMIT || '50mb'
      },
    });
  }

  // Default: Internal Server Error
  return response.INTERNAL_SERVER_ERROR({
    res,
    message: MESSAGE.INTERNAL_SERVER_ERROR,
    payload: { 
      context: error.message,
      errorType: error.constructor.name,
      // Only show stack and full error in development
      ...(process.env.NODE_ENV === 'development' && { 
        stack: error.stack,
        error: error 
      })
    },
  });
};
