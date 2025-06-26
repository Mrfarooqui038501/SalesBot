import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="sticky top-0 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4 shadow-lg z-10">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition-colors duration-200">
        E-commerce Chatbot
      </Link>
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <Link to="/auth" className="text-lg hover:text-indigo-200 transition-colors duration-200">
          Login
        </Link>
        <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
          Logout
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;