"use client";

import React, { useState, useEffect, useRef } from 'react';

const Icon = ({ children }: any) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

// ── All agents with multiple capability lines ──────────────────────────────
const AGENTS = [
  {
    category: 'FRONT DESK',
    items: [
      {
        name: 'Receptionist',
        lines: [
          'Picks up every call 24/7',
          'Talks in 22+ languages',
          'Detects caller sentiment in real-time',
          'Live-transfers VIP callers to you',
          'Records and transcribes every call',
          'Handles voicemail follow-up',
        ],
        icon: <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>,
      },
      {
        name: 'Omnichannel Responder',
        lines: [
          'Replies on Instagram, SMS, WhatsApp, Email',
          'Auto-DMs Instagram commenters in 4s',
          'Closes bookings inside the chat',
          'Replies in customer\'s native language',
          'Detects urgency and escalates to you',
          'Handles 8 channels simultaneously',
        ],
        icon: <Icon><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>,
      },
      {
        name: 'Website Chatbot',
        lines: [
          'Converts every landing page visit',
          'Books rentals directly inside chat',
          'Captures email if visitor leaves',
          'Quotes prices instantly',
          'Answers fleet questions 24/7',
          'Collects lead-qualifying data',
        ],
        icon: <Icon><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M8 8h5"/></Icon>,
      },
      {
        name: 'Lead Qualifier',
        lines: [
          'Identifies urgent customer leads',
          'Scores leads Hot / Warm / Cold / Junk',
          'Filters tire-kickers automatically',
          'Flags celebrity & corporate inquiries',
          'Detects fraud signals before deposit',
          'Routes hot leads to you instantly',
        ],
        icon: <Icon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>,
      },
    ],
  },
  {
    category: 'SALES & FOLLOW-UP',
    items: [
      {
        name: 'Quote & Booking',
        lines: [
          'Generates quotes in 6 seconds',
          'Sends Stripe payment links',
          'E-signs contracts via DocuSign',
          'Handles deposits and full payments',
          'Applies event-driven pricing rules',
          'Sends booking confirmations',
        ],
        icon: <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>,
      },
      {
        name: 'Follow-up',
        lines: [
          'Recovers abandoned quotes after 24h',
          'Reactivates 90-day past customers',
          'Re-engages on birthdays & anniversaries',
          'Cross-channel nudges: DM → SMS → Email',
          'Stops the moment customer replies',
          'Tracks open and reply rates',
        ],
        icon: <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>,
      },
      {
        name: 'VIP Manager',
        lines: [
          'Tracks Silver / Gold / Platinum tiers',
          'Remembers preferences per customer',
          'Sends birthday & anniversary surprises',
          'Reactivates Platinums automatically',
          'Auto-upgrades repeat renters',
          'Flags at-risk Platinum customers',
        ],
        icon: <Icon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>,
        wide: true,
      },
    ],
  },
  {
    category: 'REPUTATION',
    items: [
      {
        name: 'Review Manager',
        lines: [
          'Asks happy customers for Google reviews',
          'Intercepts negative reviews privately',
          'Replies to every review in your voice',
          'Escalates 1-star reviews to you',
          'Monitors competitor review trends',
          'Builds review templates per scenario',
        ],
        icon: <Icon><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></Icon>,
      },
      {
        name: 'List Optimizer',
        lines: [
          'Updates Google Business Profile weekly',
          'Posts fresh photos and offers',
          'Optimizes for local AI search',
          'Tracks keyword ranking shifts',
          'Automates local SEO content',
          'Monitors map-pack ranking',
        ],
        icon: <Icon><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>,
      },
      {
        name: 'Customer Support',
        lines: [
          'Handles mid-rental issues at 3 AM',
          'Walks customers through damage reports',
          'Coordinates roadside and tow services',
          'Resolves billing disputes',
          'Manages refund requests',
          'Tracks satisfaction per ticket',
        ],
        icon: <Icon><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Icon>,
        wide: true,
      },
    ],
  },
  {
    category: 'CHANNEL 1',
    items: [
      {
        name: 'Email + Text Sender',
        lines: [
          'Builds campaigns from a 1-line prompt',
          'Texts past customers TCPA-compliantly',
          'Segments customers by tier',
          'Schedules sends in customer time zones',
          'A/B tests subject lines silently',
          'Tracks campaign ROI per send',
        ],
        icon: <Icon><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Icon>,
      },
      {
        name: 'AEO/GEO',
        lines: [
          'Optimizes brand for AI-driven organic content',
          'Gets listed in ChatGPT & Perplexity answers',
          'Targets "best rental in [city]" queries',
          'Builds geo-specific landing content',
          'Tracks AI search visibility weekly',
          'Outranks competitors in AI overviews',
        ],
        icon: <Icon><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></Icon>,
      },
    ],
  },
  {
    category: 'CHANNEL 2',
    items: [
      {
        name: 'Social Manager',
        lines: [
          'Posts daily Reels and stories',
          'Writes captions in your voice',
          'Replies to comments automatically',
          'Repurposes content across platforms',
          'Schedules optimal posting times',
          'Monitors hashtag performance',
        ],
        icon: <Icon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></Icon>,
      },
      {
        name: 'Quote Slides',
        lines: [
          'Auto-creates visual quote decks',
          'Updates pricing in real-time',
          'Showcases fleet with branded slides',
          'Sends via DM, email, or link',
          'Tracks when prospects open them',
          'Personalizes per customer inquiry',
        ],
        icon: <Icon><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></Icon>,
      },
    ],
  },
  {
    category: 'CHANNEL 3',
    items: [
      {
        name: 'Vehicle Tracking',
        lines: [
          'Monitors when customers cross business boundary',
          'Sends geo-triggered alerts to operator',
          'Tracks real-time fleet location',
          'Detects unauthorized zone exits',
          'Logs mileage per rental automatically',
          'Integrates with your existing GPS',
        ],
        icon: <Icon><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>,
        wide: true,
      },
      {
        name: 'Finance & Insurance Verification',
        lines: [
          'Ensures verification works for every customer',
          'Validates insurance in under 60 seconds',
          'Flags expired or invalid policies',
          'Checks credit and deposit eligibility',
          'Stores verified docs securely',
          'Reduces chargeback risk by 80%',
        ],
        icon: <Icon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>,
        wide: true,
      },
    ],
  },
];

