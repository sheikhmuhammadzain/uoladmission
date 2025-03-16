"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdvancedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  className?: string;
}

function AdvancedCard({ icon, title, description, date, className }: AdvancedCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <Badge variant="outline">{date}</Badge>
      </CardFooter>
    </Card>
  );
}

export default function AdvancedCards() {
  const cards = [
    {
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      title: "Degree Programs",
      description: "Explore our diverse academic offerings with programs designed to prepare you for success in your chosen field.",
      date: "Updated 2023",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Admission Process",
      description: "Our step-by-step application guide makes it easy to apply to the University of Lahore.",
      date: "For 2024 intake",
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Scholarships",
      description: "Discover financial aid opportunities to help fund your education at the University of Lahore.",
      date: "Apply now",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <AdvancedCard key={index} {...card} />
      ))}
    </div>
  );
} 