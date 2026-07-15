import express from 'express';
import * as manufacturerController from '../controllers/manufacturerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', manufacturerController.getManufacturers);
router.get('/:slug', manufacturerController.getManufacturerBySlug);

router.post('/', protect, manufacturerController.createManufacturer);
router.put('/:id', protect, manufacturerController.updateManufacturer);
router.delete('/:id', protect, manufacturerController.deleteManufacturer);

export default router;
