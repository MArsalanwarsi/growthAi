import { Router } from 'express';
import { createBusiness, getBusiness, patchBusiness } from '../controllers/business.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

const businessSchema = { body: ['name', 'industry', 'websiteUrl'] };

router.post('/', verifyJWT, validate(businessSchema), createBusiness);
router.get('/:id', verifyJWT, getBusiness);
router.patch('/:id', verifyJWT, patchBusiness);

export default router;
