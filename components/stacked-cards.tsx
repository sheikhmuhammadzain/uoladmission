"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, FileText } from "lucide-react";

interface StackedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  className?: string;
  style?: React.CSSProperties;
}

function StackedCard({ icon, title, description, date, className, style }: StackedCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 rounded-xl border-2 bg-card shadow-md transition-all duration-300 hover:shadow-lg",
        className
      )}
      style={style}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="mb-3">{description}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
  );
}

export default function StackedCards() {
  const cards = [
    {
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      title: "Degree Programs",
      description: "Explore our diverse academic offerings",
      date: "Updated 2023",
      style: { transform: "rotate(-5deg)" }
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Admission Process",
      description: "Step-by-step application guide",
      date: "For 2024 intake",
      style: { transform: "rotate(0deg) translateY(10px)" }
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: "Scholarships",
      description: "Financial aid opportunities",
      date: "Apply now",
      style: { transform: "rotate(5deg) translateY(20px)" }
    },
  ];

  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <div className="relative w-[300px]">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="absolute top-0 left-0 w-full transition-all duration-300 hover:z-10"
            style={{ zIndex: index }}
          >
            <StackedCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
} 