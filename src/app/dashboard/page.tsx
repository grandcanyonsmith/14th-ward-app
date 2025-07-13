import { Users, Calendar, FileText, Mic, TrendingUp, Clock, UserCheck, Activity } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [totalUsers, recentMeetings, attendanceRecords] = await Promise.all([
    prisma.user.count(),
    prisma.meeting.count({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    prisma.attendance.count({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  ]);

  const attendanceRate = attendanceRecords > 0 && totalUsers > 0 
    ? Math.round((attendanceRecords / (totalUsers * recentMeetings || 1)) * 100)
    : 0;

  return {
    totalUsers,
    recentMeetings,
    attendanceRate,
  };
}

async function getRecentActivity() {
  const recentMeetings = await prisma.meeting.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      creator: {
        select: { name: true },
      },
    },
  });

  return recentMeetings;
}

export default async function DashboardPage() {
  const session = await getSession();
  const stats = await getStats();
  const recentMeetings = await getRecentActivity();
  
  const features = [
    {
      name: "Track Attendance",
      description: "Take photos of attendance sheets and automatically extract attendance data",
      icon: Users,
      href: "/dashboard/attendance",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      name: "Manage Meetings",
      description: "Schedule and organize ward meetings with notes and recordings",
      icon: Calendar,
      href: "/dashboard/meetings",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      name: "Transcribe Zoom Calls",
      description: "Automatically transcribe and summarize Zoom meetings",
      icon: Mic,
      href: "/dashboard/meetings?type=zoom",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      name: "Meeting Transcriptions",
      description: "Convert meeting recordings to searchable text with AI summaries",
      icon: FileText,
      href: "/dashboard/transcriptions",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const statsData = [
    {
      label: "Total Members",
      value: stats.totalUsers,
      icon: Users,
      change: "+12%",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Meetings This Month",
      value: stats.recentMeetings,
      icon: Calendar,
      change: "+8%",
      trend: "up",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      label: "Average Attendance",
      value: `${stats.attendanceRate}%`,
      icon: UserCheck,
      change: "-2%",
      trend: "down",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white mb-8">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session?.user?.name || 'User'}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening in your ward today
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={stat.label}
            className="glass-morphism rounded-xl p-6 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className={`font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="ml-2 text-gray-500">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-8">
        {features.map((feature, index) => (
          <Link
            key={feature.name}
            href={feature.href}
            className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg card-hover animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${feature.color}`}
              style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            />
            
            <div className="relative z-10">
              <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.name}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                <span>Get started</span>
                <svg className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-gray-600 mt-1">Latest meetings and events in your ward</p>
          </div>
          <Activity className="h-6 w-6 text-gray-400" />
        </div>
        
        {recentMeetings.length > 0 ? (
          <div className="space-y-4">
            {recentMeetings.map((meeting: any, index: number) => (
              <div 
                key={meeting.id} 
                className="group relative overflow-hidden rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
                
                <div className="pl-4 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {meeting.title}
                    </h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(meeting.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Created by {meeting.creator.name} • {meeting.type} meeting
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/meetings/${meeting.id}`}
                    className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm whitespace-nowrap"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No meetings yet</p>
            <p className="text-gray-400 mt-1">Create your first meeting to get started!</p>
            <Link href="/dashboard/meetings" className="btn-primary inline-block mt-4">
              Create Meeting
            </Link>
          </div>
        )}
        
        {recentMeetings.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              href="/dashboard/meetings"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all meetings
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 p-6 animate-scale-in">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-yellow-200/30 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-yellow-900">Pro Tip</h3>
            </div>
            <p className="text-yellow-800">
              Upload attendance photos directly from your phone for instant data extraction. Our AI handles the rest!
            </p>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 p-6 animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-200/30 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-blue-900">Quick Start</h3>
            </div>
            <p className="text-blue-800">
              Schedule your first meeting and invite members. Track attendance and generate insights automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 