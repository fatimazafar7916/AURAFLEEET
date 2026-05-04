"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CyclingPillProps {
  messages: string[];
  interval?: number;
  className?: string;
}

export const CyclingPill: React.FC<CyclingPillProps> = ({
  messages,
  interval = 4000,
  className = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

  const currentMessage = messages[index];

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-mint/20 shadow-sm overflow-hidden ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-mint shadow-[0_0_10px_0_#10B981]" />
        <div className="absolute w-4 h-4 rounded-full border border-mint/40" />
        <div className="absolute w-6 h-6 rounded-full border border-mint/20" />
      </motion.div>
      
      <div className="relative h-5 overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-[13px] font-medium text-deep-ink whitespace-nowrap"
          >
            {currentMessage}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
