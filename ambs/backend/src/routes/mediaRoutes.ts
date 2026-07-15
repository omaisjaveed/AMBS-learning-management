import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { protect, authorize } from '../middleware/authMiddleware';
import * as mediaController from '../controllers/mediaController';

const router = Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp, svg)'));
    }
  }
});

// All media routes are protected
router.use(protect);
router.use(authorize('admin'));

router.get('/', mediaController.getMedia);
router.post('/upload', upload.single('file'), mediaController.uploadMedia);
router.put('/:id', mediaController.updateMediaAlt);
router.delete('/:id', mediaController.deleteMedia);

export default router;
