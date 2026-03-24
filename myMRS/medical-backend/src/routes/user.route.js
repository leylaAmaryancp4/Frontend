import { Router } from 'express'; 
import { getAllUsers, getUserById, updateUser, deleteUser, getMe, updateMe } from '../controllers/user.controller.js';
 import { authenticate } from '../middlewares/auth.middleware.js'; 
 import { authorize } from '../middlewares/role.middleware.js'; 
 const router = Router(); 
 
 // All routes require authentication 
 router.use(authenticate); 

 // Current user profile (any authenticated user)
 router.get('/me', getMe);
 router.put('/me', updateMe);
 
 // Only admin can manage users 
 router.use(authorize(['admin'])); 
 router.get('/', getAllUsers); 
 router.get('/:id', getUserById); 
 router.put('/:id', updateUser); 
 router.delete('/:id', deleteUser); 
 export default router; 