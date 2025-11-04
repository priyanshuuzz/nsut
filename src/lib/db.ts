import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const dbPath = path.join(process.cwd(), 'waste-management.db');
export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS panchayats (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      district TEXT NOT NULL,
      state TEXT NOT NULL,
      contact_email TEXT,
      contact_phone TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('worker', 'officer', 'district_authority', 'citizen')),
      full_name TEXT NOT NULL,
      phone TEXT,
      panchayat_id TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (panchayat_id) REFERENCES panchayats(id)
    );

    CREATE TABLE IF NOT EXISTS routes (
      id TEXT PRIMARY KEY,
      panchayat_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      path_data TEXT,
      estimated_duration INTEGER,
      estimated_distance REAL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (panchayat_id) REFERENCES panchayats(id)
    );

    CREATE TABLE IF NOT EXISTS waste_logs (
      id TEXT PRIMARY KEY,
      worker_id TEXT NOT NULL,
      route_id TEXT,
      panchayat_id TEXT NOT NULL,
      waste_type TEXT NOT NULL CHECK(waste_type IN ('organic', 'plastic', 'mixed', 'other')),
      weight_kg REAL NOT NULL,
      location TEXT,
      photo_urls TEXT DEFAULT '[]',
      notes TEXT,
      collected_at TEXT DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (worker_id) REFERENCES users(id),
      FOREIGN KEY (route_id) REFERENCES routes(id),
      FOREIGN KEY (panchayat_id) REFERENCES panchayats(id)
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      worker_id TEXT NOT NULL,
      panchayat_id TEXT NOT NULL,
      check_in_time TEXT DEFAULT CURRENT_TIMESTAMP,
      check_in_location TEXT,
      check_out_time TEXT,
      check_out_location TEXT,
      total_hours REAL,
      areas_covered TEXT DEFAULT '[]',
      date TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (worker_id) REFERENCES users(id),
      FOREIGN KEY (panchayat_id) REFERENCES panchayats(id)
    );

    CREATE TABLE IF NOT EXISTS citizen_feedback (
      id TEXT PRIMARY KEY,
      panchayat_id TEXT NOT NULL,
      citizen_name TEXT,
      citizen_phone TEXT,
      complaint_type TEXT NOT NULL CHECK(complaint_type IN ('missed_pickup', 'overflow', 'cleanliness', 'other')),
      description TEXT NOT NULL,
      location TEXT,
      location_name TEXT,
      photo_urls TEXT DEFAULT '[]',
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'assigned', 'resolved', 'closed')),
      assigned_to TEXT,
      resolved_at TEXT,
      resolution_notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (panchayat_id) REFERENCES panchayats(id),
      FOREIGN KEY (assigned_to) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_waste_logs_worker ON waste_logs(worker_id);
    CREATE INDEX IF NOT EXISTS idx_waste_logs_panchayat ON waste_logs(panchayat_id);
    CREATE INDEX IF NOT EXISTS idx_waste_logs_collected_at ON waste_logs(collected_at);
    CREATE INDEX IF NOT EXISTS idx_attendance_worker ON attendance(worker_id);
    CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
    CREATE INDEX IF NOT EXISTS idx_feedback_panchayat ON citizen_feedback(panchayat_id);
    CREATE INDEX IF NOT EXISTS idx_feedback_status ON citizen_feedback(status);
  `);

  console.log('Database initialized successfully');
}

export function seedDemoData() {
  const panchayatId1 = crypto.randomUUID();
  const panchayatId2 = crypto.randomUUID();
  const workerId = crypto.randomUUID();
  const officerId = crypto.randomUUID();

  db.exec(`
    INSERT OR IGNORE INTO panchayats (id, name, district, state, contact_email, contact_phone) VALUES
    ('${panchayatId1}', 'Greenville Panchayat', 'Central District', 'Maharashtra', 'greenville@example.com', '+91-9876543211'),
    ('${panchayatId2}', 'Riverside Panchayat', 'North District', 'Maharashtra', 'riverside@example.com', '+91-9876543212');

    INSERT OR IGNORE INTO users (id, email, password_hash, role, full_name, phone, panchayat_id) VALUES
    ('${workerId}', 'worker@demo.com', 'password123', 'worker', 'Ramesh Kumar', '+91-9876543210', '${panchayatId1}'),
    ('${officerId}', 'officer@demo.com', 'password123', 'officer', 'Sunita Sharma', '+91-9876543220', '${panchayatId1}');
  `);

  console.log('Demo data seeded successfully');
  console.log('Worker ID:', workerId);
  console.log('Officer ID:', officerId);
  console.log('Panchayat ID:', panchayatId1);
}
