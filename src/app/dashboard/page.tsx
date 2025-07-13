import { Users, Calendar, FileText, Mic } from "lucide-react";
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
      color: "bg-blue-500",
    },
    {
      name: "Manage Meetings",
      description: "Schedule and organize ward meetings with notes and recordings",
      icon: Calendar,
      href: "/dashboard/meetings",
      color: "bg-green-500",
    },
    {
      name: "Transcribe Zoom Calls",
      description: "Automatically transcribe and summarize Zoom meetings",
      icon: Mic,
      href: "/dashboard/meetings?type=zoom",
      color: "bg-purple-500",
    },
    {
      name: "Meeting Transcriptions",
      description: "Convert meeting recordings to searchable text with AI summaries",
      icon: FileText,
      href: "/dashboard/transcriptions",
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || 'User'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage attendance, meetings, and transcriptions all in one place
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.name}
            href={feature.href}
            className="group relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div>
              <span
                className={`rounded-lg inline-flex p-3 ${feature.color} text-white`}
              >
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
            <span
              className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Stats
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">
              Total Members
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalUsers}
            </dd>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">
              Meetings This Month
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.recentMeetings}
            </dd>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">
              Average Attendance
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.attendanceRate}%
            </dd>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        {recentMeetings.length > 0 ? (
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {meeting.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {meeting.type} • {new Date(meeting.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created by {meeting.creator.name}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/meetings/${meeting.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No meetings yet. Create your first meeting to get started!
          </p>
        )}
        {recentMeetings.length > 0 && (
          <div className="mt-4 text-center">
            <Link
              href="/dashboard/meetings"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View all meetings →
            </Link>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800">Quick Tip</h3>
          <p className="mt-1 text-sm text-yellow-700">
            You can upload photos of attendance sheets and our AI will automatically extract the data for you.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800">Getting Started</h3>
          <p className="mt-1 text-sm text-blue-700">
            Start by creating a meeting or uploading an attendance sheet to begin tracking your ward activities.
          </p>
        </div>
      </div>
    </div>
  );
} 