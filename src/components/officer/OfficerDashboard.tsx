import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { BarChart3, Users, Trash2, AlertCircle, TrendingUp } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { WorkerPerformance } from './WorkerPerformance';
import { FeedbackList } from './FeedbackList';

interface DashboardStats {
  totalWorkers: number;
  activeToday: number;
  totalWasteToday: number;
  pendingComplaints: number;
  weeklyWaste: number;
}

export function OfficerDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkers: 0,
    activeToday: 0,
    totalWasteToday: 0,
    pendingComplaints: 0,
    weeklyWaste: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.panchayat_id) {
      fetchDashboardStats();
    }
  }, [profile]);

  const fetchDashboardStats = async () => {
    if (!profile?.panchayat_id) return;

    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [workersRes, attendanceRes, wasteRes, complaintsRes, weeklyWasteRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .eq('panchayat_id', profile.panchayat_id)
        .eq('role', 'worker')
        .eq('is_active', true),

      supabase
        .from('attendance')
        .select('id', { count: 'exact', head: true })
        .eq('panchayat_id', profile.panchayat_id)
        .eq('date', today),

      supabase
        .from('waste_logs')
        .select('weight_kg')
        .eq('panchayat_id', profile.panchayat_id)
        .gte('collected_at', `${today}T00:00:00`)
        .lte('collected_at', `${today}T23:59:59`),

      supabase
        .from('citizen_feedback')
        .select('id', { count: 'exact', head: true })
        .eq('panchayat_id', profile.panchayat_id)
        .eq('status', 'pending'),

      supabase
        .from('waste_logs')
        .select('weight_kg')
        .eq('panchayat_id', profile.panchayat_id)
        .gte('collected_at', `${weekAgo}T00:00:00`),
    ]);

    const totalWasteToday = wasteRes.data?.reduce((sum, log) => sum + Number(log.weight_kg), 0) || 0;
    const weeklyWaste = weeklyWasteRes.data?.reduce((sum, log) => sum + Number(log.weight_kg), 0) || 0;

    setStats({
      totalWorkers: workersRes.count || 0,
      activeToday: attendanceRes.count || 0,
      totalWasteToday,
      pendingComplaints: complaintsRes.count || 0,
      weeklyWaste,
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Officer Dashboard</h2>
        <p className="text-gray-600">Monitor waste management operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Workers"
          value={`${stats.activeToday}/${stats.totalWorkers}`}
          icon={Users}
          color="blue"
          trend={stats.activeToday > 0 ? '+' + Math.round((stats.activeToday / stats.totalWorkers) * 100) + '%' : undefined}
        />

        <StatsCard
          title="Today's Waste"
          value={`${stats.totalWasteToday.toFixed(0)} kg`}
          icon={Trash2}
          color="green"
        />

        <StatsCard
          title="Weekly Total"
          value={`${stats.weeklyWaste.toFixed(0)} kg`}
          icon={TrendingUp}
          color="purple"
          trend={stats.totalWasteToday > 0 ? 'Active' : undefined}
        />

        <StatsCard
          title="Pending Issues"
          value={stats.pendingComplaints.toString()}
          icon={AlertCircle}
          color={stats.pendingComplaints > 0 ? 'red' : 'gray'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity panchayatId={profile?.panchayat_id || ''} />
        <WorkerPerformance panchayatId={profile?.panchayat_id || ''} />
      </div>

      <FeedbackList panchayatId={profile?.panchayat_id || ''} />
    </div>
  );
}
