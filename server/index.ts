import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const db = new Database('waste-management.db');

db.pragma('journal_mode = WAL');

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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
  CREATE INDEX IF NOT EXISTS idx_attendance_worker ON attendance(worker_id);
  CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
`);

function generateId() {
  return crypto.randomUUID();
}

const panchayatId = generateId();
const workerId = generateId();
const officerId = generateId();

const hashedPassword = bcrypt.hashSync('password123', 10);

try {
  db.exec(`
    INSERT OR IGNORE INTO panchayats (id, name, district, state, contact_email, contact_phone) VALUES
    ('${panchayatId}', 'Greenville Panchayat', 'Central District', 'Maharashtra', 'greenville@example.com', '+91-9876543211');

    INSERT OR IGNORE INTO users (id, email, password_hash, role, full_name, phone, panchayat_id) VALUES
    ('${workerId}', 'worker@demo.com', '${hashedPassword}', 'worker', 'Ramesh Kumar', '+91-9876543210', '${panchayatId}'),
    ('${officerId}', 'officer@demo.com', '${hashedPassword}', 'officer', 'Sunita Sharma', '+91-9876543220', '${panchayatId}');
  `);
  console.log('Demo data initialized');
} catch (error) {
  console.log('Demo data already exists');
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  const { password_hash, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token });
});

app.get('/api/panchayats', (req, res) => {
  const panchayats = db.prepare('SELECT * FROM panchayats ORDER BY name').all();
  res.json(panchayats);
});

app.get('/api/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const user = db.prepare('SELECT id, email, role, full_name, phone, panchayat_id, is_active FROM users WHERE id = ?').get(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.get('/api/attendance/:workerId/today', (req, res) => {
  const { workerId } = req.params;
  const today = new Date().toISOString().split('T')[0];

  const attendance = db.prepare('SELECT * FROM attendance WHERE worker_id = ? AND date = ?').get(workerId, today);
  res.json(attendance || null);
});

app.post('/api/attendance/checkin', (req, res) => {
  const { worker_id, panchayat_id, check_in_location } = req.body;
  const id = generateId();
  const date = new Date().toISOString().split('T')[0];

  const stmt = db.prepare(`
    INSERT INTO attendance (id, worker_id, panchayat_id, check_in_location, date)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(id, worker_id, panchayat_id, check_in_location, date);

  const attendance = db.prepare('SELECT * FROM attendance WHERE id = ?').get(id);
  res.json(attendance);
});

app.put('/api/attendance/:id/checkout', (req, res) => {
  const { id } = req.params;
  const { check_out_location, total_hours } = req.body;

  const stmt = db.prepare(`
    UPDATE attendance
    SET check_out_time = CURRENT_TIMESTAMP, check_out_location = ?, total_hours = ?
    WHERE id = ?
  `);

  stmt.run(check_out_location, total_hours, id);

  const attendance = db.prepare('SELECT * FROM attendance WHERE id = ?').get(id);
  res.json(attendance);
});

app.get('/api/waste-logs/:workerId/today', (req, res) => {
  const { workerId } = req.params;
  const today = new Date().toISOString().split('T')[0];

  const logs = db.prepare(`
    SELECT * FROM waste_logs
    WHERE worker_id = ? AND DATE(collected_at) = ?
    ORDER BY collected_at DESC
  `).all(workerId, today);

  res.json(logs);
});

app.post('/api/waste-logs', (req, res) => {
  const { worker_id, panchayat_id, waste_type, weight_kg, location, notes } = req.body;
  const id = generateId();

  const stmt = db.prepare(`
    INSERT INTO waste_logs (id, worker_id, panchayat_id, waste_type, weight_kg, location, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, worker_id, panchayat_id, waste_type, weight_kg, location, notes);

  const log = db.prepare('SELECT * FROM waste_logs WHERE id = ?').get(id);
  res.json(log);
});

app.get('/api/dashboard/:panchayatId/stats', (req, res) => {
  const { panchayatId } = req.params;
  const today = new Date().toISOString().split('T')[0];

  const totalWorkers = db.prepare('SELECT COUNT(*) as count FROM users WHERE panchayat_id = ? AND role = "worker" AND is_active = 1').get(panchayatId) as any;
  const activeToday = db.prepare('SELECT COUNT(*) as count FROM attendance WHERE panchayat_id = ? AND date = ?').get(panchayatId, today) as any;

  const wasteToday = db.prepare('SELECT SUM(weight_kg) as total FROM waste_logs WHERE panchayat_id = ? AND DATE(collected_at) = ?').get(panchayatId, today) as any;

  const pendingComplaints = db.prepare('SELECT COUNT(*) as count FROM citizen_feedback WHERE panchayat_id = ? AND status = "pending"').get(panchayatId) as any;

  res.json({
    totalWorkers: totalWorkers.count,
    activeToday: activeToday.count,
    totalWasteToday: wasteToday.total || 0,
    pendingComplaints: pendingComplaints.count
  });
});

app.get('/api/feedback/:panchayatId', (req, res) => {
  const { panchayatId } = req.params;
  const { status } = req.query;

  let query = 'SELECT * FROM citizen_feedback WHERE panchayat_id = ?';
  const params: any[] = [panchayatId];

  if (status && status !== 'all') {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT 20';

  const feedback = db.prepare(query).all(...params);
  res.json(feedback);
});

app.post('/api/feedback', (req, res) => {
  const { panchayat_id, citizen_name, citizen_phone, complaint_type, description, location, location_name } = req.body;
  const id = generateId();

  const stmt = db.prepare(`
    INSERT INTO citizen_feedback (id, panchayat_id, citizen_name, citizen_phone, complaint_type, description, location, location_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, panchayat_id, citizen_name, citizen_phone, complaint_type, description, location, location_name);

  const feedback = db.prepare('SELECT * FROM citizen_feedback WHERE id = ?').get(id);
  res.json(feedback);
});

app.put('/api/feedback/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updates: any = { status };
  if (status === 'resolved') {
    updates.resolved_at = new Date().toISOString();
  }

  const stmt = db.prepare(`
    UPDATE citizen_feedback
    SET status = ?, resolved_at = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(status, updates.resolved_at || null, id);

  const feedback = db.prepare('SELECT * FROM citizen_feedback WHERE id = ?').get(id);
  res.json(feedback);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Database initialized with demo data');
  console.log('Login credentials:');
  console.log('  Worker: worker@demo.com / password123');
  console.log('  Officer: officer@demo.com / password123');
});
