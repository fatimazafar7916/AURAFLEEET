"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = "",
  animate = false,
}) => {
  const content = (
    <div className={`glass-card rounded-[28px] p-6 ${className}`}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
