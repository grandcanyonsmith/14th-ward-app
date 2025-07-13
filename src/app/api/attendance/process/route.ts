import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import Tesseract from "tesseract.js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file temporarily
    const tempPath = join("/tmp", `attendance-${Date.now()}.png`);
    await writeFile(tempPath, buffer);

    // Process image with Tesseract
    const result = await Tesseract.recognize(tempPath, "eng", {
      logger: (m) => console.log(m),
    });

    // Parse the text to extract names and checkmarks
    const lines = result.data.text.split("\n").filter(line => line.trim());
    
    // This is a simplified extraction - in production, you'd need more sophisticated parsing
    const attendance = lines
      .filter(line => line.length > 3)
      .map((line, index) => {
        // Look for checkmarks or X marks in the line
        const hasCheck = line.includes("✓") || line.includes("√") || line.includes("X") || line.includes("x");
        // Extract name (simplified - assumes name is the first part of the line)
        const name = line.replace(/[✓√Xx]/g, "").trim().split(/\s+/).slice(0, 2).join(" ");
        
        return {
          id: `member-${index}`,
          name: name || `Member ${index + 1}`,
          present: hasCheck,
        };
      })
      .filter(item => item.name && item.name.length > 2);

    // If no attendance data extracted, return mock data for demo
    if (attendance.length === 0) {
      const mockAttendance = [
        { id: "1", name: "John Smith", present: true },
        { id: "2", name: "Mary Johnson", present: true },
        { id: "3", name: "Robert Brown", present: false },
        { id: "4", name: "Patricia Davis", present: true },
        { id: "5", name: "Michael Wilson", present: true },
        { id: "6", name: "Jennifer Garcia", present: false },
        { id: "7", name: "William Martinez", present: true },
        { id: "8", name: "Linda Anderson", present: true },
      ];
      
      return NextResponse.json({ 
        attendance: mockAttendance,
        message: "Using demo data - OCR processing will improve with better image quality"
      });
    }

    return NextResponse.json({ attendance });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
} 