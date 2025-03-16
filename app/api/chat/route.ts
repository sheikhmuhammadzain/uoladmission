import { NextRequest, NextResponse } from "next/server";
import { generateResponse } from "@/lib/gemini";
import { RAGSystem } from "@/lib/rag";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get context from RAG system
    const ragSystem = await RAGSystem.getInstance();
    const context = await ragSystem.query(message);

    // Generate response using Gemini with RAG context
    const response = await generateResponse(message, context);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
} 