// ── Cycling line ticker inside each card ──────────────────────────────────
function CyclingLine({ lines, offset = 0 }: { lines: string[]; offset?: number }) {
  const [idx, setIdx] = useState(offset % lines.length);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // stagger start by offset * 600ms
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIdx(i => (i + 1) % lines.length);
          setVisible(true);
        }, 300);
      }, 2200);
      return () => clearInterval(interval);
    }, (offset % 4) * 550);
    return () => clearTimeout(delay);
  }, [lines.length, offset]);

  return (
    <p style={{
      color: 'rgba(255,255,255,0.75)',
      fontSize: 11,
      marginTop: 3,
      lineHeight: 1.4,
      minHeight: 16,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(4px)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
    }}>
      {lines[idx]}
    </p>
  );
}

// ── Category pill ─────────────────────────────────────────────────────────
const CategoryPill = ({ label }: { label: string }) => (
  <div className="flex justify-center my-5">
    <span style={{
      display: 'inline-block',
      padding: '5px 20px', borderRadius: 40,
      border: '1.5px solid rgba(255,255,255,0.5)',
      color: 'white', fontSize: 12, fontWeight: 700,
      fontStyle: 'italic', letterSpacing: '0.05em',
      background: 'rgba(255,255,255,0.1)',
    }}>{label}</span>
  </div>
);

// ── Agent card ────────────────────────────────────────────────────────────
let globalCardIdx = 0;
const AgentCard = ({ item, wide, cardIdx }: { item: any; wide?: boolean; cardIdx: number }) => (
  <div style={{
    gridColumn: wide ? 'span 2' : 'span 1',
    background: 'rgba(255,255,255,0.15)',
    border: '1.5px solid rgba(255,255,255,0.3)',
    borderRadius: 16,
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  }}>
    {/* Icon box */}
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: 'rgba(255,255,255,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {item.icon}
    </div>
    {/* Text */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{item.name}</p>
      <CyclingLine lines={item.lines} offset={cardIdx} />
    </div>
  </div>
);

// ── Main section ──────────────────────────────────────────────────────────
export const MeetTheTeam = () => {
  // assign a stable index to each card for staggered offsets
  let cardCounter = 0;

  return (
    <section
      id="features"
      style={{
        background: 'linear-gradient(135deg, #5DD62C 0%, #6EE832 60%, #84E040 100%)',
        padding: '56px 0 48px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>

        {/* Top pill */}
        <div className="flex justify-center mb-6">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 18px', borderRadius: 40,
            border: '1.5px solid rgba(255,255,255,0.6)',
            color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            background: 'rgba(255,255,255,0.15)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
            YOUR AI SOLUTIONS
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          textAlign: 'center', color: 'white',
          fontSize: 'clamp(28px,5vw,40px)', fontWeight: 800,
          lineHeight: 1.15, marginBottom: 10,
        }}>
          17 AI specialists.{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 800 }}>One platform.</span>
        </h2>

        {/* Subheading */}
        <p style={{
          textAlign: 'center', color: 'rgba(255,255,255,0.85)',
          fontSize: 13, lineHeight: 1.6, marginBottom: 8,
        }}>
          Trained on your business. Working 24/7. Replaces<br />
          8+ vendors with one.
        </p>

        {/* Agent groups */}
        {AGENTS.map((group, gi) => (
          <div key={gi}>
            <CategoryPill label={group.category} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {group.items.map((item, ii) => {
                const idx = cardCounter++;
                return <AgentCard key={ii} item={item} wide={item.wide} cardIdx={idx} />;
              })}
            </div>
          </div>
        ))}

        {/* Bottom pill */}
        <div className="flex justify-center mt-8">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 22px', borderRadius: 40,
            border: '1.5px solid rgba(255,255,255,0.6)',
            color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
            background: 'rgba(255,255,255,0.15)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
            MORE SOLUTIONS IN THE PIPELINE
          </span>
        </div>

      </div>
    </section>
  );
};



