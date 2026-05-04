"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';

/* ─────────────────────────────────────────
   CSS injected once
───────────────────────────────────────── */
const WHY_CSS = `
@keyframes msp-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.25), 0 2px 8px rgba(0,0,0,0.06); }
  50%       { box-shadow: 0 0 18px rgba(16,185,129,0.45), 0 2px 8px rgba(0,0,0,0.06); }
}
@keyframes why-fadein {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}
@keyframes underline-grow {
  from { width: 0; }
  to   { width: 140px; }
}

.why-unit-enter  { animation: why-fadein 380ms ease forwards; }
.why-tag-enter   { animation: why-fadein 480ms ease forwards; }
.why-sub-enter   { animation: why-fadein 480ms ease forwards; }
.why-card-enter  { animation: why-fadein 500ms ease forwards; }
.why-underline-grow { animation: underline-grow 800ms cubic-bezier(0.22,1,0.36,1) forwards; }

.reason-card {
  position: relative;
  background: linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,255,255,0.90));
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid rgba(16,185,129,0.18);
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  padding: 18px 20px;
  margin-top: 12px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
}
.reason-card.show {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms ease, transform 500ms ease;
}
.reason-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, #10B981, #84CC16);
  opacity: 0.55;
}

.num-circle {
  position: absolute;
  top: 14px; right: 14px;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(16,185,129,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 13px;
  font-weight: 700;
  color: #10B981;
}

.reason-pill {
  display: inline-block;
  background: rgba(240,253,244,1);
  border: 1px solid rgba(187,247,208,1);
  color: #10B981;
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  padding: 5px 11px;
  margin-top: 12px;
  font-family: 'Geist Mono', ui-monospace, monospace;
}

.more-guarantees-pill {
  height: 36px;
  border-radius: 999px;
  padding: 0 14px 0 6px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(16,185,129,0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  animation: msp-glow 2.4s ease-in-out infinite;
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #10B981;
  letter-spacing: 0.04em;
}
.more-guarantees-pill .pill-icon {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981, #84CC16);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(16,185,129,0.5));
}

.wg-num {
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: clamp(80px, 14vw, 108px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.95;
  background: linear-gradient(135deg, #22C55E 0%, #4ADE5C 50%, #84CC16 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.wg-unit {
  font-family: 'Geist Mono', ui-monospace, monospace;
  font-size: 28px;
  font-weight: 700;
  color: #0A2620;
  letter-spacing: 0.04em;
  opacity: 0;
  transform: translateY(4px);
}
.wg-tagline {
  font-size: 18px;
  font-weight: 700;
  color: #0A2620;
  letter-spacing: -0.01em;
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
.wg-subline {
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  color: #64748B;
  max-width: 360px;
  text-align: center;
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.why-underline {
  overflow: hidden;
  margin-top: 12px;
  width: 0;
}
`;

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const CARDS = [
  {
    num: '01',
    title: 'Built only for car rentals.',
    body: "Knows insurance rules, mileage caps, deposit policies, and damage workflows out of the box. Not a generic chatbot retrofitted for rentals.",
    pill: 'Specific, not generic',
  },
  {
    num: '02',
    title: 'Replaces 8+ vendors with one.',
    body: "One platform replaces your CRM, receptionist service, chatbot, review tool, follow-up system, and 6+ more. A-to-Z solution — everything your business needs in one place.",
    pill: 'Less stack, more time',
  },
  {
    num: '03',
    title: 'Live in 14 days. No tech team needed.',
    body: "We provision channels, train your AI on your fleet, and go live in Test Mode with a built-in safety net. While others take months, we start in 14 days flat.",
    pill: 'Fast, with safety net',
  },
];

