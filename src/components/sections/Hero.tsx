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
    id: 'whatsapp', label: 'AI OMNICHANNEL / WHATSAPP / MIAMI', caption: '$3,600 booked from a Spanish-speaking tourist in 4 minutes',
    messages: [
      { from: 'customer', text: '¿Hola, tienen el Range Rover para este fin de semana?' },
      { from: 'ai', text: '¡Hola Maria! Sí, viernes a domingo disponible. $3,600 + depósito. ¿Te interesa?' },
      { from: 'customer', text: '¡Sí! ¿Cómo reservo?' },
      { from: 'ai', text: 'Te envío el enlace ahora...' },
    ],
    responseTime: '6s · Spanish', headerColor: '#25D366', aiBubble: '#00A884',
    bg: '#0B141A', customerColor: '#202C33', textColor: 'white',
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
    <div className="flex gap-2 mb-3 flex-wrap">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChannelChange(tab.id)}
          className="px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all hover:scale-105 cursor-pointer"
          style={{
            background: tab.id === activeChannel 
              ? 'rgba(16,185,129,0.15)' 
              : 'rgba(0,0,0,0.03)',
            color: tab.id === activeChannel 
              ? '#10B981' 
              : '#9CA3AF',
            border: tab.id === activeChannel 
              ? '1px solid rgba(16,185,129,0.3)' 
              : '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── INSTAGRAM DM ─── */
function InstagramCard({ channel, step, typedText, isTyping, onChannelChange }: any) {
  return (
    <div className="w-full">
      <ChannelTabs activeChannel="instagram" onChannelChange={onChannelChange} />
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#000000', minHeight: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
        {/* Instagram DM header */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #262626' }}>
        <button className="text-white" style={{ fontSize: 20 }}>&#8592;</button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>C</div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold leading-none">carlos_miami</div>
          <div className="text-[11px] mt-0.5" style={{ color: '#A8A8A8' }}>Active now</div>
        </div>
        {/* Instagram icons */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      {/* Messages */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2.5">
        {channel.messages.slice(0, step).map((msg: any, i: number) => (
          <div key={i} className={`flex items-end gap-2 ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
            {msg.from === 'customer' && (
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)' }}>C</div>
            )}
            <div className="text-sm max-w-[78%] px-3.5 py-2.5 leading-snug"
              style={msg.from === 'ai'
                ? { background: 'linear-gradient(135deg, #10B981, #84CC16)', color: 'white', borderRadius: '22px 22px 4px 22px' }
                : { background: '#262626', color: 'white', borderRadius: '22px 22px 22px 4px' }
              }>{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="px-3.5 py-2.5 text-sm text-white" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)', borderRadius: '22px 22px 4px 22px' }}>
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>
      {/* Input bar */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: '1px solid #262626' }}>
        <div className="flex-1 rounded-full px-4 py-2 text-[13px]" style={{ background: '#1A1A1A', color: '#737373', border: '1px solid #363636' }}>Message...</div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </div>
      {step >= 2 && <div className="px-4 pb-3"><AiauraBadge responseTime={channel.responseTime} /></div>}
      {step >= channel.messages.length && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#A8A8A8' }}>
          <span className="font-bold text-gradient">{channel.caption.slice(0,7)}</span>{channel.caption.slice(7)}
        </div>
      )}
      </div>
    </div>
  );
}

/* ─── WHATSAPP ─── */
function WhatsAppCard({ channel, step, typedText, isTyping, onChannelChange }: any) {
  return (
    <div className="w-full">
      <ChannelTabs activeChannel="whatsapp" onChannelChange={onChannelChange} />
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#0B141A', minHeight: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      {/* WhatsApp header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#1F2C34', borderBottom: '1px solid #2A3942' }}>
        <button className="text-white text-lg">&#8592;</button>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm bg-teal-600">M</div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold">Maria Garcia</div>
          <div className="text-[11px]" style={{ color: '#8696A0' }}>online</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      {/* Chat background pattern */}
      <div className="flex-1 px-3 py-3 flex flex-col gap-2" style={{ background: '#0B141A' }}>
        {/* Date stamp */}
        <div className="flex justify-center">
          <span className="text-[11px] px-3 py-1 rounded-full" style={{ background: '#182229', color: '#8696A0' }}>TODAY</span>
        </div>
        {channel.messages.slice(0, step).map((msg: any, i: number) => (
          <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}>
            <div className="text-sm max-w-[78%] px-3 py-2 leading-snug relative"
              style={msg.from === 'ai'
                ? { background: '#005C4B', color: '#E9EDEF', borderRadius: '8px 8px 0 8px' }
                : { background: '#202C33', color: '#E9EDEF', borderRadius: '8px 8px 8px 0' }
              }>
              {msg.text}
              <span className="text-[10px] ml-2 float-right mt-1" style={{ color: '#8696A0' }}>
                {msg.from === 'ai' ? '✓✓' : ''} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="px-3 py-2 text-sm" style={{ background: '#005C4B', color: '#E9EDEF', borderRadius: '8px 8px 0 8px' }}>
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>
      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#1F2C34' }}>
        <div className="flex-1 rounded-full px-4 py-2 text-[13px]" style={{ background: '#2A3942', color: '#8696A0' }}>Type a message</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#00A884' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </div>
      </div>
      {step >= 2 && <div className="px-4 pb-2"><AiauraBadge responseTime={channel.responseTime} /></div>}
      {step >= channel.messages.length && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#8696A0' }}>
          <span className="font-bold text-gradient">{channel.caption.slice(0,7)}</span>{channel.caption.slice(7)}
        </div>
      )}
      </div>
    </div>
  );
}

/* ─── iMESSAGE / SMS ─── */
function IMessageCard({ channel, step, typedText, isTyping, onChannelChange }: any) {
  return (
    <div className="w-full">
      <ChannelTabs activeChannel="sms" onChannelChange={onChannelChange} />
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#000000', minHeight: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      {/* iMessage header */}
      <div className="flex flex-col items-center py-3 px-4" style={{ background: '#1C1C1E', borderBottom: '1px solid #38383A' }}>
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold mb-1">J</div>
        <div className="text-white text-sm font-semibold">Jake Williams</div>
        <div className="text-[11px]" style={{ color: '#8E8E93' }}>Las Vegas, NV</div>
      </div>
      {/* Messages */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2" style={{ background: '#000000' }}>
        {channel.messages.slice(0, step).map((msg: any, i: number) => (
          <div key={i} className={`flex flex-col ${msg.from === 'ai' ? 'items-end' : 'items-start'}`}>
            <div className="text-sm max-w-[78%] px-4 py-2.5 leading-snug"
              style={msg.from === 'ai'
                ? { background: '#007AFF', color: 'white', borderRadius: '20px 20px 4px 20px' }
                : { background: '#3A3A3C', color: 'white', borderRadius: '20px 20px 20px 4px' }
              }>{msg.text}</div>
            {msg.from === 'ai' && <span className="text-[10px] mt-0.5 mr-1" style={{ color: '#8E8E93' }}>Delivered</span>}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="px-4 py-2.5 text-sm text-white" style={{ background: '#007AFF', borderRadius: '20px 20px 4px 20px' }}>
              {typedText}<span className="animate-pulse font-bold">|</span>
            </div>
          </div>
        )}
      </div>
      {/* Input bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1C1C1E', borderTop: '1px solid #38383A' }}>
        <div className="flex-1 rounded-full px-4 py-2 text-[13px]" style={{ background: '#2C2C2E', color: '#636366', border: '1px solid #38383A' }}>iMessage</div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#007AFF' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </div>
      </div>
      {step >= 2 && <div className="px-4 pb-2"><AiauraBadge responseTime={channel.responseTime} /></div>}
      {step >= channel.messages.length && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#8E8E93' }}>
          <span className="font-bold text-gradient">{channel.caption.slice(0,7)}</span>{channel.caption.slice(7)}
        </div>
      )}
      </div>
    </div>
  );
}

/* ─── PHONE CALL ─── */
function PhoneCallCard({ channel, step, typedText, isTyping, onChannelChange }: any) {
  return (
    <div className="w-full">
      <ChannelTabs activeChannel="call" onChannelChange={onChannelChange} />
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #0D1F17 100%)', minHeight: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      {/* iOS call screen */}
      <div className="flex flex-col items-center pt-8 pb-4 px-4">
        <div className="text-[13px] mb-1" style={{ color: '#8E8E93' }}>Aiaura AI Receptionist</div>
        <div className="text-white text-2xl font-light mb-1">+1 (305) 555-0199</div>
        <div className="text-[13px] mb-4" style={{ color: '#34C759' }}>● 02:14</div>
        {/* Waveform */}
        <div className="flex items-center gap-0.5 h-10 mb-4">
          {[4,7,12,18,14,8,16,11,6,14,9,13,5,10,15,8,12,7,10,14].map((h, i) => (
            <div key={i} className="rounded-full" style={{
              width: 3, height: h * 2,
              background: 'linear-gradient(135deg, #10B981, #34C759)',
              animation: `wave-bar ${0.4 + i * 0.07}s ease-in-out infinite alternate`,
              opacity: 0.85,
            }} />
          ))}
        </div>
        <div className="px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2" style={{ background: 'rgba(52,199,89,0.15)', color: '#34C759', border: '1px solid rgba(52,199,89,0.3)' }}>
          <PulseDot size={5} /> AIAURA SPEAKING
        </div>
      </div>
      {/* Live transcript */}
      <div className="flex-1 mx-4 mb-3 rounded-xl px-3 py-3 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="text-[10px] font-mono mb-1" style={{ color: '#8E8E93' }}>LIVE TRANSCRIPT</div>
        {channel.messages.slice(0, step).map((msg: any, i: number) => (
          <div key={i} className="text-[12px] leading-snug" style={{ color: msg.from === 'ai' ? '#34C759' : '#E5E7EB' }}>
            <span className="font-bold">{msg.from === 'ai' ? 'Aiaura: ' : 'Caller: '}</span>{msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-[12px] leading-snug" style={{ color: '#34C759' }}>
            <span className="font-bold">Aiaura: </span>{typedText}<span className="animate-pulse font-bold">|</span>
          </div>
        )}
      </div>
      {/* Call controls */}
      <div className="flex justify-around items-center px-6 pb-6">
        {[
          { icon: '🔇', label: 'mute' },
          { icon: '⌨️', label: 'keypad' },
          { icon: '🔊', label: 'speaker' },
        ].map(btn => (
          <div key={btn.label} className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(255,255,255,0.12)' }}>{btn.icon}</div>
            <span className="text-[10px]" style={{ color: '#8E8E93' }}>{btn.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center pb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#FF3B30' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        </div>
      </div>
      {step >= 2 && <div className="px-4 pb-2"><AiauraBadge responseTime={channel.responseTime} /></div>}
      {step >= channel.messages.length && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#8E8E93' }}>
          <span className="font-bold text-gradient">{channel.caption.slice(0,7)}</span>{channel.caption.slice(7)}
        </div>
      )}
      </div>
    </div>
  );
}

/* ─── GMAIL ─── */
function GmailCard({ channel, step, typedText, isTyping, onChannelChange }: any) {
  return (
    <div className="w-full">
      <ChannelTabs activeChannel="email" onChannelChange={onChannelChange} />
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#FFFFFF', minHeight: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
      {/* Gmail header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#FFFFFF', borderBottom: '1px solid #E8EAED' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        <span className="text-base font-medium flex-1 truncate" style={{ color: '#202124' }}>{channel.emailInfo?.subject}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      {/* Email thread */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-3">
        {/* Sender info */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: '#EA4335' }}>S</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: '#202124' }}>{channel.emailInfo?.sender}</span>
              <span className="text-[11px]" style={{ color: '#5F6368' }}>2:47 PM</span>
            </div>
            <div className="text-[11px]" style={{ color: '#5F6368' }}>to me</div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex flex-col gap-3 pl-12">
          {channel.messages.slice(0, step).map((msg: any, i: number) => (
            <div key={i}>
              {msg.from === 'customer' ? (
                <p className="text-sm leading-relaxed" style={{ color: '#202124' }}>{msg.text}</p>
              ) : (
                <div className="rounded-lg p-3" style={{ background: '#F8F9FA', border: '1px solid #E8EAED' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    </div>
                    <span className="text-[11px] font-semibold" style={{ color: '#10B981' }}>Aiaura AI</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#202124' }}>{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="rounded-lg p-3" style={{ background: '#F8F9FA', border: '1px solid #E8EAED' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <span className="text-[11px] font-semibold" style={{ color: '#10B981' }}>Aiaura AI</span>
              </div>
              <p className="text-sm" style={{ color: '#202124' }}>{typedText}<span className="animate-pulse font-bold">|</span></p>
            </div>
          )}
        </div>
      </div>
      {/* Reply bar */}
      <div className="mx-4 mb-3 rounded-xl px-4 py-3 flex items-center gap-2" style={{ border: '1px solid #E8EAED', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <span className="text-sm flex-1" style={{ color: '#BDC1C6' }}>Reply...</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
      </div>
      {step >= 2 && <div className="px-4 pb-2"><AiauraBadge responseTime={channel.responseTime} /></div>}
      {step >= channel.messages.length && (
        <div className="px-4 pb-3 text-[11px]" style={{ color: '#5F6368' }}>
          <span className="font-bold text-gradient">{channel.caption.slice(0,7)}</span>{channel.caption.slice(7)}
        </div>
      )}
      </div>
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

  if (channel.id === 'instagram') return <InstagramCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} onChannelChange={onChannelChange} />;
  if (channel.id === 'whatsapp') return <WhatsAppCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} onChannelChange={onChannelChange} />;
  if (channel.id === 'sms') return <IMessageCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} onChannelChange={onChannelChange} />;
  if (channel.id === 'call') return <PhoneCallCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} onChannelChange={onChannelChange} />;
  if (channel.id === 'email') return <GmailCard channel={channel} step={step} typedText={typedText} isTyping={isTyping} onChannelChange={onChannelChange} />;
  return null;
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
                Watch 90-sec demo
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
              Watch 90-sec demo
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

