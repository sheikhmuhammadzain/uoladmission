"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Globe, 
  Award, 
  Building, 
  MapPin, 
  DollarSign,
  Users,
  Briefcase,
  BookMarked,
  School,
  ArrowRight
} from "lucide-react";

export function AdmissionsAnalysis() {
  return (
    <div className="w-full py-24 lg:py-32 bg-gradient-to-br from-background to-[#28783B]/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#28783B]/5 blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-2 bg-[#28783B]/10 text-[#28783B] border-[#28783B]/20">Comprehensive Analysis</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-black to-[#28783B]">
            University of Lahore Admissions System
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A detailed overview of UOL's admissions structure, programs, and recommendations
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-4 mb-8 bg-transparent h-auto">
            <TabsTrigger 
              value="contact" 
              className="data-[state=active]:bg-[#28783B] data-[state=active]:text-white rounded-full px-4 py-2 transition-all duration-200"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact Points
            </TabsTrigger>
            <TabsTrigger 
              value="programs" 
              className="data-[state=active]:bg-[#28783B] data-[state=active]:text-white rounded-full px-4 py-2 transition-all duration-200"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Programs
            </TabsTrigger>
            <TabsTrigger 
              value="fees" 
              className="data-[state=active]:bg-[#28783B] data-[state=active]:text-white rounded-full px-4 py-2 transition-all duration-200"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Fee Structure
            </TabsTrigger>
            <TabsTrigger 
              value="location" 
              className="data-[state=active]:bg-[#28783B] data-[state=active]:text-white rounded-full px-4 py-2 transition-all duration-200"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Campus Location
            </TabsTrigger>
            <TabsTrigger 
              value="grading" 
              className="data-[state=active]:bg-[#28783B] data-[state=active]:text-white rounded-full px-4 py-2 transition-all duration-200"
            >
              <Award className="mr-2 h-4 w-4" />
              Grading System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            <Card className="border border-[#28783B]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#28783B]">Contact Information</CardTitle>
                <CardDescription>
                  Multiple channels for admissions inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <Phone className="h-8 w-8 text-[#28783B] mb-2" />
                    <h3 className="text-lg font-medium">Universal Access Number</h3>
                    <p className="text-muted-foreground">042 111 865 865</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <Phone className="h-8 w-8 text-[#28783B] mb-2" />
                    <h3 className="text-lg font-medium">WhatsApp</h3>
                    <p className="text-muted-foreground">0325 1865865</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <Mail className="h-8 w-8 text-[#28783B] mb-2" />
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-muted-foreground">admissions@uol.edu.pk</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  These multiple contact options demonstrate UOL's commitment to accessibility and convenience for prospective students, 
                  allowing them to choose their preferred communication method.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="space-y-4">
            <Card className="border border-[#28783B]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#28783B]">Educational Programs and Offerings</CardTitle>
                <CardDescription>
                  Comprehensive range of educational programs across various academic levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="h-5 w-5 text-[#28783B] mr-2" />
                      <h3 className="text-lg font-medium">Undergraduate Studies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Multiple undergraduate programs serving as the primary entry point for most students
                    </p>
                  </div>
                  <div className="flex flex-col p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <div className="flex items-center mb-2">
                      <BookMarked className="h-5 w-5 text-[#28783B] mr-2" />
                      <h3 className="text-lg font-medium">Postgraduate Studies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Advanced education requiring completion of an undergraduate degree
                    </p>
                  </div>
                  <div className="flex flex-col p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-[#28783B] mr-2" />
                      <h3 className="text-lg font-medium">Research Opportunities</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Specialized research-focused programs for interested students
                    </p>
                  </div>
                  <div className="flex flex-col p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <div className="flex items-center mb-2">
                      <School className="h-5 w-5 text-[#28783B] mr-2" />
                      <h3 className="text-lg font-medium">Doctoral Studies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Highest tier of academic achievement involving original research contributions
                    </p>
                  </div>
                  <div className="flex flex-col p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-[#28783B] mr-2" />
                      <h3 className="text-lg font-medium">International Student Programs</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dedicated pathways and support systems for non-Pakistani students
                    </p>
                  </div>
                  <div className="flex flex-col p-4 bg-background rounded-lg border border-[#28783B]/10 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-[#28783B] mr-2" />
                      <h3 className="text-lg font-medium">Program Accreditation</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Highest available standard form of accreditations for all programs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            <Card className="border border-[#28783B]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#28783B]">Fee Structure for Computer Science Program</CardTitle>
                <CardDescription>
                  Comparative analysis of program costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#28783B]/5">
                        <th className="border border-[#28783B]/10 px-4 py-2 text-left">University</th>
                        <th className="border border-[#28783B]/10 px-4 py-2 text-right">Total Fee (PKR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-[#28783B]/10 px-4 py-2 font-medium">University of Lahore (UOL)</td>
                        <td className="border border-[#28783B]/10 px-4 py-2 text-right">13,51,000</td>
                      </tr>
                      <tr className="bg-[#28783B]/5">
                        <td className="border border-[#28783B]/10 px-4 py-2 font-medium">University of Management & Technology (UMT)</td>
                        <td className="border border-[#28783B]/10 px-4 py-2 text-right">16,90,000</td>
                      </tr>
                      <tr>
                        <td className="border border-[#28783B]/10 px-4 py-2 font-medium">University of Central Punjab (UCP)</td>
                        <td className="border border-[#28783B]/10 px-4 py-2 text-right">16,21,000</td>
                      </tr>
                      <tr className="bg-[#28783B]/5">
                        <td className="border border-[#28783B]/10 px-4 py-2 font-medium">Superior University</td>
                        <td className="border border-[#28783B]/10 px-4 py-2 text-right">13,37,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  UOL's BSCS program is more affordable compared to some other private universities in Lahore, 
                  such as UMT and UCP, but similar to Superior University. Data from 2022.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <Card className="border border-[#28783B]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#28783B]">Campus Location Considerations</CardTitle>
                <CardDescription>
                  Geographic factors for prospective students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="aspect-video bg-[#28783B]/5 rounded-lg overflow-hidden relative border border-[#28783B]/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-12 w-12 text-[#28783B]/50" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                        <h3 className="font-medium text-lg">UOL Main Campus</h3>
                        <p className="text-sm">1-KM Defence Road, Lahore</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-medium mb-2">Commuting Distance</h3>
                    <p className="text-muted-foreground mb-4">
                      The UOL campus location on Defense Road may be a significant commuting distance for students 
                      living in certain parts of the city. For instance, students living near the Walled City might 
                      face a daily commute of approximately 30-35 km.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This geographic factor is an important consideration for prospective students when making their university choice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grading" className="space-y-4">
            <Card className="border border-[#28783B]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#28783B]">Grading System and Academic Structure</CardTitle>
                <CardDescription>
                  Standard academic framework at UOL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Grading Scale</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#28783B]/5">
                            <th className="border border-[#28783B]/10 px-4 py-2">Grade</th>
                            <th className="border border-[#28783B]/10 px-4 py-2">GPA Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-[#28783B]/10 px-4 py-2 font-medium">A</td>
                            <td className="border border-[#28783B]/10 px-4 py-2">4.00</td>
                          </tr>
                          <tr className="bg-[#28783B]/5">
                            <td className="border border-[#28783B]/10 px-4 py-2 font-medium">B</td>
                            <td className="border border-[#28783B]/10 px-4 py-2">3.00</td>
                          </tr>
                          <tr>
                            <td className="border border-[#28783B]/10 px-4 py-2 font-medium">C</td>
                            <td className="border border-[#28783B]/10 px-4 py-2">2.00</td>
                          </tr>
                          <tr className="bg-[#28783B]/5">
                            <td className="border border-[#28783B]/10 px-4 py-2 font-medium">D</td>
                            <td className="border border-[#28783B]/10 px-4 py-2">1.00</td>
                          </tr>
                          <tr>
                            <td className="border border-[#28783B]/10 px-4 py-2 font-medium">F</td>
                            <td className="border border-[#28783B]/10 px-4 py-2">0.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Academic Structure</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-[#28783B]"></div>
                        <span className="text-muted-foreground">Two regular semesters per academic year</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-[#28783B]"></div>
                        <span className="text-muted-foreground">Summer sessions for retaking or improving grades</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-[#28783B]"></div>
                        <span className="text-muted-foreground">Course assessments include quizzes, assignments, class participation, projects, midterms, and finals</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-[#28783B]"></div>
                        <span className="text-muted-foreground">Summer sessions allow for retaking up to two subjects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Join the University of Lahore?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Take the next step in your academic journey and apply to one of our diverse programs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#28783B] hover:bg-[#28783B]/90" asChild>
              <Link href="/signup" className="flex items-center gap-2">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-[#28783B] text-[#28783B] hover:bg-[#28783B]/10" asChild>
              <Link href="https://uol.edu.pk/wp-content/uploads/2024/12/Prospectus-2025.pdf" target="_blank">
                Download Prospectus
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 