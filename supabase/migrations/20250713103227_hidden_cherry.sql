/*
  # Insert Sample Data for Testing

  1. Sample Submissions
    - Various types of feedback and complaints
    - Different categories and urgency levels
    - Different statuses to test admin functionality

  2. Sample Admin Notes
    - Example notes for testing admin functionality
*/

-- Insert sample submissions for testing
INSERT INTO submissions (
  tracking_id, type, category, title, description, urgency, 
  identity_type, identity_value, status, admin_reply, created_at
) VALUES 
(
  'DEMO1234', 
  'Complaint', 
  'Infrastructure', 
  'Broken Projector in Computer Lab',
  'The projector in the computer lab has been malfunctioning for the past week. It keeps shutting down randomly during classes, which is disrupting our learning. Please fix it as soon as possible.',
  'High',
  'Student',
  'SOSE2025LJPNR01',
  'In Review',
  'We have contacted the technical team and they will visit tomorrow to assess the issue.',
  now() - interval '2 days'
),
(
  'DEMO5678',
  'Feedback',
  'Academic Concerns',
  'Request for Additional Math Practice Sessions',
  'My child is struggling with advanced mathematics concepts. Could the school arrange additional practice sessions or tutoring for students who need extra help?',
  'Medium',
  'Parent',
  'Mrs. Sharma (Mother of Rahul Sharma, Class 10-A)',
  'Resolved',
  'We have arranged additional math practice sessions every Tuesday and Thursday after school. Please contact the math department for enrollment.',
  now() - interval '5 days'
),
(
  'DEMO9012',
  'Complaint',
  'Teacher Behavior',
  'Inappropriate Language in Class',
  'One of the teachers has been using inappropriate language during classes. This is creating an uncomfortable environment for students.',
  'High',
  'Student',
  'SOSE2025LJPNR15',
  'Pending',
  NULL,
  now() - interval '1 day'
),
(
  'DEMO3456',
  'Feedback',
  'Infrastructure',
  'Library Needs More Study Tables',
  'The library gets very crowded during exam time and there are not enough study tables for all students. Adding more tables would be very helpful.',
  'Low',
  'Student',
  'SOSE2025LJPNR08',
  'In Review',
  'Thank you for the suggestion. We are evaluating the space and budget for additional furniture.',
  now() - interval '3 days'
),
(
  'DEMO7890',
  'Complaint',
  'Classroom Issues',
  'Air Conditioning Not Working',
  'The air conditioning in classroom 205 has not been working for the past month. It gets very hot and uncomfortable, especially during afternoon classes.',
  'Medium',
  'Parent',
  'Mr. Kumar (Father of Priya Kumar, Class 9-B)',
  'Resolved',
  'The AC unit has been repaired and is now functioning properly. Thank you for bringing this to our attention.',
  now() - interval '7 days'
);

-- Insert sample admin notes
INSERT INTO admin_notes (submission_id, note, admin_name) 
SELECT 
  s.id,
  'Initial review completed. Forwarding to relevant department.',
  'Principal'
FROM submissions s 
WHERE s.tracking_id = 'DEMO1234';

INSERT INTO admin_notes (submission_id, note, admin_name)
SELECT 
  s.id,
  'Technical team scheduled for tomorrow morning.',
  'Admin Assistant'
FROM submissions s 
WHERE s.tracking_id = 'DEMO1234';

INSERT INTO admin_notes (submission_id, note, admin_name)
SELECT 
  s.id,
  'Discussed with math department head. Additional sessions approved.',
  'Academic Coordinator'
FROM submissions s 
WHERE s.tracking_id = 'DEMO5678';

INSERT INTO admin_notes (submission_id, note, admin_name)
SELECT 
  s.id,
  'Serious allegation. Requires immediate investigation.',
  'Principal'
FROM submissions s 
WHERE s.tracking_id = 'DEMO9012';

INSERT INTO admin_notes (submission_id, note, admin_name)
SELECT 
  s.id,
  'Good suggestion. Will discuss in next infrastructure meeting.',
  'Facilities Manager'
FROM submissions s 
WHERE s.tracking_id = 'DEMO3456';