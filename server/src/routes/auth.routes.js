import { Router } from 'express';
import { forgotPassword, getMe, login, register, resetPassword, updateProfile } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { throttle } from '../middlewares/throttle.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

const registerSchema = { body: ['name', 'email', 'password'] };
const loginSchema = { body: ['email', 'password'] };
const forgotPasswordSchema = { body: ['email'] };
const resetPasswordSchema = { body: ['token', 'password'] };

router.post('/register', throttle(300), validate(registerSchema), register);
router.post('/login', throttle(300), validate(loginSchema), login);
router.post('/forgot-password', throttle(300), validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', throttle(300), validate(resetPasswordSchema), resetPassword);
router.get('/me', verifyJWT, getMe);
router.patch('/profile', verifyJWT, updateProfile);

export default router;
