"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

const SketchUnderline = ({ width = 180 }) => (
  <svg width={width} height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9.5C45.5 4.5 135 -2.5 178 8.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const CARDS = [
  { 
    num: '01', 
    title: 'Built only for car rentals.', 
    body: "Knows insurance rules, mileage caps, deposit policies, and damage workflows out of the box. Not a generic chatbot retrofitted for rentals.", 
    pill: 'Specific, not generic' 
  },
  { 
    num: '02', 
    title: 'Replaces 8+ vendors with one.', 
    body: "One platform replaces your CRM, receptionist service, chatbot, review tool, follow-up system, and 6+ more. A-to-Z solution — everything your business needs in one place.", 
    pill: 'Less stack, more time' 
  },
  { 
    num: '03', 
    title: 'Live in 14 days. No tech team needed.', 
    body: "We provision channels, train your AI on your fleet, and go live in Test Mode with a built-in safety net. While others take months, we start in 14 days flat.", 
    pill: 'Fast, with safety net' 
  },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return count;
}

export const WhyAiauraWins = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(15, 1800, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-start mb-4">
          <SectionPill>WHY AIAURA WINS</SectionPill>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Heading + hero stat */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-sans font-bold mb-3" style={{ fontSize: 'clamp(28px,4vw,42px)', color: '#0A2620', lineHeight: 1.15 }}>
                The only AI staff trained for{' '}
                <span className="block"><GradientText italic>US rental shops.</GradientText></span>
              </h2>
              <div className="mb-3"><SketchUnderline width={240} /></div>
              <p className="text-base" style={{ color: '#64748B', lineHeight: 1.55 }}>
                60-day money-back if Aiaura doesn't pay for itself.
              </p>
            </div>

            {/* Big stat block - 60 DAYS */}
            <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', border: '1px solid rgba(16,185,129,0.15)' }}>
              {/* Accent line */}
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
              <div className="flex flex-col items-center text-center px-8 py-10">
                <span className="font-sans font-extrabold text-gradient block mb-2" style={{ fontSize: 'clamp(80px,14vw,120px)', lineHeight: 0.9 }}>
                  60
                </span>
                
                <p className="font-sans font-bold text-2xl mb-2" style={{ color: '#ffffff' }}>
                  DAYS
                </p>
                
                <p className="font-sans font-bold text-lg mb-3" style={{ color: '#ffffff' }}>
                  Money-back guarantee.
                </p>
                
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8', maxWidth: 340 }}>
                  Most operators recover 5–10x their subscription in captured bookings, follow-ups, and reactivations within 60 days. If yours doesn't, we refund every cent.
                </p>
              </div>
            </div>
            
            {/* Bottom CTA button */}
            <div className="flex justify-center">
              <button 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #10B981, #84CC16)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.3)'
                }}
              >
                <PulseDot size={6} />
                <span>MORE GUARANTEES COMING SOON</span>
              </button>
            </div>
          </div>

          {/* RIGHT — reason cards */}
          <div className="flex flex-col gap-3">
            {CARDS.map((card, i) => (
              <div key={i} className="relative rounded-2xl p-5 overflow-hidden"
                style={{
                  background: '#ffffff',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(20px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />

                <div className="flex items-start gap-4">
                  {/* Number badge */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <span className="font-mono font-bold text-sm text-gradient">{card.num}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-bold text-base mb-1.5 leading-snug" style={{ color: '#0F172A' }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{card.body}</p>

                    <div className="flex items-center gap-1.5 mt-3">
                      <PulseDot size={5} />
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: '#F0FDF4', color: '#10B981', border: '1px solid #BBF7D0' }}>
                        {card.pill}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
