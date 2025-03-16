// This is a mock RAG (Retrieval-Augmented Generation) service
// In a real application, this would connect to a vector database and LLM service

export type Document = {
  id: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
};

// Mock knowledge base with program information
const knowledgeBase: Document[] = [
  {
    id: "cs-program",
    title: "Bachelor of Computer Science",
    content: `The Bachelor of Computer Science program at the University of Lahore is a 4-year undergraduate degree that prepares students for careers in software development, data science, and IT. The curriculum covers programming languages, algorithms, data structures, database systems, artificial intelligence, and software engineering. Admission requirements include a high school diploma with strong mathematics background. The program has 120 seats available with intakes in Fall and Spring semesters.`,
    metadata: {
      type: "program",
      faculty: "Computer Science & Information Technology",
      duration: "4 years",
      requirements: "High school diploma with strong mathematics background",
      career_paths: ["Software Developer", "Data Scientist", "Systems Analyst"]
    }
  },
  {
    id: "bba-program",
    title: "Bachelor of Business Administration",
    content: `The Bachelor of Business Administration (BBA) program at the University of Lahore is a 4-year undergraduate degree that provides a comprehensive foundation in business principles and practices. Students study management, marketing, finance, accounting, economics, and entrepreneurship. The program includes case studies, internships, and a final project. Admission requirements include a high school diploma. The program has 150 seats available with intakes in Fall and Spring semesters.`,
    metadata: {
      type: "program",
      faculty: "Business & Management Sciences",
      duration: "4 years",
      requirements: "High school diploma",
      career_paths: ["Business Manager", "Marketing Specialist", "Entrepreneur"]
    }
  },
  {
    id: "mbbs-program",
    title: "Bachelor of Medicine and Surgery (MBBS)",
    content: `The MBBS program at the University of Lahore is a 5-year undergraduate medical degree accredited by the Pakistan Medical and Dental Council. The curriculum includes basic medical sciences, clinical rotations, and internships at affiliated hospitals. Admission is highly competitive and requires strong academic performance in pre-medical subjects (Biology, Chemistry, Physics). The program has 100 seats available with intake in the Fall semester only.`,
    metadata: {
      type: "program",
      faculty: "Medicine & Health Sciences",
      duration: "5 years",
      requirements: "High school diploma with strong science background (Biology, Chemistry, Physics)",
      career_paths: ["Physician", "Surgeon", "Medical Researcher"]
    }
  },
  {
    id: "ee-program",
    title: "Bachelor of Electrical Engineering",
    content: `The Bachelor of Electrical Engineering program at the University of Lahore is a 4-year undergraduate degree accredited by the Pakistan Engineering Council. Students study circuit theory, electronics, power systems, control systems, and telecommunications. The program includes laboratory work, design projects, and an internship. Admission requirements include a high school diploma with strong mathematics and physics background. The program has 100 seats available with intake in the Fall semester.`,
    metadata: {
      type: "program",
      faculty: "Engineering & Technology",
      duration: "4 years",
      requirements: "High school diploma with strong mathematics and physics background",
      career_paths: ["Electrical Engineer", "Power Systems Engineer", "Telecommunications Engineer"]
    }
  },
  {
    id: "psychology-program",
    title: "Bachelor of Psychology",
    content: `The Bachelor of Psychology program at the University of Lahore is a 4-year undergraduate degree that provides a comprehensive understanding of human behavior, cognition, and mental processes. The curriculum covers developmental psychology, social psychology, abnormal psychology, cognitive psychology, and research methods. Students complete a research project and internship in their final year. Admission requirements include a high school diploma. The program has 80 seats available with intake in the Fall semester.`,
    metadata: {
      type: "program",
      faculty: "Social Sciences",
      duration: "4 years",
      requirements: "High school diploma",
      career_paths: ["Counselor", "Human Resources Specialist", "Research Assistant"]
    }
  },
  {
    id: "admission-requirements",
    title: "General Admission Requirements",
    content: `Admission to the University of Lahore requires a completed application form, high school diploma or equivalent, official transcripts, standardized test scores (where applicable), and a personal statement. International students must provide proof of English proficiency (IELTS or TOEFL). Some programs have additional requirements such as entrance exams or interviews. Applications are evaluated based on academic performance, test scores, and other relevant factors.`,
    metadata: {
      type: "information",
      category: "admissions"
    }
  },
  {
    id: "financial-aid",
    title: "Financial Aid and Scholarships",
    content: `The University of Lahore offers various financial aid options including merit scholarships, need-based grants, and student loans. Merit scholarships are awarded based on academic excellence, while need-based grants consider financial circumstances. The university also offers sports scholarships and scholarships for international students. Applications for financial aid should be submitted along with the admission application.`,
    metadata: {
      type: "information",
      category: "financial"
    }
  }
];

