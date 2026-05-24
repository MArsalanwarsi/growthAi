import { Router } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { throttle } from '../middlewares/throttle.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

const registerSchema = { body: ['name', 'email', 'password'] };
const loginSchema = { body: ['email', 'password'] };

router.post('/register', throttle(300), validate(registerSchema), register);
router.post('/login', throttle(300), validate(loginSchema), login);
router.get('/me', verifyJWT, getMe);
router.patch('/profile', verifyJWT, updateProfile);

export default router;