/* ─────────────────────────────────────────
   Count-up hook
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Main export
───────────────────────────────────────── */
export const WhyAiauraWins = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(60, 1800, inView);

  // After count completes, stagger the rest in
  const countDone = inView && count === 60;
  const [showUnit, setShowUnit]     = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showSub, setShowSub]       = useState(false);
  const [showCards, setShowCards]   = useState([false, false, false]);

  useEffect(() => {
    if (!countDone) return;
    const t1 = setTimeout(() => setShowUnit(true),        200);
    const t2 = setTimeout(() => setShowUnderline(true),   300);
    const t3 = setTimeout(() => setShowTagline(true),     600);
    const t4 = setTimeout(() => setShowSub(true),         800);
    const t5 = setTimeout(() => setShowCards([true, false, false]), 1100);
    const t6 = setTimeout(() => setShowCards([true, true,  false]), 1350);
    const t7 = setTimeout(() => setShowCards([true, true,  true]),  1600);
    return () => [t1,t2,t3,t4,t5,t6,t7].forEach(clearTimeout);
  }, [countDone]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById('why-styles')) return;
    const style = document.createElement('style');
    style.id = 'why-styles';
    style.textContent = WHY_CSS;
    document.head.appendChild(style);
  }, []);

  return (
    <section className="py-16 md:py-20 overflow-hidden" style={{ background: '#FAFAF8' }}>
      <div ref={sectionRef} className="container mx-auto px-6 max-w-6xl">

        {/* Section head */}
        <div className="sec-head mb-8 flex flex-col items-center text-center">
          <div className="flex justify-center mb-4">
            <SectionPill>WHY AIAURA WINS</SectionPill>
          </div>
          <h2
            className="font-sans font-bold mb-3"
            style={{ fontSize: 'clamp(30px,4vw,40px)', color: '#0A2620', lineHeight: 1.15 }}
          >
            The only AI staff trained for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10B981, #84CC16)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
              fontWeight: 800,
            }}>US rental shops.</span>
          </h2>
          <p style={{ color: '#2D4F47', maxWidth: 420, fontSize: 15, lineHeight: 1.55 }}>
            60-day money-back if Aiaura doesn't pay for itself.
          </p>
        </div>

        {/* Hero guarantee block */}
        <div
          className="why-guarantee flex flex-col items-center text-center"
          style={{ margin: '28px auto 36px', maxWidth: 480 }}
        >
          {/* Animated number */}
          <span className="wg-num">{count}</span>

          {/* DAYS — fades in after count */}
          <span
            className={`wg-unit${showUnit ? ' why-unit-enter' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            DAYS
          </span>

          {/* Sketched underline — grows in */}
          <div
            className={`why-underline${showUnderline ? ' why-underline-grow' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <svg width="140" height="12" viewBox="0 0 140 12" fill="none">
              <path d="M2 9C35 3 105 -1 138 8" stroke="#10B981" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </div>

          {/* Tagline */}
          <p
            className={`wg-tagline mt-4${showTagline ? ' why-tag-enter' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            Money-back guarantee.
          </p>

          {/* Subline */}
          <p
            className={`wg-subline mt-2${showSub ? ' why-sub-enter' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            Most operators recover 5–10× their subscription in captured bookings, follow-ups, and reactivations within 60 days. If yours doesn't, we refund every cent.
          </p>
        </div>

        {/* 3 Reason cards */}
        <div className="flex flex-col gap-0 max-w-2xl mx-auto">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`reason-card${showCards[i] ? ' show' : ''}`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="num-circle">{card.num}</div>
              <h3
                className="font-sans font-bold"
                style={{ fontSize: 17, lineHeight: 1.25, color: '#0F172A', maxWidth: '80%' }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#64748B', marginTop: 8 }}>
                {card.body}
              </p>
              <span className="reason-pill">{card.pill}</span>
            </div>
          ))}
        </div>

        {/* Footer pill */}
        <div className="flex justify-center mt-10">
          <div className="more-guarantees-pill">
            <div className="pill-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="6" y1="1" x2="6" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="1" y1="6" x2="11" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            More guarantees coming soon
          </div>
        </div>

      </div>
    </section>
  );
};