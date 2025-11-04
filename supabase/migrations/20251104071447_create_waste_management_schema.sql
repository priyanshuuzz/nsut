/*
  # Smart Waste Management System - Initial Schema

  ## Overview
  This migration creates the foundational database structure for the Smart Waste Management & Monitoring System for Panchayats.

  ## New Tables

  ### 1. `profiles`
  Extends auth.users with role-based profiles
  - `id` (uuid, FK to auth.users)
  - `role` (enum: 'worker', 'officer', 'district_authority', 'citizen')
  - `full_name` (text)
  - `phone` (text)
  - `panchayat_id` (uuid, nullable for district authorities)
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `panchayats`
  Administrative units for waste management
  - `id` (uuid, primary key)
  - `name` (text)
  - `district` (text)
  - `state` (text)
  - `contact_email` (text)
  - `contact_phone` (text)
  - `created_at` (timestamptz)

  ### 3. `routes`
  Predefined waste collection routes
  - `id` (uuid, primary key)
  - `panchayat_id` (uuid, FK)
  - `name` (text)
  - `description` (text)
  - `path_data` (jsonb) - stores GPS coordinates
  - `estimated_duration` (integer) - in minutes
  - `estimated_distance` (numeric) - in kilometers
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 4. `waste_logs`
  Daily waste collection records
  - `id` (uuid, primary key)
  - `worker_id` (uuid, FK to profiles)
  - `route_id` (uuid, FK to routes)
  - `panchayat_id` (uuid, FK)
  - `waste_type` (enum: 'organic', 'plastic', 'mixed', 'other')
  - `weight_kg` (numeric)
  - `location` (point) - GPS coordinates
  - `photo_urls` (text[])
  - `notes` (text)
  - `collected_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 5. `attendance`
  Worker check-in/check-out records
  - `id` (uuid, primary key)
  - `worker_id` (uuid, FK to profiles)
  - `panchayat_id` (uuid, FK)
  - `check_in_time` (timestamptz)
  - `check_in_location` (point)
  - `check_out_time` (timestamptz, nullable)
  - `check_out_location` (point, nullable)
  - `total_hours` (numeric, nullable)
  - `areas_covered` (text[])
  - `date` (date)
  - `created_at` (timestamptz)

  ### 6. `route_tracking`
  Real-time GPS tracking data
  - `id` (uuid, primary key)
  - `worker_id` (uuid, FK)
  - `route_id` (uuid, FK)
  - `attendance_id` (uuid, FK)
  - `location` (point)
  - `timestamp` (timestamptz)
  - `speed` (numeric, nullable)
  - `accuracy` (numeric, nullable)

  ### 7. `citizen_feedback`
  Complaints and feedback from citizens
  - `id` (uuid, primary key)
  - `panchayat_id` (uuid, FK)
  - `citizen_name` (text, nullable)
  - `citizen_phone` (text, nullable)
  - `complaint_type` (enum: 'missed_pickup', 'overflow', 'cleanliness', 'other')
  - `description` (text)
  - `location` (point)
  - `location_name` (text)
  - `photo_urls` (text[])
  - `status` (enum: 'pending', 'assigned', 'resolved', 'closed')
  - `assigned_to` (uuid, FK to profiles, nullable)
  - `resolved_at` (timestamptz, nullable)
  - `resolution_notes` (text, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. `reports`
  Auto-generated performance reports
  - `id` (uuid, primary key)
  - `panchayat_id` (uuid, FK)
  - `report_type` (enum: 'daily', 'weekly', 'monthly')
  - `period_start` (date)
  - `period_end` (date)
  - `total_waste_kg` (numeric)
  - `areas_covered` (integer)
  - `workers_count` (integer)
  - `complaints_resolved` (integer)
  - `summary_data` (jsonb)
  - `file_url` (text, nullable)
  - `generated_at` (timestamptz)

  ### 9. `ai_predictions`
  AI-generated route and waste predictions
  - `id` (uuid, primary key)
  - `panchayat_id` (uuid, FK)
  - `prediction_type` (enum: 'route_optimization', 'waste_volume', 'seasonal_pattern')
  - `target_date` (date)
  - `prediction_data` (jsonb)
  - `confidence_score` (numeric)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Create policies for role-based access control
  - Workers can only access their own data
  - Officers can access all data within their panchayat
  - Citizens can submit feedback and view their own submissions
*/

