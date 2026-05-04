"use client";

import React, { useState, useEffect } from 'react';

const GradientText = ({ children, italic = false }: any) => (
  <span style={{
    background: 'linear-gradient(135deg, #10B981, #84CC16)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 800,
  }}>{children}</span>
);

const LEAKS = [
  {
    name: 'Late-night forms',
    tags: ['SUBMITTED AFTER 9 PM'],
    desc: 'Website forms submitted at night. You see them Monday.',
    amount: '$7,800/mo',
  },
  {
    name: 'AI search invisibility',
    tags: ['GPT / GEO LEAK'],
    desc: "ChatGPT, Perplexity, Google AI Overviews don't list you when customers ask 'best luxury rental in [city]'.",
    amount: '$4,200/mo',
  },
  {
    name: 'No social presence',
    tags: ['INSTAGRAM · TIKTOK'],
    desc: 'Feed looks dead. Algorithm punishes inactive accounts. Reach drops, leads dry up.',
    amount: '$3,800/mo',
  },
];

const REPUTATION_DAMAGES = [
  {
    title: 'VIP customers lost forever',
    desc: 'High-LTV repeat customers book a competitor once. They never come back.',
    meter: 38,
    tag: '−12 PLATINUM',
  },
  {
    title: 'Brand reputation eroding',
    desc: 'Forum threads and Reddit complaints pile up. Your name is mentioned wrong.',
    meter: 28,
    tag: '−72% TRUST',
  },
  {
    title: 'Word of mouth drying up',
    desc: 'Happy customers tell 3 people. Unhappy ones tell 11. The math is brutal.',
    meter: 22,
    tag: '−47 REFERRALS',
  },
  {
    title: 'Google ranking slipping',
    desc: 'Page 1 to page 2. Your competitors moved up while you stood still.',
    meter: 35,
    tag: '−4 POSITIONS',
  },
  {
    title: 'Instagram reach collapsing',
    desc: 'Engagement rate drops. Algorithm punishes inactive responders.',
    meter: 30,
    tag: '−38% REACH',
  },
];

