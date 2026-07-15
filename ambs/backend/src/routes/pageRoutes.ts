import { Router } from 'express';
import * as pageController from '../controllers/pageController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/:slug', pageController.getPageBySlug);

// Protected routes
router.put('/:slug', protect, authorize('admin'), pageController.updatePageBySlug);

export default router;