-- Enable PostGIS for location data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create enums
CREATE TYPE user_role AS ENUM ('worker', 'officer', 'district_authority', 'citizen');
CREATE TYPE waste_type AS ENUM ('organic', 'plastic', 'mixed', 'other');
CREATE TYPE complaint_type AS ENUM ('missed_pickup', 'overflow', 'cleanliness', 'other');
CREATE TYPE feedback_status AS ENUM ('pending', 'assigned', 'resolved', 'closed');
CREATE TYPE report_type AS ENUM ('daily', 'weekly', 'monthly');
CREATE TYPE prediction_type AS ENUM ('route_optimization', 'waste_volume', 'seasonal_pattern');

-- Panchayats table
CREATE TABLE IF NOT EXISTS panchayats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  district text NOT NULL,
  state text NOT NULL,
  contact_email text,
  contact_phone text,
  created_at timestamptz DEFAULT now()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'citizen',
  full_name text NOT NULL,
  phone text,
  panchayat_id uuid REFERENCES panchayats(id),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Routes table
CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_id uuid REFERENCES panchayats(id) NOT NULL,
  name text NOT NULL,
  description text,
  path_data jsonb,
  estimated_duration integer,
  estimated_distance numeric,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Waste logs table
CREATE TABLE IF NOT EXISTS waste_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id uuid REFERENCES profiles(id) NOT NULL,
  route_id uuid REFERENCES routes(id),
  panchayat_id uuid REFERENCES panchayats(id) NOT NULL,
  waste_type waste_type NOT NULL,
  weight_kg numeric NOT NULL,
  location geography(POINT),
  photo_urls text[] DEFAULT '{}',
  notes text,
  collected_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id uuid REFERENCES profiles(id) NOT NULL,
  panchayat_id uuid REFERENCES panchayats(id) NOT NULL,
  check_in_time timestamptz NOT NULL DEFAULT now(),
  check_in_location geography(POINT),
  check_out_time timestamptz,
  check_out_location geography(POINT),
  total_hours numeric,
  areas_covered text[] DEFAULT '{}',
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Route tracking table
CREATE TABLE IF NOT EXISTS route_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id uuid REFERENCES profiles(id) NOT NULL,
  route_id uuid REFERENCES routes(id),
  attendance_id uuid REFERENCES attendance(id),
  location geography(POINT) NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  speed numeric,
  accuracy numeric
);

-- Citizen feedback table
CREATE TABLE IF NOT EXISTS citizen_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_id uuid REFERENCES panchayats(id) NOT NULL,
  citizen_name text,
  citizen_phone text,
  complaint_type complaint_type NOT NULL,
  description text NOT NULL,
  location geography(POINT),
  location_name text,
  photo_urls text[] DEFAULT '{}',
  status feedback_status DEFAULT 'pending',
  assigned_to uuid REFERENCES profiles(id),
  resolved_at timestamptz,
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_id uuid REFERENCES panchayats(id) NOT NULL,
  report_type report_type NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  total_waste_kg numeric DEFAULT 0,
  areas_covered integer DEFAULT 0,
  workers_count integer DEFAULT 0,
  complaints_resolved integer DEFAULT 0,
  summary_data jsonb DEFAULT '{}',
  file_url text,
  generated_at timestamptz DEFAULT now()
);

-- AI predictions table
CREATE TABLE IF NOT EXISTS ai_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panchayat_id uuid REFERENCES panchayats(id) NOT NULL,
  prediction_type prediction_type NOT NULL,
  target_date date NOT NULL,
  prediction_data jsonb NOT NULL,
  confidence_score numeric,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_panchayat ON profiles(panchayat_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_routes_panchayat ON routes(panchayat_id);
CREATE INDEX IF NOT EXISTS idx_waste_logs_worker ON waste_logs(worker_id);
CREATE INDEX IF NOT EXISTS idx_waste_logs_panchayat ON waste_logs(panchayat_id);
CREATE INDEX IF NOT EXISTS idx_waste_logs_collected_at ON waste_logs(collected_at);
CREATE INDEX IF NOT EXISTS idx_attendance_worker ON attendance(worker_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_route_tracking_worker ON route_tracking(worker_id);
CREATE INDEX IF NOT EXISTS idx_route_tracking_timestamp ON route_tracking(timestamp);
CREATE INDEX IF NOT EXISTS idx_citizen_feedback_panchayat ON citizen_feedback(panchayat_id);
CREATE INDEX IF NOT EXISTS idx_citizen_feedback_status ON citizen_feedback(status);
CREATE INDEX IF NOT EXISTS idx_reports_panchayat ON reports(panchayat_id);

-- Enable Row Level Security
ALTER TABLE panchayats ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Officers can view profiles in their panchayat"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('officer', 'district_authority')
      AND (p.panchayat_id = profiles.panchayat_id OR p.role = 'district_authority')
    )
  );

