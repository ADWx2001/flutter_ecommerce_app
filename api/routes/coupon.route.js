import express from 'express';
import { createCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();
// Create a new coupon
router.post('/', createCoupon);
// Get all coupons
router.get('/', getAllCoupons);
// Get a coupon by ID
router.get('/:id', getCouponById);
// Update a coupon
router.put('/:id', updateCoupon);
// Delete a coupon
router.delete('/:id', deleteCoupon);

export default router;