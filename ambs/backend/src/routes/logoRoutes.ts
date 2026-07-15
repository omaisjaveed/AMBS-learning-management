import { Router } from 'express';
import * as logoController from '../controllers/logoController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', logoController.getLogos);

// Protected routes
router.post('/', protect, authorize('admin'), logoController.createLogo);
router.put('/:id', protect, authorize('admin'), logoController.updateLogo);
router.delete('/:id', protect, authorize('admin'), logoController.deleteLogo);

export default router;
