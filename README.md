# Smart Waste Management & Monitoring System

A comprehensive digital solution for rural waste management, enabling Panchayat officers and sanitation workers to monitor, record, and optimize waste collection through data-driven automation.

## Features

### For Sanitation Workers
- **Digital Attendance**: GPS-based check-in/check-out system
- **Daily Waste Logging**: Record waste collection with type, weight, and location
- **Real-time Tracking**: GPS tracking during collection routes
- **Photo Verification**: Upload proof of collection
- **Today's Summary**: View daily collection statistics

### For Panchayat Officers
- **Analytics Dashboard**: Monitor operations with real-time statistics
- **Worker Performance**: Track individual worker productivity
- **Recent Activity**: View all collection activities
- **Feedback Management**: Handle citizen complaints and feedback
- **Report Generation**: Auto-generated daily/weekly/monthly reports

### For Citizens
- **Report Issues**: Submit feedback about missed pickups or cleanliness
- **Track Status**: Monitor resolution of submitted complaints
- **Location-based**: GPS-enabled issue reporting

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### 1. Prerequisites

- Node.js 18+ installed
- Supabase account
- Environment variables configured

### 2. Environment Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

The database schema has been created with the following tables:
- `panchayats` - Administrative units
- `profiles` - User profiles with roles
- `routes` - Waste collection routes
- `waste_logs` - Daily waste collection records
- `attendance` - Worker check-in/check-out
- `route_tracking` - GPS tracking data
- `citizen_feedback` - Citizen complaints
- `reports` - Generated reports
- `ai_predictions` - AI-based predictions

### 4. Create Demo Users

In your Supabase dashboard, create users via Authentication > Users:

#### Worker Account
1. Create user: `worker@demo.com` / `password123`
2. After creation, add profile:
```sql
INSERT INTO profiles (id, full_name, role, panchayat_id, phone)
VALUES (
  'user_id_from_auth',
  'Ramesh Kumar',
  'worker',
  '00000000-0000-0000-0000-000000000001',
  '+91-9876543210'
);
```

#### Officer Account
1. Create user: `officer@demo.com` / `password123`
2. Add profile:
```sql
INSERT INTO profiles (id, full_name, role, panchayat_id, phone)
VALUES (
  'user_id_from_auth',
  'Sunita Sharma',
  'officer',
  '00000000-0000-0000-0000-000000000001',
  '+91-9876543220'
);
```

#### Generate Sample Data
After creating worker profile, generate historical data:
```sql
SELECT generate_sample_waste_logs('worker_user_id', '00000000-0000-0000-0000-000000000001');
SELECT generate_sample_attendance('worker_user_id', '00000000-0000-0000-0000-000000000001');
```

### 5. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## User Roles

### Worker
- Check-in/check-out with GPS
- Log waste collection entries
- View daily summary
- Cannot access other workers' data

### Officer
- View all panchayat operations
- Monitor worker performance
- Manage citizen feedback
- Generate reports
- Assign tasks

### Citizen
- Submit feedback/complaints
- No login required
- Track complaint status

### District Authority
- Access multiple panchayats
- View consolidated data
- Generate district-level reports

## Security

- Row Level Security (RLS) enabled on all tables
- Workers can only access their own data
- Officers can only access their panchayat's data
- Citizens can submit anonymous feedback
- GPS verification for attendance
- Photo verification for collections

## Key Workflows

### Worker Daily Workflow
1. Open app → Check In (GPS verified)
2. Start waste collection route
3. Log each collection (type, weight, location, photo)
4. View today's summary
5. Check Out at end of day

### Officer Daily Workflow
1. Login → View dashboard
2. Monitor active workers
3. Review today's waste collection
4. Handle pending citizen feedback
5. Assign complaints to workers
6. Generate reports

### Citizen Workflow
1. Open feedback form (no login needed)
2. Select panchayat
3. Choose issue type
4. Describe problem with location
5. Submit and receive confirmation

## Design System

### Colors
- Primary: Green (#2ECC71) - Eco-friendly
- Secondary: Blue (#3498DB) - Trust & Technology
- Accent: Yellow (#F1C40F) - Alerts
- Success: Green shades
- Error: Red shades

### Typography
- Font: System UI stack
- Headings: 600-700 weight
- Body: 400-500 weight

## Future Enhancements

- AI route optimization
- Predictive waste volume analysis
- IoT smart bin integration
- Multi-language support (Hindi, Marathi, Tamil)
- Voice input for data entry
- Offline mode with sync
- Mobile app (React Native)
- WhatsApp notifications
- Gamification for workers

## License

MIT License

## Support

For issues or questions, please contact your Panchayat office.
