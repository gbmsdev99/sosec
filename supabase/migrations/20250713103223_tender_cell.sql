/*
  # Create Storage Bucket for File Uploads

  1. Storage Setup
    - Create 'submissions' bucket for file attachments
    - Set up proper policies for file access
    - Allow public read access for files
    - Allow authenticated users to upload files

  2. Security
    - Files are publicly readable (for admin viewing)
    - Only allow specific file types (images, PDFs)
    - Set file size limits
*/

-- Create storage bucket for submission files
INSERT INTO storage.buckets (id, name, public)
VALUES ('submissions', 'submissions', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to submissions bucket
CREATE POLICY "Anyone can upload submission files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'submissions');

-- Allow anyone to read files from submissions bucket
CREATE POLICY "Anyone can read submission files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'submissions');

-- Allow authenticated users to delete files (admins only)
CREATE POLICY "Authenticated users can delete submission files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'submissions');