// Function to search the knowledge base
export async function searchKnowledgeBase(query: string): Promise<Document[]> {
  // In a real application, this would use vector similarity search
  // This is a simple keyword-based search for demonstration
  const keywords = query.toLowerCase().split(' ');
  
  return knowledgeBase.filter(doc => {
    const content = doc.content.toLowerCase();
    return keywords.some(keyword => content.includes(keyword));
  });
}

// Function to generate a response based on retrieved documents
export async function generateResponse(query: string, userContext: Record<string, any> = {}): Promise<string> {
  // In a real application, this would use an LLM like GPT-4
  // Here we're using simple template-based responses
  
  const relevantDocs = await searchKnowledgeBase(query);
  
  if (relevantDocs.length === 0) {
    return "I don't have specific information about that. Please ask about our programs, admission requirements, or other university-related topics.";
  }
  
  // Simple response generation based on query type
  if (query.toLowerCase().includes("program") || query.toLowerCase().includes("degree")) {
    const programDocs = relevantDocs.filter(doc => doc.metadata.type === "program");
    
    if (programDocs.length > 0) {
      const doc = programDocs[0];
      return `The ${doc.title} at the University of Lahore is a ${doc.metadata.duration} program offered by the Faculty of ${doc.metadata.faculty}. ${doc.content.split('.')[0]}. ${doc.content.split('.')[1] || ''}`;
    }
  }
  
  if (query.toLowerCase().includes("admission") || query.toLowerCase().includes("apply")) {
    const admissionDocs = relevantDocs.filter(doc => doc.metadata.category === "admissions");
    
    if (admissionDocs.length > 0) {
      return admissionDocs[0].content;
    }
  }
  
  if (query.toLowerCase().includes("scholarship") || query.toLowerCase().includes("financial aid")) {
    const financialDocs = relevantDocs.filter(doc => doc.metadata.category === "financial");
    
    if (financialDocs.length > 0) {
      return financialDocs[0].content;
    }
  }
  
  // Default response using the first relevant document
  return relevantDocs[0].content.split('.').slice(0, 2).join('.') + '.';
}

// Function to recommend programs based on student profile
export async function recommendPrograms(
  profile: {
    interests: string[];
    education?: string;
    achievements?: string[];
  }
): Promise<Document[]> {
  // In a real application, this would use a more sophisticated matching algorithm
  
  const programDocs = knowledgeBase.filter(doc => doc.metadata.type === "program");
  
  // Simple matching based on interests
  const interestsLower = profile.interests.map(i => i.toLowerCase());
  
  const scoredPrograms = programDocs.map(program => {
    let score = 0;
    
    // Match interests to program content
    interestsLower.forEach(interest => {
      if (program.content.toLowerCase().includes(interest)) {
        score += 10;
      }
      
      // Check career paths
      if (program.metadata.career_paths) {
        program.metadata.career_paths.forEach((path: string) => {
          if (path.toLowerCase().includes(interest)) {
            score += 5;
          }
        });
      }
    });
    
    // Ensure minimum score
    score = Math.max(score, 5);
    
    return {
      ...program,
      score
    };
  });
  
  // Sort by score
  scoredPrograms.sort((a, b) => b.score - a.score);
  
  return scoredPrograms;
}