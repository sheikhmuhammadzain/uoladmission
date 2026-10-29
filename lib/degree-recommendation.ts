import { AcademicData } from './ocr';
import { prisma } from './prisma';

/**
 * Degree recommendation system
 */
export class DegreeRecommendationSystem {
  private static instance: DegreeRecommendationSystem;

  private constructor() {}

  static async getInstance(): Promise<DegreeRecommendationSystem> {
    if (!DegreeRecommendationSystem.instance) {
      DegreeRecommendationSystem.instance = new DegreeRecommendationSystem();
    }
    return DegreeRecommendationSystem.instance;
  }

  /**
   * Get degree recommendations based on academic data and interests
   * @param academicData The student's academic data
   * @param interests The student's interests
   * @returns Recommended degrees with match scores
   */
  async getRecommendations(
    academicData: AcademicData,
    interests: string[]
  ): Promise<DegreeRecommendation[]> {
    // Get all available programs from the database
    const programs = await this.getAllPrograms();
    
    // Calculate match scores for each program
    const recommendations = programs.map(program => {
      const matchScore = this.calculateMatchScore(program, academicData, interests);
      return {
        ...program,
        matchScore
      };
    });

    // Sort by match score (descending) and return top matches
    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }

  /**
   * Calculate eligibility for a specific program
   * @param programId The program ID
   * @param academicData The student's academic data
   * @returns Eligibility result
   */
  async calculateEligibility(
    programId: string,
    academicData: AcademicData
  ): Promise<EligibilityResult> {
    // Get program details
    const program = await this.getProgramById(programId);
    
    if (!program) {
      throw new Error(`Program with ID ${programId} not found`);
    }

    // Check minimum CGPA requirement
    const meetsMinimumCGPA = academicData.cgpa !== null && 
      academicData.cgpa >= program.minimumCGPA;
    
    // Check required subjects
    const hasRequiredSubjects = program.requiredSubjects.every(subject => 
      academicData.subjects.some(s => 
        s.toLowerCase().includes(subject.toLowerCase())
      )
    );

    // Calculate eligibility percentage
    let eligibilityPercentage = 0;
    
    if (meetsMinimumCGPA) {
      eligibilityPercentage += 60; // CGPA is 60% of eligibility
    } else if (academicData.cgpa !== null) {
      // Partial credit based on how close they are to minimum CGPA
      eligibilityPercentage += 60 * (academicData.cgpa / program.minimumCGPA);
    }

    if (hasRequiredSubjects) {
      eligibilityPercentage += 40; // Required subjects are 40% of eligibility
    } else if (program.requiredSubjects.length > 0) {
      // Count how many required subjects they have
      const matchedSubjects = program.requiredSubjects.filter(subject => 
        academicData.subjects.some(s => 
          s.toLowerCase().includes(subject.toLowerCase())
        )
      ).length;
      
      // Partial credit based on matched subjects
      eligibilityPercentage += 40 * (matchedSubjects / program.requiredSubjects.length);
    }

    // Check scholarship eligibility
    const scholarshipEligibility = this.checkScholarshipEligibility(
      academicData,
      program
    );

    return {
      programId,
      programName: program.name,
      isEligible: meetsMinimumCGPA && hasRequiredSubjects,
      eligibilityPercentage,
      meetsMinimumCGPA,
      hasRequiredSubjects,
      scholarshipEligibility
    };
  }

  /**
   * Check scholarship eligibility
   * @param academicData The student's academic data
   * @param program The program
   * @returns Scholarship eligibility details
   */
  private checkScholarshipEligibility(
    academicData: AcademicData,
    program: Program
  ): ScholarshipEligibility {
    // Default scholarship eligibility
    const result: ScholarshipEligibility = {
      isEligible: false,
      scholarshipPercentage: 0,
      scholarshipName: null
    };

    // No CGPA, no scholarship
    if (academicData.cgpa === null) {
      return result;
    }

    // Scholarship tiers based on CGPA
    if (academicData.cgpa >= 3.8) {
      result.isEligible = true;
      result.scholarshipPercentage = 100;
      result.scholarshipName = "Presidential Scholarship";
    } else if (academicData.cgpa >= 3.5) {
      result.isEligible = true;
      result.scholarshipPercentage = 75;
      result.scholarshipName = "Dean's Scholarship";
    } else if (academicData.cgpa >= 3.2) {
      result.isEligible = true;
      result.scholarshipPercentage = 50;
      result.scholarshipName = "Merit Scholarship";
    } else if (academicData.cgpa >= 3.0) {
      result.isEligible = true;
      result.scholarshipPercentage = 25;
      result.scholarshipName = "Achievement Scholarship";
    }

    return result;
  }

  /**
   * Calculate match score between a program and student profile
   * @param program The program
   * @param academicData The student's academic data
   * @param interests The student's interests
   * @returns Match score (0-100)
   */
  private calculateMatchScore(
    program: Program,
    academicData: AcademicData,
    interests: string[]
  ): number {
    let score = 0;
    const maxScore = 100;

    // Academic background match (50% of total score)
    const academicScore = this.calculateAcademicScore(program, academicData);
    score += academicScore * 0.5;

    // Interest match (50% of total score)
    const interestScore = this.calculateInterestScore(program, interests);
    score += interestScore * 0.5;

    // Ensure score is between 0 and 100
    return Math.min(Math.max(score, 0), maxScore);
  }

