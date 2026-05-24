import { Router } from 'express';
import { getAlerts, markAsRead } from '../controllers/alert.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyJWT, getAlerts);
router.patch('/:id/read', verifyJWT, markAsRead);

export default router;
