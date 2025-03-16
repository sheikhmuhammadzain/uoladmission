import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export class RAGSystem {
  private static instance: RAGSystem;
  private documents: { content: string; embedding: number[] }[] = [];

  private constructor() {}

  static async getInstance() {
    if (!RAGSystem.instance) {
      RAGSystem.instance = new RAGSystem();
      await RAGSystem.instance.initialize();
    }
    return RAGSystem.instance;
  }

  private async initialize() {
    // Initialize with empty documents
    this.documents = [];
  }

  async addDocument(content: string, metadata: Record<string, any> = {}) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await splitter.createDocuments([content]);
    
    // For now, using simple random embeddings as placeholder
    // In production, you would use a proper embedding model
    for (const doc of docs) {
      this.documents.push({
        content: doc.pageContent,
        embedding: Array.from({ length: 384 }, () => Math.random())
      });
    }
  }

  async query(question: string, topK: number = 3): Promise<string> {
    if (this.documents.length === 0) {
      return "No documents found in the knowledge base.";
    }

    // Simple cosine similarity search
    const queryEmbedding = Array.from({ length: 384 }, () => Math.random());
    
    const results = this.documents
      .map(doc => ({
        content: doc.content,
        similarity: this.cosineSimilarity(queryEmbedding, doc.embedding)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);

    return results.map(r => r.content).join('\n');
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
