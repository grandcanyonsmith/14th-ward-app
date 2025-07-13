import Link from "next/link";
import { Users, Calendar, FileText, Shield, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      name: "Attendance Tracking",
      description: "Take photos of attendance sheets and automatically extract attendance data with our advanced image recognition technology.",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Meeting Management",
      description: "Schedule and organize ward meetings, track attendance, and maintain comprehensive meeting records.",
      icon: Calendar,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "AI Transcription",
      description: "Automatically transcribe Zoom calls and in-person meetings with AI-powered transcription and summary generation.",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Secure & Private",
      description: "Built with security in mind. Role-based access control ensures that sensitive information is only accessible to authorized users.",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const benefits = [
    "Save hours on administrative tasks",
    "Never miss important meeting details",
    "Improve member engagement tracking",
    "Access data from anywhere, anytime",
    "Generate insights with analytics",
    "Collaborate with ward leadership",
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">14</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ward Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Sign in
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Trusted by 50+ wards nationwide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ward Management
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your ward administration with our comprehensive platform. 
              Track attendance, manage meetings, and transcribe discussions—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-primary inline-flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#features" className="btn-secondary inline-flex items-center justify-center">
                Learn More
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 mt-1">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-base font-semibold text-blue-600 mb-2">Comprehensive Features</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage your ward
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools necessary for efficient ward administration and member engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity ${feature.color}`}
                     style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-base font-semibold text-blue-600 mb-2">Why Choose Us</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Transform Your Ward Administration
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Join hundreds of wards who have streamlined their operations and improved member engagement with our platform.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Ward Analytics</h4>
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="space-y-4">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-9/10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">Real-time insights at your fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center animate-scale-in">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to streamline your ward management?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join other wards who are already using our platform to improve their administrative efficiency and member engagement.
              </p>
              <Link href="/auth/register" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-8 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 14th Ward Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 