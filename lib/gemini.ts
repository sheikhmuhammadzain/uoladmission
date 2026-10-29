import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { RAGSystem } from './rag';

// Check for API key but don't throw error in development
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | undefined;
let geminiModel: GenerativeModel | undefined;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  // Use Gemini 1.5 Pro
  geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
} else {
  console.warn('Missing GOOGLE_GEMINI_API_KEY environment variable. Using mock responses in development.');
}

export async function generateResponse(prompt: string, context?: string) {
    try {
        // If no context is provided, try to get it from the RAG system
        if (!context) {
            try {
                const ragSystem = await RAGSystem.getInstance();
                context = await ragSystem.query(prompt);
            } catch (error) {
                console.error('Error retrieving context from RAG system:', error);
                // Continue without context if RAG fails
            }
        }

        const systemPrompt = `You are an AI admission assistant for the University of Lahore. 
Your role is to provide accurate information about admission processes, programs, 
scholarships, and campus facilities. Be helpful, concise, and accurate.

If you don't know the answer to a question, politely say so and suggest contacting 
the university's admission office directly.`;

        // If API key is not available, return a mock response
        if (!apiKey || !geminiModel) {
            return `This is a mock response in development mode. In production, this would use the Gemini API to generate a response to: "${prompt}"`;
        }

        const fullPrompt = context
            ? `${systemPrompt}\n\nContext from university documents:\n${context}\n\nQuestion: ${prompt}`
            : `${systemPrompt}\n\nQuestion: ${prompt}`;

        const result = await geminiModel.generateContent(fullPrompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        // Return a fallback response instead of throwing
        return "I'm sorry, I encountered an error while processing your request. Please try again later or contact the university directly for assistance.";
    }
}

// Example usage:
async function runExample() {
  try {
    const question = "What is the capital of France?";
    const answer = await generateResponse(question);
    console.log("Answer:", answer);

    const context = "The Eiffel Tower is a famous landmark.";
    const questionWithContext = "What city is it in?";
    const answerWithContext = await generateResponse(questionWithContext, context);
    console.log("Answer with Context:", answerWithContext);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//runExample();
