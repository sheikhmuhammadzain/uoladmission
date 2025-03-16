"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
  const { data: session, status } = useSession();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 mr-4">
          <GraduationCap className="h-6 w-6 text-primary" />
          <Link href="/" className="font-bold">
            University of Lahore
          </Link>
        </div>
        
        <nav className="flex-1 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/programs" className="text-sm font-medium hover:underline">
              Programs
            </Link>
            <Link href="/admission" className="text-sm font-medium hover:underline">
              Admission
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {status === "authenticated" ? (
              <>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                    <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block">
                    {session?.user?.name}
                  </span>
                </div>
                {session?.user?.role === "admin" && (
                  <Link href="/admin/documents">
                    <Button variant="outline" size="sm">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 