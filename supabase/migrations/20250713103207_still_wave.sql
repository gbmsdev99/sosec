/*
  # SOSE Connect Database Schema

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key)
      - `tracking_id` (text, unique, 8-character tracking code)
      - `type` (text, Feedback or Complaint)
      - `category` (text, submission category)
      - `title` (text, submission title)
      - `description` (text, detailed description)
      - `urgency` (text, Low/Medium/High priority)
      - `identity_type` (text, Student or Parent)
      - `identity_value` (text, student ID or parent name)
      - `file_path` (text, optional file attachment path)
      - `file_name` (text, original filename)
      - `status` (text, Pending/In Review/Resolved)
      - `admin_reply` (text, optional admin response)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_notes`
      - `id` (uuid, primary key)
      - `submission_id` (uuid, foreign key to submissions)
      - `note` (text, admin note content)
      - `admin_name` (text, name of admin who added note)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public can read/insert submissions (for anonymous access)
    - Only authenticated users can update submissions and manage admin notes
    - Proper indexes for performance
*/

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('Feedback', 'Complaint')),
  category text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  urgency text NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High')),
  identity_type text NOT NULL CHECK (identity_type IN ('Student', 'Parent')),
  identity_value text NOT NULL,
  file_path text,
  file_name text,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Review', 'Resolved')),
  admin_reply text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_notes table
CREATE TABLE IF NOT EXISTS admin_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  note text NOT NULL,
  admin_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_submissions_tracking_id ON submissions(tracking_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_urgency ON submissions(urgency);
CREATE INDEX IF NOT EXISTS idx_submissions_category ON submissions(category);
CREATE INDEX IF NOT EXISTS idx_admin_notes_submission_id ON admin_notes(submission_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_created_at ON admin_notes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

-- Submissions policies
-- Allow anyone to read submissions (for tracking)
CREATE POLICY "Anyone can read submissions"
  ON submissions
  FOR SELECT
  USING (true);

-- Allow anyone to insert submissions (for anonymous submission)
CREATE POLICY "Anyone can insert submissions"
  ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can update submissions (admins)
CREATE POLICY "Authenticated users can update submissions"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Admin notes policies
-- Only authenticated users can read admin notes
CREATE POLICY "Authenticated users can read admin notes"
  ON admin_notes
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can insert admin notes
CREATE POLICY "Authenticated users can insert admin notes"
  ON admin_notes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update admin notes
CREATE POLICY "Authenticated users can update admin notes"
  ON admin_notes
  FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete admin notes
CREATE POLICY "Authenticated users can delete admin notes"
  ON admin_notes
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();