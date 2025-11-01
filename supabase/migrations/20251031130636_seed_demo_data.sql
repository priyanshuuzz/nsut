/*
  # Seed Demo Data for Waste Management System

  ## Overview
  This migration adds sample data to the system for demonstration and testing purposes.

  ## Data Added
  
  ### 1. Panchayats
  - Creates 2 sample panchayats in different districts
  
  ### 2. Sample Users (Profiles)
  - Note: Auth users must be created manually via Supabase Auth
  - This migration prepares the structure for demo profiles
  
  ### 3. Routes
  - Creates sample waste collection routes for each panchayat
  
  ### 4. Sample Waste Logs
  - Historical waste collection data for analytics
  
  ### 5. Sample Feedback
  - Citizen feedback entries with different statuses

  ## Important Notes
  - Uses conditional inserts to avoid duplicates
  - Data is for demonstration purposes only
*/

-- Insert sample panchayats
INSERT INTO panchayats (id, name, district, state, contact_email, contact_phone)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Greenville Panchayat', 'Central District', 'Maharashtra', 'greenville@panchayat.in', '+91-9876543210'),
  ('00000000-0000-0000-0000-000000000002', 'Riverside Panchayat', 'North District', 'Karnataka', 'riverside@panchayat.in', '+91-9876543211')
ON CONFLICT (id) DO NOTHING;

-- Insert sample routes for Greenville Panchayat
INSERT INTO routes (id, panchayat_id, name, description, estimated_duration, estimated_distance, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Main Market Route', 'Covers main market area and surrounding shops', 90, 3.5, true),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Residential Zone A', 'Residential area north side', 60, 2.8, true),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Residential Zone B', 'Residential area south side', 75, 3.2, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample routes for Riverside Panchayat
INSERT INTO routes (id, panchayat_id, name, description, estimated_duration, estimated_distance, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000002', 'Commercial District', 'Business and commercial area', 120, 4.5, true),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000002', 'Village Center', 'Central village area', 45, 2.0, true)
ON CONFLICT (id) DO NOTHING;

-- Note: Sample citizen feedback (can be inserted without auth users)
INSERT INTO citizen_feedback (panchayat_id, citizen_name, citizen_phone, complaint_type, description, location_name, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Rajesh Kumar', '+91-9876501234', 'missed_pickup', 'Waste collection was missed yesterday in our street', 'Station Road, Near Temple', 'pending'),
  ('00000000-0000-0000-0000-000000000001', 'Anita Sharma', '+91-9876501235', 'overflow', 'Dustbin is overflowing for the past 3 days', 'Market Square', 'assigned'),
  ('00000000-0000-0000-0000-000000000001', 'Suresh Patel', '+91-9876501236', 'cleanliness', 'Area needs better cleaning after collection', 'Gandhi Chowk', 'resolved'),
  ('00000000-0000-0000-0000-000000000002', 'Priya Reddy', '+91-9876502234', 'missed_pickup', 'No collection for 2 days', 'Lake View Road', 'pending'),
  ('00000000-0000-0000-0000-000000000002', 'Vijay Singh', '+91-9876502235', 'other', 'Need additional bins in this area', 'Park Street', 'assigned')
ON CONFLICT DO NOTHING;

-- Create a function to help generate sample waste logs (will be used when profiles exist)
CREATE OR REPLACE FUNCTION generate_sample_waste_logs(worker_uuid uuid, panchayat_uuid uuid)
RETURNS void AS $$
DECLARE
  i integer;
  days_back integer;
  random_weight numeric;
  random_type text;
  waste_types text[] := ARRAY['organic', 'plastic', 'mixed', 'other'];
BEGIN
  FOR days_back IN 0..6 LOOP
    FOR i IN 1..FLOOR(RANDOM() * 3 + 2)::integer LOOP
      random_weight := (RANDOM() * 30 + 5)::numeric(10,1);
      random_type := waste_types[FLOOR(RANDOM() * 4 + 1)::integer];
      
      INSERT INTO waste_logs (
        worker_id,
        panchayat_id,
        waste_type,
        weight_kg,
        notes,
        collected_at
      ) VALUES (
        worker_uuid,
        panchayat_uuid,
        random_type::waste_type,
        random_weight,
        'Sample collection entry',
        (CURRENT_DATE - days_back * INTERVAL '1 day') + (RANDOM() * INTERVAL '8 hours' + INTERVAL '6 hours')
      );
    END LOOP;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create sample attendance records function
CREATE OR REPLACE FUNCTION generate_sample_attendance(worker_uuid uuid, panchayat_uuid uuid)
RETURNS void AS $$
DECLARE
  days_back integer;
  check_in_time timestamptz;
  work_hours numeric;
BEGIN
  FOR days_back IN 0..6 LOOP
    work_hours := (RANDOM() * 2 + 6)::numeric(10,2);
    check_in_time := (CURRENT_DATE - days_back * INTERVAL '1 day') + INTERVAL '8 hours' + (RANDOM() * INTERVAL '1 hour');
    
    INSERT INTO attendance (
      worker_id,
      panchayat_id,
      date,
      check_in_time,
      check_out_time,
      total_hours
    ) VALUES (
      worker_uuid,
      panchayat_uuid,
      (CURRENT_DATE - days_back * INTERVAL '1 day')::date,
      check_in_time,
      check_in_time + (work_hours * INTERVAL '1 hour'),
      work_hours
    ) ON CONFLICT DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
