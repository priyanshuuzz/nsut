import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Clock, MapPin, Camera, Plus, CheckCircle } from 'lucide-react';
import { AttendanceCard } from './AttendanceCard';
import { WasteLogForm } from './WasteLogForm';
import { TodaysSummary } from './TodaysSummary';
import type { Database } from '../../lib/database.types';

type Attendance = Database['public']['Tables']['attendance']['Row'];

export function WorkerDashboard() {
  const { profile, user } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);
  const [showLogForm, setShowLogForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTodayAttendance();
    }
  }, [user]);

  const fetchTodayAttendance = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('worker_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (error) {
      console.error('Error fetching attendance:', error);
    } else {
      setTodayAttendance(data);
    }
    setLoading(false);
  };

  const handleCheckIn = async () => {
    if (!user || !profile?.panchayat_id) return;

    try {
      const position = await getCurrentPosition();
      const locationString = `POINT(${position.coords.longitude} ${position.coords.latitude})`;

      const { data, error } = await supabase
        .from('attendance')
        .insert({
          worker_id: user.id,
          panchayat_id: profile.panchayat_id,
          check_in_location: locationString,
          date: new Date().toISOString().split('T')[0],
        })
        .select()
        .single();

      if (error) throw error;
      setTodayAttendance(data);
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in. Please enable location access.');
    }
  };

  const handleCheckOut = async () => {
    if (!todayAttendance) return;

    try {
      const position = await getCurrentPosition();
      const locationString = `POINT(${position.coords.longitude} ${position.coords.latitude})`;

      const checkInTime = new Date(todayAttendance.check_in_time);
      const checkOutTime = new Date();
      const hours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

      const { data, error } = await supabase
        .from('attendance')
        .update({
          check_out_time: checkOutTime.toISOString(),
          check_out_location: locationString,
          total_hours: Math.round(hours * 100) / 100,
        })
        .eq('id', todayAttendance.id)
        .select()
        .single();

      if (error) throw error;
      setTodayAttendance(data);
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to check out. Please enable location access.');
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Worker Dashboard</h2>
          <p className="text-gray-600">Welcome, {profile?.full_name}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <AttendanceCard
        attendance={todayAttendance}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />

      {todayAttendance && !todayAttendance.check_out_time && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Waste Collection Log</h3>
              {!showLogForm && (
                <button
                  onClick={() => setShowLogForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Entry
                </button>
              )}
            </div>

            {showLogForm ? (
              <WasteLogForm
                attendanceId={todayAttendance.id}
                onSuccess={() => {
                  setShowLogForm(false);
                  fetchTodayAttendance();
                }}
                onCancel={() => setShowLogForm(false)}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Click "Add Entry" to log waste collection</p>
              </div>
            )}
          </div>

          <TodaysSummary workerId={user!.id} />
        </>
      )}

      {todayAttendance?.check_out_time && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Day Complete!</h3>
          <p className="text-gray-600">
            You worked {todayAttendance.total_hours?.toFixed(1)} hours today. Great job!
          </p>
        </div>
      )}
    </div>
  );
}
