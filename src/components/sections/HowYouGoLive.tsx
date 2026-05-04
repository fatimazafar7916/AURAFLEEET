"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SectionPill } from '../ui/SectionPill';

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

const SketchUnderline = ({ width = 180 }) => (
  <svg width={width} height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9.5C45.5 4.5 135 -2.5 178 8.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const MILESTONES = [
  { day: 'DAY 1', title: 'Sign up & onboarding kickoff', body: '30-minute call to align on your fleet, channels, and goals.', checks: ['Onboarding manager assigned', 'Account created', 'Welcome packet sent'] },
  { day: 'DAY 1–3', title: 'Connect your channels', body: 'We provision Twilio, verify Meta business, and connect your existing tools.', checks: ['Phone & SMS', 'Instagram & Facebook', 'Email & WhatsApp'] },
  { day: 'DAY 4–10', title: 'Train your AI', body: 'Guided sessions to teach Aiaura your fleet, rates, policies, and voice.', checks: ['Fleet imported', 'Pricing rules set', 'Brand voice tuned'] },
  { day: 'DAY 11–14', title: 'Go live (Test Mode first)', body: 'You approve every reply for 24-72 hours, then unlock Live Mode.', checks: ['Test Mode active', 'First conversations', 'Switch to Live Mode'] },
];

export const HowYouGoLive = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lineH, setLineH] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        let h = 0;
        const go = () => { h += 1.5; setLineH(Math.min(h, 100)); if (h < 100) requestAnimationFrame(go); };
        setTimeout(() => requestAnimationFrame(go), 200);
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-bg-mint/5 overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-6 max-w-3xl">
        <div className="flex justify-center mb-5">
          <SectionPill>HOW YOU GO LIVE</SectionPill>
        </div>
        <h2 className="font-sans font-bold text-center mb-2" style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#0A2620', lineHeight: 1.15 }}>
          From sign-up to <GradientText>fully live</GradientText> in{' '}
          <GradientText>14 days.</GradientText>
        </h2>
        <div className="flex justify-center mb-3"><SketchUnderline width={200} /></div>
        <p className="text-base text-center mb-12" style={{ color: '#2D4F47', lineHeight: 1.55 }}>
          We do the technical heavy lifting. You bring the keys to your accounts.
        </p>

        <div className="relative pl-14">
          {/* Gradient timeline line */}
          <div className="absolute left-6 top-6 bottom-6" style={{
            width: 3, borderRadius: 8,
            background: `linear-gradient(180deg, #10B981 0%, #84CC16 ${lineH}%, #E2E8F0 ${lineH}%)`,
            transition: 'background 0.08s linear',
            boxShadow: '0 0 10px rgba(16,185,129,0.25)',
          }} />

          <div className="flex flex-col gap-6">
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.6s ease ${i * 220}ms, transform 0.6s ease ${i * 220}ms` }}>
                {/* Dot */}
                <div className="absolute rounded-full flex items-center justify-center font-mono font-bold text-xs"
                  style={{ left: -38, top: 14, width: 28, height: 28, background: '#ffffff', border: '2px solid #10B981', color: '#10B981', boxShadow: '0 0 12px rgba(16,185,129,0.2)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="rounded-2xl p-5" style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#10B981' }}>{m.day}</span>
                  </div>
                  <h3 className="font-sans font-bold text-base mb-1.5 relative" style={{ color: '#0F172A' }}>
                    <span className="absolute -inset-x-1 -inset-y-0.5 rounded" style={{ background: 'rgba(167,243,208,0.25)' }} />
                    <span className="relative">{m.title}</span>
                  </h3>
                  <p className="text-sm italic mb-4" style={{ color: '#64748B' }}>{m.body}</p>
                  <div className="flex flex-col gap-1.5">
                    {m.checks.map((c, ci) => (
                      <div key={ci} className="flex items-center gap-2"
                        style={{ opacity: inView ? 1 : 0, transition: `opacity 0.4s ease ${i * 220 + ci * 80 + 350}ms` }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                            <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-sm" style={{ color: '#475569' }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-base italic font-medium mt-10" style={{ color: '#64748B' }}>
          And on Day 15, your AI team is doing the work for you.
        </p>
      </div>
    </section>
  );
};
