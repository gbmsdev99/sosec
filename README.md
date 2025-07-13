# SOSE Connect - Feedback & Complaint Portal

A secure, anonymous feedback and complaint submission system for School of Specialized Excellence (SOSE), Lajpat Nagar.

## 🚀 Features

### For Students & Parents
- **Anonymous Submissions**: Submit feedback or complaints securely
- **Real-time Tracking**: Track submission status with unique tracking IDs
- **File Attachments**: Upload supporting documents or images
- **Mobile Responsive**: Works perfectly on all devices

### For Administrators
- **Secure Dashboard**: Protected admin interface with authentication
- **Comprehensive Management**: View, filter, and manage all submissions
- **Status Updates**: Update submission status and add responses
- **Analytics**: Visual insights with charts and graphs
- **Export Data**: Download submissions as CSV or JSON
- **Admin Notes**: Internal note-taking system for collaboration

## 🛠️ Setup Instructions

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Run Database Migrations**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the migration files in order:
     1. `supabase/migrations/create_submissions_schema.sql`
     2. `supabase/migrations/create_storage_bucket.sql`
     3. `supabase/migrations/insert_sample_data.sql` (optional, for testing)

3. **Set up Authentication**
   - Go to Authentication > Settings
   - Configure your preferred authentication method
   - Create admin user accounts

### 2. Environment Configuration

1. **Copy Environment File**
   ```bash
   cp .env.example .env
   ```

2. **Update Environment Variables**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 3. Install and Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📊 Database Schema

### Tables

#### `submissions`
- Stores all feedback and complaint submissions
- Includes tracking IDs, content, status, and metadata
- Protected with Row Level Security (RLS)

#### `admin_notes`
- Internal notes for admin collaboration
- Linked to submissions via foreign key
- Only accessible to authenticated users

### Storage
- `submissions` bucket for file attachments
- Public read access for admin viewing
- Secure upload policies

## 🔐 Security Features

- **Row Level Security**: Database-level access control
- **Anonymous Submissions**: No user accounts required for submissions
- **Protected Admin Routes**: Authentication required for admin access
- **Secure File Storage**: Proper file upload and access policies
- **Input Validation**: Comprehensive form validation and sanitization

## 🎨 Design Philosophy

- **Minimal & Clean**: Focused on usability and clarity
- **Mobile-First**: Responsive design for all devices
- **Accessible**: WCAG compliant with proper contrast and navigation
- **Professional**: School-appropriate design language

## 📱 Usage

### Public Access
- **Homepage**: `/` - Introduction and navigation
- **Submit**: `/submit` - Anonymous submission form
- **Track**: `/track` - Enter tracking ID to check status
- **Status**: `/track/{tracking_id}` - View submission details

### Admin Access
- **Login**: `/admin/login` - Secure admin authentication
- **Dashboard**: `/admin/dashboard` - Main admin interface
- **View Submission**: `/admin/view/{tracking_id}` - Detailed submission management
- **Analytics**: `/admin/analytics` - Visual insights and reports
- **Export**: `/admin/export` - Data export functionality

## 🔧 Admin Credentials

Create admin accounts through Supabase Authentication dashboard or use the auth signup API.

## 📈 Analytics Features

- **Submission Trends**: Track submission patterns over time
- **Category Analysis**: Understand common issue categories
- **Status Distribution**: Monitor resolution rates
- **Urgency Mapping**: Identify high-priority areas

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Railway
- Any static hosting service

Make sure to set environment variables in your deployment platform.

## 🤝 Contributing

Built with ❤️ by [Aftab Alam](https://instagram.com/aftabxsty) for SOSE, Lajpat Nagar.

## 📄 License

This project is created specifically for School of Specialized Excellence (SOSE), Lajpat Nagar.