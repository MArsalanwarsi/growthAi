import { logger } from '../utils/logger.js';
import socketService from '../services/socket.service.js';

export const registerSocketHandlers = (io) => {
  // Register in service layer
  socketService.setIO(io);

  io.on('connection', (socket) => {
    logger.info(`Websocket client connected: ${socket.id}`);

    // Join organization or user-specific channel
    socket.on('join_channel', (channelName) => {
      logger.info(`Client ${socket.id} joined subscription channel: ${channelName}`);
      socket.join(channelName);
    });

    socket.on('disconnect', () => {
      logger.info(`Websocket client disconnected: ${socket.id}`);
    });
  });

  // Schedule a periodic mock live-alert broadcast to visually impress during demo/investor run-times!
  setInterval(() => {
    const alertTypes = ['meta_ad', 'viral_post', 'price_change', 'negative_review'];
    const mockAlerts = [
      { id: Date.now(), type: 'warning', title: 'Competitor meta ad launched', message: 'Vortex Brands launched 4 new video ads targeting checkout discount triggers.' },
      { id: Date.now(), type: 'success', title: 'Competitor content went viral', message: 'Vortex Brands Reel "Why pay 3x for generic SaaS..." has surpassed 100K views in 4 hours.' },
      { id: Date.now(), type: 'info', title: 'Competitor pricing updated', message: 'Lumina Labs changed Pro pricing structure to include free audit logs.' }
    ];
    const chosen = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
    socketService.broadcastAlert(chosen);
  }, 25000); // every 25 seconds
};

export default registerSocketHandlers;
