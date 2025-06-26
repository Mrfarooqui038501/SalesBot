const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Connect to database
connectDB();

// Import and use routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const cartRoutes = require('./routes/cart');


app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/cart', cartRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'Sales ChatBot API is running!' });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});