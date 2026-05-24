import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';
import { registerSocketHandlers } from './sockets/index.js';

const startServer = async () => {
  try {
    // Connect Mock-Ready Storage Layer
    await connectDB();

    const server = http.createServer(app);

    // Setup Socket.IO Server with strict CORS
    const io = new Server(server, {
      cors: {
        origin: [env.corsOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Register WebSockets listeners
    registerSocketHandlers(io);

    server.listen(env.port, () => {
      logger.info(`===================================================`);
      logger.info(`🚀 GrowthRadar AI Backend Server running successfully`);
      logger.info(`📶 Listening on port: http://localhost:${env.port}`);
      logger.info(`🔒 Environment Mode: ${env.nodeEnv}`);
      logger.info(`===================================================`);
    });

    // Handle system terminations
    const handleShutdown = (signal) => {
      logger.info(`Received ${signal}. Gracefully terminating Express server...`);
      server.close(() => {
        logger.info('HTTP server closed. Process terminated successfully.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server bootstrap:', error);
    process.exit(1);
  }
};

startServer();
