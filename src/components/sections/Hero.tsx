"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Check } from 'lucide-react';
import { CTAButton } from '../ui/CTAButton';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <span className={`text-gradient ${className}`}>{children}</span>
);

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
    id: 'instagram', label: 'AI OMNICHANNEL / INSTAGRAM / MIAMI', caption: '$14,400 booked from a DM at 11:47 PM',
    messages: [
      { from: 'customer', text: 'Yo is the Lambo Aventador available May 5?' },
      { from: 'ai', text: 'Yes! May 5 confirmed. $4,800/day with 100 miles included. 1 day or longer?' },
      { from: 'customer', text: '3 days, May 5–7' },
      { from: 'ai', text: '$14,400 + $5K deposit. Sending booking link...' },
    ],
    responseTime: '4s', headerColor: '#E1306C', aiBubble: 'linear-gradient(135deg, #10B981, #84CC16)',
    bg: '#0F0F23', customerColor: 'rgba(255,255,255,0.12)', textColor: 'white',
  },
  {
    id: 'sms', label: 'AI OMNICHANNEL / TEXT / LAS VEGAS', caption: '$3,600 weekend booking - F1 weekend Vegas',
    messages: [
      { from: 'customer', text: 'How much for Range Rover this weekend?' },
      { from: 'ai', text: 'Range Rover Sport, $1,200/day weekend rate. Total $3,600. Want to lock it in?' },
      { from: 'customer', text: 'Yes please' },
      { from: 'ai', text: 'Sending Stripe link now. Takes 90 seconds.' },
    ],
    responseTime: '6s', headerColor: '#007AFF', aiBubble: '#007AFF',
    bg: '#1C1C1E', customerColor: '#3A3A3C', textColor: 'white',
  },
  {
    id: 'whatsapp', label: 'AI OMNICHANNEL / WHATSAPP / MIAMI', caption: '$3,600 booked from a VIP client Valentine\'s Day promotion',
    messages: [
      { from: 'ai', text: 'Hey Ash, Happy Valentine\'s Day! Wishing you a great one. Here\'s a special 50% gift voucher from us for this special day.', timestamp: '12:00 AM' },
      { from: 'customer', text: '', isVoice: true, duration: '0:08', timestamp: '9:00 AM' },
      { from: 'ai', text: '', isVoice: true, duration: '0:11', timestamp: '9:00 AM' },
    ],
    responseTime: '6s', headerColor: '#25D366', aiBubble: '#00A884',
    bg: '#0B141A', customerColor: '#202C33', textColor: 'white',
    vipClient: { name: 'VIP Client', avatar: 'VC', status: 'online' },
  },
  {
    id: 'call', label: 'AI RECEPTIONIST / CALL / MIAMI', caption: '$14,400 booked at 2:14 AM while operator slept',
    isCall: true,
    messages: [
      { from: 'customer', text: 'Hi, do you have a Lambo for this weekend?' },
      { from: 'ai', text: 'Yes! May 5–7 confirmed. $14,400 for 3 days with deposit. Want me to lock it in?' },
    ],
    responseTime: 'Live call', headerColor: '#10B981', aiBubble: 'linear-gradient(135deg, #10B981, #84CC16)',
    bg: 'linear-gradient(180deg, #0D1431 0%, #071a10 100%)', customerColor: 'rgba(255,255,255,0.12)', textColor: 'white',
  },
  {
    id: 'email', label: 'AI OMNICHANNEL / EMAIL / ATLANTA', caption: '$48,000 corporate inquiry handled while operator was off',
    isEmail: true,
    messages: [
      { from: 'customer', text: "I'm coordinating a wedding May 25–30 and need 6 luxury vehicles. Can you accommodate?" },
      { from: 'ai', text: 'Hi Sarah! Congrats on the wedding. For May 25-30 we have: Aventador, Range Rover, G-Wagon, Bentley + 2 more. Group rate: $48,000. Want a quick call?' },
    ],
    responseTime: '22s', headerColor: '#EA4335', aiBubble: '#E8F0FE',
    bg: '#FAFAFA', customerColor: '#FFFFFF', textColor: '#1a1a1a', aiTextColor: '#0A2620',
    emailInfo: { subject: 'Wedding party - 6 vehicles', sender: 'Sarah Chen / Premier Events' },
  },
];

function AiauraBadge({ responseTime }: { responseTime: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
      style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#10B981"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      AIAURA · {responseTime}
    </div>
  );
}

