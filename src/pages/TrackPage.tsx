import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { useData } from '../context/DataContext';

const TrackPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getSubmission } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    if (trackingId.length !== 8) {
      setError('Tracking ID should be 8 characters long');
      return;
    }

    const submission = getSubmission(trackingId.toUpperCase());
    if (!submission) {
      setError('Submission not found. Please check your tracking ID.');
      return;
    }

    navigate(`/track/${trackingId.toUpperCase()}`);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Submission</h1>
            <p className="text-gray-600">Enter your 8-character tracking ID to check the status</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-2">
                Tracking ID
              </label>
              <input
                type="text"
                id="trackingId"
                value={trackingId}
                onChange={(e) => {
                  setTrackingId(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="e.g., ABCD1234"
                maxLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-mono"
                style={{ letterSpacing: '0.1em' }}
              />
              {error && (
                <div className="mt-2 flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Check Status</span>
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Need help?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Make sure you entered the correct 8-character tracking ID</li>
              <li>• Tracking IDs are case-insensitive</li>
              <li>• If you lost your tracking ID, you'll need to submit a new request</li>
              <li>• Contact the school office if you continue having issues</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackPage;