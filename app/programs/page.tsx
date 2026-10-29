import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, Users, Clock, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Programs - University of Lahore',
  description: 'Explore undergraduate and graduate programs at the University of Lahore',
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">University of Lahore</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
            <Link href="/programs" className="text-sm font-medium hover:underline underline">Programs</Link>
            <Link href="/about" className="text-sm font-medium hover:underline">About</Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/admission">
              <Button>Apply Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Academic Programs</h1>
            <p className="text-xl text-muted-foreground">
              Discover our diverse range of undergraduate and graduate programs designed to prepare you for success.
            </p>
          </div>

          <Tabs defaultValue="undergraduate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="undergraduate">Undergraduate Programs</TabsTrigger>
              <TabsTrigger value="graduate">Graduate Programs</TabsTrigger>
            </TabsList>
            
            {/* Undergraduate Programs */}
            <TabsContent value="undergraduate" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Faculty of Computer Science & Information Technology</CardTitle>
                    <CardDescription>
                      Cutting-edge programs in computing, software development, and information systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ProgramItem 
                        title="Bachelor of Computer Science"
                        description="A comprehensive program covering programming, algorithms, data structures, and software engineering."
                        duration="4 years"
                        intake="Fall & Spring"
                        seats={120}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Software Engineering"
                        description="Focus on software development methodologies, project management, and quality assurance."
                        duration="4 years"
                        intake="Fall"
                        seats={80}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Information Technology"
                        description="Study IT infrastructure, systems administration, and business technology integration."
                        duration="4 years"
                        intake="Fall & Spring"
                        seats={100}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Artificial Intelligence"
                        description="Specialized program in AI algorithms, machine learning, and intelligent systems."
                        duration="4 years"
                        intake="Fall"
                        seats={60}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Faculty of Business & Management Sciences</CardTitle>
                    <CardDescription>
                      Programs designed to develop future business leaders and entrepreneurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ProgramItem 
                        title="Bachelor of Business Administration"
                        description="Develop skills in management, marketing, finance, and entrepreneurship."
                        duration="4 years"
                        intake="Fall & Spring"
                        seats={150}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Commerce"
                        description="Focus on accounting, finance, and business economics."
                        duration="4 years"
                        intake="Fall"
                        seats={100}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Economics"
                        description="Study economic theory, policy, and analysis."
                        duration="4 years"
                        intake="Fall"
                        seats={80}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Faculty of Engineering & Technology</CardTitle>
                    <CardDescription>
                      Programs that prepare students for careers in various engineering disciplines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ProgramItem 
                        title="Bachelor of Electrical Engineering"
                        description="Study power systems, electronics, control systems, and telecommunications."
                        duration="4 years"
                        intake="Fall"
                        seats={100}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Mechanical Engineering"
                        description="Focus on design, manufacturing, and thermal systems."
                        duration="4 years"
                        intake="Fall"
                        seats={100}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Civil Engineering"
                        description="Study structural design, construction management, and environmental engineering."
                        duration="4 years"
                        intake="Fall"
                        seats={100}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Faculty of Medicine & Health Sciences</CardTitle>
                    <CardDescription>
                      Programs for future healthcare professionals and medical practitioners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ProgramItem 
                        title="Bachelor of Medicine and Surgery (MBBS)"
                        description="Become a medical doctor through this comprehensive medical program."
                        duration="5 years"
                        intake="Fall"
                        seats={100}
                      />
                      
                      <ProgramItem 
                        title="Doctor of Pharmacy (Pharm.D)"
                        description="Study pharmaceutical sciences and clinical pharmacy practice."
                        duration="5 years"
                        intake="Fall"
                        seats={80}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Dental Surgery (BDS)"
                        description="Comprehensive program in dental medicine and surgery."
                        duration="4 years"
                        intake="Fall"
                        seats={60}
                      />
                      
                      <ProgramItem 
                        title="Bachelor of Science in Nursing"
                        description="Develop skills in patient care, health assessment, and nursing practice."
                        duration="4 years"
                        intake="Fall & Spring"
                        seats={100}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Graduate Programs */}
            <TabsContent value="graduate" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Master's Programs</CardTitle>
                    <CardDescription>
                      Advanced degree programs for specialized knowledge and career advancement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ProgramItem 
                        title="Master of Computer Science"
                        description="Advanced study in algorithms, artificial intelligence, and software engineering."
                        duration="2 years"
                        intake="Fall & Spring"
                        seats={60}
                      />
                      
                      <ProgramItem 
                        title="Master of Business Administration (MBA)"
                        description="Develop advanced management skills and business acumen."
                        duration="2 years"
                        intake="Fall & Spring"
                        seats={100}
                      />
                      
                      <ProgramItem 
                        title="Master of Public Health"
                        description="Study epidemiology, health policy, and public health management."
                        duration="2 years"
                        intake="Fall"
                        seats={50}
                      />
                      
                      <ProgramItem 
                        title="Master of Electrical Engineering"
                        description="Advanced study in power systems, telecommunications, and control systems."
                        duration="2 years"
                        intake="Fall"
                        seats={40}
                      />
                      
                      <ProgramItem 
                        title="Master of Clinical Psychology"
                        description="Develop skills in psychological assessment, therapy, and research."
                        duration="2 years"
                        intake="Fall"
                        seats={30}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Doctoral Programs</CardTitle>
                    <CardDescription>
                      Research-focused programs for those pursuing academic or research careers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ProgramItem 
                        title="PhD in Computer Science"
                        description="Conduct original research in computing, algorithms, or artificial intelligence."
                        duration="3-5 years"
                        intake="Fall"
                        seats={20}
                      />
                      
                      <ProgramItem 
                        title="PhD in Business Administration"
                        description="Research in management, finance, marketing, or organizational behavior."
                        duration="3-5 years"
                        intake="Fall"
                        seats={15}
                      />
                      
                      <ProgramItem 
                        title="PhD in Electrical Engineering"
                        description="Advanced research in power systems, telecommunications, or control systems."
                        duration="3-5 years"
                        intake="Fall"
                        seats={15}
                      />
                      
                      <ProgramItem 
                        title="PhD in Medical Sciences"
                        description="Research in biomedical sciences, public health, or clinical medicine."
                        duration="3-5 years"
                        intake="Fall"
                        seats={10}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to take the next step in your academic journey? Apply now and let our AI admission assistant guide you through the process.
            </p>
            <Link href="/admission">
              <Button size="lg">
                Start Your Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="font-bold">University of Lahore</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering students through quality education and innovation since 1999.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
                <li><Link href="/programs" className="text-sm hover:underline">Programs</Link></li>
                <li><Link href="/admission" className="text-sm hover:underline">Admission</Link></li>
                <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1-KM Defence Road, Lahore, Pakistan</li>
                <li>info@uol.edu.pk</li>
                <li>+92-42-111-865-865</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} University of Lahore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Program Item Component
function ProgramItem({ 
  title, 
  description, 
  duration, 
  intake, 
  seats 
}: { 
  title: string; 
  description: string; 
  duration: string; 
  intake: string; 
  seats: number;
}) {
  return (
    <div className="border rounded-lg p-4 hover:border-primary transition-colors">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{intake}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{seats} seats</span>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/admission">
          <Button variant="outline" size="sm" className="w-full">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}