import { Router } from 'express';
import { getDashboardOverview, getGrowthScore, getOpportunities, getPredictions } from '../controllers/analytics.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/dashboard', verifyJWT, getDashboardOverview);
router.get('/growth-score', verifyJWT, getGrowthScore);
router.get('/opportunities', verifyJWT, getOpportunities);
router.get('/predictions', verifyJWT, getPredictions);

export default router;
