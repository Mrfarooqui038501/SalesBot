const Product = require('../models/Product');

// Search products with filters
const searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, limit = 20 } = req.query;
    let filter = {};

    // Build search filter
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    // Ensure all products have required fields
    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      inStock: product.inStock !== undefined ? product.inStock : true,
      price: product.price || 0,
      description: product.description || 'No description available',
      category: product.category || 'General'
    }));

    res.json({
      success: true,
      count: formattedProducts.length,
      data: formattedProducts
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while searching products' 
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;
    
    const products = await Product.find({})
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    const total = await Product.countDocuments();

    const formattedProducts = products.map(product => ({
      ...product.toObject(),
      inStock: product.inStock !== undefined ? product.inStock : true,
      price: product.price || 0,
      description: product.description || 'No description available',
      category: product.category || 'General'
    }));

    res.json({
      success: true,
      count: formattedProducts.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: formattedProducts
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching products' 
    });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    const formattedProduct = {
      ...product.toObject(),
      inStock: product.inStock !== undefined ? product.inStock : true,
      price: product.price || 0,
      description: product.description || 'No description available',
      category: product.category || 'General'
    };

    res.json({
      success: true,
      data: formattedProduct
    });
  } catch (error) {
    console.error('Get product by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching product' 
    });
  }
};


const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({
      success: true,
      data: categories.filter(cat => cat && cat.trim() !== '')
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};

module.exports = { 
  searchProducts, 
  getAllProducts, 
  getProductById, 
  getCategories 
};