"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Academics",
    links: [
      { text: "Undergraduate Programs", href: "/programs/undergraduate" },
      { text: "Graduate Programs", href: "/programs/graduate" },
      { text: "Professional Programs", href: "/programs/professional" },
      { text: "Online Learning", href: "/programs/online" },
      { text: "Academic Calendar", href: "/academics/calendar" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { text: "How to Apply", href: "/admissions/process" },
      { text: "Requirements", href: "/admissions/requirements" },
      { text: "Deadlines", href: "/admissions/deadlines" },
      { text: "Financial Aid", href: "/admissions/financial-aid" },
      { text: "International Students", href: "/admissions/international" },
    ],
  },
  {
    title: "Campus",
    links: [
      { text: "Campus Map", href: "/campus/map" },
      { text: "Housing", href: "/campus/housing" },
      { text: "Dining", href: "/campus/dining" },
      { text: "Athletics", href: "/campus/athletics" },
      { text: "Events", href: "/campus/events" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Library", href: "/resources/library" },
      { text: "Career Services", href: "/resources/career" },
      { text: "IT Services", href: "/resources/it" },
      { text: "Health Services", href: "/resources/health" },
      { text: "Accessibility", href: "/resources/accessibility" },
    ],
  },
];

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    text: "1-KM Defence Road, Lahore, Pakistan",
    href: "https://maps.google.com/?q=University+of+Lahore",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    text: "+92-42-111-865-865",
    href: "tel:+924211186586",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    text: "info@uol.edu.pk",
    href: "mailto:info@uol.edu.pk",
  },
];

const socialLinks = [
  {
    icon: <Facebook className="h-5 w-5" />,
    href: "https://facebook.com/UOLOfficial",
    label: "Facebook",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com/UOLOfficial",
    label: "Twitter",
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "https://instagram.com/UOLOfficial",
    label: "Instagram",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com/school/university-of-lahore",
    label: "LinkedIn",
  },
];

export function PremiumFooter() {
  return (
    <footer className="bg-gradient-to-br from-[#28783B]/10 to-background py-16 lg:py-24 border-t border-[#28783B]/10">
      <div className="container px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="col-span-1 lg:col-span-2 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="University of Lahore" className="h-12 w-auto" />
              <div className="flex flex-col">
                <p className="font-bold text-lg leading-tight">University of Lahore</p>
                <p className="text-xs text-[#28783B]">Admissions Portal</p>
              </div>
            </Link>
            
            <div className="mt-6 space-y-4">
              {contactInfo.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                  <span className="text-[#28783B] mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-6 flex space-x-3">
              {socialLinks.map((link, i) => (
                <Button
                  key={i}
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-[#28783B]/10 hover:bg-[#28783B]/20 text-[#28783B]"
                  asChild
                >
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="col-span-1">
              <h3 className="font-bold mb-4 text-[#28783B]">{section.title}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="text-sm hover:text-[#28783B] transition-colors">
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-[#28783B]/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} University of Lahore. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li className="hover:text-[#28783B] transition-colors">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="hover:text-[#28783B] transition-colors">
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
            <li className="hover:text-[#28783B] transition-colors">
              <Link href="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
} 