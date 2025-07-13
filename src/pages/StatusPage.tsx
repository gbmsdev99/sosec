import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, CheckCircle, Eye, Send, Download, Calendar, User, Tag, AlertTriangle, Loader2 } from 'lucide-react'
import Layout from '../components/Layout'
import { useSubmissions, type Submission } from '../hooks/useSubmissions'

const StatusPage: React.FC = () => {
  const { trackingId } = useParams<{ trackingId: string }>()
  const { getSubmissionByTrackingId } = useSubmissions()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSubmission = async () => {
      if (!trackingId) return
      
      setLoading(true)
      const result = await getSubmissionByTrackingId(trackingId)
      
      if (result.success) {
        setSubmission(result.data)
      } else {
        setError('Submission not found')
      }
      setLoading(false)
    }

    fetchSubmission()
  }, [trackingId, getSubmissionByTrackingId])

  if (loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading submission details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !submission) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Submission Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find a submission with tracking ID: <code className="bg-gray-100 px-2 py-1 rounded">{trackingId}</code>
            </p>
            <Link
              to="/track"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>Try Again</span>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const statusConfig = {
    Pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', bgColor: 'bg-yellow-50' },
    'In Review': { icon: Eye, color: 'bg-blue-100 text-blue-800', bgColor: 'bg-blue-50' },
    Resolved: { icon: CheckCircle, color: 'bg-green-100 text-green-800', bgColor: 'bg-green-50' }
  }

  const urgencyConfig = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  }

  const statusInfo = statusConfig[submission.status]
  const StatusIcon = statusInfo.icon

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className={`${statusInfo.bgColor} px-8 py-6 border-b border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Submission Status</h1>
                <div className="flex items-center space-x-4">
                  <code className="bg-white px-3 py-1 rounded-lg text-sm font-mono font-bold text-gray-700">
                    {submission.tracking_id}
                  </code>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} flex items-center space-x-1`}>
                    <StatusIcon className="h-4 w-4" />
                    <span>{submission.status}</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="font-semibold text-gray-900">
                  {new Date(submission.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Type</span>
                </div>
                <p className="font-semibold text-gray-900">{submission.type}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Category</span>
                </div>
                <p className="font-semibold text-gray-900">{submission.category}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Priority</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${urgencyConfig[submission.urgency]}`}>
                  {submission.urgency}
                </span>
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{submission.title}</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{submission.description}</p>
              </div>
            </div>

            {/* File Attachment */}
            {submission.file_path && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Attached File</p>
                      <p className="text-sm text-gray-600">{submission.file_name || 'attachment'}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Admin Reply */}
            {submission.admin_reply && (
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Response from Administration</h3>
                <p className="text-gray-700">{submission.admin_reply}</p>
              </div>
            )}

            {/* Status Timeline */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Status Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Send className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Submitted</p>
                    <p className="text-sm text-gray-600">
                      {new Date(submission.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {submission.status !== 'Pending' && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Under Review</p>
                      <p className="text-sm text-gray-600">Being processed by administration</p>
                    </div>
                  </div>
                )}
                {submission.status === 'Resolved' && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Resolved</p>
                      <p className="text-sm text-gray-600">Issue has been addressed</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Link
                to="/submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Send className="h-5 w-5" />
                <span>Submit Another</span>
              </Link>
              <Link
                to="/track"
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors border-2 border-gray-300"
              >
                <span>Track Another</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StatusPage