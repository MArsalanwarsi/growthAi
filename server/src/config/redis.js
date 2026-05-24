import { logger } from '../utils/logger.js';

// Simple in-memory cache simulating Redis operations
class InMemoryRedisMock {
  constructor() {
    this.store = new Map();
    logger.info('Redis cache initialized (In-Memory Fallback Caching Active)');
  }

  async get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    
    // Check expiration
    if (item.expiry && Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key, value, expirySeconds = null) {
    const expiry = expirySeconds ? Date.now() + expirySeconds * 1000 : null;
    this.store.set(key, { value, expiry });
    return 'OK';
  }

  async del(key) {
    this.store.delete(key);
    return 1;
  }

  async clear() {
    this.store.clear();
  }
}

export const redisCache = new InMemoryRedisMock();
export default redisCache;
