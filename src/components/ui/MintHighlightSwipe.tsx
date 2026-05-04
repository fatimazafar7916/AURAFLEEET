"use client";

import React from "react";
import { motion } from "framer-motion";

interface MintHighlightSwipeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MintHighlightSwipe: React.FC<MintHighlightSwipeProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-x-0 bottom-1 h-[60%] bg-[#A7F3D0]/50 -z-10 rounded-sm"
      />
      {children}
    </span>
  );
};
