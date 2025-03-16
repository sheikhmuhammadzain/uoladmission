import { NextRequest, NextResponse } from "next/server";
import { OCRService, AcademicData } from "@/lib/ocr";
import { getServerSession } from "next-auth";

/**
 * POST /api/documents/ocr - Process a document with OCR
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Get form data with file
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Check file type
    const fileType = file.type;
    if (!fileType.startsWith("image/") && fileType !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Only images and PDFs are supported." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process with OCR
    const ocrService = await OCRService.getInstance();
    const extractedText = await ocrService.extractText(buffer);
    
    // Extract structured data
    const academicData = ocrService.extractAcademicData(extractedText);

    return NextResponse.json({
      success: true,
      text: extractedText,
      academicData
    });
  } catch (error) {
    console.error("Error processing document with OCR:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
} 