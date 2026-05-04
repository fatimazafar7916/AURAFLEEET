"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";

export const DevicePreview: React.FC = () => {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <div className="relative w-full max-w-4xl aspect-[16/10] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {device === "mobile" ? (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative z-20"
            >
              {/* iPhone 14 Pro Frame Simulation */}
              <div className="w-[280px] h-[580px] bg-deep-ink rounded-[50px] p-3 shadow-2xl border-4 border-gray-800 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-deep-ink rounded-b-2xl z-30" />
                <div className="w-full h-full bg-bg-paper rounded-[40px] overflow-hidden flex flex-col">
                  {/* Dashboard Content */}
                  <div className="p-4 flex flex-col gap-4">
                     <div className="flex justify-between items-center">
                        <div className="w-8 h-8 rounded-full bg-mint/20" />
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-bold text-mint uppercase">Live</span>
                           <span className="text-[8px] text-ink-mute">TUE · APR 22</span>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Revenue", val: "$24,800", up: "18%" },
                          { label: "Convos", val: "47", up: "Live" },
                        ].map((s, i) => (
                          <div key={i} className="glass p-3 rounded-2xl border-mint/10">
                             <span className="text-[8px] text-ink-mute uppercase font-bold">{s.label}</span>
                             <p className="text-sm font-bold text-deep-ink">{s.val}</p>
                             <span className="text-[8px] text-mint font-bold">↑ {s.up}</span>
                          </div>
                        ))}
                     </div>

                     <div className="flex flex-col gap-2 mt-2">
                        <span className="text-[9px] font-bold text-ink-mute uppercase tracking-widest">Live Activity</span>
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="glass p-2 rounded-xl border-mint/5 flex items-center gap-3">
                             <div className="w-6 h-6 rounded-full bg-mint/10 flex items-center justify-center text-[10px]">📞</div>
                             <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-deep-ink">New Booking</span>
                                <span className="text-[8px] text-ink-soft">Lambo Aventador · $14.4k</span>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Mini Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-1/4 glass p-3 rounded-xl border-mint/20 shadow-lg"
              >
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full bg-mint/20 flex items-center justify-center text-[8px]">🔔</div>
                   <span className="text-[10px] font-bold text-deep-ink uppercase">Alerts</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl aspect-video bg-gray-200 rounded-xl p-2 shadow-2xl border-4 border-gray-400 relative"
            >
               <div className="w-full h-full bg-white rounded-lg overflow-hidden flex">
                  {/* Desktop Sidebar */}
                  <div className="w-16 bg-bg-mint border-r border-mint/10 flex flex-col items-center py-4 gap-4">
                     {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-8 rounded-lg bg-mint/20" />)}
                  </div>
                  {/* Desktop Main */}
                  <div className="flex-1 p-6 flex flex-col gap-6">
                     <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold text-deep-ink">Dashboard</h4>
                        <div className="flex gap-2">
                           <div className="w-24 h-8 glass rounded-lg" />
                           <div className="w-24 h-8 glass rounded-lg" />
                        </div>
                     </div>
                     <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-20 glass rounded-xl" />)}
                     </div>
                     <div className="flex-1 glass rounded-xl" />
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Pill */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs text-ink-mute italic">Tap to preview desktop view.</p>
        <div className="glass p-1.5 rounded-full border-mint/20 flex items-center gap-2">
           <button
             onClick={() => setDevice("mobile")}
             className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
               device === "mobile" ? "bg-gradient-aiaura text-white shadow-md" : "text-ink-soft hover:bg-mint/5"
             }`}
           >
             MOBILE
           </button>
           <button
             onClick={() => setDevice("desktop")}
             className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
               device === "desktop" ? "bg-gradient-aiaura text-white shadow-md" : "text-ink-soft hover:bg-mint/5"
             }`}
           >
             DESKTOP
           </button>
        </div>
      </div>
    </div>
  );
};
