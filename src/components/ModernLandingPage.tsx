import { ArrowRight, Leaf, MapPin, Users, MessageSquare, Brain, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';

interface ModernLandingPageProps {
  onRoleSelect: (role: 'worker' | 'officer' | 'citizen') => void;
}

export function ModernLandingPage({ onRoleSelect }: ModernLandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 relative overflow-hidden">
      <div className="grid-background"></div>

      <nav className="relative z-10 border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-2.5 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Swachh Panchayat</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
              <a href="#impact" className="text-gray-700 hover:text-green-600 transition-colors">Impact</a>
              <a href="#dashboard" className="text-gray-700 hover:text-green-600 transition-colors">Dashboard</a>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all hover:shadow-lg">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full border border-green-200">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium text-green-800">40% Cleaner Areas Achieved</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-green-600">Smart Waste,</span>
              <br />
              <span className="text-gray-900">Smarter Villages</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              AI-powered waste tracking, route optimization & citizen feedback system for Panchayats.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onRoleSelect('worker')}
                className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-green-600 transition-all">
                How it Works
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>GPS-Enabled</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Made for India</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="stat-card-float">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-Time Tracking</h3>
                    <p className="text-sm text-gray-600">Monitoring waste collection</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-sm text-green-800 font-medium mb-1">
                      "Track every waste pickup in real-time with GPS"
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span>Active monitoring...</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">100+</p>
                    <p className="text-xs text-gray-600">Villages</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">500+</p>
                    <p className="text-xs text-gray-600">Workers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">92%</p>
                    <p className="text-xs text-gray-600">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Smarter Waste Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to digitize and optimize waste collection in your Panchayat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card group">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart route optimization and predictive waste volume analytics for efficient operations
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">GPS-Enabled</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time location tracking for workers and waste collection monitoring
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Citizen Portal</h3>
              <p className="text-gray-600 leading-relaxed">
                Easy complaint registration and feedback system for community engagement
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Carbon footprint tracking and environmental impact scoring for sustainability
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Dashboard Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor operations, track performance, and make data-driven decisions
          </p>
        </div>

        <div className="dashboard-preview bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-3 gap-6 p-8">
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-xs font-medium text-green-600 bg-green-200 px-2 py-1 rounded-full">+18%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">2,847 kg</p>
              <p className="text-sm text-gray-600">Waste Collected Today</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <span className="text-xs font-medium text-blue-600 bg-blue-200 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">28/32</p>
              <p className="text-sm text-gray-600">Workers On Duty</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">98%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">47/48</p>
              <p className="text-sm text-gray-600">Routes Completed</p>
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Impact, Real Results
          </h2>
          <p className="text-xl text-gray-600">
            Transforming waste management across rural India
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">100+</div>
            <p className="text-gray-600 font-medium">Villages Onboarded</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">40%</div>
            <p className="text-gray-600 font-medium">Cleaner Areas</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-600 mb-2">500+</div>
            <p className="text-gray-600 font-medium">Active Workers</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-purple-600 mb-2">92%</div>
            <p className="text-gray-600 font-medium">Citizen Satisfaction</p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-2 rounded-xl">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Swachh Panchayat</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                Made for India | Powered by AI
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Transforming waste management in rural communities
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
