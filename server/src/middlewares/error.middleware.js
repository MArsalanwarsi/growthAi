import { logger } from '../utils/logger.js';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };

  logger.error(`[${req.method}] ${req.url} - Status: ${error.statusCode} - Msg: ${error.message}`);
  
  return res.status(error.statusCode).json(response);
};

export default errorHandler;
