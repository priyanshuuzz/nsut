import { Clock, MapPin, LogIn as LogInIcon, LogOut as LogOutIcon } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Attendance = Database['public']['Tables']['attendance']['Row'];

interface AttendanceCardProps {
  attendance: Attendance | null;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function AttendanceCard({ attendance, onCheckIn, onCheckOut }: AttendanceCardProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!attendance) {
    return (
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Start Your Day</h3>
            <p className="text-green-100">Check in to begin tracking</p>
          </div>
          <Clock className="w-10 h-10 text-green-200" />
        </div>
        <button
          onClick={onCheckIn}
          className="w-full bg-white text-green-700 font-medium py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogInIcon className="w-5 h-5" />
          Check In
        </button>
      </div>
    );
  }

  const isCheckedOut = !!attendance.check_out_time;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isCheckedOut
            ? 'bg-gray-100 text-gray-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {isCheckedOut ? 'Completed' : 'Active'}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <LogInIcon className="w-4 h-4" />
            <span>Check In</span>
          </div>
          <span className="font-medium text-gray-900">
            {formatTime(attendance.check_in_time)}
          </span>
        </div>

        {attendance.check_out_time && (
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <LogOutIcon className="w-4 h-4" />
              <span>Check Out</span>
            </div>
            <span className="font-medium text-gray-900">
              {formatTime(attendance.check_out_time)}
            </span>
          </div>
        )}

        {attendance.total_hours !== null && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Total Hours</span>
            </div>
            <span className="font-medium text-gray-900">
              {attendance.total_hours.toFixed(1)} hrs
            </span>
          </div>
        )}
      </div>

      {!isCheckedOut && (
        <button
          onClick={onCheckOut}
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <LogOutIcon className="w-5 h-5" />
          Check Out
        </button>
      )}
    </div>
  );
}
