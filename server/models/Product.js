const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  description: { 
    type: String,
    trim: true
  },
  image: { 
    type: String,
    trim: true
  },
  stock: { 
    type: Number, 
    required: true,
    min: 0,
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // This automatically handles createdAt and updatedAt
});

module.exports = mongoose.model('Product', productSchema);