"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';

const GradientText = ({ children, italic = false }: any) => (
  <span style={{
    background: 'linear-gradient(135deg, #10B981, #84CC16)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 800,
  }}>{children}</span>
);

const SketchUnderline = ({ width = 220 }) => (
  <svg width={width} height="12" viewBox="0 0 220 12" fill="none">
    <path d="M2 9.5C55 4.5 165 -2.5 218 8.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const RESULTS = [
  {
    product: 'AI QUOTE & BOOKING',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    amount: '11s',
    amountSuffix: 'QUOTE-TO-DEPOSIT',
    action: '312 contracts signed.',
    attribution: 'Atlanta Exotic · April',
    tag: 'AVG BOOKING VALUE $5,200',
    stat1: { value: '312', label: 'CONTRACTS SIGNED' },
    stat2: { value: '$5,200', label: 'AVG BOOKING VALUE' },
  },
  {
    product: 'AI REVIEW MANAGER',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    amount: '184',
    amountSuffix: '5-STAR REVIEWS',
    action: '5-star Google reviews intercepted.',
    attribution: 'Scottsdale Luxury · April',
    tag: 'RATING: 4.8 → 4.9',
    stat1: { value: '184', label: '5-STAR REVIEWS' },
    stat2: { value: '4.9', label: 'NEW RATING' },
  },
  {
    product: 'AI RECEPTIONIST',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    amount: '$14,400',
    amountSuffix: 'SINGLE BOOKING',
    action: 'Booked from a 2:14 AM call.',
    attribution: 'Carlos M., MVP Miami · April',
    tag: 'LAMBO AVENTADOR',
    stat1: { value: '2:14AM', label: 'CALL TIME' },
    stat2: { value: '$14,400', label: 'BOOKING VALUE' },
  },
  {
    product: 'AI OMNICHANNEL',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    amount: '$47,000',
    amountSuffix: 'F1 CAMPAIGN',
    action: '18 bookings from one campaign.',
    attribution: 'Miami Drive · April',
    tag: '7.3% CONVERSION',
    stat1: { value: '18', label: 'BOOKINGS CLOSED' },
    stat2: { value: '7.3%', label: 'CONVERSION RATE' },
  },
  {
    product: 'AI FOLLOW-UP',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    ),
    amount: '$8,200',
    amountSuffix: 'RECOVERED',
    action: 'Recovered from a 9-day-old quote.',
    attribution: 'Miami Drive · April',
    tag: 'RANGE ROVER SPORT',
    stat1: { value: '9 days', label: 'OLD QUOTE' },
    stat2: { value: '$8,200', label: 'RECOVERED' },
  },
  {
    product: 'AI LEAD QUALIFIER',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    amount: '47',
    amountSuffix: 'HOT LEADS',
    action: 'Flagged from $2.1M of inquiries.',
    attribution: 'LA Exotic · April',
    tag: 'LEADS SCORED TOTAL',
    stat1: { value: '47', label: 'HOT LEADS' },
    stat2: { value: '$2.1M', label: 'INQUIRIES SCORED' },
  },
];

