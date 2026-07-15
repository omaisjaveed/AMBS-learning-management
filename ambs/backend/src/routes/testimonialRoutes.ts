import { Router } from 'express';
import * as testimonialController from '../controllers/testimonialController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', testimonialController.getTestimonials);

// Protected routes
router.post('/', protect, authorize('admin'), testimonialController.createTestimonial);
router.put('/:id', protect, authorize('admin'), testimonialController.updateTestimonial);
router.delete('/:id', protect, authorize('admin'), testimonialController.deleteTestimonial);

export default router;
