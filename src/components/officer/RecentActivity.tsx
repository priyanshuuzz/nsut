import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Clock, Trash2, MapPin } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type WasteLog = Database['public']['Tables']['waste_logs']['Row'] & {
  profiles?: { full_name: string };
};

interface RecentActivityProps {
  panchayatId: string;
}

export function RecentActivity({ panchayatId }: RecentActivityProps) {
  const [logs, setLogs] = useState<WasteLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (panchayatId) {
      fetchRecentActivity();
    }
  }, [panchayatId]);

  const fetchRecentActivity = async () => {
    const { data, error } = await supabase
      .from('waste_logs')
      .select(`
        *,
        profiles:worker_id (full_name)
      `)
      .eq('panchayat_id', panchayatId)
      .order('collected_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching activity:', error);
    } else {
      setLogs(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      {logs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No activity yet today</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Trash2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {(log as any).profiles?.full_name || 'Unknown Worker'}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  {log.waste_type} - {log.weight_kg} kg
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(log.collected_at).toLocaleString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
