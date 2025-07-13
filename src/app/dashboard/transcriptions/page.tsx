"use client";

import { useState } from "react";
import { FileText, Upload, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function TranscriptionsPage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const transcriptions = [
    {
      id: 1,
      meetingTitle: "Youth Committee Planning",
      date: "2024-01-10",
      status: "COMPLETED",
      summary: "Discussed upcoming youth activities including temple trip and service project...",
    },
    {
      id: 2,
      meetingTitle: "Ward Council Meeting",
      date: "2024-01-08",
      status: "PROCESSING",
      summary: null,
    },
    {
      id: 3,
      meetingTitle: "Relief Society Presidency",
      date: "2024-01-05",
      status: "FAILED",
      summary: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "PROCESSING":
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const response = await fetch("/api/transcription/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully! Transcription will begin shortly.");
        setUploadFile(null);
        // Refresh the page or update the list
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transcriptions</h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage meeting transcriptions
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Upload Recording for Transcription
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select audio or video file
            </label>
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          {uploadFile && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{uploadFile.name}</span>
              <button
                onClick={handleFileUpload}
                disabled={uploading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload & Transcribe
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Transcriptions
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {transcriptions.map((transcription) => (
            <li key={transcription.id}>
              <Link
                href={`/dashboard/transcriptions/${transcription.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transcription.meetingTitle}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transcription.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(transcription.status)}
                      <span className="ml-2 text-sm text-gray-500">
                        {transcription.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  {transcription.summary && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {transcription.summary}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Pro tip: Better transcription results
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Use high-quality audio recordings</li>
                <li>Minimize background noise</li>
                <li>Ensure clear speech and avoid overlapping conversations</li>
                <li>Supported formats: MP3, WAV, MP4, MOV, M4A</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 