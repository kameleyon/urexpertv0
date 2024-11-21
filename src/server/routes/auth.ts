import express from 'express';
import { body } from 'express-validator';
import { register, login, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth';
import { authLimiter } from '../middleware/auth';

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').optional().trim(),
    body('organizationId').optional().trim(),
  ],
  register
);

router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
  ],
  login
);

router.get('/verify-email', verifyEmail);

router.post(
  '/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  forgotPassword
);

router.post(
  '/reset-password',
  [
    body('token').exists(),
    body('password').isLength({ min: 8 }),
  ],
  resetPassword
);

export default router;