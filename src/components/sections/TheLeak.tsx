"use client";

import React, { useState, useEffect } from 'react';
import { SectionPill } from '../ui/SectionPill';
import { CTAButton } from '../ui/CTAButton';
import { PhoneOff, Camera, Clock, Database, StarOff, MessageCircle, Headphones, TrendingDown, Globe, CreditCard, MapPin, Send } from 'lucide-react';

const LEAK_ICONS: any = {
  'MISSED CALLS': PhoneOff,
  'INSTAGRAM DMs': Camera,
  'SLOW QUOTES': Clock,
  'DEAD CRM': Database,
  'NO REVIEWS': StarOff,
  'IG COMMENT LEAKS': MessageCircle,
  'WEEKEND SUPPORT GAP': Headphones,
  'MISSED UPSELLS': TrendingDown,
  'NO MULTILINGUAL': Globe,
  'CHARGEBACKS': CreditCard,
  'STALE GOOGLE LISTING': MapPin,
  'NO BOOKING FOLLOW-UP': Send,
};

const FINANCIAL_LEAKS = [
  { name: 'MISSED CALLS', tag: 'After hours', desc: "They call at 2 AM. You're asleep. Competitors aren't.", amount: 26800, iconKey: 'MISSED CALLS' },
  { name: 'INSTAGRAM DMs', tag: 'Ghosted 4+ hours', desc: 'They message at midnight. You see it Monday morning.', amount: 18200, iconKey: 'INSTAGRAM DMs' },
  { name: 'SLOW QUOTES', tag: '8 hours late', desc: 'First quote wins 78% of the time. Yours is too late.', amount: 11400, iconKey: 'SLOW QUOTES' },
  { name: 'DEAD CRM', tag: '10K contacts ignored', desc: 'Past customers never hear from you. They book competitors.', amount: 14800, iconKey: 'DEAD CRM' },
  { name: 'NO REVIEWS', tag: '3 in 6 months', desc: 'No new Google reviews. Ranking drops. Leads dry up.', amount: 13400, iconKey: 'NO REVIEWS' },
  { name: 'IG COMMENT LEAKS', tag: "Never DM'd back", desc: '73 comments asking "price?" Zero auto-replies sent.', amount: 9800, iconKey: 'IG COMMENT LEAKS' },
  { name: 'WEEKEND SUPPORT GAP', tag: 'Sat night silence', desc: 'Active renters need help. Nobody picks up. Bad reviews follow.', amount: 7600, iconKey: 'WEEKEND SUPPORT GAP' },
  { name: 'MISSED UPSELLS', tag: 'Never offered', desc: 'Add-ons, multi-day discounts, insurance — left on the table.', amount: 8200, iconKey: 'MISSED UPSELLS' },
  { name: 'NO MULTILINGUAL', tag: 'Spanish/Portuguese tourists', desc: 'Hispanic and Brazilian renters book competitors who speak their language.', amount: 11000, iconKey: 'NO MULTILINGUAL' },
  { name: 'CHARGEBACKS', tag: 'International disputes', desc: "Tourist disputes you can't fight. $5K+ losses you eat silently.", amount: 5400, iconKey: 'CHARGEBACKS' },
  { name: 'STALE GOOGLE LISTING', tag: 'Bad photos, no posts', desc: "Your Business Profile hasn't updated in 4 months. Click-through dropping.", amount: 4800, iconKey: 'STALE GOOGLE LISTING' },
  { name: 'NO BOOKING FOLLOW-UP', tag: 'Quote sent. Crickets.', desc: 'You sent the quote. They went silent. You never chased. Booking = lost.', amount: 6200, iconKey: 'NO BOOKING FOLLOW-UP' },
];

