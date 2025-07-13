import Link from "next/link";
import { ArrowRight, Users, Calendar, FileText, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              14th Ward Management System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your ward administration with our comprehensive management platform. 
              Track attendance, manage meetings, and transcribe important discussions all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/login"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Create account <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Comprehensive Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your ward
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides all the tools necessary for efficient ward administration 
              and member engagement.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Attendance Tracking
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Take photos of attendance sheets and automatically extract attendance data 
                  with our advanced image recognition technology.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Calendar className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Meeting Management
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Schedule and organize ward meetings, track attendance, and maintain 
                  comprehensive meeting records.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <FileText className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  AI Transcription
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Automatically transcribe Zoom calls and in-person meetings with AI-powered 
                  transcription and summary generation.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Secure & Private
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Built with security in mind. Role-based access control ensures that 
                  sensitive information is only accessible to authorized users.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to streamline your ward management?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-200">
              Join other wards who are already using our platform to improve their 
              administrative efficiency and member engagement.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 