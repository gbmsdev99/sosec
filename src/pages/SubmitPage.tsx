import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import Layout from '../components/Layout'
import { useSubmissions } from '../hooks/useSubmissions'

const SubmitPage: React.FC = () => {
  const navigate = useNavigate()
  const { addSubmission } = useSubmissions()
  const [formData, setFormData] = useState({
    type: 'Feedback' as 'Feedback' | 'Complaint',
    category: '',
    title: '',
    description: '',
    urgency: 'Medium' as 'Low' | 'Medium' | 'High',
    identity_type: 'Student' as 'Student' | 'Parent',
    identity_value: ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    'Teacher Behavior',
    'Classroom Issues',
    'Infrastructure',
    'Academic Concerns',
    'Others'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.category || !formData.title || !formData.description || !formData.identity_value) {
      setError('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Handle file upload if present
      let filePath = ''
      let fileName = ''
      if (file) {
        // In a real implementation, upload to Supabase Storage
        filePath = `/uploads/${Date.now()}_${file.name}`
        fileName = file.name
      }

      const result = await addSubmission({
        ...formData,
        file_path: filePath || undefined,
        file_name: fileName || undefined
      })

      if (result.success) {
        navigate(`/success/${result.trackingId}`)
      } else {
        setError('Failed to submit. Please try again.')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const urgencyColors = {
    Low: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    High: 'bg-red-100 text-red-800 border-red-200'
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Feedback</h1>
            <p className="text-gray-600">Your voice matters. Share your thoughts securely and anonymously.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identity Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a: <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4 mb-4">
                {['Student', 'Parent'].map((type) => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="identity_type"
                      value={type}
                      checked={formData.identity_type === type}
                      onChange={(e) => setFormData({...formData, identity_type: e.target.value as 'Student' | 'Parent', identity_value: ''})}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.identity_type === 'Student' ? 'Student ID' : 'Your Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.identity_value}
                  onChange={(e) => setFormData({...formData, identity_value: e.target.value})}
                  placeholder={formData.identity_type === 'Student' ? 'e.g., SOSE2025LJPNR01' : 'Your full name'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Type and Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'Feedback' | 'Complaint'})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="Feedback">Feedback</option>
                  <option value="Complaint">Complaint</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Brief summary of your feedback"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Please provide detailed information..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                required
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Low', 'Medium', 'High'] as const).map(level => (
                  <label key={level} className="cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value={level}
                      checked={formData.urgency === level}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value as 'Low' | 'Medium' | 'High'})}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg text-center font-medium border-2 transition-all ${
                      formData.urgency === level 
                        ? urgencyColors[level] 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}>
                      {level}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach File (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Choose file
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                {file && (
                  <div className="mt-3 flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>{file.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Feedback</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default SubmitPage