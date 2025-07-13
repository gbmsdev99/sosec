import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string
          tracking_id: string
          type: 'Feedback' | 'Complaint'
          category: string
          title: string
          description: string
          urgency: 'Low' | 'Medium' | 'High'
          identity_type: 'Student' | 'Parent'
          identity_value: string
          file_path: string | null
          file_name: string | null
          status: 'Pending' | 'In Review' | 'Resolved'
          admin_reply: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tracking_id: string
          type: 'Feedback' | 'Complaint'
          category: string
          title: string
          description: string
          urgency: 'Low' | 'Medium' | 'High'
          identity_type: 'Student' | 'Parent'
          identity_value: string
          file_path?: string | null
          file_name?: string | null
          status?: 'Pending' | 'In Review' | 'Resolved'
          admin_reply?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tracking_id?: string
          type?: 'Feedback' | 'Complaint'
          category?: string
          title?: string
          description?: string
          urgency?: 'Low' | 'Medium' | 'High'
          identity_type?: 'Student' | 'Parent'
          identity_value?: string
          file_path?: string | null
          file_name?: string | null
          status?: 'Pending' | 'In Review' | 'Resolved'
          admin_reply?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_notes: {
        Row: {
          id: string
          submission_id: string
          note: string
          admin_name: string
          created_at: string
        }
        Insert: {
          id?: string
          submission_id: string
          note: string
          admin_name: string
          created_at?: string
        }
        Update: {
          id?: string
          submission_id?: string
          note?: string
          admin_name?: string
          created_at?: string
        }
      }
    }
  }
}