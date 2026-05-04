"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Check } from 'lucide-react';

/* ─── TEMP STUBS (replace with your actual imports) ─── */
const CTAButton = ({ className, children }: any) => (
  <button className={`px-6 py-3 rounded-full font-semibold text-white ${className}`}
    style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
    {children}
  </button>
);

/* ─── SHARED ATOMS ─── */
const PulseDot = ({ size = 6 }: { size?: number }) => (
  <div
    className="rounded-full animate-pulse"
    style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }}
  />
);

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span
    className={className}
    style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
  >
    {children}
  </span>
);

/* ─── GLOBAL KEYFRAMES injected once ─── */
const GlobalStyles = () => (
  <style>{`
    @keyframes callWave {
      0%, 100% { transform: scaleY(0.18); }
      50%       { transform: scaleY(1); }
    }
    @keyframes waveDance {
      0%, 100% { transform: scaleY(0.4); }
      50%       { transform: scaleY(1); }
    }
    @keyframes msgIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes trust-marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes trust-marquee-rev {
      0%   { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    @keyframes gmailFadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes replySlide {
      from { max-height: 0; opacity: 0; }
      to   { max-height: 220px; opacity: 1; }
    }
    .msg-in { animation: msgIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
    .channel-tabs::-webkit-scrollbar { display: none; }
  `}</style>
);

/* ─── DATA ─── */
const PILL_MESSAGES = [
  "Aiaura is answering an Instagram DM in Miami right now",
  "Aiaura just booked a $4,800 weekend rental in Las Vegas",
  "Aiaura collected 3 Google reviews in the last hour",
  "Aiaura responded to 47 Instagram DMs today in LA",
  "Aiaura answered a 2:14 AM call in Scottsdale",
  "Aiaura flagged a fraud attempt before deposit cleared",
  "Aiaura sent a quote in 6 seconds for a Lambo Aventador",
  "Aiaura just closed a 3-day Range Rover rental in Atlanta",
  "Aiaura recovered a lost lead from 9 days ago",
  "Aiaura replied to 14 messages while the operator slept",
  "Aiaura is handling 312 live conversations across 47 US cities",
  "Aiaura just sent a $26,400 wedding party quote in NYC",
];

const CHANNELS = [
  {
    id: 'instagram',
    messages: [
      { from: 'customer', text: 'Yo is the Lambo Aventador available May 5?' },
      { from: 'ai',       text: 'Yes! May 5 confirmed. $4,800/day with 100 miles included. 1 day or longer?' },
      { from: 'customer', text: '3 days, May 5–7' },
      { from: 'ai',       text: '$14,400 + $5K deposit. Sending booking link now…' },
    ],
    responseTime: '4s',
  },
  {
    id: 'sms',
    messages: [
      { from: 'customer', text: 'How much for Range Rover this weekend?' },
      { from: 'ai',       text: 'Range Rover Sport — $1,200/day, weekend rate. Total $3,600. Want to lock it in?' },
      { from: 'customer', text: 'Yes please' },
      { from: 'ai',       text: 'Sending Stripe link now. Takes 90 seconds.' },
    ],
    responseTime: '6s',
  },
  {
    id: 'whatsapp',
    messages: [
      { from: 'ai',       text: "Hey Ash, Happy Valentine's Day! Wishing you a great one. Here's a special 50% gift voucher from us for this special day.", timestamp: '12:00 AM' },
      { from: 'customer', text: '', isVoice: true, duration: '0:08', timestamp: '9:00 AM' },
      { from: 'ai',       text: '', isVoice: true, duration: '0:11', timestamp: '9:00 AM' },
    ],
    responseTime: '6s',
  },
  {
    id: 'call',
    messages: [
      { from: 'customer', text: 'I need a McLaren this weekend' },
      { from: 'ai',       text: 'Yes, the McLaren 720S is available. When do you need it?' },
      { from: 'customer', text: 'Friday to Sunday, 3 days' },
      { from: 'ai',       text: '$3,600 per day, $10,800 total. Want me to send the booking link?' },
    ],
    responseTime: 'Live call',
  },
  {
    id: 'email',
    messages: [
      { from: 'customer', text: "I'm coordinating a wedding May 25–30 and need 6 luxury vehicles. Can you accommodate?" },
      { from: 'ai',       text: 'Hi Sarah! Congrats on the wedding. For May 25-30 we have: Aventador, Range Rover, G-Wagon, Bentley + 2 more. Group rate: $48,000. Want a quick call?' },
    ],
    responseTime: '22s',
  },
];

/* ─── AIAURA BADGE ─── */
function AiauraBadge({ responseTime }: { responseTime: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
      style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#10B981">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
      AIAURA · {responseTime}
    </div>
  );
}

