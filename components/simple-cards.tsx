"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, FileText } from "lucide-react";

interface SimpleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function SimpleCard({ icon, title, description, className }: SimpleCardProps) {
  return (
    <div className={cn("p-6 bg-card rounded-lg shadow-md", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function SimpleCards() {
  const cards = [
    {
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      title: "Degree Programs",
      description: "Explore our diverse academic offerings",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Admission Process",
      description: "Step-by-step application guide",
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Scholarships",
      description: "Financial aid opportunities",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <SimpleCard key={index} {...card} />
      ))}
    </div>
  );
} 