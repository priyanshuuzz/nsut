import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Camera, MapPin, Trash2, X } from 'lucide-react';
import type { WasteType } from '../../lib/database.types';

interface WasteLogFormProps {
  attendanceId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function WasteLogForm({ attendanceId, onSuccess, onCancel }: WasteLogFormProps) {
  const { user, profile } = useAuth();
  const [wasteType, setWasteType] = useState<WasteType>('mixed');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleGetLocation = async () => {
    setGettingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (error) {
      alert('Failed to get location. Please enable location access.');
    } finally {
      setGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile?.panchayat_id) return;

    setLoading(true);
    try {
      const locationString = location
        ? `POINT(${location.lng} ${location.lat})`
        : null;

      const { error } = await supabase.from('waste_logs').insert({
        worker_id: user.id,
        panchayat_id: profile.panchayat_id,
        waste_type: wasteType,
        weight_kg: parseFloat(weight),
        location: locationString,
        notes: notes || null,
      });

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error('Error logging waste:', error);
      alert('Failed to log waste collection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Waste Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['organic', 'plastic', 'mixed', 'other'] as WasteType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setWasteType(type)}
              className={`px-4 py-2.5 rounded-lg border-2 transition-all capitalize ${
                wasteType === type
                  ? 'border-green-600 bg-green-50 text-green-700 font-medium'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weight (kg)
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="15"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={gettingLocation}
          className={`w-full px-4 py-2 border-2 border-dashed rounded-lg transition-colors ${
            location
              ? 'border-green-300 bg-green-50 text-green-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            {gettingLocation
              ? 'Getting location...'
              : location
              ? `Located: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
              : 'Get Current Location'}
          </div>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Any additional notes..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          {loading ? 'Saving...' : 'Log Collection'}
        </button>
      </div>
    </form>
  );
}
