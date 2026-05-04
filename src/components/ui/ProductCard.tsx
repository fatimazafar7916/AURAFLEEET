"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface ProductCardProps {
  name: string;
  icon: string;
  capabilities: string[];
  stat: string;
  badge?: string;
  staggerDelay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  icon,
  capabilities,
  stat,
  badge,
  staggerDelay = 0,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % capabilities.length);
      }, 3500);
      return () => clearInterval(interval);
    }, staggerDelay * 1000);
    return () => clearTimeout(timer);
  }, [capabilities.length, staggerDelay]);

  return (
    <GlassmorphicCard className="h-[160px] flex flex-col gap-3 border-mint/5 hover:border-mint/20 transition-colors relative group">
      {badge && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-mint/10 text-[9px] font-bold text-mint border border-mint/20">
          {badge}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-[13px] font-bold text-deep-ink uppercase tracking-tight">{name}</h4>
        <div className="h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 5, filter: "blur(2px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -5, filter: "blur(2px)" }}
              className="text-[11px] text-ink-soft italic leading-tight"
            >
              {capabilities[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
        <span className="text-[9px] font-bold text-mint uppercase tracking-wider tabular-nums">{stat}</span>
      </div>
    </GlassmorphicCard>
  );
};
