import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Users, Settings, LogOut } from 'lucide-react';

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-12 h-12" />
                <div>
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p className="text-blue-100">Welcome back, {user?.firstName}!</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.role === 'landlord' && (
                  <>
                    <button
                      onClick={() => navigate('/post-accommodation')}
                      className="flex items-center space-x-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                    >
                      <Building2 className="w-10 h-10 text-blue-600" />
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">Post New Listing</h3>
                        <p className="text-gray-600 text-sm">List your accommodation</p>
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/browse-owners')}
                      className="flex items-center space-x-4 p-6 bg-green-50 rounded-xl hover:bg-green-100 transition"
                    >
                      <Building2 className="w-10 h-10 text-green-600" />
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">My Listings</h3>
                        <p className="text-gray-600 text-sm">Manage your properties</p>
                      </div>
                    </button>
                  </>
                )}
                {user?.role === 'user' && (
                  <>
                    <button
                      onClick={() => navigate('/post-roommate')}
                      className="flex items-center space-x-4 p-6 bg-green-50 rounded-xl hover:bg-green-100 transition"
                    >
                      <Users className="w-10 h-10 text-green-600" />
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">Find Roommates</h3>
                        <p className="text-gray-600 text-sm">Post your requirements</p>
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/browse-owners')}
                      className="flex items-center space-x-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                    >
                      <Building2 className="w-10 h-10 text-blue-600" />
                      <div className="text-left">
                        <h3 className="font-bold text-gray-900">Browse Listings</h3>
                        <p className="text-gray-600 text-sm">Find accommodation</p>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Information</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-semibold capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-600 mb-4">
                Explore the platform to find your perfect accommodation or connect with roommates. 
                Use our message generator to create professional inquiries.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate('/message-generator')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Message Generator
                </button>
                <button
                  onClick={() => navigate('/browse-tenants')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Browse Roommates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