  /**
   * Calculate academic score
   * @param program The program
   * @param academicData The student's academic data
   * @returns Academic score (0-100)
   */
  private calculateAcademicScore(
    program: Program,
    academicData: AcademicData
  ): number {
    let score = 0;
    const maxScore = 100;

    // CGPA match (60% of academic score)
    if (academicData.cgpa !== null) {
      // If CGPA meets or exceeds minimum, full points
      if (academicData.cgpa >= program.minimumCGPA) {
        score += 60;
      } else {
        // Partial points based on how close they are
        score += 60 * (academicData.cgpa / program.minimumCGPA);
      }
    }

    // Required subjects match (40% of academic score)
    if (program.requiredSubjects.length > 0) {
      const matchedSubjects = program.requiredSubjects.filter(subject => 
        academicData.subjects.some(s => 
          s.toLowerCase().includes(subject.toLowerCase())
        )
      ).length;
      
      score += 40 * (matchedSubjects / program.requiredSubjects.length);
    } else {
      // If no required subjects, full points
      score += 40;
    }

    return Math.min(Math.max(score, 0), maxScore);
  }

  /**
   * Calculate interest score
   * @param program The program
   * @param interests The student's interests
   * @returns Interest score (0-100)
   */
  private calculateInterestScore(
    program: Program,
    interests: string[]
  ): number {
    if (!interests.length) {
      return 50; // Neutral score if no interests provided
    }

    // Convert everything to lowercase for case-insensitive matching
    const lowerInterests = interests.map(i => i.toLowerCase());
    const lowerKeywords = program.keywords.map(k => k.toLowerCase());
    const lowerName = program.name.toLowerCase();
    const lowerDescription = program.description.toLowerCase();

    // Count direct keyword matches
    let keywordMatches = 0;
    for (const interest of lowerInterests) {
      for (const keyword of lowerKeywords) {
        if (keyword.includes(interest) || interest.includes(keyword)) {
          keywordMatches++;
          break; // Count each interest only once per program
        }
      }
    }

    // Check if interests appear in program name or description
    let nameDescMatches = 0;
    for (const interest of lowerInterests) {
      if (lowerName.includes(interest) || lowerDescription.includes(interest)) {
        nameDescMatches++;
      }
    }

    // Calculate score based on matches
    // Keyword matches are weighted more heavily
    const keywordScore = (keywordMatches / interests.length) * 70;
    const nameDescScore = (nameDescMatches / interests.length) * 30;
    
    return Math.min(keywordScore + nameDescScore, 100);
  }

  /**
   * Get all available programs
   * @returns List of programs
   */
  private async getAllPrograms(): Promise<Program[]> {
    try {
      // In a real implementation, this would fetch from the database
      // For now, we'll return mock data
      return [
        {
          id: "1",
          name: "Bachelor of Computer Science",
          description: "A comprehensive program covering programming, algorithms, data structures, and software engineering.",
          faculty: "Faculty of Computing and Engineering",
          duration: "4 years",
          minimumCGPA: 3.0,
          requiredSubjects: ["Mathematics", "Computer", "Physics"],
          keywords: ["programming", "software", "computer", "technology", "IT", "development", "coding", "web", "app", "artificial intelligence", "data science"]
        },
        {
          id: "2",
          name: "Bachelor of Business Administration",
          description: "Develop skills in management, marketing, finance, and entrepreneurship.",
          faculty: "Faculty of Business and Management",
          duration: "4 years",
          minimumCGPA: 2.5,
          requiredSubjects: ["Mathematics", "Economics"],
          keywords: ["business", "management", "marketing", "finance", "economics", "entrepreneurship", "leadership", "accounting"]
        },
        {
          id: "3",
          name: "Bachelor of Medicine and Surgery (MBBS)",
          description: "Become a medical doctor through this comprehensive medical program.",
          faculty: "Faculty of Medicine",
          duration: "5 years",
          minimumCGPA: 3.5,
          requiredSubjects: ["Biology", "Chemistry", "Physics"],
          keywords: ["medicine", "doctor", "healthcare", "medical", "biology", "anatomy", "physiology", "health"]
        },
        {
          id: "4",
          name: "Bachelor of Electrical Engineering",
          description: "Study power systems, electronics, control systems, and telecommunications.",
          faculty: "Faculty of Computing and Engineering",
          duration: "4 years",
          minimumCGPA: 3.0,
          requiredSubjects: ["Mathematics", "Physics"],
          keywords: ["engineering", "electrical", "electronics", "power", "circuits", "telecommunications", "technology"]
        },
        {
          id: "5",
          name: "Bachelor of Psychology",
          description: "Understand human behavior, cognition, and mental processes.",
          faculty: "Faculty of Social Sciences",
          duration: "4 years",
          minimumCGPA: 2.7,
          requiredSubjects: ["Biology"],
          keywords: ["psychology", "behavior", "mental", "counseling", "therapy", "social", "cognitive", "brain"]
        }
      ];
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw error;
    }
  }

  /**
   * Get program by ID
   * @param id The program ID
   * @returns The program or null if not found
   */
  private async getProgramById(id: string): Promise<Program | null> {
    try {
      const programs = await this.getAllPrograms();
      return programs.find(p => p.id === id) || null;
    } catch (error) {
      console.error(`Error fetching program with ID ${id}:`, error);
      throw error;
    }
  }
}

export interface Program {
  id: string;
  name: string;
  description: string;
  faculty: string;
  duration: string;
  minimumCGPA: number;
  requiredSubjects: string[];
  keywords: string[];
}

export interface DegreeRecommendation extends Program {
  matchScore: number;
}

export interface EligibilityResult {
  programId: string;
  programName: string;
  isEligible: boolean;
  eligibilityPercentage: number;
  meetsMinimumCGPA: boolean;
  hasRequiredSubjects: boolean;
  scholarshipEligibility: ScholarshipEligibility;
}

export interface ScholarshipEligibility {
  isEligible: boolean;
  scholarshipPercentage: number;
  scholarshipName: string | null;
} 