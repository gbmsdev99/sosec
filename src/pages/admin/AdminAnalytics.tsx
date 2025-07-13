import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';

const AdminAnalytics: React.FC = () => {
  const { submissions } = useData();

  const analytics = useMemo(() => {
    // Category breakdown
    const categoryData = submissions.reduce((acc, sub) => {
      acc[sub.category] = (acc[sub.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryChartData = Object.entries(categoryData).map(([category, count]) => ({
      category,
      count
    }));

    // Type breakdown
    const typeData = submissions.reduce((acc, sub) => {
      acc[sub.type] = (acc[sub.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeChartData = Object.entries(typeData).map(([type, count]) => ({
      type,
      count
    }));

    // Status breakdown
    const statusData = submissions.reduce((acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Urgency breakdown
    const urgencyData = submissions.reduce((acc, sub) => {
      acc[sub.urgency] = (acc[sub.urgency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Time series data (last 30 days)
    const last30Days = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const timeSeriesData = last30Days.map(date => {
      const count = submissions.filter(sub => 
        sub.timestamp.split('T')[0] === date
      ).length;
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        submissions: count
      };
    });

    // Urgency vs Category heatmap data
    const urgencyCategories = ['Low', 'Medium', 'High'];
    const categories = Object.keys(categoryData);
    const heatmapData = categories.map(category => {
      const row: any = { category };
      urgencyCategories.forEach(urgency => {
        row[urgency] = submissions.filter(sub => 
          sub.category === category && sub.urgency === urgency
        ).length;
      });
      return row;
    });

    return {
      categoryChartData,
      typeChartData,
      statusData,
      urgencyData,
      timeSeriesData,
      heatmapData
    };
  }, [submissions]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

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
              <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.length > 0 ? Math.round((analytics.statusData.Resolved || 0) / submissions.length * 100) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <PieChart className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.urgencyData.High || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(sub => 
                    new Date(sub.timestamp).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Submissions by Category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Type Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback vs Complaints</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={analytics.typeChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ type, count }) => `${type}: ${count}`}
                >
                  {analytics.typeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Submissions Over Time */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions Over Time (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Overview</h3>
            <div className="space-y-4">
              {Object.entries(analytics.statusData).map(([status, count]) => {
                const percentage = Math.round((count / submissions.length) * 100);
                const colors = {
                  'Pending': 'bg-yellow-500',
                  'In Review': 'bg-blue-500',
                  'Resolved': 'bg-green-500'
                };
                
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{status}</span>
                      <span className="text-gray-600">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[status as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Urgency Heatmap */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category vs Urgency Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-center py-2 px-4 font-medium text-green-700">Low</th>
                  <th className="text-center py-2 px-4 font-medium text-yellow-700">Medium</th>
                  <th className="text-center py-2 px-4 font-medium text-red-700">High</th>
                </tr>
              </thead>
              <tbody>
                {analytics.heatmapData.map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-2 px-4 font-medium text-gray-900">{row.category}</td>
                    <td className="text-center py-2 px-4">
                      <span className={`inline-block w-8 h-8 rounded text-white text-sm leading-8 ${
                        row.Low > 0 ? 'bg-green-500' : 'bg-gray-200'
                      }`}>
                        {row.Low}
                      </span>
                    </td>
                    <td className="text-center py-2 px-4">
                      <span className={`inline-block w-8 h-8 rounded text-white text-sm leading-8 ${
                        row.Medium > 0 ? 'bg-yellow-500' : 'bg-gray-200'
                      }`}>
                        {row.Medium}
                      </span>
                    </td>
                    <td className="text-center py-2 px-4">
                      <span className={`inline-block w-8 h-8 rounded text-white text-sm leading-8 ${
                        row.High > 0 ? 'bg-red-500' : 'bg-gray-200'
                      }`}>
                        {row.High}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;