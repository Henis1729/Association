import React from "react";
import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold">Association</h2>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted platform for finding shared accommodations and connecting with roommates. 
              Making student housing simple and accessible.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@association.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-owners" className="text-gray-400 hover:text-white transition">
                  Find Accommodation
                </Link>
              </li>
              <li>
                <Link to="/browse-tenants" className="text-gray-400 hover:text-white transition">
                  Find Roommates
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Association. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
