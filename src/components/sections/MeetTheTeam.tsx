"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';
import { CTAButton } from '../ui/CTAButton';
import { PhoneCall, MessageSquare, Bot, Target, Calculator, RefreshCcw, Mail, Crown, Star, TrendingUp, Camera, HelpCircle } from 'lucide-react';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

const PRODUCT_ICONS: any = {
  'AI Receptionist': PhoneCall,
  'AI Omnichannel Responder': MessageSquare,
  'AI Website Chatbot': Bot,
  'AI Lead Qualifier': Target,
  'AI Quote & Booking': Calculator,
  'AI Follow-up Assistant': RefreshCcw,
  'AI Email + SMS Marketing': Mail,
  'AI VIP Manager': Crown,
  'AI Review Manager': Star,
  'AI Listing Optimizer': TrendingUp,
  'AI Social Manager': Camera,
  'AI Customer Support': HelpCircle,
};

const DEPARTMENTS = [
  {
    label: 'FRONT DESK', count: 4,
    products: [
      { name: 'AI Receptionist', stat: '47 calls today', caps: ['Picks up calls 24/7','Talks in 22+ languages','Detects caller sentiment in real-time','Pushes leads into your CRM automatically','Live-transfers VIP callers to you','Records and transcribes every call','Handles voicemail follow-up','Routes Spanish calls in Spanish'] },
      { name: 'AI Omnichannel Responder', stat: '312 conversations live', wedge: true, caps: ['Replies on Instagram, SMS, WhatsApp, Email','Auto-DMs Instagram commenters in 4s','Recognizes returning customers across channels','Closes bookings inside the chat','Replies in customer\'s native language','Detects urgency and escalates to you','Handles 8 channels simultaneously','Learns your brand voice over time'] },
      { name: 'AI Website Chatbot', stat: '$94K booked in chat', caps: ['Greets every visitor in their language','Books rentals directly inside chat','Captures email if visitor leaves','Recommends vehicles by use case','Live-handoff to operator if needed','Quotes prices instantly','Answers fleet questions 24/7','Collects lead-qualifying data'] },
      { name: 'AI Lead Qualifier', stat: '218 leads scored', caps: ['Scores leads Hot / Warm / Cold / Junk','Filters tire-kickers automatically','Flags celebrity & corporate inquiries','Validates age and insurance eligibility','Detects fraud signals before deposit','Routes hot leads to you instantly','Auto-declines under-21 bookings','Identifies repeat customer history'] },
    ]
  },
  {
    label: 'SALES & FOLLOW-UP', count: 4,
    products: [
      { name: 'AI Quote & Booking', stat: '312 quotes sent', caps: ['Generates quotes in 6 seconds','Sends Stripe payment links','E-signs contracts via DocuSign','Updates calendar atomically','Handles deposits and full payments','Applies event-driven pricing rules','Calculates multi-day discounts','Sends booking confirmations'] },
      { name: 'AI Follow-up Assistant', stat: '$8.2K recovered', caps: ['Recovers abandoned quotes after 24 hours','Reactivates 90-day past customers','Re-engages on birthdays & anniversaries','Cross-channel nudges (DM → SMS → Email)','Stops the moment customer replies','Personalized timing per customer','A/B tests follow-up messages','Tracks open and reply rates'] },
      { name: 'AI Email + SMS Marketing', stat: '247 contacts emailed', caps: ['Builds campaigns from a 1-line prompt','Texts past customers TCPA-compliantly','Auto-sends event-driven campaigns','Replies to interested leads automatically','A/B tests subject lines silently','Segments customers by tier','Schedules sends in customer time zones','Tracks campaign ROI per send'] },
      { name: 'AI VIP Manager', stat: '12 VIPs active', caps: ['Tracks Silver / Gold / Platinum tiers','Remembers preferences per customer','Sends birthday & anniversary surprises','Reactivates Platinums automatically','Concierge-level recommendations','Auto-upgrades repeat renters','Tracks LTV per customer','Flags at-risk Platinum customers'] },
    ]
  },
  {
    label: 'REPUTATION & GROWTH', count: 4,
    products: [
      { name: 'AI Review Manager', stat: '184 reviews captured', caps: ['Asks happy customers for Google reviews','Intercepts negative reviews privately','Replies to every review in your voice','Escalates 1-star reviews to you','Tracks review velocity weekly','Routes complaints to service recovery','Builds review templates per scenario','Monitors competitor review trends'] },
      { name: 'AI Listing Optimizer', stat: '+31% Google clicks', caps: ['Updates Google Business Profile weekly','Posts fresh photos and offers','Optimizes for local AI search','Tracks keyword ranking shifts','Audits competitors monthly','Updates Yelp + TripAdvisor in sync','Generates local SEO content','Monitors map-pack ranking'] },
      { name: 'AI Social Manager', stat: '42 Reels posted', caps: ['Posts daily Reels and stories','Writes captions in your voice','Replies to comments automatically','Generates Reels from new fleet additions','Tracks engagement and adjusts cadence','Schedules optimal posting times','Repurposes content across platforms','Monitors hashtag performance'] },
      { name: 'AI Customer Support', stat: '1.4K tickets resolved', caps: ['Handles mid-rental issues at 3 AM','Walks customers through damage reports','Coordinates roadside and tow services','Verifies returns with photo evidence','Escalates emergencies to you instantly','Resolves billing disputes','Manages refund requests','Tracks satisfaction per ticket'] },
    ]
  }
];

