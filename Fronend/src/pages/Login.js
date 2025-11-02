import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';
import { LogIn, Mail, Lock } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
          <div className="flex items-center justify-center">
            <LogIn className="w-12 h-12 text-white" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-center text-blue-100">Sign in to your account</p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