export const RealResults = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [statsAnimating, setStatsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = RESULTS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [current, total]);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setStatsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
      setTimeout(() => setStatsAnimating(false), 50);
    }, 300);
  };

  const prev = RESULTS[(current - 1 + total) % total];
  const active = RESULTS[current];
  const next = RESULTS[(current + 1) % total];

  return (
    <section id="results" className="py-20 md:py-28 overflow-hidden" style={{ background: '#F5F7F2' }}>
      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <SectionPill>RESULTS OF LAST 30 DAYS</SectionPill>
          </div>
          <h2 className="font-sans font-bold mb-3" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#0A2620', lineHeight: 1.1 }}>
            Results by <GradientText italic>Operators</GradientText>
          </h2>
          <div className="flex justify-center mb-5">
            <SketchUnderline width={260} />
          </div>
          <p className="text-base md:text-lg mx-auto" style={{ color: '#4B6B5D', lineHeight: 1.65, maxWidth: 480 }}>
            Specific bookings recovered, calls captured, and reviews collected by Aiaura — for US rental shops between 5 and 50 cars.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4 mb-6" style={{ minHeight: 340 }}>

          {/* Prev card — blurred side */}
          <div
            className="hidden md:block flex-shrink-0 overflow-hidden cursor-pointer"
            style={{
              width: 180, height: 280,
              background: 'linear-gradient(135deg, #a8edca, #c3f0a0)',
              opacity: 0.45, filter: 'blur(2px)',
              transform: 'scale(0.92)', transition: 'all 0.4s ease',
              borderRadius: 24,
            }}
            onClick={() => goTo((current - 1 + total) % total)}
          >
            <div className="p-5 pt-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.3)' }}>
                {prev.icon}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' }}>{prev.product}</p>
              <p style={{ color: 'white', fontSize: 32, fontWeight: 800, lineHeight: 1, marginTop: 8 }}>{prev.amount}</p>
            </div>
          </div>

          {/* Active card */}
          <div
            className="flex-shrink-0 flex flex-col p-7 md:p-8 relative overflow-hidden"
            style={{
              width: '100%', maxWidth: 420, minHeight: 320,
              background: 'linear-gradient(135deg, #34d399 0%, #86efac 50%, #a3e635 100%)',
              boxShadow: '0 24px 60px rgba(16,185,129,0.25), 0 8px 24px rgba(0,0,0,0.08)',
              borderRadius: 28,
              opacity: animating ? 0 : 1,
              transform: animating ? 'scale(0.97)' : 'scale(1)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', filter: 'blur(40px)' }} />
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5 relative z-10" style={{ background: 'rgba(255,255,255,0.25)' }}>
              {active.icon}
            </div>
            <p className="relative z-10 mb-3" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em' }}>
              {active.product}
            </p>
            <div className="flex items-baseline gap-3 mb-3 relative z-10">
              <span style={{ color: 'white', fontSize: 'clamp(44px,8vw,60px)', fontWeight: 800, lineHeight: 1 }}>{active.amount}</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{active.amountSuffix}</span>
            </div>
            <p className="font-bold relative z-10 mb-1" style={{ color: 'white', fontSize: 15, lineHeight: 1.4 }}>{active.action}</p>
            <p className="relative z-10 mb-5" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{active.attribution}</p>
            <div className="relative z-10 mt-auto">
              <span style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)', color: 'white',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                padding: '6px 14px', borderRadius: 40,
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                {active.tag}
              </span>
            </div>
          </div>

          {/* Next card — blurred side */}
          <div
            className="hidden md:block flex-shrink-0 overflow-hidden cursor-pointer"
            style={{
              width: 180, height: 280,
              background: 'linear-gradient(135deg, #a8edca, #c3f0a0)',
              opacity: 0.45, filter: 'blur(2px)',
              transform: 'scale(0.92)', transition: 'all 0.4s ease',
              borderRadius: 24,
            }}
            onClick={() => goTo((current + 1) % total)}
          >
            <div className="p-5 pt-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.3)' }}>
                {next.icon}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' }}>{next.product}</p>
              <p style={{ color: 'white', fontSize: 32, fontWeight: 800, lineHeight: 1, marginTop: 8 }}>{next.amount}</p>
            </div>
          </div>
        </div>

        {/* Progress bar + counter */}
        <div className="flex items-center gap-4 mb-8" style={{ maxWidth: 420, margin: '0 auto 32px' }}>
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: '#D1FAE5' }}>
            <div style={{
              height: '100%',
              width: `${((current + 1) / total) * 100}%`,
              background: 'linear-gradient(90deg, #10B981, #84CC16)',
              borderRadius: 40, transition: 'width 0.4s ease',
            }} />
          </div>
          <span style={{ color: '#6B7F78', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Dynamic bottom stat boxes — change with active card */}
        <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 420, margin: '0 auto' }}>
          {[active.stat1, active.stat2].map((stat, i) => (
            <div
              key={`${current}-${i}`}
              className="rounded-2xl flex flex-col items-center justify-center py-6"
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #86efac 50%, #a3e635 100%)',
                boxShadow: '0 8px 24px rgba(16,185,129,0.2)',
                opacity: statsAnimating ? 0 : 1,
                transform: statsAnimating ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <span style={{ color: 'white', fontSize: 'clamp(28px,5vw,40px)', fontWeight: 800, lineHeight: 1 }}>{stat.value}</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', marginTop: 6, textAlign: 'center', padding: '0 8px' }}>{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
