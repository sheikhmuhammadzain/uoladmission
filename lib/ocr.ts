import { createWorker } from 'tesseract.js';

/**
 * OCR service to extract text from uploaded documents
 */
export class OCRService {
  private static instance: OCRService;
  private worker: any;
  private isInitialized: boolean = false;

  private constructor() {}

  static async getInstance(): Promise<OCRService> {
    if (!OCRService.instance) {
      OCRService.instance = new OCRService();
      await OCRService.instance.initialize();
    }
    return OCRService.instance;
  }

  private async initialize() {
    if (!this.isInitialized) {
      this.worker = await createWorker('eng');
      this.isInitialized = true;
    }
  }

  /**
   * Extract text from an image
   * @param imageBuffer The image buffer to process
   * @returns The extracted text
   */
  async extractText(imageBuffer: Buffer): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const { data } = await this.worker.recognize(imageBuffer);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from image:', error);
      throw error;
    }
  }

  /**
   * Extract structured data from academic documents
   * @param text The extracted text from the document
   * @returns Structured academic data
   */
  extractAcademicData(text: string): AcademicData {
    // Default empty data
    const data: AcademicData = {
      studentName: '',
      institutionName: '',
      qualificationName: '',
      subjects: [],
      grades: {},
      cgpa: null,
      graduationDate: null,
    };

    // Extract student name (assuming format like "Name: John Doe" or "Student: John Doe")
    const nameMatch = text.match(/(?:Name|Student):\s*([^\n]+)/i);
    if (nameMatch) {
      data.studentName = nameMatch[1].trim();
    }

    // Extract institution name
    const institutionMatch = text.match(/(?:Institution|University|College|School):\s*([^\n]+)/i);
    if (institutionMatch) {
      data.institutionName = institutionMatch[1].trim();
    }

    // Extract qualification name
    const qualificationMatch = text.match(/(?:Qualification|Degree|Certificate):\s*([^\n]+)/i);
    if (qualificationMatch) {
      data.qualificationName = qualificationMatch[1].trim();
    }

    // Extract CGPA
    const cgpaMatch = text.match(/(?:CGPA|GPA):\s*(\d+\.\d+)/i);
    if (cgpaMatch) {
      data.cgpa = parseFloat(cgpaMatch[1]);
    }

    // Extract graduation date
    const dateMatch = text.match(/(?:Graduation|Completion|Issue)(?:\s*Date)?:\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i);
    if (dateMatch) {
      data.graduationDate = new Date(dateMatch[1]);
    }

    // Extract subjects and grades (this is a simplified approach)
    // Looking for patterns like "Subject: Grade" or in tabular format
    const subjectGradeMatches = text.matchAll(/([A-Za-z\s]+):\s*([A-F][+-]?|\d+\.?\d*%?)/g);
    for (const match of subjectGradeMatches) {
      const subject = match[1].trim();
      const grade = match[2].trim();
      data.subjects.push(subject);
      data.grades[subject] = grade;
    }

    return data;
  }

  /**
   * Close the worker when done
   */
  async terminate() {
    if (this.worker && this.isInitialized) {
      await this.worker.terminate();
      this.isInitialized = false;
    }
  }
}

export interface AcademicData {
  studentName: string;
  institutionName: string;
  qualificationName: string;
  subjects: string[];
  grades: Record<string, string>;
  cgpa: number | null;
  graduationDate: Date | null;
} 