import express from 'express';
import { createCheckoutSession, verifyAndCreateOrder, simulatePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/verify-session', protect, verifyAndCreateOrder);
router.post('/simulate', protect, simulatePayment);

export default router;