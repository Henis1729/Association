import React, { useEffect, useState } from 'react';
import { tenantAPI } from '../services/api';
import { Users, MapPin, User, Calendar, Phone, Mail } from 'lucide-react';

function BrowseTenants() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    province: '',
    gender: '',
    dietary: '',
    instituteName: '',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await tenantAPI.getAll({ isActive: true });
      if (response && response.payload) {
        const listings = Array.isArray(response.payload) ? response.payload : [];
        setListings(listings);
      } else {
        setListings([]);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to load listings. Please try again.';
      setError(errorMessage);
      console.error('Error fetching listings:', err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredListings = listings.filter((listing) => {
    return (
      (!filters.city || listing.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.province || listing.province?.toLowerCase().includes(filters.province.toLowerCase())) &&
      (!filters.gender || listing.gender === filters.gender) &&
      (!filters.dietary || listing.dietary === filters.dietary) &&
      (!filters.instituteName || listing.instituteName?.toLowerCase().includes(filters.instituteName.toLowerCase()))
    );
  });

  const getGenderColor = (gender) => {
    const colors = {
      male: 'bg-blue-100 text-blue-800',
      female: 'bg-pink-100 text-pink-800',
    };
    return colors[gender] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Compatible Roommates</h1>
          <p className="text-green-100 text-lg">Connect with students looking for shared accommodation</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Province</label>
              <input
                type="text"
                name="province"
                value={filters.province}
                onChange={handleFilterChange}
                placeholder="Enter province"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Institute</label>
              <input
                type="text"
                name="instituteName"
                value={filters.instituteName}
                onChange={handleFilterChange}
                placeholder="Institute name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Dietary</label>
              <select
                name="dietary"
                value={filters.dietary}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{listing.contactPersonName}</h3>
                        <p className="text-sm text-gray-500 capitalize">{listing.city}, {listing.province}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getGenderColor(listing.gender)}`}>
                      {listing.gender}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {listing.instituteName && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <User className="w-5 h-5 text-blue-600" />
                        <span className="text-sm">{listing.instituteName}</span>
                      </div>
                    )}
                    {listing.totalPerson && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span>Looking for {listing.totalPerson} person(s)</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <span className="text-sm">{listing.nearByLocation || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-5 h-5 text-green-600" />
                      <span className="text-sm">{listing.contactPersonNumber}</span>
                    </div>
                    {listing.contactPersonEmail && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="text-sm truncate">{listing.contactPersonEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.dietary && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-lg capitalize">
                        {listing.dietary}
                      </span>
                    )}
                    {listing.laundry && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg">
                        Laundry ✓
                      </span>
                    )}
                    {listing.personalRoom && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-lg">
                        Personal Room
                      </span>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${listing.contactPersonCallingCode}${listing.contactPersonNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && !error && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredListings.length} of {listings.length} listings
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseTenants;

