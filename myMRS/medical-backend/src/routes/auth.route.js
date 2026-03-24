import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Authenticated routes
router.get('/me', authenticate, me);

export default router;