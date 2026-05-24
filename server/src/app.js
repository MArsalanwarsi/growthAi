import express from 'express';
import morgan from 'morgan';

// Config & Middlewares
import { corsMiddleware } from './config/cors.js';
import { securityMiddleware } from './middlewares/security.middleware.js';
import { globalLimiter } from './middlewares/rateLimit.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Route Imports
import authRoutes from './routes/auth.routes.js';
import businessRoutes from './routes/business.routes.js';
import competitorRoutes from './routes/competitor.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import aiRoutes from './routes/ai.routes.js';
import reportRoutes from './routes/report.routes.js';
import alertRoutes from './routes/alert.routes.js';

const app = express();

// Security Middlewares
app.use(securityMiddleware());
app.use(corsMiddleware());

// Utility Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(morgan('dev'));

// Global IP Limiter
app.use('/api', globalLimiter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// REST Endpoints mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/competitors', competitorRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/alerts', alertRoutes);

// Catch-all route not found
app.use('*', (req, res, next) => {
  res.status(404).json({ success: false, message: 'Resource API endpoint not found' });
});

// Global Centralized Error Middleware
app.use(errorHandler);

export default app;
