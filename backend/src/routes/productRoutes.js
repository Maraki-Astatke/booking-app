import express from 'express';
import {
  getApprovedProducts,
  getPendingProducts,
  createProduct,
  approveProduct,
  rejectProduct,
  getUserProducts
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (anyone can view approved products)
router.get('/', getApprovedProducts);

// Protected routes (require login)
router.post('/', protect, createProduct);
router.get('/my-products', protect, getUserProducts);

// Admin only routes
router.get('/pending', protect, getPendingProducts);
router.put('/:id/approve', protect, approveProduct);
router.delete('/:id/reject', protect, rejectProduct);

export default router;