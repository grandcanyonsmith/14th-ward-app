import { Users, Calendar, FileText, Mic } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
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
          Welcome to 14th Ward Dashboard
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
              --
            </dd>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">
              Meetings This Month
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              --
            </dd>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-500">
              Average Attendance
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              --%
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
} 