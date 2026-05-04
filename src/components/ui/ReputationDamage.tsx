"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface DamageEntry {
  name: string;
  desc: string;
  percent: number;
  label: string;
}

const damages: DamageEntry[] = [
  { name: "BRAND REPUTATION", desc: "Forum threads and Reddit complaints pile up. Your name is mentioned wrong.", percent: 72, label: "TRUST" },
  { name: "VIP CUSTOMERS", desc: "High-LTV repeat customers book a competitor once. They never come back.", percent: 12, label: "PLATINUM CUSTOMERS" },
  { name: "GOOGLE RANKING", desc: "Page 1 to page 2. Your competitors moved up while you stood still.", percent: 4, label: "POSITIONS DROP" },
];

export const ReputationDamage: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % damages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassmorphicCard className="w-full max-w-lg mx-auto flex flex-col p-0 overflow-hidden border-mint/10 shadow-xl bg-white/95">
      <div className="bg-mint/5 px-4 py-3 flex items-center justify-between border-b border-mint/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-mint uppercase">
            REPUTATION DAMAGE · {index + 1} OF {damages.length}
          </span>
        </div>
        <span className="text-[10px] font-medium text-ink-mute italic italic">"can't be measured in dollars"</span>
      </div>

      <div className="p-6 flex flex-col gap-6 min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4 text-center items-center"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-deep-ink tracking-widest">{damages[index].name}</h4>
              <p className="text-[13px] text-ink-soft max-w-[280px] mx-auto italic leading-relaxed">
                {damages[index].desc}
              </p>
            </div>

            <div className="w-full max-w-[240px] flex flex-col gap-2">
              <div className="h-3 w-full bg-mint/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${damages[index].percent}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-aiaura"
                />
              </div>
              <span className="text-sm font-bold text-mint tabular-nums">
                -{damages[index].percent}% {damages[index].label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 py-4 bg-bg-paper border-t border-mint/10">
        <p className="text-[11px] text-deep-ink/60 text-center font-medium italic">
          "Some things money can't buy back."
        </p>
      </div>
    </GlassmorphicCard>
  );
};
