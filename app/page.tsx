import { PremiumHeader } from "@/components/ui/premium-header";
import { PremiumHero } from "@/components/ui/premium-hero";
import { PremiumDiscover } from "@/components/ui/premium-discover";
import { PremiumFooter } from "@/components/ui/premium-footer";
import AdmissionChatbot from "@/components/admission-chatbot";
import { AdmissionsAnalysis } from "@/components/ui/admissions-analysis";
import { FacultiesShowcase } from "@/components/ui/faculties-showcase";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <PremiumHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <PremiumHero />
        
        {/* Discover Section */}
        <PremiumDiscover />
        
        {/* Faculties Showcase Section */}
        <FacultiesShowcase />
        
        {/* Admissions Analysis Section */}
        <AdmissionsAnalysis />
        
        {/* Chatbot Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Have Questions About Admissions?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered admission assistant is here to help you with any questions about programs, requirements, deadlines, and more
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <AdmissionChatbot />
            </div>
          </div>
        </section>
      </main>
      
      <PremiumFooter />
    </div>
  );
}