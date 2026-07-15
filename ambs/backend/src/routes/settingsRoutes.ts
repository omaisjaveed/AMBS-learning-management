import { Router } from 'express';
import * as settingsController from '../controllers/settingsController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', settingsController.getSettings);

// Protected routes
router.put('/', protect, authorize('admin'), settingsController.updateSettings);

export default router;
