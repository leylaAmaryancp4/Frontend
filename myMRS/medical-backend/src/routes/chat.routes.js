import { Router } from 'express';
import { createChat, sendMessage, getMessagesByChat } from '../controllers/chat.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Chat routes (all authorized roles)
router.post('/', authorize(['admin', 'doctor', 'hospital']), createChat);
router.post('/message', authorize(['admin', 'doctor', 'hospital']), sendMessage);
router.get('/:chatId', authorize(['admin', 'doctor', 'hospital']), getMessagesByChat);

export default router;
