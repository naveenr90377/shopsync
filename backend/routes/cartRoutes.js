import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect to ALL cart routes below (cart is private per user)
router.use(protect);

// GET /api/cart = view cart
router.get('/', getCart);
// POST /api/cart = add item
router.post('/', addToCart);
// PUT /api/cart/:productId = change quantity
router.put('/:productId', updateCartItem);
// DELETE /api/cart/:productId = remove item
router.delete('/:productId', removeFromCart);

export default router; 