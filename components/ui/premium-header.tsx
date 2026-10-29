"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Programs",
    description: "Explore our diverse range of academic programs",
    items: [
      {
        title: "Undergraduate",
        href: "/programs/undergraduate",
        description: "Bachelor's degree programs across various disciplines",
      },
      {
        title: "Graduate",
        href: "/programs/graduate",
        description: "Master's and doctoral programs for advanced study",
      },
      {
        title: "Professional",
        href: "/programs/professional",
        description: "Specialized professional certification programs",
      },
      {
        title: "Online Learning",
        href: "/programs/online",
        description: "Flexible online programs for distance education",
      },
    ],
  },
  {
    title: "Admissions",
    description: "Everything you need to know about joining UOL",
    items: [
      {
        title: "Application Process",
        href: "/admissions/process",
        description: "Step-by-step guide to applying to UOL",
      },
      {
        title: "Requirements",
        href: "/admissions/requirements",
        description: "Academic and other requirements for admission",
      },
      {
        title: "Deadlines",
        href: "/admissions/deadlines",
        description: "Important dates and deadlines for applications",
      },
      {
        title: "Financial Aid",
        href: "/admissions/financial-aid",
        description: "Scholarships, grants, and financial assistance options",
      },
    ],
  },
  {
    title: "Campus Life",
    href: "/campus-life",
  },
  {
    title: "About",
    href: "/about",
  },
];

export function PremiumHeader() {
  const { data: session } = useSession();
  const [isOpen, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "w-full z-40 sticky top-0 left-0 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md" 
        : "bg-transparent"
    )}>
      <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center py-3">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href && !item.items ? (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="font-medium text-sm hover:text-[#28783B] transition-colors">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm hover:text-[#28783B] data-[state=open]:text-[#28783B]">
                        {item.title}
                      </NavigationMenuTrigger>
                      {item.items && (
                        <NavigationMenuContent className="!w-[450px] p-4 border border-[#28783B]/10 shadow-lg">
                          <div className="flex flex-col lg:grid grid-cols-1 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base font-bold text-[#28783B]">{item.title}</p>
                                <p className="text-muted-foreground text-sm">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col text-sm h-full justify-end">
                              {item.items?.map((subItem) => (
                                <Link
                                  href={subItem.href}
                                  key={subItem.title}
                                  className="flex flex-row justify-between items-start hover:bg-[#28783B]/5 py-3 px-4 rounded group"
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium group-hover:text-[#28783B] transition-colors">{subItem.title}</span>
                                    <span className="text-muted-foreground text-xs mt-1">{subItem.description}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      )}
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="University of Lahore" className="h-10 w-auto" />
            <div className="flex flex-col">
              <p className="font-bold text-lg leading-tight">University of Lahore</p>
              <p className="text-xs text-[#28783B]">Admissions Portal</p>
            </div>
          </Link>
        </div>
        <div className="flex justify-end w-full gap-4 items-center">
          {session ? (
            <>
              <Button variant="ghost" className="hidden md:inline hover:text-[#28783B] hover:bg-[#28783B]/5" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" className="border-[#28783B] text-[#28783B] hover:bg-[#28783B]/10" asChild>
                <Link href="/api/auth/signout">Sign out</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden md:inline hover:text-[#28783B] hover:bg-[#28783B]/5" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button className="bg-[#28783B] hover:bg-[#28783B]/90" asChild>
                <Link href="/signup">Apply Now</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-16 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8 z-50 border-[#28783B]/10">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href && !item.items ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center hover:text-[#28783B]"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-lg font-medium">{item.title}</span>
                      </Link>
                    ) : (
                      <>
                        <p className="text-lg font-medium text-[#28783B]">{item.title}</p>
                        {item.items &&
                          item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="flex justify-between items-center pl-4 py-2 hover:bg-[#28783B]/5 rounded-md"
                              onClick={() => setOpen(false)}
                            >
                              <span className="text-muted-foreground text-sm hover:text-[#28783B]">
                                {subItem.title}
                              </span>
                            </Link>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                {session ? (
                  <>
                    <Button variant="outline" className="border-[#28783B] text-[#28783B] hover:bg-[#28783B]/10" asChild>
                      <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button variant="default" className="bg-[#28783B] hover:bg-[#28783B]/90" asChild>
                      <Link href="/api/auth/signout" onClick={() => setOpen(false)}>Sign out</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-[#28783B] text-[#28783B] hover:bg-[#28783B]/10" asChild>
                      <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                    </Button>
                    <Button variant="default" className="bg-[#28783B] hover:bg-[#28783B]/90" asChild>
                      <Link href="/signup" onClick={() => setOpen(false)}>Apply Now</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 