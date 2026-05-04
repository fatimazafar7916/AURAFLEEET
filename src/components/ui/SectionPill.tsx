"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionPillProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionPill: React.FC<SectionPillProps> = ({ children, className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full border-mint/20 shadow-[0_2px_10px_0_rgba(16,185,129,0.05)] ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_0_#10B981]"
      />
      <span className="text-[11px] font-bold tracking-widest uppercase text-mint tabular-nums">
        {children}
      </span>
    </div>
  );
};
