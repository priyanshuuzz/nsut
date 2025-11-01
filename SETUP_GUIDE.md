# Smart Waste Management System - Setup Guide

## Quick Start (5 minutes)

### 1. Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)

### 2. Supabase Setup

1. **Create a new Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and enter project details
   - Wait for project to be ready (2-3 minutes)

2. **Get your credentials:**
   - Go to Settings > API
   - Copy the "Project URL" and "anon public" key

3. **Set up the database:**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase/migrations/20251031130102_create_waste_management_schema.sql`
   - Click "Run" to create all tables and policies
   - Copy and paste the contents of `supabase/migrations/20251031130636_seed_demo_data.sql`
   - Click "Run" to add demo data

### 3. Local Setup

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Replace the placeholder values with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Go to `http://localhost:5173`
   - The app should load successfully!

### 4. Demo Accounts

The seed data creates these demo accounts:

**Worker Account:**
- Email: `worker@demo.com`
- Password: `password123`
- Role: Sanitation Worker

**Officer Account:**
- Email: `officer@demo.com`
- Password: `password123`
- Role: Panchayat Officer

**Citizen Access:**
- No login required
- Can submit feedback directly

### 5. Test the System

1. **As a Worker:**
   - Login with worker credentials
   - Check in with GPS location
   - Add waste collection entries
   - View daily summary
   - Check out

2. **As an Officer:**
   - Login with officer credentials
   - View dashboard with statistics
   - Monitor worker performance
   - Handle citizen feedback
   - View recent activities

3. **As a Citizen:**
   - Access the feedback form (no login needed)
   - Submit complaints about waste management
   - Track issue status

## Features Included

### Core Features ✅
- **User Authentication** - Role-based access (Worker, Officer, Citizen)
- **Worker Dashboard** - Check-in/out, waste logging, daily summary
- **Officer Dashboard** - Analytics, worker performance, feedback management
- **Citizen Feedback** - Anonymous complaint submission
- **Real-time Updates** - Live data synchronization
- **GPS Integration** - Location tracking for attendance and waste collection
- **Photo Upload** - Visual proof of waste collection
- **Performance Analytics** - Worker rankings and statistics

### Advanced Features (From Implementation Guide) 🚀
Ready to implement based on the detailed guide in `ADVANCED_FEATURES_IMPLEMENTATION.md`:

1. **Smart Bins IoT Integration** - Real-time bin fill level monitoring
2. **Environmental Impact Score** - Panchayat performance scoring
3. **Waste Credit System** - Gamification with points and badges
4. **Energy Efficiency Tracker** - Fuel consumption and carbon footprint
5. **Weather-Integrated Routes** - Weather-based route optimization
6. **Recycling Tracking** - Waste processing and conversion metrics
7. **Biometric Attendance** - Face recognition check-in
8. **AI Chat Assistant** - Intelligent help system
9. **Voice Complaints** - Multilingual voice feedback
10. **Budget Planner** - Financial analytics and forecasting
11. **Community Dashboard** - Public transparency portal
12. **Data Privacy Controls** - GDPR compliance features
13. **AI Waste Detection** - Image-based waste segregation
14. **Blockchain Records** - Immutable waste collection logs
15. **Predictive Analytics** - AI-powered insights

## Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for fast development

### Backend
- **Supabase** (PostgreSQL + Auth + Real-time + Storage)
- **Row Level Security** for data protection
- **PostGIS** for location data
- **Real-time subscriptions** for live updates

### Security
- JWT-based authentication
- Role-based access control
- Row-level security policies
- GPS verification for attendance
- Photo verification for collections

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Option 2: Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

### Option 3: Traditional Hosting
1. Build: `npm run build`
2. Upload `dist` folder to any web server
3. Configure environment variables

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check your `.env` file exists
   - Verify the variable names match exactly
   - Restart the dev server after changes

2. **"Failed to fetch" errors**
   - Check your Supabase URL and key
   - Verify your project is active
   - Check network connectivity

3. **Authentication issues**
   - Ensure RLS policies are applied
   - Check if demo users exist in auth.users
   - Verify profile records exist

4. **Location not working**
   - Enable location permissions in browser
   - Use HTTPS in production (required for geolocation)
   - Test on mobile devices

### Getting Help

1. Check the browser console for errors
2. Review Supabase logs in the dashboard
3. Verify database schema matches migration files
4. Test with demo accounts first

## Next Steps

1. **Customize for your region:**
   - Update panchayat data
   - Add local language support
   - Adjust waste types and categories

2. **Add advanced features:**
   - Follow the implementation guide
   - Start with high-impact features
   - Test thoroughly before deployment

3. **Scale the system:**
   - Add more panchayats
   - Implement district-level dashboards
   - Add mobile app support

4. **Integrate with existing systems:**
   - Connect to government databases
   - Add payment gateways
   - Implement SMS notifications

## Support

For technical support or feature requests:
- Review the detailed implementation guide
- Check Supabase documentation
- Test with provided demo data
- Follow security best practices

---

**Ready to revolutionize waste management in your region!** 🌱♻️