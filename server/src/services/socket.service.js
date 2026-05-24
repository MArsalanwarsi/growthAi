import { logger } from '../utils/logger.js';

let ioInstance = null;

export const setIO = (io) => {
  ioInstance = io;
  logger.info('Socket.IO instance successfully registered in service layer');
};

export const broadcastAlert = (alertPayload) => {
  if (ioInstance) {
    logger.info(`Broadcasting real-time alert event: ${alertPayload.title}`);
    ioInstance.emit('new_alert', alertPayload);
    return true;
  }
  logger.warn('Socket.IO broadcaster called but connection is inactive');
  return false;
};

export default { setIO, broadcastAlert };
