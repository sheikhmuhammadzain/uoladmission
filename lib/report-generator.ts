import { AcademicData } from './ocr';
import { EligibilityResult, Program, ScholarshipEligibility } from './degree-recommendation';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Report generator for application forms and admission letters
 */
export class ReportGenerator {
  private static instance: ReportGenerator;

  private constructor() {}

  static getInstance(): ReportGenerator {
    if (!ReportGenerator.instance) {
      ReportGenerator.instance = new ReportGenerator();
    }
    return ReportGenerator.instance;
  }

  /**
   * Generate an application form PDF
   * @param studentInfo Student personal information
   * @param academicData Student academic data
   * @param programId Selected program ID
   * @returns PDF document as a Blob
   */
  async generateApplicationForm(
    studentInfo: StudentInfo,
    academicData: AcademicData,
    programId: string
  ): Promise<Blob> {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add university logo and header
    this.addHeader(doc, 'APPLICATION FORM');
    
    // Add application ID and date
    const applicationId = this.generateApplicationId();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.setFontSize(10);
    doc.text(`Application ID: ${applicationId}`, 20, 40);
    doc.text(`Date: ${currentDate}`, 20, 45);
    
    // Add student personal information section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL INFORMATION', 20, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const personalInfo = [
      ['Full Name', studentInfo.fullName],
      ['Email', studentInfo.email],
      ['Phone', studentInfo.phone],
      ['Address', studentInfo.address],
      ['Date of Birth', studentInfo.dateOfBirth],
      ['Gender', studentInfo.gender],
      ['Nationality', studentInfo.nationality]
    ];
    
