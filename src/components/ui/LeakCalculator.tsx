"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface LeakEntry {
  name: string;
  tag: string;
  desc: string;
  loss: number;
}

const leaks: LeakEntry[] = [
  { name: "MISSED CALLS", tag: "After hours", desc: "They call at 2 AM. You're asleep. Competitors aren't.", loss: 26800 },
  { name: "INSTAGRAM DMs", tag: "Ghosted 4+ hours", desc: "They message at midnight. You see it Monday morning.", loss: 18200 },
  { name: "SLOW QUOTES", tag: "8 hours late", desc: "First quote wins 78% of the time. Yours is too late.", loss: 11400 },
  { name: "DEAD CRM", tag: "10K contacts ignored", desc: "Past customers never hear from you. They book competitors.", loss: 14800 },
];

export const LeakCalculator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % leaks.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Increment total cumulatively
    const currentLoss = leaks[index].loss;
    const startValue = total;
    const endValue = total + currentLoss;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setTotal(Math.floor(startValue + (endValue - startValue) * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [index]);

  return (
    <GlassmorphicCard className="w-full max-w-lg mx-auto flex flex-col p-0 overflow-hidden border-red-500/10 shadow-xl bg-white/95">
      <div className="bg-deep-ink px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
            LIVE LEAK CALCULATOR · {index + 1} OF {leaks.length}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-bold text-white/50">
          AUTO-PLAYING
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 min-h-[320px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-deep-ink uppercase tracking-tight">{leaks[index].name}</h4>
                <span className="text-[11px] font-medium text-red-500/80 bg-red-500/5 px-2 py-0.5 rounded-full border border-red-500/10">
                  {leaks[index].tag}
                </span>
              </div>
              <span className="text-lg font-bold text-red-500 tabular-nums">
                -${leaks[index].loss.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed italic">
              "{leaks[index].desc}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Previous Leaks (Small rows) */}
        <div className="mt-auto flex flex-col gap-2 opacity-40">
           <div className="flex justify-between items-center text-[10px] font-medium border-t border-deep-ink/5 pt-2">
              <span className="text-ink-mute uppercase">Average Industry Leak</span>
              <span className="text-red-500/60">-$12,400</span>
           </div>
        </div>
      </div>

      {/* TOTAL BAR */}
      <div className="bg-gradient-aiaura p-6 flex flex-col gap-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        <div className="flex justify-between items-end relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">TOTAL MONTHLY LEAK</span>
            <span className="text-[12px] text-white/90 italic font-medium">8-car rental average</span>
          </div>
          <div className="flex flex-col items-end">
             <motion.span 
              className="text-3xl font-bold text-white tabular-nums"
             >
               -${total.toLocaleString()}
             </motion.span>
             <div className="flex items-center gap-1 text-[10px] font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                <span>↑</span>
                <span>+${leaks[index].loss.toLocaleString()}</span>
             </div>
          </div>
        </div>
      </div>
    </GlassmorphicCard>
  );
};
