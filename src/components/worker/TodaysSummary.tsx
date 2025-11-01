import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Weight } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type WasteLog = Database['public']['Tables']['waste_logs']['Row'];

interface TodaysSummaryProps {
  workerId: string;
}

export function TodaysSummary({ workerId }: TodaysSummaryProps) {
  const [logs, setLogs] = useState<WasteLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodaysLogs();
  }, [workerId]);

  const fetchTodaysLogs = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('waste_logs')
      .select('*')
      .eq('worker_id', workerId)
      .gte('collected_at', `${today}T00:00:00`)
      .lte('collected_at', `${today}T23:59:59`)
      .order('collected_at', { ascending: false });

    if (error) {
      console.error('Error fetching logs:', error);
    } else {
      setLogs(data || []);
    }
    setLoading(false);
  };

  const totalWeight = logs.reduce((sum, log) => sum + Number(log.weight_kg), 0);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading summary...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700 mb-1">
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-medium">Total Entries</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{logs.length}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-700 mb-1">
            <Weight className="w-5 h-5" />
            <span className="text-sm font-medium">Total Weight</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{totalWeight.toFixed(1)} kg</p>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Logs</h4>
          {logs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 capitalize">{log.waste_type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(log.collected_at).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{log.weight_kg} kg</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
