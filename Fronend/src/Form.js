import React, { useState } from 'react';
import GeneratedMessage from './GeneratedMessage';
import { MessageSquare, Sparkles, Copy, Check } from 'lucide-react';

const Form = () => {
  const [person, setPerson] = useState({
    name: '',
    noOfPerson: '1',
    city: '',
    province: '',
    moveDate: '',
    budget: '',
    noOfRooms: '1',
    gender: 'any',
    dietary: 'any',
    accommodationType: 'any',
    contactNumber: '',
    studyWork: 'studying',
    instituteName: '',
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleCopy = async () => {
    const messageElement = document.getElementById('generated-message');
    if (messageElement) {
      // Get clean text version from data attribute, or fallback to innerText
      let text = messageElement.getAttribute('data-copy-text') || messageElement.innerText || messageElement.textContent;
      
      // Create a formatted version for clipboard
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Rental Message Generator
            </h1>
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional accommodation inquiry messages in seconds! Fill out the form below and get a ready-to-send message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Your Details
            </h2>
            
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-lg">👤</span> Your Name *
                </label>
                <input
                  name="name"
                  value={person.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              {/* City & Province */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🏙️</span> City *
                  </label>
                  <input
                    name="city"
                    value={person.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="e.g., Toronto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🗺️</span> Province/State
                  </label>
                  <input
                    name="province"
                    value={person.province}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="e.g., Ontario"
                  />
                </div>
              </div>

              {/* Study/Work & Institute */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🎓</span> I am
                  </label>
                  <select
                    name="studyWork"
                    value={person.studyWork}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="studying">Studying</option>
                    <option value="working">Working</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🏫</span> Institute/University
                  </label>
                  <input
                    name="instituteName"
                    value={person.instituteName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="text"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Number of People & Rooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">👥</span> Number of People *
                  </label>
                  <input
                    name="noOfPerson"
                    value={person.noOfPerson}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="number"
                    min="1"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🚪</span> Number of Rooms
                  </label>
                  <input
                    name="noOfRooms"
                    value={person.noOfRooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="number"
                    min="1"
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Move Date & Budget */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">📅</span> Move-in Date *
                  </label>
                  <input
                    name="moveDate"
                    value={person.moveDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">💰</span> Budget (Monthly)
                  </label>
                  <input
                    name="budget"
                    value={person.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="number"
                    placeholder="e.g., 600"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">⚧️</span> Gender Preference
                  </label>
                  <select
                    name="gender"
                    value={person.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🥗</span> Dietary
                  </label>
                  <select
                    name="dietary"
                    value={person.dietary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="any">Any</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non vegetarian">Non-Veg</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-lg">🏠</span> Accommodation Type
                  </label>
                  <select
                    name="accommodationType"
                    value={person.accommodationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="any">Any</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="basement">Basement</option>
                  </select>
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-lg">📱</span> Contact Number
                </label>
                <input
                  name="contactNumber"
                  value={person.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="tel"
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>

          {/* Generated Message Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Generated Message
            </h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 min-h-[500px]">
              <GeneratedMessage person={person} />
            </div>

            <button
              onClick={handleCopy}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-lg hover:shadow-xl"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
