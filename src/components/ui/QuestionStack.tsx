"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "How many calls did you miss last weekend?",
  "How many Instagram DMs are unread right now?",
  "Which 3 customers almost booked, then ghosted?",
  "What's your slowest response time this month?",
  "How many of your past customers haven't been contacted in 90 days?",
  "Which platforms have your worst reviews?",
];

export const QuestionStack: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = questions[index];
    
    if (isTyping) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500);
      }
    } else {
      timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % questions.length);
        setDisplayText("");
        setIsTyping(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [displayText, index, isTyping]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 py-12">
      <div className="flex flex-col gap-4">
        {/* Past Questions (Faded) */}
        <div className="flex flex-col gap-2 opacity-20 select-none">
           {questions.slice(Math.max(0, index - 2), index).map((q, i) => (
             <div key={i} className="flex items-center justify-between">
                <p className="text-lg font-serif italic text-deep-ink line-through">{q}</p>
                <div className="w-5 h-5 rounded-full bg-mint flex items-center justify-center text-[10px] text-white">✓</div>
             </div>
           ))}
        </div>

        {/* Active Question */}
        <div className="relative glass p-8 rounded-3xl border-mint/20 shadow-xl overflow-hidden min-h-[140px] flex items-center">
          <div className="absolute top-0 left-0 w-1 h-full bg-mint shadow-[0_0_10px_0_#10B981]" />
          
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-serif italic font-medium text-deep-ink leading-relaxed">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-6 bg-mint ml-1 translate-y-1"
              />
            </h3>
            
            <AnimatePresence>
               {!isTyping && (
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="mt-4 flex items-center gap-3"
                 >
                    <div className="glass px-3 py-1 rounded-full border-mint/40 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                       <span className="text-[10px] font-bold text-mint uppercase tracking-widest">AIAURA KNOWS →</span>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        </div>

        {/* Upcoming Questions (More Faded) */}
        <div className="flex flex-col gap-2 opacity-10 select-none">
           {questions.slice(index + 1, index + 3).map((q, i) => (
             <p key={i} className="text-sm font-serif italic text-deep-ink">{q}</p>
           ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-mint w-4" : i < index ? "bg-mint/40" : "bg-mint/10"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-mint/60 uppercase tracking-[0.2em]">
          {index + 1} OF {questions.length} QUESTIONS · AUTO-CYCLING
        </span>
      </div>
    </div>
  );
};
