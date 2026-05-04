"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface ResultCard {
  product: string;
  amount: string;
  action: string;
  attribution: string;
  icon: string;
}

const results: ResultCard[] = [
  {
    product: "AI RECEPTIONIST",
    amount: "$14,400",
    action: "Booked from a 2:14 AM call",
    attribution: "Carlos M., MVP Miami · April 18",
    icon: "📞",
  },
  {
    product: "AI OMNICHANNEL",
    amount: "$4,800",
    action: "Weekend rental closed in 4 minutes",
    attribution: "Royalty Vegas · April 22",
    icon: "💬",
  },
  {
    product: "AI FOLLOW-UP",
    amount: "$8,200",
    action: "Recovered from a 9-day-old quote",
    attribution: "Miami Drive · April 14",
    icon: "🔄",
  },
];

export const RealResultsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % results.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden py-10 px-4">
      <div className="relative h-[280px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {results.map((result, i) => {
            if (i !== index) return null;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <GlassmorphicCard className="flex flex-col gap-4 border-mint/10 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-aiaura opacity-50" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center text-xl">
                      {result.icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-mint uppercase">
                      {result.product}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-4xl font-bold text-gradient tabular-nums">
                      {result.amount}
                    </h3>
                    <p className="text-sm font-medium text-deep-ink">
                      {result.action}
                    </p>
                  </div>

                  <div className="h-px w-full bg-mint/10" />

                  <div className="flex justify-between items-center">
                    <p className="text-[11px] text-ink-mute uppercase tracking-wider">
                      {result.attribution}
                    </p>
                    <div className="px-2 py-0.5 rounded-full bg-mint/5 text-[9px] font-bold text-mint border border-mint/10">
                      VERIFIED
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex gap-2">
          {results.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-mint w-6" : "bg-mint/20"
              }`}
            />
          ))}
        </div>
        <div className="text-[10px] font-mono font-bold text-mint tracking-[0.2em] uppercase">
          {index + 1} / {results.length} · AUTO-PLAYING
        </div>
      </div>
    </div>
  );
};
