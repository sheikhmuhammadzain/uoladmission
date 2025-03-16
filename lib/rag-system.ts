import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { prisma } from "./prisma";
import { DocumentType } from "@prisma/client";

// Define the dimension of OpenAI embeddings
const EMBEDDING_DIMENSION = 1536;

export class RAGSystem {
  private static instance: RAGSystem;
  private embeddings: OpenAIEmbeddings;

  private constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small",
      dimensions: EMBEDDING_DIMENSION,
    });
  }

  static async getInstance(): Promise<RAGSystem> {
    if (!RAGSystem.instance) {
      RAGSystem.instance = new RAGSystem();
    }
    return RAGSystem.instance;
  }

  /**
   * Add a document to the RAG system
   */
  async addDocument(
    title: string,
    content: string,
    documentType: DocumentType
  ): Promise<string> {
    try {
      // Create the document
      const document = await prisma.document.create({
        data: {
          title,
          content,
          documentType,
        },
      });

      // Split the document into chunks
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const chunks = await splitter.createDocuments([content]);

      // Process each chunk
      for (const chunk of chunks) {
        // Generate embedding for the chunk
        const embeddingArray = await this.embeddings.embedQuery(chunk.pageContent);
        
        // Store the chunk with its embedding
        await prisma.chunk.create({
          data: {
            content: chunk.pageContent,
            documentId: document.id,
            embedding: embeddingArray as any, // Cast to any due to Prisma type limitations
          },
        });
      }

      return document.id;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  }

  /**
   * Query the RAG system with a question
   */
  async query(question: string, topK: number = 5): Promise<string> {
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.embeddings.embedQuery(question);

      // Find similar chunks using vector similarity search
      // Note: This requires the pgvector extension to be installed in PostgreSQL
      const similarChunks = await prisma.$queryRaw<Array<{ id: string; content: string; similarity: number }>>`
        SELECT id, content, 1 - (embedding <=> ${queryEmbedding}::vector) as similarity
        FROM "Chunk"
        ORDER BY similarity DESC
        LIMIT ${topK}
      `;

      if (!similarChunks.length) {
        return "No relevant information found. Please try a different question.";
      }

      // Combine the chunks into a context
      const context = similarChunks
        .map((chunk) => chunk.content)
        .join("\n\n");

      return context;
    } catch (error) {
      console.error("Error querying RAG system:", error);
      throw error;
    }
  }

  /**
   * Get all documents
   */
  async getAllDocuments() {
    return prisma.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Get document by ID
   */
  async getDocumentById(id: string) {
    return prisma.document.findUnique({
      where: { id },
    });
  }

  /**
   * Delete document by ID
   */
  async deleteDocument(id: string) {
    return prisma.document.delete({
      where: { id },
    });
  }
} 