const REPUTATION_DAMAGES = [
  { name: 'BRAND REPUTATION', desc: 'Forum threads and Reddit complaints pile up. Your name is mentioned wrong.', meter: 28, stat: '−72% TRUST' },
  { name: 'VIP CUSTOMERS', desc: 'High-LTV repeat customers book a competitor once. They never come back.', meter: 32, stat: '−12 PLATINUM CUSTOMERS' },
  { name: 'WORD OF MOUTH', desc: 'Happy customers tell 3 people. Unhappy ones tell 11. The math is brutal.', meter: 22, stat: '−47 REFERRALS LOST' },
  { name: 'GOOGLE RANKING', desc: 'Page 1 to page 2. Your competitors moved up while you stood still.', meter: 35, stat: '−4 POSITIONS DROP' },
  { name: 'INSTAGRAM CREDIBILITY', desc: 'Engagement rate drops. Algorithm punishes inactive responders.', meter: 30, stat: '−38% REACH' },
  { name: 'REPEAT BOOKINGS', desc: 'Returning customer rate falls below industry average. They forget you.', meter: 25, stat: '−24% REPEAT RATE' },
  { name: 'PRICING POWER', desc: "Without strong reviews, you can't charge premium. You discount to compete.", meter: 38, stat: '−18% AVG DAILY RATE' },
  { name: 'STAFF MORALE', desc: 'Your team handles chaos manually. Turnover spikes. Hiring costs rise.', meter: 33, stat: '−2 STAFF QUIT THIS YEAR' },
];

function DamageMeter({ percent, animate }: { percent: number, animate: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) { const t = setTimeout(() => setWidth(percent), 200); return () => clearTimeout(t); }
    setWidth(percent);
  }, [animate, percent]);
  return (
    <div className="relative rounded-full overflow-hidden" style={{ height: 6, background: '#F1F5F9' }}>
      <div className="h-full rounded-full" style={{ width: `${width}%`, background: 'linear-gradient(90deg, #10B981, #84CC16)', transition: animate ? 'width 1.2s cubic-bezier(0.16,1,0.3,1)' : 'none' }} />
    </div>
  );
}