// Department-level auto-rotating card showcase
function DeptShowcase({ dept }: { dept: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % dept.products.length);
        setFade(true);
      }, 300);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dept.products.length]);

  const goTo = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFade(false);
    setTimeout(() => { setActiveIdx(i); setFade(true); startTimer(); }, 200);
  };

  const product = dept.products[activeIdx];
  const IconComp = PRODUCT_ICONS[product.name];

  return (
    <div>
      {/* Dept header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D1FAE5)' }} />
        <span className="text-xs font-mono font-bold tracking-widest flex-shrink-0" style={{ color: '#10B981' }}>
          {dept.label} · {dept.count} STAFF
        </span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #D1FAE5, transparent)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: premium featured card */}
        <div className="relative overflow-hidden rounded-3xl" style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(16,185,129,0.08)',
          minHeight: 260,
          transition: 'opacity 0.3s ease',
          opacity: fade ? 1 : 0,
        }}>
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />

          <div className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                {IconComp && <div style={{ width: 22, height: 22, color: 'white' }}><IconComp /></div>}
              </div>
              {product.wedge && (
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>WEDGE</span>
              )}
            </div>

            <h3 className="font-sans font-bold text-base mb-2" style={{ color: '#ffffff' }}>{product.name}</h3>

            <div className="flex-1">
              <CapabilityList caps={product.caps} />
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <PulseDot size={5} />
              <span className="font-mono text-xs font-bold" style={{ color: '#10B981' }}>{product.stat}</span>
            </div>
          </div>
        </div>

        {/* Right: product nav tabs */}
        <div className="flex flex-col gap-2">
          {dept.products.map((p: any, i: number) => {
            const PIcomp = PRODUCT_ICONS[p.name];
            const isActive = i === activeIdx;
            return (
              <button key={i} onClick={() => goTo(i)}
                className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
                style={{
                  background: isActive ? '#F0FDF4' : '#ffffff',
                  border: isActive ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                  boxShadow: isActive ? '0 4px 16px rgba(16,185,129,0.12)' : 'none',
                  transform: isActive ? 'scale(1.01)' : 'scale(1)',
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isActive ? 'linear-gradient(135deg, #10B981, #84CC16)' : '#F1F5F9', color: isActive ? 'white' : '#64748B' }}>
                  {PIcomp && <div style={{ width: 16, height: 16 }}><PIcomp /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-sm leading-tight truncate" style={{ color: isActive ? '#0F172A' : '#475569' }}>{p.name}</p>
                  {isActive && <p className="text-xs font-mono mt-0.5 text-gradient font-bold">{p.stat}</p>}
                </div>
                {isActive && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CapabilityList({ caps }: { caps: string[] }) {
  const [visibleIdx, setVisibleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIdx(i => (i + 1) % caps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [caps.length]);

  return (
    <div className="flex flex-col gap-1.5">
      {caps.slice(0, 6).map((cap, i) => {
        const isCurrent = i % 6 === visibleIdx % 6;
        return (
          <div key={i} className="flex items-center gap-2 transition-all"
            style={{ opacity: isCurrent ? 1 : 0.45, transform: isCurrent ? 'translateX(0)' : 'translateX(-2px)' }}>
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: isCurrent ? 'linear-gradient(135deg, #10B981, #84CC16)' : 'rgba(16,185,129,0.2)' }}>
              <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                <polyline points="1 5 4 8 9 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs leading-snug" style={{ color: isCurrent ? '#E2E8F0' : '#94A3B8' }}>{cap}</span>
          </div>
        );
      })}
    </div>
  );
}

export const MeetTheTeam = () => {
  return (
    <section id="features" className="py-16 md:py-20 bg-bg-mint/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-4">
          <SectionPill>YOUR AI TEAM</SectionPill>
        </div>
        <h2 className="font-sans font-bold text-center mb-2" style={{ fontSize: 'clamp(30px,5vw,44px)', color: '#0A2620', lineHeight: 1.15 }}>
          <span style={{ color: '#10B981', fontWeight: 800 }}>12 specialists.</span>{' '}
          <GradientText italic>One platform.</GradientText>
        </h2>

        <p className="text-center text-base mb-8" style={{ color: '#2D4F47', lineHeight: 1.55, maxWidth: 520, margin: '0 auto 2rem' }}>
          Trained on your business. Working 24/7. Replace 8 vendors with one.
        </p>

        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {DEPARTMENTS.map((dept, di) => (
            <DeptShowcase key={di} dept={dept} />
          ))}
        </div>

        <div className="h-px my-8 max-w-5xl mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #10B981 20%, #84CC16 80%, transparent)' }} />
        <div className="flex justify-center">
          <CTAButton className="py-4 px-10 text-base">See what they can do for you</CTAButton>
        </div>
      </div>
    </section>
  );
};
