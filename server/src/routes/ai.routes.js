import { Router } from 'express';
import { analyze, recommendations, content, battleMode, report } from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { throttle } from '../middlewares/throttle.middleware.js';

const router = Router();

router.post('/analyze', verifyJWT, throttle(1000), analyze);
router.post('/recommendations', verifyJWT, throttle(800), recommendations);
router.post('/content', verifyJWT, throttle(1200), content);
router.post('/battle-mode', verifyJWT, throttle(1000), battleMode);
router.post('/report', verifyJWT, throttle(1500), report);

export default router;
