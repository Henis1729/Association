import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ownerAPI } from '../services/api';
import { Building2, MapPin, Users, DollarSign, Calendar, Phone } from 'lucide-react';

function BrowseOwners() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    province: '',
    gender: '',
    dietary: '',
    accomodationType: '',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await ownerAPI.getAll({ isActive: 'true' });
      if (response.payload) {
        setListings(response.payload);
      }
    } catch (err) {
      setError('Failed to load listings. Please try again.');
      console.error('Error fetching listings:', err);
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
      (!filters.accomodationType || listing.accomodationType === filters.accomodationType)
    );
  });

  const getAccommodationTypeIcon = (type) => {
    const icons = {
      apartment: '🏢',
      house: '🏠',
      basement: '🏗️',
      any: '🏘️',
    };
    return icons[type] || '🏘️';
  };

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
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Accommodation</h1>
          <p className="text-blue-100 text-lg">Browse verified listings from property owners</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Accommodation Type</label>
              <select
                name="accomodationType"
                value={filters.accomodationType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="basement">Basement</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl">{getAccommodationTypeIcon(listing.accomodationType)}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 capitalize">{listing.accomodationType}</h3>
                        <p className="text-sm text-gray-500 capitalize">{listing.city}, {listing.province}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getGenderColor(listing.gender)}`}>
                      {listing.gender}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {listing.rent && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="font-semibold">${listing.rent}</span>
                        {listing.durationType && (
                          <span className="text-sm text-gray-500">/{listing.durationType}</span>
                        )}
                      </div>
                    )}
                    {listing.availabelSpace && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span>{listing.availabelSpace} space available</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <span className="text-sm">{listing.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <span className="text-sm">{listing.contactPersonName}</span>
                    </div>
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
                    {listing.parking && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-lg">
                        Parking ✓
                      </span>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${listing.contactPersonNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Contact Owner
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

export default BrowseOwners;

