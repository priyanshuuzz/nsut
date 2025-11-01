import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Send, MapPin, MessageSquare, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import type { ComplaintType, Database } from '../../lib/database.types';

type Panchayat = Database['public']['Tables']['panchayats']['Row'];

interface CitizenFeedbackFormProps {
  onBack?: () => void;
}

export function CitizenFeedbackForm({ onBack }: CitizenFeedbackFormProps) {
  const [panchayats, setPanchayats] = useState<Panchayat[]>([]);
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [complaintType, setComplaintType] = useState<ComplaintType>('missed_pickup');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    fetchPanchayats();
  }, []);

  const fetchPanchayats = async () => {
    const { data, error } = await supabase
      .from('panchayats')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching panchayats:', error);
    } else {
      setPanchayats(data || []);
    }
  };

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
      alert('Failed to get location. You can still submit without location.');
    } finally {
      setGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPanchayat) {
      alert('Please select a Panchayat');
      return;
    }

    setLoading(true);
    try {
      const locationString = location
        ? `POINT(${location.lng} ${location.lat})`
        : null;

      const { error } = await supabase.from('citizen_feedback').insert({
        panchayat_id: selectedPanchayat,
        citizen_name: name || null,
        citizen_phone: phone || null,
        complaint_type: complaintType,
        description,
        location: locationString,
        location_name: locationName || null,
      });

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setDescription('');
        setLocationName('');
        setLocation(null);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback has been submitted successfully. The Panchayat office will review and take action soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </button>
          )}
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Report an Issue
            </h1>
            <p className="text-gray-600">
              Help us keep your area clean by reporting issues
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Panchayat <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPanchayat}
                onChange={(e) => setSelectedPanchayat(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose your Panchayat</option>
                {panchayats.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.district}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['missed_pickup', 'overflow', 'cleanliness', 'other'] as ComplaintType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setComplaintType(type)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                      complaintType === type
                        ? 'border-green-600 bg-green-50 text-green-700 font-medium'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Please describe the issue in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Name
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Near Market, Main Road"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPS Location
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={gettingLocation}
                className={`w-full px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Your feedback helps improve our service</p>
                <p className="text-blue-700">
                  All submissions are reviewed by Panchayat officers and action will be taken promptly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
