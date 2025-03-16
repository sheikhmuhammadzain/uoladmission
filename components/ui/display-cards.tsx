"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 px-4 py-3 transition-all duration-300 hover:shadow-lg [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "transform -rotate-6",
    },
    {
      className: "transform translate-x-4 translate-y-4",
    },
    {
      className: "transform translate-x-8 translate-y-8 rotate-6",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <div className="relative w-[300px]">
        {displayCards.map((cardProps, index) => (
          <div 
            key={index} 
            className="absolute top-0 left-0 w-full transition-all duration-300 hover:z-10"
            style={{ zIndex: index }}
          >
            <DisplayCard key={index} {...cardProps} />
          </div>
        ))}
      </div>
    </div>
  );
} 