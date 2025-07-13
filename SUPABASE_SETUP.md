# Supabase Setup Guide for SOSE Connect

This guide will help you set up the complete Supabase backend for the SOSE Connect portal.

## 🚀 Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `sose-connect`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your location
5. Click "Create new project"
6. Wait for project to be ready (2-3 minutes)

### 2. Get Project Credentials

1. Go to **Settings** > **API**
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Public Key**: `eyJ...` (long string)
3. Update your `.env` file with these values

### 3. Run Database Migrations

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the content from `supabase/migrations/create_submissions_schema.sql`
4. Click "Run" to execute
5. Repeat for `create_storage_bucket.sql`
6. Optionally run `insert_sample_data.sql` for test data

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

### 4. Set Up Authentication

1. Go to **Authentication** > **Settings**
2. Configure **Site URL**: `http://localhost:5173` (for development)
3. Add production URL when deploying
4. **Email Templates**: Customize if needed
5. **Create Admin Users**:
   - Go to **Authentication** > **Users**
   - Click "Add user"
   - Enter admin email and password
   - Confirm the user

### 5. Configure Storage

1. Go to **Storage**
2. Verify the `submissions` bucket was created
3. Check bucket policies are set correctly
4. Test file upload functionality

## 🔐 Security Configuration

### Row Level Security (RLS)

The migrations automatically set up RLS policies:

- **Submissions**: Public read/insert, authenticated update
- **Admin Notes**: Authenticated users only
- **Storage**: Public read, authenticated delete

### Authentication Policies

- **Public Access**: Anyone can submit and track
- **Admin Access**: Requires authentication for management
- **File Access**: Public read for attachments

## 📊 Database Schema Overview

### Tables Created

1. **submissions**
   - Primary table for all feedback/complaints
   - Includes tracking IDs, content, status
   - Anonymous submission support

2. **admin_notes**
   - Internal notes for admin collaboration
   - Linked to submissions
   - Timestamped with admin names

3. **Storage Bucket**
   - File attachments for submissions
   - Public read access
   - Secure upload policies

### Sample Data

The `insert_sample_data.sql` creates:
- 5 sample submissions with different statuses
- Various categories and urgency levels
- Sample admin notes for testing

## 🧪 Testing the Setup

### 1. Test Public Functionality
- Submit a new feedback/complaint
- Track submission with tracking ID
- Verify data appears in Supabase dashboard

### 2. Test Admin Functionality
- Login with admin credentials
- View submissions in dashboard
- Update status and add notes
- Test analytics and export features

### 3. Test File Uploads
- Submit with file attachment
- Verify file appears in Storage bucket
- Test file download functionality

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   - Ensure `.env` file is in project root
   - Restart development server after changes
   - Check variable names match exactly

2. **Authentication Errors**
   - Verify admin user is confirmed in Supabase
   - Check Site URL in auth settings
   - Ensure RLS policies are applied

3. **Database Connection Issues**
   - Verify project URL and anon key
   - Check if project is paused (free tier)
   - Ensure migrations ran successfully

4. **File Upload Problems**
   - Check storage bucket exists
   - Verify bucket policies
   - Ensure bucket is set to public

### Getting Help

1. Check Supabase documentation
2. Review browser console for errors
3. Check Supabase dashboard logs
4. Verify all migrations completed successfully

## 🌐 Production Deployment

### Before Deploying

1. **Update Site URL**: Add production domain to auth settings
2. **Environment Variables**: Set in deployment platform
3. **Database Backup**: Export data if needed
4. **Security Review**: Verify all policies are correct

### Deployment Platforms

- **Vercel**: Add env vars in project settings
- **Netlify**: Set in site settings > environment variables
- **Railway**: Configure in project variables

## 📈 Monitoring & Maintenance

### Regular Tasks

1. **Monitor Usage**: Check Supabase dashboard for usage stats
2. **Backup Data**: Regular exports of important data
3. **Update Dependencies**: Keep packages up to date
4. **Review Logs**: Check for errors or issues

### Scaling Considerations

- **Free Tier Limits**: 500MB database, 1GB bandwidth
- **Upgrade Plans**: Consider Pro plan for production
- **Performance**: Monitor query performance
- **Storage**: Track file storage usage

## ✅ Setup Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database migrations executed
- [ ] Authentication configured
- [ ] Admin users created
- [ ] Storage bucket set up
- [ ] Sample data loaded (optional)
- [ ] Public functionality tested
- [ ] Admin functionality tested
- [ ] File uploads tested
- [ ] Ready for deployment

Your SOSE Connect portal is now ready with a complete Supabase backend! 🎉