/* ─── CHANNEL TABS ─── */
function ChannelTabs({ activeChannel, onChannelChange }: { activeChannel: string; onChannelChange: (channelId: string) => void }) {
  const tabs = [
    { id: 'instagram', label: 'INSTAGRAM' },
    { id: 'sms', label: 'TEXT' },
    { id: 'whatsapp', label: 'WHATSAPP' },
    { id: 'call', label: 'PHONE CALL' },
    { id: 'email', label: 'GMAIL' },
  ];

  return (
    <div 
      className="flex gap-1 overflow-x-auto channel-tabs" 
      style={{ 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        padding: '12px 12px 0'
      }}
    >
      <style>{`.channel-tabs::-webkit-scrollbar { display: none; }`}</style>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChannelChange(tab.id)}
          className="px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider transition-all hover:scale-105 cursor-pointer whitespace-nowrap uppercase"
          style={{
            background: tab.id === activeChannel 
              ? 'rgba(16,185,129,0.1)' 
              : 'transparent',
            color: tab.id === activeChannel 
              ? '#065F46' 
              : '#94A3B8',
            border: tab.id === activeChannel
              ? '1px solid rgba(16,185,129,0.3)'
              : '1px solid transparent',
            borderRadius: 999,
            padding: '6px 12px',
            fontWeight: 600
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── INSTAGRAM DM ─── */
function InstagramCard({ channel, step, typedText, isTyping }: any) {
  return (
    <div 
      className="rounded-2xl overflow-hidden flex flex-col" 
      style={{ 
        background: 'linear-gradient(180deg, #1C1C1E, #2C2C2E)', 
        minHeight: 320, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)' 
      }}
    >
      {/* Instagram DM header */}
      <div 
        className="flex items-center gap-3 px-4 py-3" 
        style={{ borderBottom: '1px solid #262626' }}
      >
        <button className="text-white" style={{ fontSize: 20 }}>&#8592;</button>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
            padding: 2
          }}
        >
          <div 
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ background: '#1C1C1E' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold leading-none">Mark Thompson</div>
          <div className="text-[11px] mt-0.5 flex items-center gap-1" style={{ color: '#A8A8A8' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: '#25D366' }} />
            Active now
          </div>
        </div>
        {/* Instagram icons */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
        </svg>
      </div>
      
      {/* Messages */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2.5">
        {step >= 1 && (
          <div className="flex items-end gap-2 justify-start">
            <div 
              className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: 'linear-gradient(45deg, #F58529, #DC2743, #BC1888)' }}
            >
              M
            </div>
            <div 
              className="text-sm max-w-[78%] px-3.5 py-2.5 leading-snug"
              style={{ 
                background: '#3A3A3C', 
                color: 'white', 
                borderRadius: '22px 22px 22px 4px' 
              }}
            >
              Yo is the Lambo Aventador available May 5?
            </div>
          </div>
        )}
        
        {step >= 2 && (
          <div className="flex items-end gap-2 justify-end">
            <div 
              className="text-sm max-w-[78%] px-3.5 py-2.5 leading-snug"
              style={{ 
                background: 'linear-gradient(135deg, #DD2A7B, #8134AF)', 
                color: 'white', 
                borderRadius: '22px 22px 4px 22px' 
              }}
            >
              Yes! May 5 confirmed. $4,800/day with 100 miles included. 1 day or longer?
            </div>
          </div>
        )}
        
        {step >= 3 && (
          <div className="flex items-end gap-2 justify-start">
            <div 
              className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
              style={{ background: 'linear-gradient(45deg, #F58529, #DC2743, #BC1888)' }}
            >
              M
            </div>
            <div 
              className="text-sm max-w-[78%] px-3.5 py-2.5 leading-snug"
              style={{ 
                background: '#3A3A3C', 
                color: 'white', 
                borderRadius: '22px 22px 22px 4px' 
              }}
            >
              3 days, May 5–7
            </div>
          </div>
        )}
        
        {step >= 4 && (
          <div className="flex items-end gap-2 justify-end">
            <div 
              className="text-sm max-w-[78%] px-3.5 py-2.5 leading-snug"
              style={{ 
                background: 'linear-gradient(135deg, #DD2A7B, #8134AF)', 
                color: 'white', 
                borderRadius: '22px 22px 4px 22px' 
              }}
            >
              $14,400 + $5K deposit. Sending booking link now…
            </div>
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-end">
            <div 
              className="px-3.5 py-2.5 text-sm text-white" 
              style={{ 
                background: 'linear-gradient(135deg, #DD2A7B, #8134AF)', 
                borderRadius: '22px 22px 4px 22px' 
              }}
            >
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Input bar */}
      <div 
        className="flex items-center gap-3 px-4 py-3" 
        style={{ borderTop: '1px solid #262626' }}
      >
        <div 
          className="flex-1 rounded-full px-4 py-2 text-[13px]" 
          style={{ 
            background: '#1A1A1A', 
            color: '#737373', 
            border: '1px solid #363636' 
          }}
        >
          Message...
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </div>
      
      {step >= 2 && (
        <div className="px-4 pb-3">
          <AiauraBadge responseTime="4s" />
        </div>
      )}
      
      {step >= 4 && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#A8A8A8' }}>
          <span className="font-bold text-gradient">$14,400</span> booked from a DM at 11:47 PM
        </div>
      )}
    </div>
  );
}

