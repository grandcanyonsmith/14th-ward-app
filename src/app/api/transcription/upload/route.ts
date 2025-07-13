import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["audio/mpeg", "audio/wav", "audio/mp4", "video/mp4", "audio/m4a"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an audio or video file." },
        { status: 400 }
      );
    }

    // Convert file to buffer and save temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = join("/tmp", `transcription-${Date.now()}-${file.name}`);
    await writeFile(tempPath, buffer);

    // Create transcription record
    const transcription = await prisma.transcription.create({
      data: {
        meetingId: "temp-meeting-id", // In production, this would be a real meeting ID
        content: "",
        status: "PROCESSING",
        createdBy: session.user.id,
      },
    });

    // Start transcription process (in production, this would be a background job)
    transcribeAudio(tempPath, transcription.id, session.user.id);

    return NextResponse.json({
      message: "File uploaded successfully. Transcription in progress.",
      transcriptionId: transcription.id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

async function transcribeAudio(filePath: string, transcriptionId: string, userId: string) {
  try {
    // In a real application, you would upload the file to OpenAI
    // For demo purposes, we'll simulate the transcription
    
    // Simulated transcription result
    const mockTranscription = `
Meeting opened with prayer by Brother Johnson.

Sister Smith: Welcome everyone to our ward council meeting. Let's start by reviewing the ministering efforts from last month.

Brother Williams: We've had good success reaching out to less-active families. The Johnson family attended sacrament meeting last Sunday for the first time in months.

Sister Davis: The youth activities have been well-attended. We're planning a temple trip next month and need volunteers to help with transportation.

Brother Martinez: I can help with driving. Also, the Elders Quorum is organizing a service project to help the Anderson family with their yard work.

Sister Smith: Excellent. Let's make sure we coordinate with the Relief Society on that. Any other items we need to discuss?

Meeting concluded with assignments distributed and closing prayer by Sister Wilson.
    `.trim();

    const mockSummary = "Ward council discussed ministering efforts, youth activities including upcoming temple trip, and coordinated service project for the Anderson family. Good progress on reactivation efforts noted.";

    // Update the transcription record
    await prisma.transcription.update({
      where: { id: transcriptionId },
      data: {
        content: mockTranscription,
        summary: mockSummary,
        status: "COMPLETED",
      },
    });

    console.log("Transcription completed for:", transcriptionId);
  } catch (error) {
    console.error("Transcription error:", error);
    
    // Update status to failed
    await prisma.transcription.update({
      where: { id: transcriptionId },
      data: {
        status: "FAILED",
      },
    });
  }
} 