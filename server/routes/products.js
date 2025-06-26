const express = require('express');
const router = express.Router();
const { searchProducts, getAllProducts, getProductById } = require('../controllers/productController');

// GET /api/products/search - Search products
router.get('/search', searchProducts);

// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', getProductById);

module.exports = router;