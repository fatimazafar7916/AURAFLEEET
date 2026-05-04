"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassmorphicCard } from "./GlassmorphicCard";

interface Channel {
  id: string;
  name: string;
  location: string;
  icon: string;
  messages: { sender: "user" | "aiaura"; text: string }[];
  caption: string;
}

const channels: Channel[] = [
  {
    id: "instagram",
    name: "INSTAGRAM",
    location: "MIAMI",
    icon: "📸",
    messages: [
      { sender: "user", text: "Yo is the Lambo Aventador available May 5?" },
      { sender: "aiaura", text: "Yes! May 5 confirmed. $4,800/day with 100 miles included. 1 day or longer?" },
      { sender: "user", text: "3 days, May 5–7" },
      { sender: "aiaura", text: "$14,400 + $5K deposit. Sending booking link..." },
    ],
    caption: "$14,400 booked from a DM at 11:47 PM",
  },
  {
    id: "imessage",
    name: "TEXT MESSAGE",
    location: "LAS VEGAS",
    icon: "💬",
    messages: [
      { sender: "user", text: "How much for Range Rover this weekend?" },
      { sender: "aiaura", text: "Range Rover Sport — $1,200/day, weekend rate. Total $3,600. Want to lock it in?" },
      { sender: "user", text: "Yes please" },
      { sender: "aiaura", text: "Sending Stripe link now. Takes 90 seconds." },
    ],
    caption: "$3,600 weekend booking · F1 weekend Vegas",
  },
  {
    id: "whatsapp",
    name: "WHATSAPP",
    location: "MIAMI",
    icon: "🟢",
    messages: [
      { sender: "user", text: "¿Hola, tienen el Range Rover para este fin de semana?" },
      { sender: "aiaura", text: "¡Hola Maria! Sí, viernes a domingo disponible. $3,600 + depósito. ¿Te interesa?" },
      { sender: "user", text: "¡Sí! ¿Cómo reservo?" },
      { sender: "aiaura", text: "Te envío el enlace ahora..." },
    ],
    caption: "$3,600 booked from a Spanish-speaking tourist",
  },
];

export const ChannelCard: React.FC = () => {
  const [channelIndex, setChannelIndex] = useState(0);
  const currentChannel = channels[channelIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setChannelIndex((prev) => (prev + 1) % channels.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassmorphicCard className="w-full max-w-md mx-auto aspect-[9/10] flex flex-col p-0 overflow-hidden border-mint/20 shadow-2xl relative">
      {/* Header Strip */}
      <div className="bg-mint/10 px-4 py-3 flex items-center justify-between border-b border-mint/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-mint uppercase">
            AI OMNICHANNEL · {currentChannel.name} · {currentChannel.location}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-mint text-[9px] font-bold text-white">
          LIVE
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={channelIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {currentChannel.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.sender === "user" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 1.5, duration: 0.5 }}
                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-gray-100 text-deep-ink rounded-tl-none"
                      : "bg-gradient-aiaura text-white rounded-tr-none shadow-md"
                  }`}
                >
                  {msg.text}
                  {msg.sender === "aiaura" && i === 1 && (
                    <div className="mt-1 text-[9px] opacity-80 font-bold flex items-center gap-1">
                      ⚡ AIAURA · 4s response
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Caption */}
      <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-mint/10 flex flex-col items-center gap-3">
        <p className="text-[12px] font-medium text-ink-soft italic">
          {currentChannel.caption}
        </p>
        
        {/* Pagination Dots */}
        <div className="flex gap-1.5">
          {channels.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === channelIndex ? "bg-mint w-4" : "bg-mint/20"
              }`}
            />
          ))}
        </div>
      </div>
    </GlassmorphicCard>
  );
};
