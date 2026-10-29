import { NextRequest, NextResponse } from "next/server";
import { RAGSystem } from "@/lib/rag-system";
import { getServerSession } from "next-auth";
import { DocumentType } from "@prisma/client";

// GET /api/documents - Get all documents
export async function GET() {
  try {
    const ragSystem = await RAGSystem.getInstance();
    const documents = await ragSystem.getAllDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST /api/documents - Add a new document
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Check if user is authenticated and has admin role
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can add documents." },
        { status: 403 }
      );
    }

    const { title, content, documentType } = await request.json();

    // Validate input
    if (!title || !content || !documentType) {
      return NextResponse.json(
        { error: "Title, content, and document type are required" },
        { status: 400 }
      );
    }

    // Validate document type
    if (!Object.values(DocumentType).includes(documentType as DocumentType)) {
      return NextResponse.json(
        { error: "Invalid document type" },
        { status: 400 }
      );
    }

    const ragSystem = await RAGSystem.getInstance();
    const documentId = await ragSystem.addDocument(
      title,
      content,
      documentType as DocumentType
    );

    return NextResponse.json({ id: documentId, success: true });
  } catch (error) {
    console.error("Error adding document:", error);
    return NextResponse.json(
      { error: "Failed to add document" },
      { status: 500 }
    );
  }
}

// DELETE /api/documents?id=xxx - Delete a document
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Check if user is authenticated and has admin role
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can delete documents." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const ragSystem = await RAGSystem.getInstance();
    await ragSystem.deleteDocument(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
} 