import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Copy, Search, Send } from 'lucide-react';
import Layout from '../components/Layout';

const SuccessPage: React.FC = () => {
  const { trackingId } = useParams<{ trackingId: string }>();

  const copyToClipboard = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      alert('Tracking ID copied to clipboard!');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Submission Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your feedback. Your submission has been received and will be reviewed by the school administration.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Tracking ID</h2>
            <div className="flex items-center justify-center space-x-3">
              <code className="bg-white px-6 py-3 rounded-lg text-xl font-mono font-bold text-blue-600 border-2 border-blue-200">
                {trackingId}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Save this ID to track your submission status
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/track/${trackingId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span>Track Status</span>
            </Link>
            <Link
              to="/submit"
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors border-2 border-gray-300"
            >
              <Send className="h-5 w-5" />
              <span>Submit Another</span>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-yellow-700 space-y-1 text-left">
              <li>• Your submission will be reviewed within 24-48 hours</li>
              <li>• You'll receive updates as the status changes</li>
              <li>• Use your tracking ID to check progress anytime</li>
              <li>• Admin may add responses or ask for clarification</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;