import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { Database, FeedbackStatus } from '../../lib/database.types';

type Feedback = Database['public']['Tables']['citizen_feedback']['Row'];

interface FeedbackListProps {
  panchayatId: string;
}

export function FeedbackList({ panchayatId }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FeedbackStatus | 'all'>('all');

  useEffect(() => {
    if (panchayatId) {
      fetchFeedback();
    }
  }, [panchayatId, filter]);

  const fetchFeedback = async () => {
    let query = supabase
      .from('citizen_feedback')
      .select('*')
      .eq('panchayat_id', panchayatId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching feedback:', error);
    } else {
      setFeedbacks(data || []);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: FeedbackStatus) => {
    const updates: any = { status: newStatus };

    if (newStatus === 'resolved') {
      updates.resolved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('citizen_feedback')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating feedback:', error);
      alert('Failed to update status');
    } else {
      fetchFeedback();
    }
  };

  const getStatusColor = (status: FeedbackStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'assigned':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Citizen Feedback</h3>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Citizen Feedback</h3>
        <MessageSquare className="w-5 h-5 text-gray-400" />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['all', 'pending', 'assigned', 'resolved', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as FeedbackStatus | 'all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No feedback found</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {feedback.complaint_type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium">
                    {feedback.citizen_name || 'Anonymous'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2">{feedback.description}</p>

              {feedback.location_name && (
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  {feedback.location_name}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {new Date(feedback.created_at).toLocaleDateString('en-IN')}
                </div>

                {feedback.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(feedback.id, 'assigned')}
                      className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Assign
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(feedback.id, 'resolved')}
                      className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Resolve
                    </button>
                  </div>
                )}

                {feedback.status === 'assigned' && (
                  <button
                    onClick={() => handleStatusUpdate(feedback.id, 'resolved')}
                    className="px-3 py-1 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}

                {feedback.status === 'resolved' && (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