export const TheLeak = () => {
  const [leakIdx, setLeakIdx] = useState(0);
  const [repIdx, setRepIdx] = useState(0);
  const [total, setTotal] = useState(0);
  const [visibleLeaks, setVisibleLeaks] = useState([0, 1, 2]);
  const [leakAnimating, setLeakAnimating] = useState(false);
  const [repAnimating, setRepAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeakAnimating(true);
      setTimeout(() => {
        const nextIdx = (leakIdx + 1) % FINANCIAL_LEAKS.length;
        setLeakIdx(nextIdx);
        setTotal(prev => prev + FINANCIAL_LEAKS[nextIdx].amount);
        setVisibleLeaks(prev => [prev[1], prev[2], (prev[2] + 1) % FINANCIAL_LEAKS.length]);
        setLeakAnimating(false);
      }, 600);
    }, 3000);
    return () => clearInterval(interval);
  }, [leakIdx, visibleLeaks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRepAnimating(false);
      setTimeout(() => { setRepIdx(i => (i + 1) % REPUTATION_DAMAGES.length); setRepAnimating(true); }, 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentRep = REPUTATION_DAMAGES[repIdx];
  const formattedTotal = `−$${(84600 + total).toLocaleString()}`;

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Section header ── */}
        <div className="flex justify-center mb-4">
          <SectionPill>THE LEAK</SectionPill>
        </div>
        <h2 className="font-sans font-bold text-center mb-2" style={{ fontSize: 'clamp(28px,4vw,42px)', color: '#0A2620', lineHeight: 1.15 }}>
          Every month,{' '}
          <span className="font-mono text-gradient font-extrabold">−$77,000</span>
          {' '}walks out the back door.
        </h2>
        <p className="text-center text-sm italic mb-8" style={{ color: '#6B7F78' }}>
          Watch the leaks add up. Then watch what gets damaged.
        </p>

        {/* ── 2-column desktop layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start max-w-6xl mx-auto">

          {/* LEFT — Financial leak calculator */}
          <div className="rounded-3xl overflow-hidden h-full flex flex-col" style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(16,185,129,0.07)' }}>
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ background: '#F8FFFE', borderColor: '#D1FAE5', flexShrink: 0 }}>
              <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#10B981' }}>
                PROBLEM · {leakIdx + 1}/{FINANCIAL_LEAKS.length}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full font-bold" style={{ background: '#FFF7ED', color: '#EA580C', border: '1px solid #FED7AA' }}>
                AUTO
              </span>
            </div>

            {/* Leak rows */}
            <div className="flex-1">
              {visibleLeaks.map((idx, pos) => {
                const leak = FINANCIAL_LEAKS[idx % FINANCIAL_LEAKS.length];
                const IconComp = LEAK_ICONS[leak.iconKey];
                const isTop = pos === 0;
                return (
                  <div key={`${idx}-${pos}`}
                    className="flex items-center gap-3 border-b"
                    style={{
                      borderColor: '#F1F5F9',
                      padding: '14px 20px',
                      opacity: isTop ? (leakAnimating ? 0 : 0.45) : 1,
                      transform: leakAnimating && isTop ? 'translateY(-100%)' : 'translateY(0)',
                      transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(132,204,22,0.07))', color: '#10B981' }}>
                      {IconComp && <div style={{ width: 16, height: 16 }}><IconComp /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                        <span className="text-xs font-mono font-bold" style={{ color: '#0F172A' }}>{leak.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: '#F0FDF4', color: '#10B981', border: '1px solid #BBF7D0', fontSize: 10 }}>{leak.tag}</span>
                      </div>
                      <p className="text-xs leading-snug truncate" style={{ color: '#64748B' }}>{leak.desc}</p>
                    </div>
                    <span className="font-mono font-bold text-sm flex-shrink-0 text-gradient ml-2">−${leak.amount.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Total bar */}
            <div className="mx-4 mb-4 mt-3 rounded-2xl p-4 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)', flexShrink: 0 }}>
              <div>
                <div className="text-xs font-mono font-bold tracking-widest text-white opacity-90">TOTAL MONTHLY LEAK</div>
                <div className="text-xs italic text-white opacity-70 mt-0.5">All 12 leaks · 8-car avg</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-extrabold text-white" style={{ fontSize: 26 }}>{formattedTotal}</div>
                <div className="text-xs text-white opacity-70">growing</div>
              </div>
            </div>
          </div>

          {/* RIGHT — Reputation damage */}
          <div className="rounded-3xl overflow-hidden h-full flex flex-col" style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ background: '#FFF7ED', borderColor: '#FED7AA', flexShrink: 0 }}>
              <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#EA580C' }}>
                OUTPUT LOSS · {repIdx + 1}/{REPUTATION_DAMAGES.length}
              </span>
              <span className="text-xs italic" style={{ color: '#94A3B8' }}>beyond dollars</span>
            </div>

            {/* Content */}
            <div className="flex-1 p-5">
              <div className="transition-all duration-500"
                style={{ opacity: repAnimating ? 1 : 0.6, transform: repAnimating ? 'translateY(0)' : 'translateY(8px)' }}>
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#FFF7ED', color: '#EA580C' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <p className="font-sans font-bold text-base" style={{ color: '#0F172A' }}>{currentRep.name}</p>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748B' }}>{currentRep.desc}</p>

                {/* Damage bar */}
                <DamageMeter percent={currentRep.meter} animate={repAnimating} />
                <div className="mt-2 font-mono font-bold text-sm text-gradient">{currentRep.stat}</div>
              </div>

              {/* All items list — dimmed */}
              <div className="mt-5 flex flex-col gap-2">
                {REPUTATION_DAMAGES.map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b transition-all"
                    style={{ borderColor: '#F8F8F8', opacity: i === repIdx ? 1 : 0.35 }}>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: i === repIdx ? 'linear-gradient(135deg,#10B981,#84CC16)' : '#CBD5E1' }} />
                      <span className="text-xs font-mono font-semibold" style={{ color: '#475569' }}>{r.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold" style={{ color: i === repIdx ? '#EA580C' : '#94A3B8' }}>{r.stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 flex-shrink-0">
              <p className="text-xs italic font-medium text-center py-3 rounded-2xl" style={{ color: '#EA580C', background: '#FFF7ED', border: '1px solid #FED7AA' }}>
                Some things money can't buy back.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center max-w-6xl mx-auto">
          <CTAButton className="w-full max-w-md justify-center py-4 text-base">
            Aiaura plugs every leak. Run my free audit
          </CTAButton>
        </div>
      </div>
    </section>
  );
};
