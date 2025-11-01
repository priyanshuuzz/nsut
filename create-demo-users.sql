-- Demo User Creation Script
-- Run this in your Supabase SQL Editor after setting up the schema

-- First, you need to create auth users manually in Supabase Auth UI:
-- 1. Go to Authentication > Users in your Supabase dashboard
-- 2. Click "Add user" and create these accounts:
--    - Email: worker@demo.com, Password: password123
--    - Email: officer@demo.com, Password: password123
-- 3. Copy the user IDs from the auth.users table
-- 4. Replace the UUIDs below with the actual user IDs from step 3
-- 5. Run this script

-- Replace these UUIDs with actual user IDs from auth.users
-- You can find them by running: SELECT id, email FROM auth.users;

-- Example worker profile (replace the UUID)
INSERT INTO profiles (id, full_name, role, panchayat_id, phone, is_active)
VALUES (
  'REPLACE-WITH-WORKER-USER-ID',  -- Replace this with actual worker user ID
  'Ramesh Kumar',
  'worker',
  '00000000-0000-0000-0000-000000000001',
  '+91-9876543210',
  true
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  panchayat_id = EXCLUDED.panchayat_id,
  phone = EXCLUDED.phone;

-- Example officer profile (replace the UUID)
INSERT INTO profiles (id, full_name, role, panchayat_id, phone, is_active)
VALUES (
  'REPLACE-WITH-OFFICER-USER-ID',  -- Replace this with actual officer user ID
  'Sunita Sharma',
  'officer',
  '00000000-0000-0000-0000-000000000001',
  '+91-9876543220',
  true
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  panchayat_id = EXCLUDED.panchayat_id,
  phone = EXCLUDED.phone;

-- Generate sample data for the worker (replace the UUID)
-- SELECT generate_sample_waste_logs('REPLACE-WITH-WORKER-USER-ID', '00000000-0000-0000-0000-000000000001');
-- SELECT generate_sample_attendance('REPLACE-WITH-WORKER-USER-ID', '00000000-0000-0000-0000-000000000001');

-- Uncomment and run the above SELECT statements after replacing the UUIDs