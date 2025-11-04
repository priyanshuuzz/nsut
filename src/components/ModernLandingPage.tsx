import { ArrowRight, Leaf, MapPin, Users, MessageSquare, Brain, CheckCircle, TrendingUp, BarChart3, Calendar, Camera, Mic, Wifi, WifiOff, FileText, UserCheck, Trash2, Zap, CloudRain, Award, Shield, User } from 'lucide-react';

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
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
              <a href="#impact" className="text-gray-700 hover:text-green-600 transition-colors">Impact</a>
              <a href="#stakeholders" className="text-gray-700 hover:text-green-600 transition-colors">Users</a>
              <button
                onClick={() => onRoleSelect('worker')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all hover:shadow-lg"
              >
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
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">120+ Villages Cleaned | 40% Improved Efficiency</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-green-600">Smart Waste,</span>
              <br />
              <span className="text-gray-900">Smarter Villages</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              AI-powered waste tracking, route optimization & citizen feedback for cleaner Panchayats.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onRoleSelect('worker')}
                className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-blue-400 hover:border-blue-600 transition-all"
              >
                How it Works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Brain className="w-5 h-5 text-green-600" />
                <span className="font-medium">AI-powered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">GPS-tracked</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Citizen-friendly</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <WifiOff className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">Offline Mode</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="stat-card-float">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-Time Tracking</h3>
                    <p className="text-sm text-gray-600">Monitoring waste collection</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-sm text-green-800 font-medium mb-1">
                      Track every waste pickup in real-time with GPS
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span>Active monitoring...</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">120+</p>
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

      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Path to Cleaner Villages in 3 Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here's how Swachh Panchayat brings order, efficiency, and transparency
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-400 to-yellow-400 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-16">
            <div className="timeline-item-left md:grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Log Waste Collection</h3>
                <p className="text-gray-600">
                  Workers record collection data & upload photos using mobile app.
                </p>
              </div>
              <div className="hidden md:block"></div>
            </div>

            <div className="timeline-item-right md:grid md:grid-cols-2 gap-8 items-center">
              <div className="hidden md:block"></div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monitor & Analyze</h3>
                <p className="text-gray-600">
                  Panchayat officers track routes, view analytics, and auto-generated reports.
                </p>
              </div>
            </div>

            <div className="timeline-item-left md:grid md:grid-cols-2 gap-8 items-center">
              <div className="md:text-right">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mb-4 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Predict & Improve</h3>
                <p className="text-gray-600">
                  AI suggests optimized routes and predicts waste volume using past data.
                </p>
              </div>
              <div className="hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Core Smart Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to digitize and optimize waste collection in your Panchayat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Waste Log</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Record daily collection and zone updates
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GPS Tracking</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track workers in real-time via maps
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI-based route suggestions
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-yellow-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Auto Reports</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Generate daily/weekly reports
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Worker Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Check-ins and task progress
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo Verification</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Upload proof of collection
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Citizen Feedback</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Allow villagers to report issues
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-yellow-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <WifiOff className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Offline Mode</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Works without network
              </p>
            </div>
          </div>

          <div className="feature-card group">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Input</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Regional language support
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smarter Insights, Better Planning
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor operations, track performance, and make data-driven decisions
          </p>
        </div>

        <div className="dashboard-preview bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-4 gap-6 p-8">
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <Trash2 className="w-8 h-8 text-green-600" />
                <span className="text-xs font-medium text-green-600 bg-green-200 px-2 py-1 rounded-full">+18%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">2.5 Tons</p>
              <p className="text-sm text-gray-600">Total Waste Collected</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <span className="text-xs font-medium text-blue-600 bg-blue-200 px-2 py-1 rounded-full">89%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">Efficiency</p>
              <p className="text-sm text-gray-600">Collection Rate</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-xs font-medium text-purple-600 bg-purple-200 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">45</p>
              <p className="text-sm text-gray-600">Active Workers</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">96%</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">Resolved</p>
              <p className="text-sm text-gray-600">Citizen Reports</p>
            </div>
          </div>
        </div>
      </section>

      <section id="stakeholders" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who Uses Swachh Panchayat?
          </h2>
          <p className="text-xl text-gray-600">
            Designed for every stakeholder in the waste management ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Panchayat Officer</h3>
            <p className="text-gray-600">
              Monitors collection, reviews analytics
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <UserCheck className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sanitation Worker</h3>
            <p className="text-gray-600">
              Logs daily tasks & uploads proof
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">District Authority</h3>
            <p className="text-gray-600">
              Oversees all Panchayats
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Citizen</h3>
            <p className="text-gray-600">
              Reports missed pickups
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Innovation that Keeps Us Ahead
          </h2>
          <p className="text-xl text-gray-600">
            Advanced features powered by cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Waste Prediction</h3>
            <p className="text-gray-600 text-sm">
              Detect high-generation zones
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">IoT Smart Bin Integration</h3>
            <p className="text-gray-600 text-sm">
              Sensors send fill-level data
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <CloudRain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Weather-Based Planning</h3>
            <p className="text-gray-600 text-sm">
              AI adjusts routes on rainy days
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco Credit System</h3>
            <p className="text-gray-600 text-sm">
              Rewards villages maintaining cleanliness
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Record</h3>
            <p className="text-gray-600 text-sm">
              Ensures transparent data history
            </p>
          </div>
        </div>
      </section>

      <section id="impact" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Change, Real Impact
          </h2>
          <p className="text-xl text-gray-600">
            Transforming waste management across rural India
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-5xl font-bold text-green-600 mb-2">+120</div>
            <p className="text-gray-600 font-medium">Panchayats Onboarded</p>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-5xl font-bold text-blue-600 mb-2">-60%</div>
            <p className="text-gray-600 font-medium">Overflow Incidents</p>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full mb-4">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-5xl font-bold text-yellow-600 mb-2">+50%</div>
            <p className="text-gray-600 font-medium">Worker Efficiency</p>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-5xl font-bold text-purple-600 mb-2">+30%</div>
            <p className="text-gray-600 font-medium">Citizen Engagement</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powered by Innovation & Purpose
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make rural sanitation smarter, sustainable, and data-driven — empowering Panchayats with AI tools to keep villages clean.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Priyanshu Kumar</h3>
                <p className="text-gray-600">Project Lead, Swachh Panchayat</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Building technology for sustainable and transparent waste management in rural communities.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                LinkedIn
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm font-medium">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-2 rounded-xl">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-semibold text-gray-900 block">Swachh Panchayat</span>
                <span className="text-sm text-gray-600">Made with love for India</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-sm">About</a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-sm">Contact</a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors text-sm">Privacy Policy</a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500">
                Transforming waste management in rural communities
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
