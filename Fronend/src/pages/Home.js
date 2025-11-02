import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, MessageCircle, Search, Shield, Phone, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect Shared Accommodation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with roommates, find affordable housing, and make your student life easier
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/browse-owners" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Browse Listings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Association?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Accommodation</h3>
              <p className="text-gray-600">
                Browse verified listings from property owners. Find apartments, houses, or basements that match your needs and budget.
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Roommates</h3>
              <p className="text-gray-600">
                Connect with other students looking for shared accommodation. Find compatible roommates based on preferences.
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <MessageCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Communication</h3>
              <p className="text-gray-600">
                Generate professional WhatsApp messages to share with accommodation groups. Save time with our message generator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h3>
                  <p className="text-gray-600">Sign up as a student looking for accommodation or as a property owner.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse or Post</h3>
                  <p className="text-gray-600">Search for available accommodations or post your listing/property requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect & Move In</h3>
                  <p className="text-gray-600">Contact owners/roommates directly and finalize your shared accommodation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Place?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students already using Association to find their ideal accommodation
          </p>
          <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
