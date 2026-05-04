"use client";

import React from "react";
import { motion } from "framer-motion";

const channelLogos = [
  { name: "Instagram", icon: "📸" },
  { name: "WhatsApp", icon: "🟢" },
  { name: "Messenger", icon: "🔵" },
  { name: "SMS", icon: "💬" },
];

const toolLogos = [
  { name: "HQ Rental", icon: "🏢" },
  { name: "HubSpot", icon: "🧡" },
  { name: "Stripe", icon: "💳" },
  { name: "Twilio", icon: "📞" },
];

export const OrbitalDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto flex items-center justify-center py-20">
      {/* Center Orb */}
      <div className="relative z-20">
         <motion.div
           animate={{
             boxShadow: ["0 0 20px rgba(16,185,129,0.2)", "0 0 40px rgba(16,185,129,0.4)", "0 0 20px rgba(16,185,129,0.2)"],
           }}
           transition={{ duration: 4, repeat: Infinity }}
           className="w-24 h-24 rounded-full bg-gradient-aiaura flex items-center justify-center shadow-xl"
         >
           <svg
              width="48"
              height="48"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M20 5C24 5 28 8 28 12C28 16 24 19 20 20C16 19 12 16 12 12C12 8 16 5 20 5Z"
                fill="currentColor"
                fillOpacity="0.8"
              />
              <path
                d="M20 35C24 35 28 32 28 28C28 24 24 21 20 20C16 21 12 24 12 28C12 32 16 35 20 35Z"
                fill="currentColor"
                fillOpacity="0.8"
              />
              <path
                d="M5 20C5 16 8 12 12 12C16 12 19 16 20 20C19 24 16 28 12 28C8 28 5 24 5 20Z"
                fill="currentColor"
                fillOpacity="0.8"
              />
              <path
                d="M35 20C35 16 32 12 28 12C24 12 21 16 20 20C21 24 24 28 28 28C32 28 35 24 35 20Z"
                fill="currentColor"
                fillOpacity="0.8"
              />
            </svg>
         </motion.div>
         <div className="absolute top-[110%] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-[10px] font-bold text-mint tracking-[0.3em] uppercase">AIAURA</span>
         </div>
      </div>

      {/* Ring 1 (Inner) */}
      <div className="absolute inset-0 border border-mint/5 rounded-full" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[15%] pointer-events-none"
      >
        {channelLogos.map((logo, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `rotate(${i * 90}deg) translate(110px) rotate(-${i * 90}deg)`,
            }}
          >
             <motion.div
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="w-10 h-10 rounded-full glass border-mint/20 flex items-center justify-center text-lg shadow-sm"
             >
                {logo.icon}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-mint shadow-[0_0_5px_0_#10B981]" />
             </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Ring 2 (Outer) */}
      <div className="absolute inset-0 border border-mint/5 rounded-full scale-125" />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        {toolLogos.map((logo, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `rotate(${i * 90 + 45}deg) translate(180px) rotate(-${i * 90 + 45}deg)`,
            }}
          >
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-12 h-12 rounded-full glass border-mint/10 flex items-center justify-center text-xl shadow-sm"
             >
                {logo.icon}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-mint/40" />
             </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
