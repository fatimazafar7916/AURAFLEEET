"use client";

import React from "react";
import { motion } from "framer-motion";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const baseStyles = "px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-aiaura text-white shadow-[0_4px_20px_0_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_0_rgba(16,185,129,0.4)] relative overflow-hidden group",
    secondary: "glass text-deep-ink border-mint/20 hover:border-mint/40",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
      {children}
    </motion.button>
  );
};
