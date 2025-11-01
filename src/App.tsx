import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { AppLayout } from './components/layout/AppLayout';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { OfficerDashboard } from './components/officer/OfficerDashboard';
import { CitizenFeedbackForm } from './components/citizen/CitizenFeedbackForm';

function App() {
  const { user, profile, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'worker' | 'officer' | 'citizen' | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page if no role is selected and no user is logged in
  if (!selectedRole && !user) {
    return <LandingPage onRoleSelect={setSelectedRole} />;
  }

  // Show citizen feedback form directly if citizen role is selected
  if (selectedRole === 'citizen') {
    return <CitizenFeedbackForm onBack={() => setSelectedRole(null)} />;
  }

  // Show login page for worker/officer roles or if user exists but no profile
  if (!user || !profile) {
    return <LoginPage onBack={() => setSelectedRole(null)} />;
  }

  // Show citizen feedback if logged in user has citizen role
  if (profile.role === 'citizen') {
    return <CitizenFeedbackForm onBack={() => setSelectedRole(null)} />;
  }

  // Show appropriate dashboard based on user role
  return (
    <AppLayout>
      {profile.role === 'worker' && <WorkerDashboard />}
      {(profile.role === 'officer' || profile.role === 'district_authority') && <OfficerDashboard />}
    </AppLayout>
  );
}

export default App;
