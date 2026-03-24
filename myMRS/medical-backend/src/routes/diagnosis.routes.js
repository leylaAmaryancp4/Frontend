import { Router } from 'express';
import { createDiagnosis, getDiagnosesByRecord } from '../controllers/diagnosis.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Diagnosis routes (admin and doctor only)
router.post('/', authorize(['admin', 'doctor']), createDiagnosis);
router.get('/record/:medicalRecordId', authorize(['admin', 'doctor']), getDiagnosesByRecord);

export default router;