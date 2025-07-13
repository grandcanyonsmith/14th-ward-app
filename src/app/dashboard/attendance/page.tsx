"use client";

import { useState } from "react";
import { Upload, Camera, Check, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function AttendancePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp"],
    },
    maxFiles: 1,
  });

  const processImage = async () => {
    if (!selectedFile) return;

    setProcessing(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/attendance/process", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data.attendance);
      } else {
        alert("Failed to process image");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image");
    } finally {
      setProcessing(false);
    }
  };

  const saveAttendance = async () => {
    try {
      const response = await fetch("/api/attendance/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          attendance: attendanceData,
        }),
      });

      if (response.ok) {
        alert("Attendance saved successfully!");
        setSelectedFile(null);
        setPreview(null);
        setAttendanceData([]);
      } else {
        alert("Failed to save attendance");
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Track Attendance</h1>
        <p className="mt-1 text-sm text-gray-600">
          Upload a photo of your attendance sheet to automatically extract attendance data
        </p>
      </div>

      {!preview && (
        <div
          {...getRootProps()}
          className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
            isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
          } hover:border-gray-400 cursor-pointer`}
        >
          <div className="space-y-1 text-center">
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <p className="pl-1">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag and drop an image here, or click to select"}
              </p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}

      {preview && (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={preview}
              alt="Attendance sheet preview"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
                setAttendanceData([]);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!attendanceData.length && (
            <button
              onClick={processImage}
              disabled={processing}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Processing..." : "Extract Attendance Data"}
            </button>
          )}
        </div>
      )}

      {attendanceData.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Extracted Attendance Data
            </h3>
            <div className="space-y-2">
              {attendanceData.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {member.name}
                  </span>
                  <button
                    onClick={() => {
                      const updated = [...attendanceData];
                      updated[index].present = !updated[index].present;
                      setAttendanceData(updated);
                    }}
                    className={`p-1 rounded ${
                      member.present
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {member.present ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={saveAttendance}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Attendance Records
          </h3>
          <p className="text-sm text-gray-500">
            No attendance records yet. Upload your first attendance sheet to get started!
          </p>
        </div>
      </div>
    </div>
  );
} 