-- RLS Policies for panchayats
CREATE POLICY "Authenticated users can view panchayats"
  ON panchayats FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Officers can update their panchayat"
  ON panchayats FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'officer'
      AND profiles.panchayat_id = panchayats.id
    )
  );

-- RLS Policies for routes
CREATE POLICY "Users can view routes in their panchayat"
  ON routes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.panchayat_id = routes.panchayat_id OR profiles.role = 'district_authority')
    )
  );

CREATE POLICY "Officers can manage routes"
  ON routes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'officer'
      AND profiles.panchayat_id = routes.panchayat_id
    )
  );

-- RLS Policies for waste_logs
CREATE POLICY "Workers can view own logs"
  ON waste_logs FOR SELECT
  TO authenticated
  USING (
    worker_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = waste_logs.panchayat_id OR profiles.role = 'district_authority')
    )
  );

CREATE POLICY "Workers can insert own logs"
  ON waste_logs FOR INSERT
  TO authenticated
  WITH CHECK (worker_id = auth.uid());

CREATE POLICY "Workers can update own logs"
  ON waste_logs FOR UPDATE
  TO authenticated
  USING (worker_id = auth.uid())
  WITH CHECK (worker_id = auth.uid());

-- RLS Policies for attendance
CREATE POLICY "Workers can view own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    worker_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = attendance.panchayat_id OR profiles.role = 'district_authority')
    )
  );

CREATE POLICY "Workers can manage own attendance"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (worker_id = auth.uid());

CREATE POLICY "Workers can update own attendance"
  ON attendance FOR UPDATE
  TO authenticated
  USING (worker_id = auth.uid())
  WITH CHECK (worker_id = auth.uid());

-- RLS Policies for route_tracking
CREATE POLICY "Workers can insert own tracking data"
  ON route_tracking FOR INSERT
  TO authenticated
  WITH CHECK (worker_id = auth.uid());

CREATE POLICY "Users can view tracking in their panchayat"
  ON route_tracking FOR SELECT
  TO authenticated
  USING (
    worker_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN attendance a ON a.worker_id = route_tracking.worker_id
      WHERE p.id = auth.uid()
      AND p.role IN ('officer', 'district_authority')
      AND (p.panchayat_id = a.panchayat_id OR p.role = 'district_authority')
    )
  );

-- RLS Policies for citizen_feedback
CREATE POLICY "Anyone can submit feedback"
  ON citizen_feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Officers can view feedback in their panchayat"
  ON citizen_feedback FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = citizen_feedback.panchayat_id OR profiles.role = 'district_authority')
    )
  );

CREATE POLICY "Officers can update feedback"
  ON citizen_feedback FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = citizen_feedback.panchayat_id OR profiles.role = 'district_authority')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = citizen_feedback.panchayat_id OR profiles.role = 'district_authority')
    )
  );

-- RLS Policies for reports
CREATE POLICY "Officers can view reports"
  ON reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = reports.panchayat_id OR profiles.role = 'district_authority')
    )
  );

CREATE POLICY "Officers can generate reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'officer'
      AND profiles.panchayat_id = reports.panchayat_id
    )
  );

-- RLS Policies for ai_predictions
CREATE POLICY "Officers can view predictions"
  ON ai_predictions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('officer', 'district_authority')
      AND (profiles.panchayat_id = ai_predictions.panchayat_id OR profiles.role = 'district_authority')
    )
  );

CREATE POLICY "System can insert predictions"
  ON ai_predictions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'officer'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_citizen_feedback_updated_at
  BEFORE UPDATE ON citizen_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();