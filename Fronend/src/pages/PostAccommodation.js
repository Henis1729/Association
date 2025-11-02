import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ownerAPI } from '../services/api';
import Input from '../Components/UI/Input';
import Button from '../Components/UI/Button';
import { Building2, Upload, AlertCircle } from 'lucide-react';

function PostAccommodation() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    address: '',
    googleMapLink: '',
    city: '',
    province: '',
    availabelSpace: 1,
    alreadyLiving: 0,
    rent: '',
    duration: '',
    durationType: 'month',
    accomodationType: 'apartment',
    gender: 'male',
    dietary: 'vegetarian',
    laundry: true,
    parking: false,
    contactPersonName: '',
    contactPersonNumber: '',
    nearestBusStopDistance: '',
    homeCity: '',
    homeState: '',
    homeCountry: '',
    startDate: '',
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
      // Convert number fields
      const dataToSend = {
        ...formData,
        availabelSpace: Number(formData.availabelSpace),
        alreadyLiving: Number(formData.alreadyLiving),
        rent: Number(formData.rent),
        duration: formData.duration ? Number(formData.duration) : undefined,
        nearestBusStopDistance: formData.nearestBusStopDistance ? Number(formData.nearestBusStopDistance) : undefined,
        startDate: new Date(formData.startDate),
      };

      const response = await ownerAPI.create(dataToSend);

      if (response.message === 'Success.') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/browse-owners');
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white">
            <div className="flex items-center space-x-3">
              <Building2 className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Post Your Accommodation</h1>
                <p className="text-blue-100">List your property and find tenants</p>
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
              {/* Basic Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Accommodation Type *</label>
                    <select
                      name="accomodationType"
                      value={formData.accomodationType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                      required
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="basement">Basement</option>
                      <option value="any">Any</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Address *</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Full address"
                      required
                    />
                  </div>

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
                </div>
              </div>

              {/* Availability & Pricing */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Availability & Pricing</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Spaces Available *</label>
                      <Input
                        type="number"
                        name="availabelSpace"
                        value={formData.availabelSpace}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Already Living</label>
                      <Input
                        type="number"
                        name="alreadyLiving"
                        value={formData.alreadyLiving}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Rent *</label>
                      <Input
                        type="number"
                        name="rent"
                        value={formData.rent}
                        onChange={handleChange}
                        placeholder="Monthly rent"
                        required
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Available From *</label>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non vegetarian">Non-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="laundry"
                        checked={formData.laundry}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">Laundry Available</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="parking"
                        checked={formData.parking}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">Parking Available</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Contact Name *</label>
                      <Input
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                      <Input
                        name="contactPersonNumber"
                        value={formData.contactPersonNumber}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nearest Bus Stop Distance (km)</label>
                    <Input
                      type="number"
                      name="nearestBusStopDistance"
                      value={formData.nearestBusStopDistance}
                      onChange={handleChange}
                      placeholder="Distance in km"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Google Map Link</label>
                    <Input
                      name="googleMapLink"
                      value={formData.googleMapLink}
                      onChange={handleChange}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50"
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

export default PostAccommodation;

