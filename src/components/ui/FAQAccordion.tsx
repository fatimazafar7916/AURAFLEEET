"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long does it take to get Aiaura up and running?",
    a: "Most US car rental operators are fully live within 14 days of sign-up. We do the technical heavy lifting — provisioning your phone numbers, verifying Meta business accounts, and connecting your existing tools."
  },
  {
    q: "Do I have to replace my existing rental software?",
    a: "No. Aiaura plugs into your existing rental management software (HQ Rental, RentSyst, Bluebird, etc.), CRM, and payment processor without requiring you to migrate or replace anything."
  },
  {
    q: "What if Aiaura makes a mistake at 3 AM?",
    a: "Aiaura starts in Test Mode where you approve every reply for the first 24 to 72 hours. Once you trust it, you switch to Live Mode. It also escalates urgent situations directly to your phone."
  },
  {
    q: "Will Aiaura sound robotic?",
    a: "No. Aiaura learns your exact brand voice during onboarding. It uses ElevenLabs-grade voice synthesis for calls and matches your formal, casual, or sophisticated tone across all text channels."
  },
  {
    q: "Can Aiaura handle Spanish-speaking customers?",
    a: "Yes. Aiaura speaks 22+ languages. It detects the customer's language automatically and replies in the same language, helping you capture bookings from bilingual customers."
  }
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {faqs.map((faq, i) => (
        <div key={i} className="glass rounded-2xl border-mint/10 overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-mint/5 transition-colors group"
          >
            <span className="text-base font-bold text-deep-ink group-hover:text-mint transition-colors">{faq.q}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
               openIndex === i ? "bg-mint text-white rotate-45" : "glass border-mint/20 text-mint"
            }`}>
              <span className="text-xl font-light">+</span>
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="px-6 pb-6 pt-2">
                   <p className="text-sm text-ink-soft leading-relaxed border-l-2 border-mint/20 pl-4">
                     {faq.a}
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
