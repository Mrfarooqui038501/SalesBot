const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// Apply auth middleware to all cart routes
router.use(authMiddleware);

// POST /api/cart/add - Add item to cart
router.post('/add', addToCart);

// GET /api/cart - Get cart contents
router.get('/', getCart);

// PUT /api/cart/update - Update cart item quantity
router.put('/update', updateCartItem);

// DELETE /api/cart/remove/:productId - Remove item from cart
router.delete('/remove/:productId', removeFromCart);

// DELETE /api/cart/clear - Clear entire cart
router.delete('/clear', clearCart);

module.exports = router;