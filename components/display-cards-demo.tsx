"use client";

import React from "react";
import DisplayCards from "@/components/ui/display-cards";
import { BookOpen, GraduationCap, FileText } from "lucide-react";

const admissionCards = [
  {
    icon: <GraduationCap className="size-4 text-green-300" />,
    title: "Degree Programs",
    description: "Explore our diverse academic offerings",
    date: "Updated 2023",
    iconClassName: "text-green-500",
    titleClassName: "text-green-500",
    className: "transform -rotate-6",
  },
  {
    icon: <BookOpen className="size-4 text-blue-300" />,
    title: "Admission Process",
    description: "Step-by-step application guide",
    date: "For 2024 intake",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className: "transform translate-x-4 translate-y-4",
  },
  {
    icon: <FileText className="size-4 text-purple-300" />,
    title: "Scholarships",
    description: "Financial aid opportunities",
    date: "Apply now",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className: "transform translate-x-8 translate-y-8 rotate-6",
  },
];

export default function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <DisplayCards cards={admissionCards} />
    </div>
  );
} 