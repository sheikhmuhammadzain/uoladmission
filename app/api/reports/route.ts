import { NextRequest, NextResponse } from "next/server";
import { ReportGenerator, StudentInfo } from "@/lib/report-generator";
import { AcademicData } from "@/lib/ocr";
import { DegreeRecommendationSystem, Program } from "@/lib/degree-recommendation";
import { getServerSession } from "next-auth";

/**
 * POST /api/reports/application - Generate an application form
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

    // Get request body
    const { type, studentInfo, academicData, programId, program, eligibility } = await request.json();

    // Validate input
    if (!type) {
      return NextResponse.json(
        { error: "Report type is required" },
        { status: 400 }
      );
    }

    if (!studentInfo) {
      return NextResponse.json(
        { error: "Student information is required" },
        { status: 400 }
      );
    }

    // Generate report based on type
    const reportGenerator = ReportGenerator.getInstance();
    let pdfBlob: Blob;

    switch (type) {
      case "application":
        if (!academicData || !programId) {
          return NextResponse.json(
            { error: "Academic data and program ID are required for application form" },
            { status: 400 }
          );
        }
        pdfBlob = await reportGenerator.generateApplicationForm(
          studentInfo as StudentInfo,
          academicData as AcademicData,
          programId as string
        );
        break;

      case "admission":
        if (!program || !eligibility) {
          return NextResponse.json(
            { error: "Program and eligibility data are required for admission letter" },
            { status: 400 }
          );
        }
        pdfBlob = await reportGenerator.generateAdmissionLetter(
          studentInfo as StudentInfo,
          program as Program,
          eligibility
        );
        break;

      case "eligibility":
        if (!academicData || !eligibility) {
          return NextResponse.json(
            { error: "Academic data and eligibility result are required for eligibility report" },
            { status: 400 }
          );
        }
        pdfBlob = await reportGenerator.generateEligibilityReport(
          studentInfo as StudentInfo,
          academicData as AcademicData,
          eligibility
        );
        break;

      default:
        return NextResponse.json(
          { error: "Invalid report type" },
          { status: 400 }
        );
    }

    // Convert blob to base64
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    return NextResponse.json({
      success: true,
      pdf: base64,
      type
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
} 