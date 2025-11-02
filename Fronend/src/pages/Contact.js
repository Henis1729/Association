import React from "react";
import Input from "../Components/UI/Input";
import Textarea from "../Components/UI/Textarea";
import Button from "../Components/UI/Button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-4 sm:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Panel - Info */}
          <div className="bg-blue-600 text-white p-8 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-blue-100">
              We'd love to hear from you! Fill out the form and we’ll get back to you as soon as possible.
            </p>
            <p className="text-blue-100">
              <strong>About Our Project:</strong> We are building a platform that empowers users with intelligent tools and real-time solutions. Whether you're looking for support, feedback, or partnership, our team is here to assist. We value innovation, responsiveness, and community.
            </p>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5" />
              <span>contact@yourdomain.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <span>+1 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span>123 Main Street, City, Country</span>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="p-8">
            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <Input placeholder="Enter your full name" className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email Address</label>
                <Input type="email" placeholder="Enter your email" className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Subject</label>
                <Input placeholder="Enter the subject" className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <Textarea placeholder="Type your message..." className="bg-gray-100" rows={5} />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl">
                Send Message
              </Button>
            </form>
            <div className="mt-6 text-sm text-gray-500">
              <p><strong>Frequently Asked Questions:</strong></p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>How long does it take to get a response?</li>
                <li>Can I request a demo or a meeting?</li>
                <li>Where can I follow updates on the project?</li>
              </ul>
              <p className="mt-3">We'll respond within 24-48 business hours. Stay connected with us on social media or drop your message here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