    (doc as any).autoTable({
      startY: 60,
      head: [['Field', 'Information']],
      body: personalInfo,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Add academic information section
    const currentY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ACADEMIC INFORMATION', 20, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const academicInfo = [
      ['Institution', academicData.institutionName || 'N/A'],
      ['Qualification', academicData.qualificationName || 'N/A'],
      ['CGPA', academicData.cgpa?.toString() || 'N/A'],
      ['Graduation Date', academicData.graduationDate?.toLocaleDateString() || 'N/A']
    ];
    
    (doc as any).autoTable({
      startY: currentY + 5,
      head: [['Field', 'Information']],
      body: academicInfo,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Add subjects and grades if available
    if (academicData.subjects.length > 0) {
      const subjectsY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('SUBJECTS AND GRADES', 20, subjectsY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      const subjectsAndGrades = academicData.subjects.map(subject => [
        subject,
        academicData.grades[subject] || 'N/A'
      ]);
      
      (doc as any).autoTable({
        startY: subjectsY + 5,
        head: [['Subject', 'Grade']],
        body: subjectsAndGrades,
        theme: 'grid',
        headStyles: { fillColor: [0, 51, 102] }
      });
    }
    
    // Add program information
    const programY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PROGRAM SELECTION', 20, programY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const programInfo = [
      ['Program ID', programId],
      ['Intake', 'Fall 2025'],
      ['Study Mode', 'Full-time']
    ];
    
    (doc as any).autoTable({
      startY: programY + 5,
      head: [['Field', 'Information']],
      body: programInfo,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Add declaration and signature
    const declarationY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.text('DECLARATION', 20, declarationY);
    doc.setFontSize(9);
    const declaration = 'I hereby declare that the information provided in this application is true and correct to the best of my knowledge. I understand that any false or misleading information may result in the rejection of my application or termination of my enrollment.';
    const declarationLines = doc.splitTextToSize(declaration, 170);
    doc.text(declarationLines, 20, declarationY + 5);
    
    // Add signature fields
    const signatureY = declarationY + 20;
    doc.line(20, signatureY, 80, signatureY);
    doc.line(120, signatureY, 180, signatureY);
    doc.text('Applicant Signature', 20, signatureY + 5);
    doc.text('Date', 120, signatureY + 5);
    
    // Add footer
    this.addFooter(doc);
    
    // Return the PDF as a blob
    return doc.output('blob');
  }

  /**
   * Generate an admission letter PDF
   * @param studentInfo Student personal information
   * @param program Selected program
   * @param eligibility Eligibility result
   * @returns PDF document as a Blob
   */
  async generateAdmissionLetter(
    studentInfo: StudentInfo,
    program: Program,
    eligibility: EligibilityResult
  ): Promise<Blob> {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add university logo and header
    this.addHeader(doc, 'ADMISSION LETTER');
    
    // Add reference number and date
    const referenceNumber = this.generateReferenceNumber();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.setFontSize(10);
    doc.text(`Reference: ${referenceNumber}`, 20, 40);
    doc.text(`Date: ${currentDate}`, 20, 45);
    
    // Add salutation
    doc.setFontSize(11);
    doc.text(`Dear ${studentInfo.fullName},`, 20, 55);
    
    // Add congratulatory message
    doc.setFontSize(11);
    const congratsMessage = `We are pleased to inform you that you have been provisionally admitted to the ${program.name} program at the University of Lahore for the upcoming academic session.`;
    const congratsLines = doc.splitTextToSize(congratsMessage, 170);
    doc.text(congratsLines, 20, 65);
    
    // Add program details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Program Details:', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const programDetails = [
      ['Program', program.name],
      ['Faculty', program.faculty],
      ['Duration', program.duration],
      ['Starting Date', 'August 15, 2025']
    ];
    
    (doc as any).autoTable({
      startY: 85,
      body: programDetails,
      theme: 'plain',
      styles: { cellPadding: 1 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
    });
    
    // Add scholarship information if eligible
    const scholarshipY = (doc as any).lastAutoTable.finalY + 10;
    if (eligibility.scholarshipEligibility.isEligible) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Scholarship Award:', 20, scholarshipY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      const scholarshipDetails = [
        ['Scholarship', eligibility.scholarshipEligibility.scholarshipName || 'Merit Scholarship'],
        ['Tuition Waiver', `${eligibility.scholarshipEligibility.scholarshipPercentage}%`]
      ];
      
      (doc as any).autoTable({
        startY: scholarshipY + 5,
        body: scholarshipDetails,
        theme: 'plain',
        styles: { cellPadding: 1 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
      });
    }
    
    // Add conditions and requirements
    const conditionsY = eligibility.scholarshipEligibility.isEligible 
      ? (doc as any).lastAutoTable.finalY + 10 
      : scholarshipY;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Admission Requirements:', 20, conditionsY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const conditions = [
      'This admission is subject to verification of your original documents.',
      'You must visit the Admissions Office with your original documents within 14 days.',
      'You must pay the admission fee and first semester tuition by the specified deadline.',
      'You must attend the orientation program scheduled before the start of classes.'
    ];
    
    let currentConditionY = conditionsY + 5;
    conditions.forEach(condition => {
      doc.text('•', 20, currentConditionY);
      doc.text(condition, 25, currentConditionY);
      currentConditionY += 5;
    });
    
    // Add fee structure
    const feeY = currentConditionY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Fee Structure:', 20, feeY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const feeStructure = [
      ['Admission Fee', 'PKR 25,000 (one-time, non-refundable)'],
      ['Tuition Fee', 'PKR 150,000 per semester'],
      ['Security Deposit', 'PKR 10,000 (refundable)']
    ];
    
    (doc as any).autoTable({
      startY: feeY + 5,
      body: feeStructure,
      theme: 'plain',
      styles: { cellPadding: 1 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
    });
    
    // Add payment deadline
    const paymentY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Deadline: July 15, 2025', 20, paymentY);
    doc.setFont('helvetica', 'normal');
    
    // Add closing
    const closingY = paymentY + 15;
    doc.setFontSize(10);
    const closingMessage = 'We look forward to welcoming you to our university. If you have any questions, please contact the Admissions Office at admissions@uol.edu.pk or call +92-42-111-865-865.';
    const closingLines = doc.splitTextToSize(closingMessage, 170);
    doc.text(closingLines, 20, closingY);
    
    // Add signature
    const signatureY = closingY + 20;
    doc.text('Sincerely,', 20, signatureY);
    doc.text('Dr. Amir Khan', 20, signatureY + 10);
    doc.text('Director of Admissions', 20, signatureY + 15);
    doc.text('University of Lahore', 20, signatureY + 20);
    
    // Add footer
    this.addFooter(doc);
    
    // Return the PDF as a blob
    return doc.output('blob');
  }

  /**
   * Generate an eligibility report PDF
   * @param studentInfo Student personal information
   * @param academicData Student academic data
   * @param eligibility Eligibility result
   * @returns PDF document as a Blob
   */
  async generateEligibilityReport(
    studentInfo: StudentInfo,
    academicData: AcademicData,
    eligibility: EligibilityResult
  ): Promise<Blob> {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add university logo and header
    this.addHeader(doc, 'ELIGIBILITY ASSESSMENT REPORT');
    
    // Add report ID and date
    const reportId = this.generateReportId();
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.setFontSize(10);
    doc.text(`Report ID: ${reportId}`, 20, 40);
    doc.text(`Date: ${currentDate}`, 20, 45);
    
    // Add student information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT INFORMATION', 20, 55);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const studentInfoTable = [
      ['Name', studentInfo.fullName],
      ['Email', studentInfo.email],
      ['Previous Institution', academicData.institutionName || 'N/A'],
      ['Previous Qualification', academicData.qualificationName || 'N/A'],
      ['CGPA', academicData.cgpa?.toString() || 'N/A']
    ];
    
    (doc as any).autoTable({
      startY: 60,
      head: [['Field', 'Information']],
      body: studentInfoTable,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Add program information
    const programY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('PROGRAM INFORMATION', 20, programY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const programInfoTable = [
      ['Program', eligibility.programName],
      ['Minimum CGPA Required', eligibility.meetsMinimumCGPA ? '✓ Met' : '✗ Not Met'],
      ['Required Subjects', eligibility.hasRequiredSubjects ? '✓ Met' : '✗ Not Met']
    ];
    
    (doc as any).autoTable({
      startY: programY + 5,
      head: [['Requirement', 'Status']],
      body: programInfoTable,
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Add eligibility summary
    const summaryY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ELIGIBILITY SUMMARY', 20, summaryY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Create a colored box for eligibility status
    const statusColor = eligibility.isEligible ? [0, 128, 0] : [220, 53, 69]; // Green or Red
    doc.setFillColor(...statusColor);
    doc.rect(20, summaryY + 5, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text(
      eligibility.isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE',
      105, summaryY + 11,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
    
    // Add eligibility percentage
    doc.setFontSize(10);
    doc.text(`Eligibility Percentage: ${Math.round(eligibility.eligibilityPercentage)}%`, 20, summaryY + 20);
    
    // Add scholarship information
    const scholarshipY = summaryY + 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SCHOLARSHIP ELIGIBILITY', 20, scholarshipY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const scholarshipColor = eligibility.scholarshipEligibility.isEligible ? [0, 128, 0] : [220, 53, 69];
    doc.setFillColor(...scholarshipColor);
    doc.rect(20, scholarshipY + 5, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text(
      eligibility.scholarshipEligibility.isEligible 
        ? `ELIGIBLE FOR ${eligibility.scholarshipEligibility.scholarshipName}` 
        : 'NOT ELIGIBLE FOR SCHOLARSHIP',
      105, scholarshipY + 11,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
    
    // Add scholarship details if eligible
    if (eligibility.scholarshipEligibility.isEligible) {
      doc.setFontSize(10);
      doc.text(`Scholarship Percentage: ${eligibility.scholarshipEligibility.scholarshipPercentage}% tuition waiver`, 20, scholarshipY + 20);
    }
    
    // Add recommendations
    const recommendationsY = eligibility.scholarshipEligibility.isEligible 
      ? scholarshipY + 30 
      : scholarshipY + 20;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('RECOMMENDATIONS', 20, recommendationsY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    let recommendations: string[] = [];
    
    if (eligibility.isEligible) {
      recommendations.push('You are eligible for admission to this program.');
      recommendations.push('Please proceed with the application process.');
      
      if (eligibility.scholarshipEligibility.isEligible) {
        recommendations.push(`You qualify for the ${eligibility.scholarshipEligibility.scholarshipName} with a ${eligibility.scholarshipEligibility.scholarshipPercentage}% tuition waiver.`);
      }
    } else {
      recommendations.push('You do not meet all requirements for this program.');
      
      if (!eligibility.meetsMinimumCGPA) {
        recommendations.push('Your CGPA does not meet the minimum requirement for this program.');
      }
      
      if (!eligibility.hasRequiredSubjects) {
        recommendations.push('You are missing some required subjects for this program.');
      }
      
      recommendations.push('Consider applying to programs with lower entry requirements or improving your qualifications.');
    }
    
    let currentRecommendationY = recommendationsY + 5;
    recommendations.forEach(recommendation => {
      doc.text('•', 20, currentRecommendationY);
      const recLines = doc.splitTextToSize(recommendation, 165);
      doc.text(recLines, 25, currentRecommendationY);
      currentRecommendationY += (recLines.length * 5) + 2;
    });
    
    // Add footer
    this.addFooter(doc);
    
    // Return the PDF as a blob
    return doc.output('blob');
  }

  /**
   * Add header to PDF document
   * @param doc PDF document
   * @param title Document title
   */
  private addHeader(doc: jsPDF, title: string): void {
    // Add university logo (placeholder)
    doc.setFillColor(0, 51, 102); // University blue
    doc.rect(0, 0, 210, 25, 'F');
    
    // Add university name and title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('UNIVERSITY OF LAHORE', 105, 10, { align: 'center' });
    doc.setFontSize(14);
    doc.text(title, 105, 18, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
  }

  /**
   * Add footer to PDF document
   * @param doc PDF document
   */
  private addFooter(doc: jsPDF): void {
    const pageCount = doc.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Add footer line
      const footerY = 285;
      doc.setDrawColor(0, 51, 102);
      doc.line(20, footerY, 190, footerY);
      
      // Add contact information
      doc.setFontSize(8);
      doc.text('University of Lahore, 1-KM Defence Road, Lahore, Pakistan', 105, footerY + 5, { align: 'center' });
      doc.text('Phone: +92-42-111-865-865 | Email: admissions@uol.edu.pk | Website: www.uol.edu.pk', 105, footerY + 10, { align: 'center' });
      
      // Add page number
      doc.text(`Page ${i} of ${pageCount}`, 105, footerY + 15, { align: 'center' });
    }
  }

  /**
   * Generate a unique application ID
   * @returns Application ID
   */
  private generateApplicationId(): string {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `UOL-APP-${year}-${random}`;
  }

  /**
   * Generate a unique reference number
   * @returns Reference number
   */
  private generateReferenceNumber(): string {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `UOL-ADM-${year}-${random}`;
  }

  /**
   * Generate a unique report ID
   * @returns Report ID
   */
  private generateReportId(): string {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `UOL-REP-${year}-${random}`;
  }
}

export interface StudentInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
} 