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
  { num: '01', title: 'Built only for car rentals', body: "Not a generic chat tool. Our AI knows insurance, mileage, pricing, damage policies — trained specifically for rental operators.", pill: 'AI that knows rentals' },
  { num: '02', title: '60-day money-back promise', body: "If Aiaura doesn't pay for itself in your first 60 days, we refund every cent. No fine print. No locked-in contracts.", pill: 'No-Risk Promise' },
  { num: '03', title: 'Live in 14 days or less', body: "We do the technical heavy lifting. You join one kickoff call and Aiaura is live while competitors take months to set up.", pill: 'Fast setup' },
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
                Others promise help.{' '}
                <span className="block"><GradientText>We give you real results.</GradientText></span>
              </h2>
              <div className="mb-3"><SketchUnderline width={240} /></div>
              <p className="text-base" style={{ color: '#2D4F47', lineHeight: 1.55 }}>
                15+ US car rental owners chose Aiaura over generic AI tools. Here is the proof.
              </p>
            </div>

            {/* Big stat block */}
            <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', border: '1px solid rgba(16,185,129,0.15)' }}>
              {/* Accent line */}
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
              <div className="flex flex-col items-center text-center px-8 py-8">
                <svg viewBox="0 0 120 10" fill="none" className="block mx-auto mb-2" style={{ width: 80, height: 7 }}>
                  <path d="M4 6 C30 2, 50 8, 80 5 C100 2, 110 7, 116 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>

                <span className="font-mono font-extrabold text-gradient block" style={{ fontSize: 'clamp(72px,12vw,96px)', lineHeight: 1 }}>
                  {count}+
                </span>

                <svg viewBox="0 0 120 10" fill="none" className="block mx-auto mt-2 mb-4" style={{ width: 80, height: 7 }}>
                  <path d="M4 4 C20 8, 50 2, 80 6 C100 9, 110 3, 116 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>

                <p className="font-sans font-bold text-lg mb-1.5" style={{ color: '#ffffff' }}>
                  US Rental Owners Trust Aiaura
                </p>
                <p className="text-sm" style={{ color: '#94A3B8', maxWidth: 260 }}>
                  Operators running 5–50 cars in Miami, LA, Las Vegas, Atlanta, and 11 more US cities.
                </p>

                <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                  {[{ highlight: '14 DAYS', rest: 'to go live' }, { highlight: '24/7', rest: 'AI coverage' }, { highlight: '12', rest: 'AI specialists' }].map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                      <span className="font-mono text-xs font-extrabold text-gradient">{s.highlight}</span>
                      <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>{s.rest}</span>
                    </div>
                  ))}
                </div>
              </div>
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

            {/* Social proof strip */}
            <div className="rounded-2xl p-4 flex items-center gap-3 mt-1"
              style={{ background: '#F8FFFE', border: '1px solid #D1FAE5' }}>
              <div className="flex -space-x-2">
                {['M','J','C','R','A'].map((l, i) => (
                  <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                    style={{ background: `hsl(${140 + i * 20}, 60%, ${40 + i * 5}%)` }}>{l}</div>
                ))}
              </div>
              <p className="text-xs" style={{ color: '#475569' }}>
                <span className="font-bold" style={{ color: '#0F172A' }}>15+ operators</span> joined in the last 90 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
