import { Router } from 'express';
import {
  discover,
  getCompetitorsList,
  getCompetitorDetails,
  getCompetitorSocial,
  getCompetitorSeo,
  getCompetitorAds,
  getCompetitorSentiment
} from '../controllers/competitor.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { throttle } from '../middlewares/throttle.middleware.js';

const router = Router();

router.post('/discover', verifyJWT, throttle(1000), discover);
router.get('/', verifyJWT, getCompetitorsList);
router.get('/:id', verifyJWT, getCompetitorDetails);
router.get('/:id/social', verifyJWT, getCompetitorSocial);
router.get('/:id/seo', verifyJWT, getCompetitorSeo);
router.get('/:id/ads', verifyJWT, getCompetitorAds);
router.get('/:id/sentiment', verifyJWT, getCompetitorSentiment);

export default router;
