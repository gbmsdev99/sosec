import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export interface Submission {
  id: string
  tracking_id: string
  type: 'Feedback' | 'Complaint'
  category: string
  title: string
  description: string
  urgency: 'Low' | 'Medium' | 'High'
  identity_type: 'Student' | 'Parent'
  identity_value: string
  file_path?: string
  file_name?: string
  status: 'Pending' | 'In Review' | 'Resolved'
  admin_reply?: string
  created_at: string
  updated_at: string
  admin_notes?: AdminNote[]
}

export interface AdminNote {
  id: string
  note: string
  admin_name: string
  created_at: string
}

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  const generateTrackingId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          admin_notes (
            id,
            note,
            admin_name,
            created_at
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const addSubmission = async (submissionData: Omit<Submission, 'id' | 'tracking_id' | 'created_at' | 'updated_at' | 'status' | 'admin_notes'>) => {
    try {
      const trackingId = generateTrackingId()
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          id: uuidv4(),
          tracking_id: trackingId,
          ...submissionData,
          status: 'Pending' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      await fetchSubmissions()
      return { success: true, trackingId }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  const getSubmissionByTrackingId = async (trackingId: string) => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          admin_notes (
            id,
            note,
            admin_name,
            created_at
          )
        `)
        .eq('tracking_id', trackingId.toUpperCase())
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  const updateSubmission = async (id: string, updates: Partial<Submission>) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error
      await fetchSubmissions()
      return { success: true }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  const addAdminNote = async (submissionId: string, note: string, adminName: string) => {
    try {
      const { error } = await supabase
        .from('admin_notes')
        .insert({
          id: uuidv4(),
          submission_id: submissionId,
          note,
          admin_name: adminName,
          created_at: new Date().toISOString()
        })

      if (error) throw error
      await fetchSubmissions()
      return { success: true }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  return {
    submissions,
    loading,
    addSubmission,
    getSubmissionByTrackingId,
    updateSubmission,
    addAdminNote,
    refetch: fetchSubmissions
  }
}