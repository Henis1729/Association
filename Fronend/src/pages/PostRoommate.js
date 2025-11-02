import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { tenantAPI } from '../services/api';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';
import { Users, AlertCircle } from 'lucide-react';

function PostRoommate() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    totalPerson: 1,
    duration: '',
    durationType: 'month',
    instituteName: '',
    nearByLocation: '',
    city: '',
    province: '',
    rent: '',
    gender: 'male',
    dietary: 'vegetarian',
    laundry: true,
    personalRoom: false,
    accomodationType: 'apartment',
    startDate: '',
    sharingMessage: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSend = {
        ...formData,
        totalPerson: Number(formData.totalPerson),
        rent: formData.rent ? Number(formData.rent) : undefined,
        duration: formData.duration ? Number(formData.duration) : undefined,
        startDate: new Date(formData.startDate),
      };

      const response = await tenantAPI.create(dataToSend);

      if (response.message === 'Success.') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/browse-tenants');
        }, 2000);
      } else {
        setError('Failed to create listing. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-6 text-white">
            <div className="flex items-center space-x-3">
              <Users className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Find Roommates</h1>
                <p className="text-green-100">Post your requirements and connect with others</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                Listing created successfully! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Requirements */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Requirements</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Number of People *</label>
                      <Input
                        type="number"
                        name="totalPerson"
                        value={formData.totalPerson}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Budget (Monthly)</label>
                      <Input
                        type="number"
                        name="rent"
                        value={formData.rent}
                        onChange={handleChange}
                        placeholder="Your budget"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Duration</label>
                      <Input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duration"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Duration Type</label>
                      <select
                        name="durationType"
                        value={formData.durationType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                      >
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Looking from *</label>
                    <Input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Province/State *</label>
                      <Input
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        placeholder="Province/State"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Institute/University</label>
                    <Input
                      name="instituteName"
                      value={formData.instituteName}
                      onChange={handleChange}
                      placeholder="Your institute name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Preferred Area/Location</label>
                    <Input
                      name="nearByLocation"
                      value={formData.nearByLocation}
                      onChange={handleChange}
                      placeholder="Preferred location"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Dietary Preference</label>
                      <select
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                      >
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non vegetarian">Non-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Accommodation Type</label>
                    <select
                      name="accomodationType"
                      value={formData.accomodationType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="basement">Basement</option>
                      <option value="any">Any</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="laundry"
                        checked={formData.laundry}
                        onChange={handleChange}
                        className="w-5 h-5 text-green-600 rounded"
                      />
                      <span className="text-gray-700">Laundry Preferred</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="personalRoom"
                        checked={formData.personalRoom}
                        onChange={handleChange}
                        className="w-5 h-5 text-green-600 rounded"
                      />
                      <span className="text-gray-700">Personal Room Preferred</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Message</h2>
                <textarea
                  name="sharingMessage"
                  value={formData.sharingMessage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 h-32"
                  placeholder="Tell others about your preferences, lifestyle, or any other details..."
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50"
                >
                  {loading ? 'Creating Listing...' : 'Post Listing'}
                </Button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRoommate;

