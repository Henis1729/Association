import React from "react";
import { Building2, Users, Heart, Target, CheckCircle } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Building2 className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">About Association</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting students with affordable shared accommodation and compatible roommates
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Association was founded with the vision of making student accommodation accessible, affordable, 
              and stress-free. We understand the challenges students face when searching for suitable housing, 
              especially in unfamiliar cities or countries.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform bridges the gap between property owners and students, creating a seamless experience 
              for finding shared accommodation and compatible roommates. We believe everyone deserves a safe, 
              comfortable place to call home during their academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Student-First</h3>
              <p className="text-gray-600">
                Every feature we build prioritizes student needs, affordability, and convenience.
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Building strong connections between students and creating supportive living environments.
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                Clear, honest information to help you make informed accommodation decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Makes Us Different</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Listings</h3>
                  <p className="text-gray-600">
                    Detailed information including amenities, preferences, and location details to help you find the perfect match.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Matching</h3>
                  <p className="text-gray-600">
                    Advanced filters help you find accommodation and roommates based on your preferences, budget, and lifestyle.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Communication</h3>
                  <p className="text-gray-600">
                    Integrated tools and message generators to streamline your search and communication process.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
                  <p className="text-gray-600">
                    Your privacy and security are our top priorities with robust authentication and data protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Association Community</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your journey to finding the perfect shared accommodation today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
