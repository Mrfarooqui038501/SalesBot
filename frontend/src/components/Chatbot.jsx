import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Trash2, X, Menu } from 'lucide-react';


const mockApi = {
  get: async (endpoint, config) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    if (endpoint === '/products/search') {
      const query = config?.params?.query?.toLowerCase() || '';
      const mockProducts = [
        { _id: '1', name: 'MacBook Pro 16"', description: 'Powerful laptop for professionals with M2 chip and stunning Retina display', price: 2499.99, category: 'Laptops', inStock: true },
        { _id: '2', name: 'iPhone 15 Pro', description: 'Latest iPhone with titanium design and advanced camera system', price: 999.99, category: 'Phones', inStock: true },
        { _id: '3', name: 'Samsung Galaxy S24', description: 'Premium Android smartphone with AI features', price: 899.99, category: 'Phones', inStock: false },
        { _id: '4', name: 'Dell XPS 13', description: 'Ultra-portable laptop with excellent build quality', price: 1299.99, category: 'Laptops', inStock: true },
        { _id: '5', name: 'iPad Pro 12.9"', description: 'Professional tablet for creative work and productivity', price: 1099.99, category: 'Tablets', inStock: true },
        { _id: '6', name: 'AirPods Pro', description: 'Premium wireless earbuds with active noise cancellation', price: 249.99, category: 'Audio', inStock: true },
        { _id: '7', name: 'Gaming Laptop ASUS ROG', description: 'High-performance gaming laptop with RTX 4070', price: 1899.99, category: 'Gaming', inStock: true },
        { _id: '8', name: 'Sony WH-1000XM5', description: 'Industry-leading noise canceling headphones', price: 399.99, category: 'Audio', inStock: false }
      ];
      
      const filtered = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
      
      return { data: { success: true, data: filtered } };
    }
    
    return { data: { success: true, data: [] } };
  },
  
  post: async (endpoint, data) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { success: true } };
  }
};

const Navbar = ({ cartCount, onMenuToggle, isMenuOpen }) => (
  <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="h-8 w-8" />
          <h1 className="text-xl font-bold tracking-tight">ShopBot Assistant</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium">{cartCount} items</span>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
            Login
          </button>
        </div>
        
        <button 
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart: {cartCount} items</span>
            </div>
            <button className="w-full text-left py-2">Login</button>
          </div>
        </div>
      )}
    </div>
  </nav>
);

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-3">
          {product.name}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          product.inStock 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {product.description || 'No description available'}
      </p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-indigo-600">
          ${product.price ? product.price.toFixed(2) : '0.00'}
        </span>
        {product.category && (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        )}
      </div>
      
      <button
        onClick={() => onAddToCart(product)}
        disabled={!product.inStock}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
          product.inStock
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
      </button>
    </div>
  </div>
);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  useEffect(() => {
    const getSuggestions = async () => {
      if (input.trim().length > 2) {
        try {
          const res = await mockApi.get('/products/search', {
            params: { query: input, limit: 5 },
          });
          const responseData = res.data.success ? res.data.data : res.data;
          setSuggestions(Array.isArray(responseData) ? responseData.slice(0, 5) : []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error getting suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [input]);

  const handleSuggestionClick = (product) => {
    setInput(product.name);
    setShowSuggestions(false);
    handleSend(product.name);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show success message
    const successMessage = {
      text: `✅ ${product.name} has been added to your cart!`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'success'
    };
    
    setMessages(prevMessages => [...prevMessages, successMessage]);
  };

  const handleSend = async (searchQuery = null) => {
    const query = searchQuery || input;
    if (!query.trim()) return;
    
    const userMessage = { text: query, sender: 'user', timestamp: new Date() };
    
    // Add user message immediately
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      // Search for products
      const res = await mockApi.get('/products/search', {
        params: { query: query },
      });
      
      // Handle response format
      const responseData = res.data.success ? res.data.data : res.data;
      const products = Array.isArray(responseData) ? responseData : [];
      
      if (products.length > 0) {
        // Add text response
        const textResponse = {
          text: `Found ${products.length} product${products.length > 1 ? 's' : ''} matching "${query}":`,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, textResponse]);
        
        // Add product cards
        products.forEach(product => {
          const productMessage = {
            sender: 'bot',
            timestamp: new Date(),
            type: 'product',
            product: product
          };
          
          setMessages(prevMessages => [...prevMessages, productMessage]);
        });
      } else {
        const noResultsMessage = {
          text: `Sorry, no products found for "${query}". Try searching for different keywords like "laptop", "phone", or "headphones".`,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prevMessages => [...prevMessages, noResultsMessage]);
      }
      
    } catch (error) {
      console.error('Error:', error);
      
      const errorResponse = {
        text: 'Sorry, something went wrong while searching for products. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'error'
      };
      
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
    
    if (!searchQuery) {
      setInput('');
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const viewCart = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const cartDetails = cart.map(item => 
      `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    alert(`Cart Contents:\n\n${cartDetails}\n\nTotal: $${total.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Navbar 
        cartCount={getCartCount()} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Chat Section */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Product Search Assistant</h2>
                  <p className="text-indigo-100 text-sm">Find products by typing below</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Welcome to ShopBot!</h3>
                  <p className="text-gray-500 mb-4">Search for products by typing below.</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['laptop', 'phone', 'headphones', 'gaming'].map(term => (
                      <button
                        key={term}
                        onClick={() => handleSend(term)}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors"
                      >
                        Try "{term}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.type === 'product' ? (
                    <div className="flex justify-start mb-4">
                      <div className="max-w-md">
                        <ProductCard product={msg.product} onAddToCart={addToCart} />
                      </div>
                    </div>
                  ) : (
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-4 rounded-2xl shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white'
                          : msg.type === 'success'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : msg.type === 'error'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <div className="font-medium">{msg.text}</div>
                        <div className={`text-xs mt-2 ${
                          msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-gray-600 text-sm">Searching...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input area */}
            <div className="p-6 bg-white border-t border-gray-200 relative">
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute bottom-full left-6 right-6 bg-white border border-gray-200 rounded-xl shadow-lg mb-2 max-h-60 overflow-y-auto">
                  {suggestions.map((product, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(product)}
                      className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-gray-500 text-sm">${product.price?.toFixed(2)}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-4 bg-gray-50 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Search for products... (e.g., laptop, phone, headphones)"
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    onFocus={() => input.length > 2 && setShowSuggestions(true)}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex space-x-3 mt-3">
                <button
                  onClick={clearChat}
                  className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear Chat</span>
                </button>
                <button
                  onClick={viewCart}
                  className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>View Cart ({getCartCount()})</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cart Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart Summary</span>
              </h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex-1 truncate">
                        <div className="font-medium text-gray-900 truncate">{item.name}</div>
                        <div className="text-gray-500">x{item.quantity}</div>
                      </div>
                      <div className="font-semibold text-indigo-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  {cart.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{cart.length - 3} more items
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total:</span>
                      <span className="text-indigo-600">
                        ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Search</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Laptops', 'Phones', 'Audio', 'Gaming'].map(category => (
                  <button
                    key={category}
                    onClick={() => handleSend(category)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;