import { Router } from 'express';
import { createRequest, approveRequest, rejectRequest, getAllRequests } from '../controllers/recordRequest.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Hospital creates a request
router.post('/', authorize(['hospital']), createRequest);

// Get all requests (admin, doctor, hospital)
router.get('/', authorize(['admin', 'doctor', 'hospital']), getAllRequests);

// Doctor approves request
router.put('/approve/:id', authorize(['doctor']), approveRequest);

// Doctor rejects request
router.put('/reject/:id', authorize(['doctor']), rejectRequest);

export default router;