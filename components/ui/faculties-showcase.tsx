"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";

// Faculty data from the provided information
const faculties = [
  {
    id: "allied-health",
    name: "Faculty of Allied Health Sciences",
    description: "Offering programs in healthcare, rehabilitation, and medical support services",
    departments: [
      "Radiological Sciences & Medical Imaging Technology",
      "University Institute of Physical Therapy",
      "Department of Sports Sciences and Physical Education",
      "University Institute of Diet & Nutritional Sciences",
      "University Institute of Food Science & Technology",
      "University Institute of Medical Lab Technology",
      "University Institute of Public Health",
      "Department of Health Professional Technologies",
      "Department of Optometry & Vision Sciences",
      "Department of Emerging Allied Health Technologies",
      "Department of Rehabilitation Sciences",
      "Lahore School of Nursing"
    ]
  },
  {
    id: "engineering",
    name: "Faculty of Engineering & Technology",
    description: "Providing education in various engineering disciplines and technological fields",
    departments: [
      "Department of Electrical Engineering",
      "Department of Mechanical Engineering",
      "Department of Civil Engineering",
      "Department of Computer Engineering",
      "Department of Technology",
      "Department of Electronics and Electrical Systems"
    ]
  },
  {
    id: "sciences",
    name: "Faculty of Sciences",
    description: "Focusing on fundamental and applied sciences research and education",
    departments: [
      "Department of Physics",
      "Department of Chemistry",
      "Department of Mathematics and Statistics",
      "Department of Environmental Sciences",
      "Institute of Molecular Biology & Biotechnology",
      "School of Pain and Regenerative Medicine"
    ]
  },
  {
    id: "social-sciences",
    name: "Faculty of Social Sciences",
    description: "Exploring human behavior, society, and cultural studies",
    departments: [
      "Department of Islamic Studies",
      "School of Integrated Social Sciences",
      "Lahore School of Behavioural Sciences",
      "Department of Education"
    ]
  },
  {
    id: "management",
    name: "Faculty of Management Sciences",
    description: "Developing business leaders and management professionals",
    departments: [
      "Lahore Business School",
      "Lahore School of Aviation",
      "School of Accountancy & Finance",
      "Department of Economics"
    ]
  },
  {
    id: "arts",
    name: "Faculty of Arts & Architecture",
    description: "Nurturing creativity and design excellence",
    departments: [
      "School of Architecture",
      "School of Creative Arts"
    ]
  },
  {
    id: "law",
    name: "Faculty of Law",
    description: "Providing comprehensive legal education",
    departments: [
      "College of Law",
      "Postgraduate Institute of Law"
    ]
  },
  {
    id: "languages",
    name: "Faculty of Languages & Literature",
    description: "Exploring linguistic and literary studies",
    departments: [
      "Department of English Language & Literature",
      "Department of Urdu Literature"
    ]
  },
  {
    id: "it",
    name: "Faculty of Information Technology",
    description: "Advancing computing and digital technology education",
    departments: [
      "Department of Computer Science & Information Technology",
      "Department of Software Engineering",
      "Department of Intelligent Systems"
    ]
  },
  {
    id: "pharmacy",
    name: "Faculty of Pharmacy",
    description: "Specializing in pharmaceutical sciences and research",
    departments: [
      "Department of Pharmacy",
      "Lahore School of Pharmaceutical Sciences",
      "Lahore School of Clinical Pharmacy",
      "Lahore School of Phyto-Medical Sciences",
      "Lahore School of Pharmacology and Basic Medical Sciences"
    ]
  },
  {
    id: "medicine",
    name: "Faculty of Medicine & Dentistry",
    description: "Training future healthcare professionals in medicine and dentistry",
    departments: [
      "College of Medicine & Dentistry",
      "CHPL"
    ]
  }
];

export function FacultiesShowcase() {
  const [selectedFaculty, setSelectedFaculty] = useState(faculties[0]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <Badge variant="outline" className="mb-2">Academic Excellence</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Faculties & Departments
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our diverse academic offerings across 11 faculties and numerous specialized departments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Our Faculties</h3>
              <div className="space-y-2">
                {faculties.map((faculty) => (
                  <Button
                    key={faculty.id}
                    variant={selectedFaculty.id === faculty.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    <span className="truncate">{faculty.name}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{selectedFaculty.name}</CardTitle>
                <CardDescription>{selectedFaculty.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-4">Departments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedFaculty.departments.map((department, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <p className="font-medium">{department}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link href={`https://uol.edu.pk/faculties-dept/faculty-of-${selectedFaculty.id}`} target="_blank">
                      Visit Faculty Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            The University of Lahore offers a comprehensive range of academic programs across these faculties, 
            providing students with diverse educational opportunities and career pathways.
          </p>
          <Button asChild>
            <Link href="/programs">Explore All Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 