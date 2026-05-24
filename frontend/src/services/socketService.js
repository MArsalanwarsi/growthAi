import { store } from '@/redux/store';
import { addAlert } from '@/redux/slices/alertsSlice';

let socket = null;

const getSocketUrl = () => {
  if (import.meta.env.VITE_WS_URL) return import.meta.env.VITE_WS_URL;

  if (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    return 'http://localhost:5000';
  }

  return 'https://growth-ai-express.vercel.app';
};

export const connectSocket = () => {
  if (socket) return;

  try {
    // Dynamic import to prevent build issues if package is fetching
    import('socket.io-client').then(({ io }) => {
      socket = io(getSocketUrl(), {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
      });

      socket.on('connect', () => {
        console.log('📶 Live intelligence websocket stream established successfully');
        socket.emit('join_channel', 'global_alerts');
      });

      socket.on('new_alert', (alert) => {
        console.log('🔔 Realtime alert signal captured:', alert);
        store.dispatch(addAlert(alert));
      });

      socket.on('connect_error', () => {
        console.warn('⚠️ Websocket connection failed, retrying in background...');
      });
    }).catch(() => {
      console.warn('⚠️ socket.io-client could not be loaded. Operating in offline intelligence mode.');
    });
  } catch {
    console.warn('⚠️ Socket connection failed initialization. Falling back silently.');
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default { connectSocket, disconnectSocket };
