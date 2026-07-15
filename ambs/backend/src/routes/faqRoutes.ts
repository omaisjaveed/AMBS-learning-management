import { Router } from 'express';
import * as faqController from '../controllers/faqController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', faqController.getFAQs);

// Protected routes
router.post('/', protect, authorize('admin'), faqController.createFAQ);
router.put('/:id', protect, authorize('admin'), faqController.updateFAQ);
router.delete('/:id', protect, authorize('admin'), faqController.deleteFAQ);

export default router;
