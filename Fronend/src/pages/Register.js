import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobile: '',
    callingCode: '+1',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await signup(formData);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
          <div className="flex items-center justify-center">
            <UserPlus className="w-12 h-12 text-white" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-center text-blue-100">Join Association today</p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

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
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <div className="flex gap-2">
                <select
                  name="callingCode"
                  value={formData.callingCode}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                  <option value="+49">+49</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">I am a</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="user">Student looking for accommodation</option>
                <option value="landlord">Property Owner</option>
              </select>
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
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
