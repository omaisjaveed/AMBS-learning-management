import { Router } from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, authController.updateProfile);
router.put('/password', protect, authController.updatePassword);

export default router;
