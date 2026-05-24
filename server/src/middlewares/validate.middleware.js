import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => (req, res, next) => {
  // Simple validation checks on body/params
  if (schema.body) {
    const missingKeys = [];
    for (const key of schema.body) {
      if (req.body[key] === undefined || req.body[key] === null || req.body[key] === '') {
        missingKeys.push(key);
      }
    }
    if (missingKeys.length > 0) {
      return next(new ApiError(400, `Validation Error: Missing required fields: ${missingKeys.join(', ')}`));
    }
  }
  next();
};

export default validate;
