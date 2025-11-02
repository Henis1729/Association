import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Home, Info, Mail, Building2, Users } from "lucide-react";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Association</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/browse-owners" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
              <Building2 className="w-4 h-4" />
              <span>Find Accommodation</span>
            </Link>
            <Link to="/browse-tenants" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
              <Users className="w-4 h-4" />
              <span>Find Roommates</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
                  <User className="w-5 h-5" />
                  <span className="hidden md:block">{user?.firstName || 'Profile'}</span>
                </Link>
                {user?.role === 'landlord' && (
                  <Link to="/post-accommodation" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Post Listing
                  </Link>
                )}
                {user?.role === 'user' && (
                  <Link to="/post-roommate" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    Find Roommates
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition px-3 py-2">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
