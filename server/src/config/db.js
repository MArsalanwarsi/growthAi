import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
  try {
    const uri = env.mongodbUri || '';
    const safeUri = uri ? uri.replace(/:([^@]+)@/, ':****@') : 'UNDEFINED';
    logger.info(`Connecting to MongoDB using: ${safeUri}`);
    await mongoose.connect(env.mongodbUri);
    logger.info('Database connection established successfully (MongoDB Atlas Active)');
    return true;
  } catch (error) {
    logger.error('Database connection failed:', error);
    logger.warn('⚠️ MongoDB connection offline. Server will continue in offline-ready state.');
  }
};

export default connectDB;
