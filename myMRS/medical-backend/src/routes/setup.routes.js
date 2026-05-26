import { Router } from 'express';
import { seedRoles } from '../controllers/setup.controller.js';

const router = Router();

// A GET request to /api/setup/seed-roles will trigger the seeding process.
router.get('/seed-roles', seedRoles);

export default router;