import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Database, LogOut, Home } from 'lucide-react';
import { useSubmissions } from '../../hooks/useSubmissions';
import { useAuth } from '../../hooks/useAuth';

const AdminExport: React.FC = () => {
  const { submissions } = useSubmissions();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const exportToCSV = () => {
    const headers = [
      'Tracking ID', 'Type', 'Category', 'Title', 'Description', 'Urgency',
      'Identity Type', 'Identity Value', 'Status', 'Admin Reply', 'Timestamp'
    ];

    const csvData = submissions.map(sub => [
      sub.tracking_id,
      sub.type,
      sub.category,
      `"${sub.title.replace(/"/g, '""')}"`,
      `"${sub.description.replace(/"/g, '""')}"`,
      sub.urgency,
      sub.identity_type,
      sub.identity_value,
      sub.status,
      `"${(sub.admin_reply || '').replace(/"/g, '""')}"`,
      sub.created_at
    ]);

    const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sose-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(submissions, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sose-submissions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Export Data</h1>
              <span className="text-sm text-gray-500">Welcome, {currentUser}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Public Portal</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Submissions</h1>
            <p className="text-gray-600">Download all submission data for reporting and analysis</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CSV Format</h3>
              <p className="text-gray-600 mb-4">
                Export data in CSV format for use in spreadsheet applications like Excel or Google Sheets.
              </p>
              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 w-full"
              >
                <Download className="h-5 w-5" />
                <span>Export as CSV</span>
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">JSON Format</h3>
              <p className="text-gray-600 mb-4">
                Export data in JSON format for use in programming applications and data analysis tools.
              </p>
              <button
                onClick={exportToJSON}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 w-full"
              >
                <Download className="h-5 w-5" />
                <span>Export as JSON</span>
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-3">Export Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <p><strong>Total Submissions:</strong> {submissions.length}</p>
                <p><strong>Export Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p><strong>Includes:</strong> All submission data, admin notes, and responses</p>
                <p><strong>Privacy:</strong> Contains personal information - handle securely</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Data Handling Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Exported data contains personal information and should be handled confidentially</li>
              <li>• Store exported files securely and delete when no longer needed</li>
              <li>• Only share data with authorized personnel for legitimate purposes</li>
              <li>• Comply with school privacy policies and applicable data protection laws</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExport;