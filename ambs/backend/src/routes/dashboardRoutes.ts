import { Router } from 'express';
import * as dashboardController from '../controllers/dashboardController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/stats', protect, authorize('admin'), dashboardController.getDashboardStats);

export default router;
