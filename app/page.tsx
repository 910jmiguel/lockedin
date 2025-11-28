import Link from "next/link";
import { CheckCircle, Zap, Shield, TrendingUp, ArrowRight, Calendar, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 animate-fade-in">
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Locked In</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Master your coursework, track your progress, and achieve your academic goals with powerful tools designed for student success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <Link 
                href="/signup" 
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-300">Focus Oriented</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-pink-400 mb-2">∞</div>
              <div className="text-gray-300">Unlimited Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-400">Powerful features to help you stay organized and motivated</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Course Management</h3>
              <p className="text-gray-400">
                Organize all your courses in one place. Track assignments, deadlines, and progress effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-pink-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-pink-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Smart To-Do Lists</h3>
              <p className="text-gray-400">
                Never miss a deadline. Create, prioritize, and complete tasks with our intelligent todo system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-blue-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Progress Tracking</h3>
              <p className="text-gray-400">
                Visualize your academic journey with detailed insights and progress metrics across all courses.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-green-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Goal Setting</h3>
              <p className="text-gray-400">
                Set academic goals and milestones. Stay motivated with clear objectives and achievement tracking.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-yellow-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-yellow-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400">
                Built with modern technology for instant load times and seamless performance on any device.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-red-900/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Secure & Private</h3>
              <p className="text-gray-400">
                Your data is protected with enterprise-grade security. We respect your privacy, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Lock In?
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            Join thousands of students who are crushing their academic goals. Start your journey today.
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-purple-900 font-bold rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg"
          >
            Start Free Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">LockedIn</h3>
              <p className="text-gray-400 text-sm">Your academic success platform</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                <li><Link href="/dashboard/courses" className="hover:text-white transition">Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white transition cursor-pointer">Privacy</li>
                <li className="hover:text-white transition cursor-pointer">Terms</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>&copy; 2025 LockedIn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
