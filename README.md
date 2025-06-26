# E-commerce Sales Chatbot

A modern, AI-powered e-commerce platform with an intelligent sales chatbot that helps customers discover products, provides personalized recommendations, and streamlines the shopping experience.

## 🚀 Features

### Core E-commerce Features
- **User Authentication** - Secure login and registration system with JWT tokens
- **Product Catalog** - Browse and search through a comprehensive product database
- **Shopping Cart** - Add, remove, and manage items in your cart
- **User Profiles** - Personalized user accounts with order history
- **Product Search & Filtering** - Advanced search and filtering capabilities

### AI-Powered Chatbot
- **Intelligent Product Suggestions** - AI-driven product recommendations based on user preferences
- **Natural Language Processing** - Conversational interface for easy product discovery
- **Real-time Chat** - Instant responses and interactive shopping assistance
- **Personalized Recommendations** - Tailored suggestions based on browsing history and preferences
- **Order Assistance** - Help with order tracking, returns, and customer support

### Additional Features
- **Responsive Design** - Mobile-first design that works on all devices
- **Real-time Updates** - Live inventory updates and order status
- **Secure Payments** - Protected checkout process
- **Admin Dashboard** - Product and user management interface

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling for faster development
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Axios** - Promise-based HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB

### Authentication & Security
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **bcrypt** - Password hashing for enhanced security
- **CORS** - Cross-Origin Resource Sharing configuration

### Development Tools
- **ESLint** - Code linting for consistent code quality
- **Prettier** - Code formatting for better readability
- **Nodemon** - Auto-restart server during development

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0 or higher)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-sales-chatbot.git
cd ecommerce-sales-chatbot
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Add your MongoDB connection string, JWT secret, etc.

# Seed the database with sample data
node seed.js

# Start the backend server
npm start
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce-chatbot
DB_NAME=ecommerce_chatbot

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development



# Email Configuration (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🏗️ Project Structure

```
ecommerce-sales-chatbot/
├── frontend/                   # React.js frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service functions
│   │   ├── context/          # React context providers
│   │   ├── utils/            # Utility functions
│   │   └── styles/           # CSS and styling files
│   ├── public/               # Static assets
│   ├── vite.config.js        # Vite configuration
│   └── package.json
├── server/                    # Node.js backend
│   ├── controllers/          # Route handlers
│   ├── models/              # MongoDB/Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Backend utilities
│   ├── config/              # Configuration files
│   ├── seed.js              # Database seeding script
│   └── package.json
├── docs/                     # Documentation
│   └── report.md            # Technical report
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search` - Search products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Chatbot
- `POST /api/chatbot/message` - Send message to chatbot
- `GET /api/chatbot/suggestions` - Get product suggestions
- `POST /api/chatbot/feedback` - Submit chatbot feedback

## 🎯 Usage

### For Customers
1. **Register/Login** - Create an account or sign in
2. **Browse Products** - Explore the product catalog
3. **Chat with Bot** - Ask the chatbot for product recommendations
4. **Add to Cart** - Add desired items to your shopping cart
5. **Checkout** - Complete your purchase securely

### For Administrators
1. **Admin Login** - Access the admin dashboard
2. **Manage Products** - Add, edit, or remove products
3. **View Analytics** - Monitor sales and user engagement


## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd frontend
npm test

# Run integration tests
npm run test:integration
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd server
npm run start:prod
```

### Environment Setup
- Set `NODE_ENV=production` in your production environment
- Use a production MongoDB database
- Configure proper CORS settings
- Set up SSL certificates for HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the amazing frontend framework
- MongoDB team for the flexible database solution
- Vite team for the lightning-fast build tool
- Tailwind CSS for the utility-first CSS framework
- The open-source community for various packages and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Mrfarooqui038501/SalesChatBot.git) section
2. Create a new issue with detailed information
3. Contact the development team at armanfarooqui078601@gmail.com

## 🔄 Updates & Changelog

For detailed information about updates and changes, see [CHANGELOG.md](CHANGELOG.md)

---

**Built with ❤️ using the MERN Stack + Vite**#   S a l e s B o t  
 