# Demo Guide - Smart Waste Management System

## Quick Start

The system is fully configured and ready to use with demo data!

## Demo Login Credentials

### Worker Account (Ramesh Kumar)
```
Email: worker@demo.com
Password: password123
```

**What you'll see:**
- Check-in/Check-out functionality with GPS
- Waste collection logging (20 existing logs)
- Daily summary showing 382.3 kg total waste collected
- 6 days of attendance history

**Try these actions:**
1. Click "Check In" (allow location access)
2. Click "Add Entry" to log waste collection
3. Fill in waste type, weight, and location
4. View "Today's Summary" stats

---

### Officer Account (Sunita Sharma)
```
Email: officer@demo.com
Password: password123
```

**What you'll see:**
- Analytics dashboard with real-time stats
- Worker performance rankings
- Recent waste collection activity
- Citizen feedback management (3 pending complaints)

**Try these actions:**
1. View dashboard statistics
2. Check worker performance rankings
3. Review and manage citizen feedback
4. Assign or resolve complaints

---

### Citizen Access (No Login Required)
```
Role: Citizen
Access: Direct from landing page
```

**What you can do:**
1. Select "Citizen" role on landing page
2. Choose your Panchayat (Greenville or Riverside)
3. Select complaint type
4. Add description and location
5. Submit anonymous feedback

**Existing sample feedback:**
- 2 pending complaints
- 2 assigned complaints
- 1 resolved complaint

---

## System Features Demonstrated

### For Workers:
- GPS-based attendance tracking
- Waste collection logging with type and weight
- Photo verification capability
- Daily performance summary
- Historical data view

### For Officers:
- Real-time dashboard analytics
- Worker performance monitoring
- Citizen feedback management
- Complaint assignment and tracking
- Recent activity feed

### For Citizens:
- Anonymous complaint submission
- Location-based issue reporting
- Multiple complaint types support
- Status tracking capability

---

## Database Status

All demo data is pre-loaded:

- **Panchayats**: 2 (Greenville & Riverside)
- **Routes**: 5 collection routes
- **Waste Logs**: 20+ collection entries
- **Attendance**: 6 days of worker history
- **Feedback**: 5 citizen complaints with various statuses
- **Users**: 2 demo accounts (worker + officer)

---

## Testing Workflows

### Worker Daily Flow:
1. Login → Check In (GPS)
2. Log multiple waste collections
3. View daily summary stats
4. Check Out at end of day

### Officer Management Flow:
1. Login → View dashboard
2. Monitor active workers
3. Review citizen complaints
4. Assign complaints to workers
5. Track performance metrics

### Citizen Reporting Flow:
1. Access feedback form (no login)
2. Select Panchayat
3. Choose issue type
4. Describe problem with location
5. Submit and receive confirmation

---

## Technical Details

**Frontend**: React + TypeScript + Tailwind CSS
**Backend**: Supabase (PostgreSQL + Auth + Realtime)
**Security**: Row Level Security (RLS) enabled
**Location**: GPS integration for tracking
**Real-time**: Live data synchronization

---

## Support

For any issues:
1. Check browser console for errors
2. Verify location permissions enabled
3. Ensure Supabase connection is active
4. Review README.md for setup details

Enjoy exploring the Smart Waste Management System!
