"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap, BookOpen, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion";

export function PremiumHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#28783B]/10 via-background to-background py-24 lg:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#28783B]/5 blur-3xl" />
        <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] rounded-full bg-[#28783B]/5 blur-3xl" />
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col max-w-xl">
            <Badge variant="outline" className="mb-6 w-fit bg-[#28783B]/10 text-[#28783B] border-[#28783B]/20">
              Admissions Open 2024-25
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-[#28783B]">
              Your Future Begins at the University of Lahore
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join a community of innovators, leaders, and changemakers. The University of Lahore offers world-class education with state-of-the-art facilities and a diverse range of programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-[#28783B] hover:bg-[#28783B]/90" asChild>
                <Link href="/signup" className="flex items-center gap-2">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#28783B] text-[#28783B] hover:bg-[#28783B]/10" asChild>
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#28783B]/10 text-[#28783B]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">100+</p>
                  <p className="text-sm text-muted-foreground">Degree Programs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#28783B]/10 text-[#28783B]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">9</p>
                  <p className="text-sm text-muted-foreground">Faculties</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#28783B]/10 text-[#28783B]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">30,000+</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#28783B]/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src="/campus.jpg" 
                alt="University of Lahore Campus" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-white font-medium text-lg">Main Campus</p>
                <p className="text-white/80 text-sm">1-KM Defence Road, Lahore</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 max-w-[250px] border border-[#28783B]/10">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#28783B] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Application Deadline</p>
                  <p className="text-[#28783B] font-bold text-lg">August 15, 2024</p>
                  <p className="text-xs text-muted-foreground mt-1">Fall Semester</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 max-w-[200px] border border-[#28783B]/10 hidden md:block">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#28783B] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Accredited Programs</p>
                  <p className="text-[#28783B] font-bold text-lg">HEC Recognized</p>
                  <p className="text-xs text-muted-foreground mt-1">Quality Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 