import { NextRequest, NextResponse } from "next/server";
import { DegreeRecommendationSystem } from "@/lib/degree-recommendation";
import { AcademicData } from "@/lib/ocr";
import { getServerSession } from "next-auth";

/**
 * POST /api/recommendations - Get degree recommendations
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
    const { academicData, interests } = await request.json();

    // Validate input
    if (!academicData) {
      return NextResponse.json(
        { error: "Academic data is required" },
        { status: 400 }
      );
    }

    // Get recommendations
    const recommendationSystem = await DegreeRecommendationSystem.getInstance();
    const recommendations = await recommendationSystem.getRecommendations(
      academicData as AcademicData,
      interests || []
    );

    return NextResponse.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error("Error getting degree recommendations:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/recommendations/eligibility?programId=xxx - Check eligibility for a program
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const programId = searchParams.get("programId");
    const academicDataStr = searchParams.get("academicData");

    // Validate input
    if (!programId) {
      return NextResponse.json(
        { error: "Program ID is required" },
        { status: 400 }
      );
    }

    if (!academicDataStr) {
      return NextResponse.json(
        { error: "Academic data is required" },
        { status: 400 }
      );
    }

    // Parse academic data
    let academicData: AcademicData;
    try {
      academicData = JSON.parse(academicDataStr) as AcademicData;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid academic data format" },
        { status: 400 }
      );
    }

    // Check eligibility
    const recommendationSystem = await DegreeRecommendationSystem.getInstance();
    const eligibility = await recommendationSystem.calculateEligibility(
      programId,
      academicData
    );

    return NextResponse.json({
      success: true,
      eligibility
    });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return NextResponse.json(
      { error: "Failed to check eligibility" },
      { status: 500 }
    );
  }
} 