function DamageMeter({ percent, animate }: { percent: number; animate: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      setWidth(0);
      const t = setTimeout(() => setWidth(percent), 100);
      return () => clearTimeout(t);
    }
  }, [animate, percent]);
  return (
    <div style={{ height: 6, borderRadius: 40, background: '#E8F5F0', overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${width}%`,
        background: 'linear-gradient(90deg, #10B981, #84CC16)',
        borderRadius: 40,
        transition: animate ? 'width 1.2s cubic-bezier(0.16,1,0.3,1)' : 'none',
      }} />
    </div>
  );
}

// Animated counter
function useCountUp(target: number, duration = 1200, trigger: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [target, trigger]);
  return val;
}

export const TheLeak = () => {
  const [repIdx, setRepIdx] = useState(0);
  const [repAnimate, setRepAnimate] = useState(true);
  const [leakVisible, setLeakVisible] = useState(true);
  const [totalTrigger, setTotalTrigger] = useState(0);

  const TOTAL = 143400;
  const displayTotal = useCountUp(TOTAL, 1400, totalTrigger);

  // Cycle reputation damage cards
  useEffect(() => {
    const t = setInterval(() => {
      setRepAnimate(false);
      setTimeout(() => {
        setRepIdx(i => (i + 1) % REPUTATION_DAMAGES.length);
        setRepAnimate(true);
      }, 250);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Animate total on mount
  useEffect(() => {
    setTotalTrigger(1);
  }, []);

  const rep = REPUTATION_DAMAGES[repIdx];

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: '#F5F7F2' }}>
      <div className="container mx-auto px-4 md:px-6" style={{ maxWidth: 560 }}>

        {/* Heading */}
        <h2 className="font-sans font-bold text-center mb-3" style={{ fontSize: 'clamp(28px,5vw,44px)', color: '#0A2620', lineHeight: 1.15 }}>
          Every month, <GradientText italic>money walks out</GradientText> the back door.
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: '#6B7F78', lineHeight: 1.6 }}>
          Watch the leaks add up. Then watch what gets damaged.
        </p>

        {/* ── Leak card ── */}
        <div className="rounded-3xl overflow-hidden mb-3" style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>

          {/* Leak rows */}
          {LEAKS.map((leak, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-5 py-4"
              style={{ borderBottom: i < LEAKS.length - 1 ? '1px solid #F1F5F9' : 'none' }}
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(132,204,22,0.1))' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-bold" style={{ color: '#0A2620' }}>{leak.name}</span>
                  {leak.tags.map((tag, ti) => (
                    <span key={ti} style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                      padding: '2px 7px', borderRadius: 40,
                      background: '#F0FDF4', color: '#10B981',
                      border: '1px solid #BBF7D0',
                    }}>{tag}</span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{leak.desc}</p>
              </div>

              {/* Amount */}
              <span className="font-mono font-bold text-sm flex-shrink-0 ml-2" style={{
                background: 'linear-gradient(135deg, #10B981, #84CC16)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>−{leak.amount}</span>
            </div>
          ))}

          {/* Empty space to match screenshot */}
          <div style={{ height: 48 }} />

          {/* Total bar */}
          <div className="mx-4 mb-4 rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em' }}>MONTHLY LEAK TOTAL</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>$</span>
                <span style={{ color: 'white', fontSize: 'clamp(32px,6vw,44px)', fontWeight: 800, lineHeight: 1, fontFamily: 'monospace' }}>
                  {displayTotal.toLocaleString()}
                </span>
              </div>
            </div>
            {/* Down arrow */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Divider text */}
        <p className="text-center text-xs italic mb-3" style={{ color: '#94A3B8' }}>
          And money is not the only thing leaking...
        </p>

        {/* ── Reputation damage card ── */}
        <div className="rounded-3xl overflow-hidden mb-5" style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>

          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#6B7F78' }}>
                REPUTATION DAMAGE · {String(repIdx + 1).padStart(2,'0')} OF {String(REPUTATION_DAMAGES.length).padStart(2,'0')}
              </span>
            </div>
            <span style={{ fontSize: 9, color: '#94A3B8', fontStyle: 'italic' }}>can't be measured in dollars</span>
          </div>

          {/* Content */}
          <div className="px-5 py-5"
            style={{
              opacity: repAnimate ? 1 : 0,
              transform: repAnimate ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}>

            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(132,204,22,0.08))' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <p className="font-bold text-base" style={{ color: '#0A2620' }}>{rep.title}</p>
            </div>

            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#64748B' }}>{rep.desc}</p>

            {/* Meter */}
            <DamageMeter percent={rep.meter} animate={repAnimate} />

            {/* Tag */}
            <div className="mt-3">
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                padding: '3px 10px', borderRadius: 40,
                background: '#F0FDF4', color: '#10B981',
                border: '1px solid #BBF7D0',
              }}>{rep.tag}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5">
            <p className="text-xs italic text-center py-3 rounded-2xl" style={{ color: '#94A3B8', background: '#F8FFFE', border: '1px solid #E8F5F0' }}>
              Some things money can't buy back.
            </p>

            {/* Dot progress */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {REPUTATION_DAMAGES.map((_, i) => (
                <div key={i} style={{
                  width: i === repIdx ? 20 : 6,
                  height: 6, borderRadius: 40,
                  background: i === repIdx ? 'linear-gradient(90deg,#10B981,#84CC16)' : '#D1FAE5',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Full-width CTA ── */}
        <button
          className="w-full py-5 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)',
            boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
            border: 'none', cursor: 'pointer',
            fontSize: 15, letterSpacing: '0.01em',
          }}
        >
          Aiaura plugs every leak. Run my free audit
          <span style={{ fontSize: 18 }}>→</span>
        </button>

      </div>
    </section>
  );
};
