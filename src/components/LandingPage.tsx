import { useState } from 'react';
import { Leaf, Users, Shield, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'worker' | 'officer' | 'citizen') => void;
}

export function LandingPage({ onRoleSelect }: LandingPageProps) {
  const [selectedRole, setSelectedRole] = useState<'worker' | 'officer' | 'citizen' | null>(null);

  const roles = [
    {
      id: 'worker' as const,
      title: 'Sanitation Worker',
      description: 'Check-in, log waste collection, track daily activities',
      icon: Users,
      color: 'bg-blue-600',
      features: ['GPS Check-in/out', 'Waste Collection Logging', 'Daily Summary', 'Photo Verification']
    },
    {
      id: 'officer' as const,
      title: 'Panchayat Officer',
      description: 'Monitor operations, manage workers, handle complaints',
      icon: Shield,
      color: 'bg-green-600',
      features: ['Analytics Dashboard', 'Worker Performance', 'Citizen Feedback', 'Report Generation']
    },
    {
      id: 'citizen' as const,
      title: 'Citizen',
      description: 'Report issues, submit feedback, track complaints',
      icon: MessageSquare,
      color: 'bg-purple-600',
      features: ['Report Issues', 'Anonymous Feedback', 'Location-based', 'Status Tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Waste Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Digital solution for Panchayats to monitor, track, and optimize waste collection operations
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Choose Your Role
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <div
                  key={role.id}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                    isSelected ? 'border-green-500 ring-4 ring-green-100' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${role.color} rounded-xl mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {role.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {role.description}
                    </p>
                    
                    <div className="space-y-2">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          {selectedRole && (
            <div className="text-center">
              <button
                onClick={() => onRoleSelect(selectedRole)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Continue as {roles.find(r => r.id === selectedRole)?.title}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Demo Credentials
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Worker Account</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> worker@demo.com</p>
                  <p><span className="font-medium">Password:</span> password123</p>
                  <p className="text-blue-700 mt-3">Access worker dashboard, log waste collection, track attendance</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-3">Officer Account</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> officer@demo.com</p>
                  <p><span className="font-medium">Password:</span> password123</p>
                  <p className="text-green-700 mt-3">Monitor operations, view analytics, manage feedback</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-900 mb-2">Citizen Access</h4>
              <p className="text-sm text-purple-700">
                No login required - Submit feedback and complaints directly
              </p>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="max-w-6xl mx-auto mt-16">
          <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            System Features
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'GPS Tracking', desc: 'Real-time location monitoring' },
              { title: 'Photo Verification', desc: 'Visual proof of collection' },
              { title: 'Analytics Dashboard', desc: 'Performance insights' },
              { title: 'Citizen Feedback', desc: 'Community engagement' },
              { title: 'Real-time Updates', desc: 'Live data synchronization' },
              { title: 'Role-based Access', desc: 'Secure user management' },
              { title: 'Mobile Friendly', desc: 'Works on all devices' },
              { title: 'Offline Support', desc: 'Works without internet' }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}