import { Router } from 'express';
import * as inquiryController from '../controllers/inquiryController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

// Public route for submitting inquiries
router.post('/', inquiryController.createInquiry);

// Protected routes for admin
router.get('/', protect, authorize('admin'), inquiryController.getInquiries);
router.put('/:id/read', protect, authorize('admin'), inquiryController.markInquiryAsRead);
router.delete('/:id', protect, authorize('admin'), inquiryController.deleteInquiry);

export default router;
