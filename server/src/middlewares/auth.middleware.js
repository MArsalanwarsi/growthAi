import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized request: Missing bearer token');
  }

  const token = authHeader.split(' ')[1];

  // Bypass for demo-token or verify actual JWT
  if (token.startsWith('demo-token-')) {
    req.user = {
      id: '000000000000000000000001',
      name: 'Growth Operator',
      email: 'demo@growthradar.ai',
      role: 'Owner',
      company: 'GrowthRadar Demo'
    };
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, env.jwtSecret);
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ApiError(401, 'Unauthorized request: Invalid or expired access token');
  }
});
