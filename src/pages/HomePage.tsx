import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Search, Shield, MessageCircle, FileText, Users } from 'lucide-react';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <MessageCircle className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">SOSE Connect</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Submit your feedback or complaints anonymously and securely. 
              Only school authorities can access your identity for resolution purposes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
              >
                <Send className="h-5 w-5" />
                <span>Submit Feedback / Complaint</span>
              </Link>
              <Link
                to="/track"
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 border-2 border-gray-300"
              >
                <Search className="h-5 w-5" />
                <span>Track My Submission</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Anonymous & Secure</h3>
            <p className="text-gray-600">
              Your identity is protected and only accessible to authorized school personnel for resolution.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Tracking</h3>
            <p className="text-gray-600">
              Get a unique tracking ID to monitor the status and response to your submission.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Response</h3>
            <p className="text-gray-600">
              School administration is committed to addressing all submissions promptly and fairly.
            </p>
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Submission Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">✅ What to Include</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Clear and specific details</li>
                <li>• Relevant dates and times</li>
                <li>• Supporting evidence if available</li>
                <li>• Constructive suggestions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">❌ What to Avoid</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Personal attacks or inappropriate language</li>
                <li>• False or misleading information</li>
                <li>• Sharing others' personal information</li>
                <li>• Duplicate submissions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;