/* ─── CHANNEL TABS ─── */
function ChannelTabs({ activeChannel, onChannelChange }: { activeChannel: string; onChannelChange: (id: string) => void }) {
  const tabs = [
    { id: 'instagram', label: 'INSTAGRAM' },
    { id: 'sms',       label: 'TEXT' },
    { id: 'whatsapp',  label: 'WHATSAPP' },
    { id: 'call',      label: 'PHONE CALL' },
    { id: 'email',     label: 'GMAIL' },
  ];
  return (
    <div
      className="flex gap-1 overflow-x-auto channel-tabs"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', padding: 'clamp(8px, 2vw, 12px) clamp(8px, 2vw, 12px) 0' } as React.CSSProperties}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChannelChange(tab.id)}
          style={{
            background:   tab.id === activeChannel ? 'rgba(16,185,129,0.1)' : 'transparent',
            color:        tab.id === activeChannel ? '#065F46' : '#94A3B8',
            border:       tab.id === activeChannel ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
            borderRadius: 999,
            padding:      'clamp(4px, 1.5vw, 6px) clamp(8px, 2.5vw, 12px)',
            fontSize:     'clamp(9px, 2.2vw, 11px)',
            fontFamily:   'ui-monospace, monospace',
            fontWeight:   600,
            letterSpacing: '0.06em',
            whiteSpace:   'nowrap',
            cursor:       'pointer',
            transition:   'all 0.2s',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── WAVEFORM (WhatsApp / shared) ─── */
function Waveform({ heights, color = '#8696A0' }: { heights: number[]; color?: string }) {
  return (
    <div className="flex items-center gap-0.5" style={{ height: 20 }}>
      {heights.map((h, idx) => (
        <div
          key={idx}
          style={{
            width: 2,
            height: h * 2,
            background: color,
            borderRadius: 2,
            animation: `waveDance 1.5s ease-in-out infinite`,
            animationDelay: `${idx * 0.07}s`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB 1 — INSTAGRAM DM
══════════════════════════════════════════ */
function InstagramCard({ step, typedText, isTyping }: { step: number; typedText: string; isTyping: boolean }) {
  return (
    <div
      className="rounded-[18px] overflow-hidden flex flex-col h-full"
      style={{ background: 'linear-gradient(180deg, #1C1C1E, #2C2C2E)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3" style={{ borderBottom: '1px solid #262626' }}>
        <span className="text-white text-base sm:text-lg">←</span>
        {/* Gradient ring avatar */}
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)', padding: 2 }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#1C1C1E' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white" className="sm:w-[15px] sm:h-[15px]">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-xs sm:text-sm font-semibold leading-none truncate">Mark Thompson</div>
          <div className="text-[10px] sm:text-[11px] mt-0.5 flex items-center gap-1" style={{ color: '#A8A8A8' }}>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: '#25D366' }} />
            Active now
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="sm:w-[22px] sm:h-[22px] hidden sm:block">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.4 1.13 2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="sm:w-[22px] sm:h-[22px]">
          <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
        </svg>
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-2 sm:gap-2.5 overflow-hidden">
        {step >= 1 && (
          <div className="flex items-end gap-1.5 sm:gap-2 justify-start msg-in">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold"
              style={{ background: 'linear-gradient(45deg, #F58529, #DC2743, #BC1888)' }}>M</div>
            <div style={{ background: '#3A3A3C', color: 'white', borderRadius: '18px 18px 18px 4px' }}
              className="text-xs sm:text-sm max-w-[78%] px-2.5 py-2 sm:px-3.5 sm:py-2.5 leading-snug">
              Yo is the Lambo Aventador available May 5?
            </div>
            <span className="text-[9px] sm:text-[10px] self-end mb-0.5" style={{ color: '#6B6B6B' }}>11:47 PM</span>
          </div>
        )}
        {step >= 2 && (
          <div className="flex flex-col items-end gap-0.5 msg-in">
            <div style={{ background: 'linear-gradient(135deg, #DD2A7B, #8134AF)', color: 'white', borderRadius: '18px 18px 4px 18px' }}
              className="text-xs sm:text-sm max-w-[78%] px-2.5 py-2 sm:px-3.5 sm:py-2.5 leading-snug">
              Yes! May 5 confirmed. $4,800/day with 100 miles included. 1 day or longer?
            </div>
            <span className="text-[9px] sm:text-[10px]" style={{ color: '#6B6B6B' }}>11:47 PM · Aiaura · 4s response</span>
          </div>
        )}
        {step >= 3 && (
          <div className="flex items-end gap-1.5 sm:gap-2 justify-start msg-in">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold"
              style={{ background: 'linear-gradient(45deg, #F58529, #DC2743, #BC1888)' }}>M</div>
            <div style={{ background: '#3A3A3C', color: 'white', borderRadius: '18px 18px 18px 4px' }}
              className="text-xs sm:text-sm max-w-[78%] px-2.5 py-2 sm:px-3.5 sm:py-2.5 leading-snug">
              3 days, May 5–7
            </div>
            <span className="text-[9px] sm:text-[10px] self-end mb-0.5" style={{ color: '#6B6B6B' }}>11:48 PM</span>
          </div>
        )}
        {step >= 4 && (
          <div className="flex flex-col items-end gap-0.5 msg-in">
            <div style={{ background: 'linear-gradient(135deg, #DD2A7B, #8134AF)', color: 'white', borderRadius: '18px 18px 4px 18px' }}
              className="text-xs sm:text-sm max-w-[78%] px-2.5 py-2 sm:px-3.5 sm:py-2.5 leading-snug">
              $14,400 + $5K deposit. Sending booking link now…
            </div>
            <span className="text-[9px] sm:text-[10px]" style={{ color: '#6B6B6B' }}>11:48 PM · Aiaura · 6s response</span>
          </div>
        )}
        {isTyping && (
          <div className="flex justify-end msg-in">
            <div style={{ background: 'linear-gradient(135deg, #DD2A7B, #8134AF)', color: 'white', borderRadius: '18px 18px 4px 18px' }}
              className="text-xs sm:text-sm max-w-[78%] px-2.5 py-2 sm:px-3.5 sm:py-2.5">
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3" style={{ borderTop: '1px solid #262626' }}>
        <div className="flex-1 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px]"
          style={{ background: '#1A1A1A', color: '#737373', border: '1px solid #363636' }}>
          Message...
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" className="sm:w-[24px] sm:h-[24px]">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </div>

      {step >= 2 && <div className="px-3 sm:px-4 pb-1.5 sm:pb-2"><AiauraBadge responseTime="4s" /></div>}
      {step >= 4 && (
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-[11px]" style={{ color: '#A8A8A8' }}>
          <GradientText>$14,400</GradientText> booked from a DM at 11:47 PM
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB 2 — SMS / iMESSAGE
══════════════════════════════════════════ */
function IMessageCard({ step, typedText, isTyping }: { step: number; typedText: string; isTyping: boolean }) {
  return (
    <div className="rounded-[18px] overflow-hidden flex flex-col h-full"
      style={{ background: '#FFFFFF', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
      {/* Header */}
      <div className="flex flex-col items-center py-2 sm:py-3 px-3 sm:px-4" style={{ borderBottom: '1px solid #E8EAED' }}>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold mb-1 text-xs sm:text-base"
          style={{ background: 'linear-gradient(135deg, #6B7280, #9CA3AF)' }}>MT</div>
        <div className="text-black text-xs sm:text-sm font-semibold">+1 (305) 555-0184</div>
        <div className="text-[10px] sm:text-[11px]" style={{ color: '#8E8E93' }}>Text Message · SMS</div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-1.5 sm:gap-2">
        {step >= 1 && (
          <div className="flex flex-col items-start msg-in">
            <div className="text-xs sm:text-sm max-w-[78%] px-3 sm:px-4 py-2 sm:py-2.5 leading-snug"
              style={{ background: '#E9E9EB', color: '#000', borderRadius: '18px 18px 18px 4px' }}>
              How much for Range Rover this weekend?
            </div>
            <span className="text-[9px] sm:text-[10px] mt-0.5 ml-1" style={{ color: '#8E8E93' }}>Sat 9:14 PM</span>
          </div>
        )}
        {step >= 2 && (
          <div className="flex flex-col items-end msg-in">
            <div className="text-xs sm:text-sm max-w-[78%] px-3 sm:px-4 py-2 sm:py-2.5 leading-snug"
              style={{ background: 'linear-gradient(180deg, #4ADE5C, #22C55E)', color: 'white', borderRadius: '18px 18px 4px 18px' }}>
              Range Rover Sport — $1,200/day, weekend rate. Total $3,600. Want to lock it in?
            </div>
            <span className="text-[9px] sm:text-[10px] mt-0.5 mr-1" style={{ color: '#8E8E93' }}>Delivered · Aiaura · 6s response</span>
          </div>
        )}
        {step >= 3 && (
          <div className="flex flex-col items-start msg-in">
            <div className="text-xs sm:text-sm max-w-[78%] px-3 sm:px-4 py-2 sm:py-2.5 leading-snug"
              style={{ background: '#E9E9EB', color: '#000', borderRadius: '18px 18px 18px 4px' }}>
              Yes please
            </div>
            <span className="text-[9px] sm:text-[10px] mt-0.5 ml-1" style={{ color: '#8E8E93' }}>Sat 9:15 PM</span>
          </div>
        )}
        {step >= 4 && (
          <div className="flex flex-col items-end msg-in">
            <div className="text-xs sm:text-sm max-w-[78%] px-3 sm:px-4 py-2 sm:py-2.5 leading-snug"
              style={{ background: 'linear-gradient(180deg, #4ADE5C, #22C55E)', color: 'white', borderRadius: '18px 18px 4px 18px' }}>
              Sending Stripe link now. Takes 90 seconds.
            </div>
            <span className="text-[9px] sm:text-[10px] mt-0.5 mr-1" style={{ color: '#8E8E93' }}>Aiaura · 4s response</span>
          </div>
        )}
        {isTyping && (
          <div className="flex justify-end msg-in">
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white"
              style={{ background: 'linear-gradient(180deg, #4ADE5C, #22C55E)', borderRadius: '18px 18px 4px 18px' }}>
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3" style={{ borderTop: '1px solid #E8EAED' }}>
        <div className="flex-1 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px]"
          style={{ background: '#F8F9FA', color: '#636366', border: '1px solid #E8EAED' }}>
          iMessage
        </div>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ background: '#007AFF' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="sm:w-[14px] sm:h-[14px]"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
        </div>
      </div>

      {step >= 2 && <div className="px-3 sm:px-4 pb-1.5 sm:pb-2"><AiauraBadge responseTime="6s" /></div>}
      {step >= 4 && (
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-[11px]" style={{ color: '#8E8E93' }}>
          <GradientText>$3,600</GradientText> weekend booking — F1 weekend Vegas
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB 3 — WHATSAPP
══════════════════════════════════════════ */
const WA_WALLPAPER = `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.18'%3E%3C!-- face --%3E%3Ccircle cx='30' cy='30' r='12'/%3E%3Ccircle cx='26' cy='27' r='2'/%3E%3Ccircle cx='34' cy='27' r='2'/%3E%3Cpath d='M26 35 Q30 39 34 35' stroke='%23000' stroke-width='1.5' fill='none'/%3E%3C!-- palm --%3E%3Crect x='85' y='10' width='4' height='22' rx='2'/%3E%3Cellipse cx='87' cy='10' rx='10' ry='6' transform='rotate(-20 87 10)'/%3E%3Cellipse cx='87' cy='10' rx='10' ry='6' transform='rotate(20 87 10)'/%3E%3C!-- flower --%3E%3Ccircle cx='150' cy='40' r='4'/%3E%3Ccircle cx='150' cy='30' r='3'/%3E%3Ccircle cx='150' cy='50' r='3'/%3E%3Ccircle cx='140' cy='40' r='3'/%3E%3Ccircle cx='160' cy='40' r='3'/%3E%3C!-- face 2 --%3E%3Ccircle cx='120' cy='120' r='12'/%3E%3Ccircle cx='116' cy='117' r='2'/%3E%3Ccircle cx='124' cy='117' r='2'/%3E%3Cpath d='M116 125 Q120 129 124 125' stroke='%23000' stroke-width='1.5' fill='none'/%3E%3C!-- palm 2 --%3E%3Crect x='45' y='130' width='4' height='22' rx='2'/%3E%3Cellipse cx='47' cy='130' rx='10' ry='6' transform='rotate(-20 47 130)'/%3E%3Cellipse cx='47' cy='130' rx='10' ry='6' transform='rotate(20 47 130)'/%3E%3C!-- flower 2 --%3E%3Ccircle cx='160' cy='150' r='4'/%3E%3Ccircle cx='160' cy='140' r='3'/%3E%3Ccircle cx='160' cy='160' r='3'/%3E%3Ccircle cx='150' cy='150' r='3'/%3E%3Ccircle cx='170' cy='150' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

function WhatsAppCard({ step, typedText, isTyping }: { step: number; typedText: string; isTyping: boolean }) {
  const waveHeights1 = [3, 6, 4, 8, 5, 7, 3, 6, 4, 5, 3, 4, 6, 5, 7];
  const waveHeights2 = [4, 7, 5, 6, 8, 4, 6, 5, 7, 4, 5, 6, 4, 7, 5];

  return (
    <div
      className="rounded-[18px] overflow-hidden flex flex-col h-full"
      style={{
        background: '#ECE5DD',
        backgroundImage: WA_WALLPAPER,
        backgroundSize: '180px 180px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3"
        style={{ background: '#075E54', borderBottom: '1px solid #2A3942' }}>
        <span className="text-white text-base sm:text-lg">←</span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #DAB6FC, #B59CE0)' }}>VC</div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-xs sm:text-sm font-semibold truncate">VIP Client</div>
          <div className="text-[10px] sm:text-[11px] flex items-center gap-1" style={{ color: '#8696A0' }}>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: '#25D366' }} />online
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2" className="sm:w-[20px] sm:h-[20px] hidden sm:block">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.4 1.13 2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2" className="sm:w-[20px] sm:h-[20px]">
          <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
        </svg>
      </div>

      {/* Messages */}
      <div className="flex-1 px-2 sm:px-3 py-2 sm:py-3 flex flex-col gap-1.5 sm:gap-2">
        {/* Date pill */}
        <div className="flex justify-center">
          <span className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full" style={{ background: 'rgba(24,34,41,0.85)', color: '#8696A0' }}>Today</span>
        </div>

        {/* Aiaura text bubble (outgoing) */}
        {step >= 1 && (
          <div className="flex justify-end msg-in">
            <div className="relative text-xs sm:text-sm max-w-[82%] px-2.5 sm:px-3 py-1.5 sm:py-2 leading-snug"
              style={{ background: '#DCF8C6', color: '#303030', borderRadius: '8px 8px 0 8px' }}>
              Hey Ash, Happy Valentine's Day! Wishing you a great one. Here's a special 50% gift voucher from us for this special day.
              <div className="text-[9px] sm:text-[10px] mt-1 text-right" style={{ color: '#8696A0' }}>✓✓ 12:00 AM</div>
              {/* tail */}
              <div style={{ position: 'absolute', bottom: 0, right: -8, width: 0, height: 0, borderLeft: '8px solid #DCF8C6', borderBottom: '8px solid transparent' }} />
            </div>
          </div>
        )}

        {/* VIP voice note (incoming) */}
        {step >= 2 && (
          <div className="flex justify-start msg-in">
            <div className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: '#FFFFFF', color: '#303030', borderTopLeftRadius: 0 }}>
              {/* tail */}
              <div style={{ position: 'absolute', top: 0, left: -8, width: 0, height: 0, borderRight: '8px solid #FFFFFF', borderTop: '8px solid transparent' }} />
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #DAB6FC, #B59CE0)' }}>
                <span className="text-white text-[9px] sm:text-[10px] font-bold">VC</span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" className="sm:w-[12px] sm:h-[12px]"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <Waveform heights={waveHeights1} color="#8696A0" />
              <span className="text-[9px] sm:text-[10px]" style={{ color: '#8696A0' }}>0:08</span>
              <span className="text-[9px] sm:text-[10px] hidden sm:inline" style={{ color: '#8696A0' }}>9:00 AM</span>
            </div>
          </div>
        )}

        {/* Aiaura voice note (outgoing) */}
        {step >= 3 && (
          <div className="flex justify-end msg-in">
            <div className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: '#DCF8C6', color: '#303030', borderBottomRightRadius: 0 }}>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" className="sm:w-[12px] sm:h-[12px]"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <Waveform heights={waveHeights2} color="#8696A0" />
              <span className="text-[9px] sm:text-[10px]" style={{ color: '#8696A0' }}>0:11</span>
              <span className="text-[9px] sm:text-[10px] hidden sm:inline" style={{ color: '#8696A0' }}>✓✓ 9:00 AM</span>
              {/* tail */}
              <div style={{ position: 'absolute', bottom: 0, right: -8, width: 0, height: 0, borderLeft: '8px solid #DCF8C6', borderBottom: '8px solid transparent' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2" style={{ background: '#F0F0F0' }}>
        <div className="flex-1 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px]" style={{ background: '#FFFFFF', color: '#8696A0' }}>
          Type a message
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{ background: '#00A884' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="sm:w-[18px] sm:h-[18px]"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
        </div>
      </div>

      {step >= 1 && <div className="px-3 sm:px-4 pb-1.5 sm:pb-2"><AiauraBadge responseTime="6s" /></div>}
      {step >= 3 && (
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-[11px]" style={{ color: '#8696A0' }}>
          <GradientText>$3,600</GradientText> booked from a VIP client Valentine's Day promotion
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB 4 — PHONE CALL
══════════════════════════════════════════ */
function PhoneCallCard({ step, typedText, isTyping }: { step: number; typedText: string; isTyping: boolean }) {
  return (
    <div
      className="rounded-[18px] overflow-hidden flex flex-col h-full relative"
      style={{ background: 'linear-gradient(180deg, #0F2D26, #0A1F1A)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      {/* Call header */}
      <div className="flex flex-col items-center pt-4 sm:pt-6 pb-2 sm:pb-3 px-3 sm:px-4 relative z-10">
        <div className="text-lg sm:text-[22px] font-semibold text-white mb-1">Mark T.</div>
        <div className="text-xs sm:text-[13px] mb-0.5 flex items-center gap-2" style={{ color: '#4ADE5C' }}>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" style={{ background: '#4ADE5C' }} />
          Aiaura Speaking
        </div>
        <div className="text-xs sm:text-[13px] italic mb-3 sm:mb-4" style={{ color: 'rgba(74,222,92,0.7)' }}>Aiaura received in 4s</div>

        {/* 28-bar symmetric waveform */}
        <div className="flex items-center gap-0.5 mb-3 sm:mb-4" style={{ height: 'clamp(28px, 8vw, 40px)' }}>
          {Array.from({ length: 28 }, (_, i) => {
            const dist = Math.abs(i - 13.5);
            const h = Math.max(11, 40 - dist * 2.4);
            return (
              <div key={i} style={{
                width: 2.5,
                height: h * 0.75,
                background: 'linear-gradient(135deg, #10B981, #84CC16)',
                borderRadius: 2,
                animation: 'callWave 2s ease-in-out infinite',
                animationDelay: `${i * 0.04}s`,
                transformOrigin: 'center',
                opacity: 0.9,
              }} className="sm:h-auto sm:[height:var(--h)]" />
            );
          })}
        </div>

        <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2"
          style={{ background: 'rgba(52,199,89,0.15)', color: '#4ADE5C', border: '1px solid rgba(52,199,89,0.3)' }}>
          <PulseDot size={4} /> AIAURA SPEAKING
        </div>
      </div>

      {/* Transcript — label ABOVE each bubble */}
      <div className="flex-1 mx-3 sm:mx-4 mb-2 sm:mb-3 rounded-xl px-2 sm:px-3 py-2 sm:py-3 flex flex-col gap-2 sm:gap-3 relative z-10 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="text-[9px] sm:text-[10px] font-mono" style={{ color: '#8E8E93' }}>LIVE TRANSCRIPT</div>

        {step >= 1 && (
          <div className="msg-in">
            <div className="text-[9px] sm:text-[10px] font-mono font-semibold mb-0.5 sm:mb-1" style={{ color: '#8E8E93' }}>MARK T.</div>
            <div className="text-[11px] sm:text-[12px] leading-snug px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.10)', color: '#E5E7EB', backdropFilter: 'blur(4px)' }}>
              I need a McLaren this weekend
            </div>
          </div>
        )}
        {step >= 2 && (
          <div className="msg-in">
            <div className="text-[9px] sm:text-[10px] font-mono font-semibold mb-0.5 sm:mb-1" style={{ color: '#4ADE5C' }}>AIAURA</div>
            <div className="text-[11px] sm:text-[12px] leading-snug px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: 'rgba(16,185,129,0.20)', color: '#E5E7EB' }}>
              Yes, the McLaren 720S is available. When do you need it?
            </div>
          </div>
        )}
        {step >= 3 && (
          <div className="msg-in">
            <div className="text-[9px] sm:text-[10px] font-mono font-semibold mb-0.5 sm:mb-1" style={{ color: '#8E8E93' }}>MARK T.</div>
            <div className="text-[11px] sm:text-[12px] leading-snug px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.10)', color: '#E5E7EB', backdropFilter: 'blur(4px)' }}>
              Friday to Sunday, 3 days
            </div>
          </div>
        )}
        {step >= 4 && (
          <div className="msg-in">
            <div className="text-[9px] sm:text-[10px] font-mono font-semibold mb-0.5 sm:mb-1" style={{ color: '#4ADE5C' }}>AIAURA</div>
            <div className="text-[11px] sm:text-[12px] leading-snug px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: 'rgba(16,185,129,0.20)', color: '#E5E7EB' }}>
              $3,600 per day, $10,800 total. Want me to send the booking link?
            </div>
          </div>
        )}
        {isTyping && (
          <div className="msg-in">
            <div className="text-[9px] sm:text-[10px] font-mono font-semibold mb-0.5 sm:mb-1" style={{ color: '#4ADE5C' }}>AIAURA</div>
            <div className="text-[11px] sm:text-[12px] leading-snug px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
              style={{ background: 'rgba(16,185,129,0.20)', color: '#E5E7EB' }}>
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls — 3 buttons at 38px radius */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 px-4 sm:px-6 pb-3 sm:pb-5 relative z-10">
        {[
          { label: 'mute', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="sm:w-[18px] sm:h-[18px]"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/><line x1="2" y1="2" x2="22" y2="22"/></svg>, bg: 'rgba(255,255,255,0.08)' },
          { label: '',     icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="sm:w-[26px] sm:h-[26px]"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.4 1.13 2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, bg: 'rgba(220,38,38,0.6)', size: 46 },
          { label: 'speaker', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="sm:w-[18px] sm:h-[18px]"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>, bg: 'rgba(255,255,255,0.08)' },
        ].map(({ label, icon, bg, size = 34 }) => (
          <div key={label} className="flex flex-col items-center gap-0.5 sm:gap-1">
            <div className="rounded-full flex items-center justify-center" style={{ width: size, height: size, background: bg }}>{icon}</div>
            {label && <span className="text-[9px] sm:text-[10px]" style={{ color: '#8E8E93' }}>{label}</span>}
          </div>
        ))}
      </div>

      {step >= 2 && <div className="px-3 sm:px-4 pb-1.5 sm:pb-2 relative z-10"><AiauraBadge responseTime="Live call" /></div>}
      {step >= 4 && (
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-[11px] relative z-10" style={{ color: '#8E8E93' }}>
          <GradientText>$14,400</GradientText> booked at 2:14 AM while operator slept
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB 5 — GMAIL
══════════════════════════════════════════ */
function GmailCard({ step }: { step: number }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [showReplyText, setShowReplyText] = useState(false);

  useEffect(() => {
    if (step >= 2) {
      const t1 = setTimeout(() => setReplyOpen(true), 600);
      const t2 = setTimeout(() => setShowReplyText(true), 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [step]);

  return (
    <div className="rounded-[18px] overflow-hidden flex flex-col h-full"
      style={{ background: '#FFFFFF', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
      {/* Top bar */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3" style={{ borderBottom: '1px solid #E8EAED' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2" className="sm:w-[20px] sm:h-[20px]">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span className="text-sm sm:text-base font-bold flex-1 truncate" style={{ color: '#202124', fontWeight: 700 }}>
          Wedding party · 6 vehicles
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2" className="sm:w-[20px] sm:h-[20px] hidden sm:block">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2" className="sm:w-[20px] sm:h-[20px]">
          <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
        </svg>
      </div>

      {/* Thread */}
      <div className="flex-1 px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-2 sm:gap-3 overflow-hidden">
        {/* Sender row */}
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #EA4335, #FBBC04)' }}>SC</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium truncate" style={{ color: '#202124' }}>
                Sarah Chen &lt;sarah@premierevents.com&gt;
              </span>
              <span className="text-[10px] sm:text-[11px] flex-shrink-0" style={{ color: '#5F6368' }}>Today, 8:42 AM</span>
            </div>
            <div className="text-[10px] sm:text-[11px]" style={{ color: '#5F6368' }}>to me</div>
          </div>
        </div>

        {/* Email body — staggered fade in */}
        <div className="pl-8 sm:pl-12 flex flex-col gap-1.5 sm:gap-2">
          {step >= 1 && (
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#202124', animation: 'gmailFadeIn 0.5s ease both', animationDelay: '0.1s' }}>
              Hi there,
            </p>
          )}
          {step >= 1 && (
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#202124', animation: 'gmailFadeIn 0.5s ease both', animationDelay: '0.4s' }}>
              I'm coordinating a wedding May 25–30 and need 6 luxury vehicles. Can you accommodate? Looking for a Lambo, Range Rover, G-Wagon, Bentley, and 2 more. Let me know.
            </p>
          )}
        </div>

        {/* Aiaura reply inline (shown after typing) */}
        {step >= 2 && (
          <div className="pl-8 sm:pl-12 msg-in">
            <div className="rounded-lg p-2 sm:p-3" style={{ background: '#F8F9FA', border: '1px solid #E8EAED' }}>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white" className="sm:w-[10px] sm:h-[10px]"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: '#10B981' }}>Aiaura AI</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#202124' }}>
                Hi Sarah! Congrats on the wedding. For May 25-30 we have: Aventador, Range Rover, G-Wagon, Bentley + 2 more. Group rate: $48,000. Want a quick call?
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Reply composer — slides open */}
      <div
        className="mx-3 sm:mx-4 mb-2 sm:mb-3 rounded-xl overflow-hidden"
        style={{
          border: replyOpen ? '2px solid #10B981' : '1px solid #E8EAED',
          background: replyOpen ? 'rgba(16,185,129,0.05)' : '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          maxHeight: replyOpen ? 220 : 40,
          transition: 'max-height 0.5s ease, border-color 0.3s, background 0.3s',
          overflow: 'hidden',
        }}
      >
        {replyOpen ? (
          <div className="p-3 sm:p-4">
            {/* Label */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold" style={{ color: '#10B981', fontFamily: 'ui-monospace, monospace' }}>
                Aiaura · Auto-reply
              </span>
            </div>
            {/* Typing dots → then reply text */}
            {!showReplyText ? (
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm" style={{ color: '#BDC1C6' }}>Aiaura is typing</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-bounce"
                      style={{ background: '#10B981', animationDelay: `${i * 0.2}s`, animationDuration: '1s' }} />
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ animation: 'gmailFadeIn 0.4s ease both' }}>
                <p className="text-xs sm:text-sm leading-relaxed mb-1.5 sm:mb-2" style={{ color: '#202124' }}>
                  Hi Sarah! Congrats on the wedding. For May 25-30 we have: Aventador, Range Rover, G-Wagon, Bentley + 2 more. Group rate: $48,000. Want a quick call?
                </p>
                <span className="text-[9px] sm:text-[10px] font-mono" style={{ color: '#10B981', fontFamily: 'ui-monospace, monospace' }}>
                  Aiaura · 22s response
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3">
            <span className="text-xs sm:text-sm flex-1" style={{ color: '#BDC1C6' }}>Reply...</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2" className="sm:w-[18px] sm:h-[18px]">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        )}
      </div>

      {step >= 2 && <div className="px-3 sm:px-4 pb-1.5 sm:pb-2"><AiauraBadge responseTime="22s" /></div>}
      {step >= 2 && (
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 text-[10px] sm:text-[11px]" style={{ color: '#5F6368' }}>
          <GradientText>$48,000</GradientText> corporate inquiry handled while operator was off
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CHANNEL CARD SHELL
══════════════════════════════════════════ */
function ChannelCard({ channel, onChannelChange }: { channel: (typeof CHANNELS)[0]; onChannelChange: (id: string) => void }) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setStep(0); setTypedText(''); setIsTyping(false);
    let cur = 0;

    const next = () => {
      if (cur >= channel.messages.length) return;
      const msg = channel.messages[cur];

      if (msg.from === 'ai' && msg.text) {
        setIsTyping(true);
        let i = 0;
        setTypedText('');
        const type = () => {
          i++;
          setTypedText(msg.text.slice(0, i));
          if (i < msg.text.length) {
            timerRef.current = setTimeout(type, 26);
          } else {
            setIsTyping(false);
            cur++;
            setStep(s => s + 1);
            timerRef.current = setTimeout(next, 800);
          }
        };
        timerRef.current = setTimeout(type, 400);
      } else {
        cur++;
        setStep(s => s + 1);
        timerRef.current = setTimeout(next, 1000);
      }
    };

    timerRef.current = setTimeout(next, 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [channel]);

  return (
    <div
      className="channel-card rounded-[20px] sm:rounded-[28px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88))',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border: '1px solid rgba(16,185,129,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: 'min(600px, 100vw)',
        height: 'clamp(480px, 85vh, 600px)',
        minWidth: 280,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tab bar */}
      <ChannelTabs activeChannel={channel.id} onChannelChange={onChannelChange} />

      {/* Mockup viewport */}
      <div style={{ flex: 1, padding: 'clamp(8px, 2vw, 12px) clamp(12px, 4vw, 24px) clamp(12px, 4vw, 24px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Fade mask top */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: 32, background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)' }}
          />
          <div style={{
            height: '100%',
            animation: 'msgIn 0.5s ease both',
            animationFillMode: 'both',
          }}>
            {channel.id === 'instagram' && <InstagramCard step={step} typedText={typedText} isTyping={isTyping} />}
            {channel.id === 'sms'       && <IMessageCard  step={step} typedText={typedText} isTyping={isTyping} />}
            {channel.id === 'whatsapp'  && <WhatsAppCard  step={step} typedText={typedText} isTyping={isTyping} />}
            {channel.id === 'call'      && <PhoneCallCard step={step} typedText={typedText} isTyping={isTyping} />}
            {channel.id === 'email'     && <GmailCard     step={step} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO EXPORT
══════════════════════════════════════════ */
export const Hero = () => {
  const [pillIdx, setPillIdx]       = useState(0);
  const [pillVisible, setPillVisible] = useState(true);
  const [channelIdx, setChannelIdx] = useState(0);
  const [channelFade, setChannelFade] = useState(true);

  /* Pill rotation */
  useEffect(() => {
    const t = setInterval(() => {
      setPillVisible(false);
      setTimeout(() => { setPillIdx(i => (i + 1) % PILL_MESSAGES.length); setPillVisible(true); }, 350);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  /* Channel auto-rotate */
  useEffect(() => {
    const t = setInterval(() => {
      setChannelFade(false);
      setTimeout(() => { setChannelIdx(i => (i + 1) % CHANNELS.length); setChannelFade(true); }, 450);
    }, 9000);
    return () => clearInterval(t);
  }, []);

  const switchChannel = (id: string) => {
    const idx = CHANNELS.findIndex(c => c.id === id);
    if (idx !== -1 && idx !== channelIdx) {
      setChannelFade(false);
      setTimeout(() => { setChannelIdx(idx); setChannelFade(true); }, 300);
    }
  };

  return (
    <>
      <GlobalStyles />
      <section
        className="w-full pt-16 md:pt-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #F0FAF5 0%, #FAFAF8 100%)', borderBottom: '1px solid #D6EDE3' }}
        id="product"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-12 lg:px-16 pb-16 md:pb-24 pt-6 md:pt-12 relative z-10">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-20 items-center">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-5 md:gap-6 min-w-0">
              {/* Cycling pill */}
              <div
                className="self-start flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  boxShadow: '0 2px 12px rgba(16,185,129,0.1)',
                  opacity: pillVisible ? 1 : 0,
                  transform: pillVisible ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                <PulseDot size={6} />
                <span className="text-[12px] md:text-[13px] font-medium" style={{ color: '#0A2620' }}>
                  {PILL_MESSAGES[pillIdx]}
                </span>
              </div>

              {/* H1 */}
              <h1 className="font-sans font-bold tracking-tight"
                style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#0A2620', lineHeight: 1.2 }}>
                <span className="block whitespace-nowrap">Never miss a booking.</span>
                <span className="block whitespace-nowrap"><GradientText>Never lose a customer.</GradientText></span>
                <span className="block whitespace-nowrap"><GradientText>Never break your brand.</GradientText></span>
                <span className="block whitespace-nowrap"><GradientText className="italic font-extrabold">Build System.</GradientText></span>
              </h1>

              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#2D4F47', maxWidth: 520, lineHeight: 1.55 }}>
                While you're driving across town, Aiaura is qualifying a $48K wedding party inquiry.
              </p>

              {/* CTAs — desktop */}
              <div className="hidden md:flex flex-col sm:flex-row gap-3">
                <CTAButton className="flex-1 justify-center text-base py-3">See what you're losing</CTAButton>
                <button
                  className="flex-1 flex items-center justify-center gap-2.5 rounded-full font-semibold text-base"
                  style={{ height: 48, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(16,185,129,0.25)', color: '#0A2620', boxShadow: '0 2px 12px rgba(10,38,32,0.06)' }}
                >
                  <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                    <Play size={11} fill="white" color="white" />
                  </span>
                  Book a strategy call
                </button>
              </div>

              {/* Trust marquee — desktop */}
              <div className="hidden md:block mt-5 w-full overflow-hidden relative"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                <TrustMarquee />
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute inset-0 rounded-full -z-10" style={{ background: 'rgba(16,185,129,0.08)', filter: 'blur(100px)' }} />

              <div className="w-full" style={{ opacity: channelFade ? 1 : 0, transition: 'opacity 0.45s ease' }}>
                <ChannelCard channel={CHANNELS[channelIdx]} onChannelChange={switchChannel} />
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {CHANNELS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setChannelFade(false); setTimeout(() => { setChannelIdx(i); setChannelFade(true); }, 300); }}
                    className="rounded-full transition-all"
                    style={{
                      width: i === channelIdx ? 20 : 7,
                      height: 7,
                      background: i === channelIdx ? 'linear-gradient(135deg, #10B981, #84CC16)' : '#CBD5E1',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── MOBILE CTAs ── */}
          <div className="md:hidden mt-8 flex flex-col items-center gap-6">
            <div className="w-full max-w-md flex flex-col gap-3">
              <CTAButton className="w-full justify-center text-base py-3">See what you're losing</CTAButton>
              <button
                className="w-full flex items-center justify-center gap-2.5 rounded-full font-semibold text-base"
                style={{ height: 48, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(16,185,129,0.25)', color: '#0A2620', boxShadow: '0 2px 12px rgba(10,38,32,0.06)' }}
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                  <Play size={11} fill="white" color="white" />
                </span>
                Book a strategy call
              </button>
            </div>
            <div className="w-full overflow-hidden relative"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
              <TrustMarquee />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

/* ── TRUST MARQUEE (extracted to avoid duplication) ── */
function TrustMarquee() {
  const row1 = ['Cancel anytime', '24/7 Support', 'Ready in 14 days', 'Cancel anytime', '24/7 Support', 'Ready in 14 days'];
  const row2 = ['Safe and secure', 'Works with Your Tools', '14-day money back', 'Safe and secure', 'Works with Your Tools', '14-day money back'];
  const Item = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(16,185,129,0.1)' }}>
        <Check size={10} color="#10B981" strokeWidth={3} />
      </div>
      <span className="text-[13px] font-bold tracking-tight" style={{ color: '#000' }}>{label}</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex w-max gap-5" style={{ animation: 'trust-marquee 18s linear infinite alternate' }}>
        {row1.map((p, i) => <Item key={i} label={p} />)}
      </div>
      <div className="flex w-max gap-5" style={{ animation: 'trust-marquee-rev 18s linear infinite alternate' }}>
        {row2.map((p, i) => <Item key={i} label={p} />)}
      </div>
    </div>
  );
}