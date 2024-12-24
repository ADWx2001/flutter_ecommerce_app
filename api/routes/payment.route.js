// payment.routes.js
import express from 'express';
import { handleStripePayment, handleRazorpayKey } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to handle Stripe payments
router.post('/stripe', handleStripePayment);

// Route to fetch Razorpay key
router.post('/razorpay', handleRazorpayKey);

export default router;