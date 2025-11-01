import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Award } from 'lucide-react';

interface WorkerStats {
  id: string;
  full_name: string;
  total_weight: number;
  entry_count: number;
}

interface WorkerPerformanceProps {
  panchayatId: string;
}

export function WorkerPerformance({ panchayatId }: WorkerPerformanceProps) {
  const [workers, setWorkers] = useState<WorkerStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (panchayatId) {
      fetchWorkerPerformance();
    }
  }, [panchayatId]);

  const fetchWorkerPerformance = async () => {
    const today = new Date().toISOString().split('T')[0];

    const { data: logs, error } = await supabase
      .from('waste_logs')
      .select('worker_id, weight_kg, profiles:worker_id(full_name)')
      .eq('panchayat_id', panchayatId)
      .gte('collected_at', `${today}T00:00:00`)
      .lte('collected_at', `${today}T23:59:59`);

    if (error) {
      console.error('Error fetching worker performance:', error);
      setLoading(false);
      return;
    }

    const workerMap = new Map<string, WorkerStats>();

    logs?.forEach((log: any) => {
      const workerId = log.worker_id;
      const existing = workerMap.get(workerId);

      if (existing) {
        existing.total_weight += Number(log.weight_kg);
        existing.entry_count += 1;
      } else {
        workerMap.set(workerId, {
          id: workerId,
          full_name: log.profiles?.full_name || 'Unknown',
          total_weight: Number(log.weight_kg),
          entry_count: 1,
        });
      }
    });

    const sortedWorkers = Array.from(workerMap.values()).sort(
      (a, b) => b.total_weight - a.total_weight
    );

    setWorkers(sortedWorkers);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Worker Performance</h3>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Worker Performance</h3>
        <Users className="w-5 h-5 text-gray-400" />
      </div>

      {workers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No data available for today</p>
      ) : (
        <div className="space-y-3">
          {workers.map((worker, index) => (
            <div
              key={worker.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                index === 0
                  ? 'bg-yellow-100 text-yellow-700'
                  : index === 1
                  ? 'bg-gray-200 text-gray-700'
                  : index === 2
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-blue-50 text-blue-600'
              }`}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {worker.full_name}
                </p>
                <p className="text-xs text-gray-600">
                  {worker.entry_count} {worker.entry_count === 1 ? 'entry' : 'entries'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">
                  {worker.total_weight.toFixed(1)} kg
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