/* ─── WHATSAPP ─── */
function WhatsAppCard({ channel, step, typedText, isTyping }: any) {
  return (
    <div 
      className="rounded-2xl overflow-hidden flex flex-col" 
      style={{ 
        background: '#ECE5DD', 
        minHeight: 320, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.18'%3E%3Cpath d='M90 90m-30 0a30 30 0 1 1 60 0a30 30 0 1 1-60 0'/%3E%3Cpath d='M45 45m-15 0a15 15 0 1 1 30 0a15 15 0 1 1-30 0'/%3E%3Cpath d='M135 135m-15 0a15 15 0 1 1 30 0a15 15 0 1 1-30 0'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* WhatsApp header */}
      <div 
        className="flex items-center gap-3 px-4 py-3" 
        style={{ 
          background: '#075E54', 
          borderBottom: '1px solid #2A3942' 
        }}
      >
        <button className="text-white text-lg">&#8592;</button>
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" 
          style={{ 
            background: 'linear-gradient(135deg, #DAB6FC, #B59CE0)' 
          }}
        >
          VC
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold">VIP Client</div>
          <div className="text-[11px] flex items-center gap-1" style={{ color: '#8696A0' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: '#25D366' }} />
            online
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2">
          <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
        </svg>
      </div>
      
      {/* Chat background with wallpaper */}
      <div className="flex-1 px-3 py-3 flex flex-col gap-2">
        {/* Date stamp */}
        <div className="flex justify-center">
          <span 
            className="text-[11px] px-3 py-1 rounded-full" 
            style={{ background: '#182229', color: '#8696A0' }}
          >
            Today
          </span>
        </div>
        
        {/* Messages */}
        {step >= 1 && (
          <div className="flex justify-end">
            <div 
              className="text-sm max-w-[78%] px-3 py-2 leading-snug relative"
              style={{ 
                background: '#DCF8C6', 
                color: '#303030', 
                borderRadius: '8px 8px 0 8px',
                borderTopLeftRadius: 0
              }}
            >
              Hey Ash, Happy Valentine's Day! Wishing you a great one. Here's a special 50% gift voucher from us for this special day.
              <span className="text-[10px] ml-2 float-right mt-1" style={{ color: '#8696A0' }}>
                ✓✓ 12:00 AM
              </span>
              {/* WhatsApp tail */}
              <div 
                className="absolute -bottom-0 -right-0"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid #DCF8C6',
                  borderBottom: '8px solid transparent'
                }}
              />
            </div>
          </div>
        )}
        
        {step >= 2 && (
          <div className="flex justify-start">
            <div 
              className="flex items-center gap-2 max-w-[78%] px-3 py-2 rounded-lg relative"
              style={{ background: '#FFFFFF', color: '#303030' }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" 
                style={{ background: 'linear-gradient(135deg, #DAB6FC, #B59CE0)' }}
              >
                VC
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                </svg>
              </div>
              {/* Animated waveform */}
              <div className="flex items-center gap-0.5 h-4">
                {[3,6,4,8,5,7,3,6,4,5,3,4,6,5,7].map((h, idx) => (
                  <div 
                    key={idx} 
                    className="bg-gray-600 rounded-sm animate-pulse"
                    style={{ 
                      width: 2, 
                      height: h * 2,
                      animationDelay: `${idx * 0.1}s`,
                      animationDuration: '1.5s'
                    }} 
                  />
                ))}
              </div>
              <span className="text-[10px] ml-2" style={{ color: '#8696A0' }}>0:08</span>
              <span className="text-[10px] ml-2" style={{ color: '#8696A0' }}>9:00 AM</span>
              {/* WhatsApp tail */}
              <div 
                className="absolute -bottom-0 -left-0"
                style={{
                  width: 0,
                  height: 0,
                  borderRight: '8px solid #FFFFFF',
                  borderBottom: '8px solid transparent'
                }}
              />
            </div>
          </div>
        )}
        
        {step >= 3 && (
          <div className="flex justify-end">
            <div 
              className="flex items-center gap-2 max-w-[78%] px-3 py-2 rounded-lg relative"
              style={{ background: '#DCF8C6', color: '#303030' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                </svg>
              </div>
              {/* Animated waveform */}
              <div className="flex items-center gap-0.5 h-4">
                {[4,7,5,6,8,4,6,5,7,4,5,6,4,7,5].map((h, idx) => (
                  <div 
                    key={idx} 
                    className="bg-gray-600 rounded-sm animate-pulse"
                    style={{ 
                      width: 2, 
                      height: h * 2,
                      animationDelay: `${idx * 0.1}s`,
                      animationDuration: '1.5s'
                    }} 
                  />
                ))}
              </div>
              <span className="text-[10px] ml-2" style={{ color: '#8696A0' }}>0:11</span>
              <span className="text-[10px] ml-2" style={{ color: '#8696A0' }}>
                ✓✓ 9:00 AM
              </span>
              {/* WhatsApp tail */}
              <div 
                className="absolute -bottom-0 -right-0"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid #DCF8C6',
                  borderBottom: '8px solid transparent'
                }}
              />
            </div>
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-end">
            <div 
              className="px-3 py-2 text-sm" 
              style={{ 
                background: '#DCF8C6', 
                color: '#303030', 
                borderRadius: '8px 8px 0 8px' 
              }}
            >
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Input bar */}
      <div 
        className="flex items-center gap-2 px-3 py-2" 
        style={{ background: '#F0F0F0' }}
      >
        <div 
          className="flex-1 rounded-full px-4 py-2 text-[13px]" 
          style={{ background: '#FFFFFF', color: '#8696A0' }}
        >
          Type a message
        </div>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center" 
          style={{ background: '#00A884' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </div>
      </div>
      
      {step >= 1 && (
        <div className="px-4 pb-2">
          <AiauraBadge responseTime={channel.responseTime} />
        </div>
      )}
      
      {step >= channel.messages.length && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#8696A0' }}>
          <span className="font-bold text-gradient">{channel.caption.slice(0,7)}</span>
          {channel.caption.slice(7)}
        </div>
      )}
    </div>
  );
}

/* ─── iMESSAGE / SMS ─── */
function IMessageCard({ channel, step, typedText, isTyping }: any) {
  return (
    <div 
      className="rounded-2xl overflow-hidden flex flex-col" 
      style={{ 
        background: '#FFFFFF', 
        minHeight: 320, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)' 
      }}
    >
      {/* iMessage header */}
      <div 
        className="flex flex-col items-center py-3 px-4" 
        style={{ 
          background: '#FFFFFF', 
          borderBottom: '1px solid #E8EAED' 
        }}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-1"
          style={{ background: 'linear-gradient(135deg, #6B7280, #9CA3AF)' }}
        >
          MT
        </div>
        <div className="text-black text-sm font-semibold">+1 (305) 555-0184</div>
        <div className="text-[11px]" style={{ color: '#8E8E93' }}>Text Message · SMS</div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2" style={{ background: '#FFFFFF' }}>
        {step >= 1 && (
          <div className="flex flex-col items-start">
            <div 
              className="text-sm max-w-[78%] px-4 py-2.5 leading-snug"
              style={{ 
                background: '#E9E9EB', 
                color: '#000000', 
                borderRadius: '20px 20px 20px 4px' 
              }}
            >
              How much for Range Rover this weekend?
            </div>
            <span className="text-[10px] mt-0.5 ml-1" style={{ color: '#8E8E93' }}>
              Sat 9:14 PM
            </span>
          </div>
        )}
        
        {step >= 2 && (
          <div className="flex flex-col items-end">
            <div 
              className="text-sm max-w-[78%] px-4 py-2.5 leading-snug"
              style={{ 
                background: 'linear-gradient(180deg, #4ADE5C, #22C55E)', 
                color: 'white', 
                borderRadius: '20px 20px 4px 20px' 
              }}
            >
              Range Rover Sport — $1,200/day, weekend rate. Total $3,600. Want to lock it in?
            </div>
            <span className="text-[10px] mt-0.5 mr-1" style={{ color: '#8E8E93' }}>
              Delivered · Aiaura · 6s response
            </span>
          </div>
        )}
        
        {step >= 3 && (
          <div className="flex flex-col items-start">
            <div 
              className="text-sm max-w-[78%] px-4 py-2.5 leading-snug"
              style={{ 
                background: '#E9E9EB', 
                color: '#000000', 
                borderRadius: '20px 20px 20px 4px' 
              }}
            >
              Yes please
            </div>
            <span className="text-[10px] mt-0.5 ml-1" style={{ color: '#8E8E93' }}>
              Sat 9:15 PM
            </span>
          </div>
        )}
        
        {step >= 4 && (
          <div className="flex flex-col items-end">
            <div 
              className="text-sm max-w-[78%] px-4 py-2.5 leading-snug"
              style={{ 
                background: 'linear-gradient(180deg, #4ADE5C, #22C55E)', 
                color: 'white', 
                borderRadius: '20px 20px 4px 20px' 
              }}
            >
              Sending Stripe link now. Takes 90 seconds.
            </div>
            <span className="text-[10px] mt-0.5 mr-1" style={{ color: '#8E8E93' }}>
              Aiaura · 4s response
            </span>
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-end">
            <div 
              className="px-4 py-2.5 text-sm text-white" 
              style={{ 
                background: 'linear-gradient(180deg, #4ADE5C, #22C55E)', 
                borderRadius: '20px 20px 4px 20px' 
              }}
            >
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Input bar */}
      <div 
        className="flex items-center gap-2 px-4 py-3" 
        style={{ 
          background: '#FFFFFF', 
          borderTop: '1px solid #E8EAED' 
        }}
      >
        <div 
          className="flex-1 rounded-full px-4 py-2 text-[13px]" 
          style={{ 
            background: '#F8F9FA', 
            color: '#636366', 
            border: '1px solid #E8EAED' 
          }}
        >
          iMessage
        </div>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center" 
          style={{ background: '#007AFF' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </div>
      </div>
      
      {step >= 2 && (
        <div className="px-4 pb-2">
          <AiauraBadge responseTime="6s" />
        </div>
      )}
      
      {step >= 4 && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#8E8E93' }}>
          <span className="font-bold text-gradient">$3,600</span> weekend booking - F1 weekend Vegas
        </div>
      )}
    </div>
  );
}

/* ─── PHONE CALL ─── */
function PhoneCallCard({ channel, step, typedText, isTyping }: any) {
  return (
    <div 
      className="rounded-2xl overflow-hidden flex flex-col relative" 
      style={{ 
        background: 'linear-gradient(180deg, #0F2D26, #0A1F1A)', 
        minHeight: 320, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)' 
      }}
    >
      {/* Radial mint glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
      
      {/* Call screen header */}
      <div className="flex flex-col items-center pt-8 pb-4 px-4 relative z-10">
        <div className="text-[22px] font-semibold mb-1 text-white">Mark T.</div>
        <div className="text-[13px] mb-1 flex items-center gap-2" style={{ color: '#4ADE5C' }}>
          <div 
            className="w-2 h-2 rounded-full animate-pulse" 
            style={{ background: '#4ADE5C' }} 
          />
          Aiaura Speaking
        </div>
        <div 
          className="text-[13px] mb-4 italic" 
          style={{ color: 'rgba(74,222,92,0.7)' }}
        >
          Aiaura received in 4s
        </div>
        
        {/* Animated waveform */}
        <div className="flex items-center gap-0.5 h-10 mb-4">
          {Array.from({ length: 28 }, (_, i) => {
            const centerIndex = 14;
            const distanceFromCenter = Math.abs(i - centerIndex);
            const baseHeight = Math.max(18, 100 - (distanceFromCenter * 6));
            
            return (
              <div 
                key={i} 
                className="rounded-sm"
                style={{
                  width: 2.5,
                  height: baseHeight * 0.6,
                  background: 'linear-gradient(135deg, #10B981, #84CC16)',
                  animation: `callWave 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.04}s`,
                  opacity: 0.85,
                }}
              />
            );
          })}
        </div>
        
        <div 
          className="px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2" 
          style={{ 
            background: 'rgba(52,199,89,0.15)', 
            color: '#4ADE5C', 
            border: '1px solid rgba(52,199,89,0.3)' 
          }}
        >
          <PulseDot size={5} /> 
          AIAURA SPEAKING
        </div>
      </div>
      
      {/* Live transcript */}
      <div 
        className="flex-1 mx-4 mb-3 rounded-xl px-3 py-3 flex flex-col gap-2 relative z-10" 
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <div 
          className="text-[10px] font-mono mb-1" 
          style={{ color: '#8E8E93' }}
        >
          LIVE TRANSCRIPT
        </div>
        
        {step >= 1 && (
          <div className="text-[12px] leading-snug" style={{ color: '#E5E7EB' }}>
            <span className="font-bold">MARK T.: </span>I need a McLaren this weekend
          </div>
        )}
        
        {step >= 2 && (
          <div className="text-[12px] leading-snug" style={{ color: '#4ADE5C' }}>
            <span className="font-bold">AIAURA: </span>Yes, the McLaren 720S is available. When do you need it?
          </div>
        )}
        
        {step >= 3 && (
          <div className="text-[12px] leading-snug" style={{ color: '#E5E7EB' }}>
            <span className="font-bold">MARK T.: </span>Friday to Sunday, 3 days
          </div>
        )}
        
        {step >= 4 && (
          <div className="text-[12px] leading-snug" style={{ color: '#4ADE5C' }}>
            <span className="font-bold">AIAURA: </span>$3,600 per day, $10,800 total. Want me to send the booking link?
          </div>
        )}
        
        {isTyping && (
          <div className="text-[12px] leading-snug" style={{ color: '#4ADE5C' }}>
            <span className="font-bold">AIAURA: </span>{typedText}<span className="animate-pulse font-bold">|</span>
          </div>
        )}
      </div>
      
      {/* Call controls */}
      <div className="flex justify-center items-center gap-6 px-6 pb-6 relative z-10">
        {/* Mute button */}
        <div className="flex flex-col items-center gap-1">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center" 
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
              <line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
          </div>
          <span className="text-[10px]" style={{ color: '#8E8E93' }}>mute</span>
        </div>
        
        {/* End call button */}
        <div className="flex flex-col items-center gap-1">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center" 
            style={{ background: 'rgba(220,38,38,0.6)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
        </div>
        
        {/* Speaker button */}
        <div className="flex flex-col items-center gap-1">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center" 
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </div>
          <span className="text-[10px]" style={{ color: '#8E8E93' }}>speaker</span>
        </div>
      </div>
      
      {step >= 2 && (
        <div className="px-4 pb-2 relative z-10">
          <AiauraBadge responseTime="Live call" />
        </div>
      )}
      
      {step >= 4 && (
        <div className="px-4 pb-3 text-[11px] relative z-10" style={{ color: '#8E8E93' }}>
          <span className="font-bold text-gradient">$14,400</span> booked at 2:14 AM while operator slept
        </div>
      )}
      
      {/* CSS for waveform animation */}
      <style jsx>{`
        @keyframes callWave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

/* ─── GMAIL ─── */
function GmailCard({ channel, step, typedText, isTyping }: any) {
  const [replyOpen, setReplyOpen] = useState(false);
  
  useEffect(() => {
    if (step >= 2) {
      setTimeout(() => setReplyOpen(true), 1000);
    }
  }, [step]);

  return (
    <div 
      className="rounded-2xl overflow-hidden flex flex-col" 
      style={{ 
        background: '#FFFFFF', 
        minHeight: 320, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)' 
      }}
    >
      {/* Gmail header */}
      <div 
        className="flex items-center gap-3 px-4 py-3" 
        style={{ 
          background: '#FFFFFF', 
          borderBottom: '1px solid #E8EAED' 
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        <span 
          className="text-base font-medium flex-1 truncate" 
          style={{ color: '#202124' }}
        >
          Wedding party · 6 vehicles
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2">
          <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
        </svg>
      </div>
      
      {/* Email thread */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-3">
        {/* Sender info */}
        <div className="flex items-start gap-3">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" 
            style={{ background: 'linear-gradient(135deg, #EA4335, #FBBC04)' }}
          >
            SC
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: '#202124' }}>
                Sarah Chen &lt;sarah@premierevents.com&gt;
              </span>
              <span className="text-[11px]" style={{ color: '#5F6368' }}>
                Today, 8:42 AM
              </span>
            </div>
            <div className="text-[11px]" style={{ color: '#5F6368' }}>to me</div>
          </div>
        </div>
        
        {/* Email body */}
        <div className="flex flex-col gap-3 pl-12">
          {step >= 1 && (
            <div>
              <p className="text-sm leading-relaxed" style={{ color: '#202124' }}>
                Hi there,
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: '#202124' }}>
                I'm coordinating a wedding May 25–30 and need 6 luxury vehicles. Can you accommodate? Looking for a Lambo, Range Rover, G-Wagon, Bentley, and 2 more. Let me know.
              </p>
            </div>
          )}
          
          {step >= 2 && (
            <div 
              className="rounded-lg p-3" 
              style={{ 
                background: '#F8F9FA', 
                border: '1px solid #E8EAED' 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center" 
                  style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <span 
                  className="text-[11px] font-semibold" 
                  style={{ color: '#10B981' }}
                >
                  Aiaura AI
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#202124' }}>
                Hi Sarah! Congrats on the wedding. For May 25-30 we have: Aventador, Range Rover, G-Wagon, Bentley + 2 more. Group rate: $48,000. Want a quick call?
              </p>
            </div>
          )}
          
          {isTyping && (
            <div 
              className="rounded-lg p-3" 
              style={{ 
                background: '#F8F9FA', 
                border: '1px solid #E8EAED' 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center" 
                  style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <span 
                  className="text-[11px] font-semibold" 
                  style={{ color: '#10B981' }}
                >
                  Aiaura AI
                </span>
              </div>
              <p className="text-sm" style={{ color: '#202124' }}>
                {typedText}<span className="animate-pulse font-bold">|</span>
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Reply composer */}
      <div 
        className="mx-4 mb-3 rounded-xl overflow-hidden transition-all duration-500"
        style={{ 
          border: replyOpen ? '2px solid #10B981' : '1px solid #E8EAED',
          background: replyOpen ? 'rgba(16,185,129,0.05)' : '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          maxHeight: replyOpen ? '220px' : '60px'
        }}
      >
        {replyOpen && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ background: '#10B981' }} 
              />
              <span 
                className="text-[11px] font-mono font-semibold" 
                style={{ color: '#10B981' }}
              >
                Aiaura · Auto-reply
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm" style={{ color: '#BDC1C6' }}>
                Aiaura is typing
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i}
                    className="w-1 h-1 rounded-full animate-bounce"
                    style={{ 
                      background: '#10B981',
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {step >= 2 && (
              <div>
                <p className="text-sm leading-relaxed mb-2" style={{ color: '#202124' }}>
                  Hi Sarah! Congrats on the wedding. For May 25-30 we have: Aventador, Range Rover, G-Wagon, Bentley + 2 more. Group rate: $48,000. Want a quick call?
                </p>
                <span 
                  className="text-[10px] font-mono" 
                  style={{ color: '#10B981' }}
                >
                  Aiaura · 22s response
                </span>
              </div>
            )}
          </div>
        )}
        
        {!replyOpen && (
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="text-sm flex-1" style={{ color: '#BDC1C6' }}>
              Reply...
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
          </div>
        )}
      </div>
      
      {step >= 2 && (
        <div className="px-4 pb-2">
          <AiauraBadge responseTime="22s" />
        </div>
      )}
      
      {step >= 2 && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#5F6368' }}>
          <span className="font-bold text-gradient">$48,000</span> corporate inquiry handled while operator was off
        </div>
      )}
    </div>
  );
}

function ChannelCard({ channel, onChannelChange }: { channel: any; onChannelChange: (channelId: string) => void }) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setStep(0); setTypedText(''); setIsTyping(false);
    let currentStep = 0;
    const showNext = () => {
      if (currentStep >= channel.messages.length) return;
      const msg = channel.messages[currentStep];
      if (msg.from === 'ai') {
        setIsTyping(true); let i = 0; setTypedText('');
        const type = () => {
          i++; setTypedText(msg.text.slice(0, i));
          if (i < msg.text.length) { timeoutRef.current = setTimeout(type, 28); }
          else { setIsTyping(false); currentStep++; setStep(s => s + 1); timeoutRef.current = setTimeout(showNext, 700); }
        };
        timeoutRef.current = setTimeout(type, 400);
      } else {
        currentStep++; setStep(s => s + 1); timeoutRef.current = setTimeout(showNext, 1000);
      }
    };
    timeoutRef.current = setTimeout(showNext, 500);
    return () => {
       if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [channel]);

  // Glass card with exact specifications
  return (
    <div 
      className="channel-card rounded-[28px] overflow-hidden mt-8" 
      style={{ 
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88))', 
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border: '1px solid rgba(16,185,129,0.2)', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)', 
        width: '100%', 
        maxWidth: 'min(600px, 100vw)', 
        height: 600,
        minWidth: 500
      }}
    >
      {/* Tabs inside container with proper padding */}
      <div className="px-3 pt-3 pb-0">
        <ChannelTabs activeChannel={channel.id} onChannelChange={onChannelChange} />
      </div>
      
      {/* Channel mockup viewport */}
      <div className="px-8 pb-8 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          {/* Top fade mask */}
          <div 
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: 32,
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 100%)'
            }}
          />
          
          {channel.id === 'instagram' && <InstagramCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} />}
          {channel.id === 'whatsapp' && <WhatsAppCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} />}
          {channel.id === 'sms' && <IMessageCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} />}
          {channel.id === 'call' && <PhoneCallCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} />}
          {channel.id === 'email' && <GmailCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} />}
        </div>
      </div>
    </div>
  );
}

export const Hero = () => {
  const [pillIdx, setPillIdx] = useState(0);
  const [pillVisible, setPillVisible] = useState(true);
  const [channelIdx, setChannelIdx] = useState(0);
  const [channelFade, setChannelFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPillVisible(false);
      setTimeout(() => { setPillIdx(i => (i+1) % PILL_MESSAGES.length); setPillVisible(true); }, 350);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChannelFade(false);
      setTimeout(() => { setChannelIdx(i => (i+1) % CHANNELS.length); setChannelFade(true); }, 450);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-16 md:pt-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F0FAF5 0%, #FAFAF8 100%)', borderBottom: '1px solid #D6EDE3' }} id="product">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-12 lg:px-16 pb-16 md:pb-24 pt-6 md:pt-12 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-20 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-5 md:gap-6 min-w-0">
            {/* Cycling pill — glassmorphic */}
            <div className="self-start flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-[20px] md:rounded-full transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 2px 12px rgba(16,185,129,0.1)', opacity: pillVisible ? 1 : 0, transform: pillVisible ? 'translateY(0)' : 'translateY(4px)' }}>
              <PulseDot size={6} />
              <span className="text-[12px] md:text-[13px] font-medium leading-snug" style={{ color: '#0A2620' }}>{PILL_MESSAGES[pillIdx]}</span>
            </div>

            <div>
              <h1 className="font-sans font-bold tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#0A2620', lineHeight: 1.2 }}>
                <span className="block whitespace-nowrap">Never miss a booking.</span>
                <span className="block whitespace-nowrap"><GradientText>Never lose a customer.</GradientText></span>
                <span className="block whitespace-nowrap"><GradientText>Never break your brand.</GradientText></span>
                <span className="block whitespace-nowrap"><GradientText className="italic font-extrabold">Build System.</GradientText></span>
              </h1>
            </div>

            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#2D4F47', maxWidth: 520, lineHeight: 1.55 }}>
              While you're driving across town, Aiaura is qualifying a $48K wedding party inquiry.
            </p>

            {/* CTA Buttons - Hidden on mobile, shown on desktop */}
            <div className="hidden md:flex flex-col sm:flex-row gap-3">
              <CTAButton className="flex-1 justify-center text-base py-3">
                See what you're losing
              </CTAButton>
              <button className="flex-1 flex items-center justify-center gap-2.5 rounded-full font-semibold text-base transition-all hover:scale-[1.02]"
                style={{ height: 48, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(16,185,129,0.25)', color: '#0A2620', boxShadow: '0 2px 12px rgba(10,38,32,0.06)' }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                  <Play size={11} fill="white" color="white" />
                </span>
                Book a strategy call
              </button>
            </div>

            {/* Feature Points - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block mt-5 w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
              <style>{`
                @keyframes trust-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                @keyframes trust-marquee-rev {
                  0% { transform: translateX(-50%); }
                  100% { transform: translateX(0); }
                }
              `}</style>
              <div className="flex flex-col gap-2.5">
                <div className="flex w-max gap-5" style={{ animation: 'trust-marquee 18s linear infinite alternate' }}>
                  {[
                    'Cancel anytime',
                    '24/7 Support',
                    'Ready in 14 days',
                    'Cancel anytime',
                    '24/7 Support',
                    'Ready in 14 days'
                  ].map((point, i) => (
                    <div key={`row1-${i}`} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.1)' }}>
                        <Check size={10} color="#10B981" strokeWidth={3} />
                      </div>
                      <span className="text-[13px] font-bold tracking-tight" style={{ color: '#000000' }}>{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex w-max gap-5" style={{ animation: 'trust-marquee-rev 18s linear infinite alternate' }}>
                  {[
                    'Safe and secure',
                    'Works with Your Tools',
                    '14-day money back',
                    'Safe and secure',
                    'Works with Your Tools',
                    '14-day money back'
                  ].map((point, i) => (
                    <div key={`row2-${i}`} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.1)' }}>
                        <Check size={10} color="#10B981" strokeWidth={3} />
                      </div>
                      <span className="text-[13px] font-bold tracking-tight" style={{ color: '#000000' }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column — channel card */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-mint/10 blur-[100px] rounded-full -z-10" />
            
            {/* Channel Card with tabs inside */}
            <div className="w-full" style={{ transition: 'opacity 0.45s ease', opacity: channelFade ? 1 : 0 }}>
              <ChannelCard 
                channel={CHANNELS[channelIdx]} 
                onChannelChange={(channelId: string) => {
                  const newIdx = CHANNELS.findIndex(ch => ch.id === channelId);
                  if (newIdx !== -1 && newIdx !== channelIdx) {
                    setChannelFade(false);
                    setTimeout(() => {
                      setChannelIdx(newIdx);
                      setChannelFade(true);
                    }, 300);
                  }
                }}
              />
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              {CHANNELS.map((_, i) => (
                <button key={i} onClick={() => { setChannelFade(false); setTimeout(() => { setChannelIdx(i); setChannelFade(true); }, 300); }}
                  className="rounded-full transition-all"
                  style={{ width: i === channelIdx ? 20 : 7, height: 7, background: i === channelIdx ? 'linear-gradient(135deg, #10B981, #84CC16)' : '#CBD5E1' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA Buttons and Feature Points - Shown only on mobile, after graphics */}
        <div className="md:hidden mt-8 flex flex-col items-center gap-6">
          {/* CTA Buttons */}
          <div className="w-full max-w-md flex flex-col gap-3">
            <CTAButton className="w-full justify-center text-base py-3">
              See what you're losing
            </CTAButton>
            <button className="w-full flex items-center justify-center gap-2.5 rounded-full font-semibold text-base transition-all hover:scale-[1.02]"
              style={{ height: 48, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(16,185,129,0.25)', color: '#0A2620', boxShadow: '0 2px 12px rgba(10,38,32,0.06)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                <Play size={11} fill="white" color="white" />
              </span>
              Book a strategy call
            </button>
          </div>

          {/* Feature Points */}
          <div className="w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <div className="flex flex-col gap-2.5">
              <div className="flex w-max gap-5" style={{ animation: 'trust-marquee 18s linear infinite alternate' }}>
                {[
                  'Cancel anytime',
                  '24/7 Support',
                  'Ready in 14 days',
                  'Cancel anytime',
                  '24/7 Support',
                  'Ready in 14 days'
                ].map((point, i) => (
                  <div key={`mobile-row1-${i}`} className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.1)' }}>
                      <Check size={10} color="#10B981" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] font-bold tracking-tight" style={{ color: '#000000' }}>{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex w-max gap-5" style={{ animation: 'trust-marquee-rev 18s linear infinite alternate' }}>
                {[
                  'Safe and secure',
                  'Works with Your Tools',
                  '14-day money back',
                  'Safe and secure',
                  'Works with Your Tools',
                  '14-day money back'
                ].map((point, i) => (
                  <div key={`mobile-row2-${i}`} className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.1)' }}>
                      <Check size={10} color="#10B981" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] font-bold tracking-tight" style={{ color: '#000000' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

