const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const products = require('./data/products.json');

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedProducts = async () => {
    try {
        console.log('Starting product seeding...');
        
        // Connect to database
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products cleared');
        
        // Insert new products
        const insertedProducts = await Product.insertMany(products);
        console.log(`${insertedProducts.length} products seeded successfully`);
        
        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedProducts();