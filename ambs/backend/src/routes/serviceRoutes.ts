import { Router } from 'express';
import * as serviceController from '../controllers/serviceController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getService);
router.get('/slug/:category/:slug', serviceController.getServiceBySlug);

// Protected routes
router.post('/', protect, authorize('admin'), serviceController.createService);
router.put('/:id', protect, authorize('admin'), serviceController.updateService);
router.delete('/:id', protect, authorize('admin'), serviceController.deleteService);

export default router;
