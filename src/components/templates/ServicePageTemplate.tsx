"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";

interface ServicePageTemplateProps {
  children: ReactNode;
}

/**
 * ServicePageTemplate - Reusable template for all service detail pages
 * 
 * This template provides:
 * - Consistent Navbar at the top
 * - Main content area for service-specific sections
 * - Consistent Footer at the bottom
 * 
 * Usage:
 * <ServicePageTemplate>
 *   <YourServiceSections />
 * </ServicePageTemplate>
 */
export const ServicePageTemplate = ({ children }: ServicePageTemplateProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - Fixed at top */}
      <Navbar />
      
      {/* Main content - Service specific sections */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer - At bottom */}
      <Footer />
    </div>
  );
};
