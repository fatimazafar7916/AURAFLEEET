"use client";

import React from "react";
import { motion } from "framer-motion";

interface SketchedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SketchedUnderline: React.FC<SketchedUnderlineProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full h-2"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,5 Q25,2 50,5 T100,5"
          fill="transparent"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
};
