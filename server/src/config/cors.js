import cors from 'cors';
import { env } from './env.js';

export const corsConfig = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Normalize origins by removing trailing slashes
    const cleanOrigin = origin.replace(/\/$/, '');
    const cleanCorsOrigin = env.corsOrigin ? env.corsOrigin.replace(/\/$/, '') : '';
    
    const allowedOrigins = [
      cleanCorsOrigin,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://growth-ai-eight.vercel.app'
    ];
    
    if (allowedOrigins.indexOf(cleanOrigin) !== -1 || env.corsOrigin === '*') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

export const corsMiddleware = () => cors(corsConfig);
export default corsMiddleware;
