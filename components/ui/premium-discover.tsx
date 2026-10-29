"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Building, Users, Award, GraduationCap, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

const tabs: Tab[] = [
  {
    value: "programs",
    icon: <BookOpen className="h-4 w-4" />,
    label: "Academic Programs",
    content: {
      badge: "100+ Programs",
      title: "Discover Your Academic Path",
      description:
        "The University of Lahore offers a diverse range of undergraduate, graduate, and professional programs across 9 faculties. Our curriculum is designed to provide both theoretical knowledge and practical skills, preparing you for success in your chosen field.",
      buttonText: "Explore Programs",
      buttonLink: "/programs",
      imageSrc: "/academics.jpg",
      imageAlt: "University of Lahore Academic Programs",
    },
  },
  {
    value: "facilities",
    icon: <Building className="h-4 w-4" />,
    label: "Campus Facilities",
    content: {
      badge: "State-of-the-Art",
      title: "World-Class Campus Facilities",
      description:
        "Our campus features modern classrooms, advanced laboratories, a comprehensive library, sports facilities, and comfortable accommodation. We provide everything you need for a productive and enjoyable university experience in a safe and stimulating environment.",
      buttonText: "View Facilities",
      buttonLink: "/campus/facilities",
      imageSrc: "/facilities.jpg",
      imageAlt: "University of Lahore Campus Facilities",
    },
  },
  {
    value: "student-life",
    icon: <Users className="h-4 w-4" />,
    label: "Student Life",
    content: {
      badge: "Vibrant Community",
      title: "Experience Rich Student Life",
      description:
        "At UOL, student life extends beyond academics. Join student societies, participate in cultural events, sports competitions, and community service. Develop leadership skills, make lifelong friendships, and create memories that will last a lifetime.",
      buttonText: "Student Activities",
      buttonLink: "/campus/student-life",
      imageSrc: "/student-life.jpg",
      imageAlt: "University of Lahore Student Life",
    },
  },
];

export function PremiumDiscover() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#28783B]/5 to-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#28783B]/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline" className="bg-[#28783B]/10 text-[#28783B] border-[#28783B]/20">Discover UOL</Badge>
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-black to-[#28783B]">
            Discover Why Thousands Choose the University of Lahore
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore what makes UOL a leading institution for higher education in Pakistan
          </p>
        </div>

        <Tabs defaultValue={tabs[0].value} className="w-full">
          <TabsList className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-8 mb-12 w-full bg-transparent h-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-[#28783B] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mx-auto rounded-2xl bg-background shadow-lg border border-[#28783B]/10">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-8 lg:grid-cols-2 p-6 lg:p-12"
              >
                <div className="flex flex-col gap-5 order-2 lg:order-1">
                  <Badge variant="outline" className="w-fit bg-[#28783B]/10 text-[#28783B] border-[#28783B]/20">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-2xl font-semibold lg:text-3xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2 bg-[#28783B] hover:bg-[#28783B]/90" size="lg" asChild>
                    <Link href={tab.content.buttonLink}>
                      {tab.content.buttonText}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="order-1 lg:order-2 w-full">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="rounded-xl w-full h-auto object-cover aspect-video shadow-md border border-[#28783B]/10"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl p-8 shadow-lg border border-[#28783B]/10 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-16 h-16 rounded-full bg-[#28783B]/10 flex items-center justify-center mb-6">
              <GraduationCap className="h-8 w-8 text-[#28783B]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Academic Excellence</h3>
            <p className="text-muted-foreground">
              Internationally recognized programs taught by distinguished faculty members
            </p>
            <ul className="mt-4 space-y-2 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#28783B] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">HEC recognized degrees</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#28783B] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Industry-aligned curriculum</span>
              </li>
            </ul>
          </div>

          <div className="bg-background rounded-xl p-8 shadow-lg border border-[#28783B]/10 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-16 h-16 rounded-full bg-[#28783B]/10 flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-[#28783B]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Research Opportunities</h3>
            <p className="text-muted-foreground">
              Engage in cutting-edge research with modern facilities and expert guidance
            </p>
            <ul className="mt-4 space-y-2 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#28783B] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">State-of-the-art laboratories</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#28783B] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Research publication support</span>
              </li>
            </ul>
          </div>

          <div className="bg-background rounded-xl p-8 shadow-lg border border-[#28783B]/10 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="w-16 h-16 rounded-full bg-[#28783B]/10 flex items-center justify-center mb-6">
              <Globe className="h-8 w-8 text-[#28783B]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Global Perspective</h3>
            <p className="text-muted-foreground">
              International partnerships and exchange programs with universities worldwide
            </p>
            <ul className="mt-4 space-y-2 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#28783B] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">International faculty members</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#28783B] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Global exchange opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 