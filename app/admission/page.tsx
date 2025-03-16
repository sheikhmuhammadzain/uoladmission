import { Metadata } from 'next';
import AdmissionChatbot from '@/components/admission-chatbot';

export const metadata: Metadata = {
  title: 'Admission Application - University of Lahore',
  description: 'Apply for admission at the University of Lahore using our AI-powered chatbot',
};

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdmissionChatbot />
    </div>
  );
}