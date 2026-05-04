"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

const SketchUnderline = ({ width = 180 }) => (
  <svg width={width} height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9.5C45.5 4.5 135 -2.5 178 8.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const ACTIVITY_FEED = [
  { agent: 'AI Receptionist', city: 'Miami', action: 'Booked 3-day Lambo', amount: '$14,400', channel: 'Call', color: '#10B981' },
  { agent: 'Instagram DM', city: 'Orlando', action: 'Booked weekend rental', amount: '$8,200', channel: 'IG', color: '#E1306C' },
  { agent: 'Email Reply', city: 'Tampa', action: 'Booked weekend rental', amount: '$6,900', channel: 'Email', color: '#EA4335' },
  { agent: 'WhatsApp', city: 'Las Vegas', action: 'Closed F1 weekend rental', amount: '$12,600', channel: 'WA', color: '#25D366' },
  { agent: 'AI Receptionist', city: 'Scottsdale', action: 'Booked Range Rover', amount: '$5,400', channel: 'SMS', color: '#007AFF' },
];

const FLEET = [
  { name: 'Lambo Aventador', plate: 'FL-4829', status: 'Rented', revenue: '$4,800/d', color: '#10B981' },
  { name: 'Range Rover Sport', plate: 'NV-2211', status: 'Available', revenue: '$1,200/d', color: '#84CC16' },
  { name: 'Mercedes G-Wagon', plate: 'CA-7734', status: 'Rented', revenue: '$900/d', color: '#10B981' },
  { name: 'Bentley Continental', plate: 'FL-9901', status: 'Maintenance', revenue: '$1,800/d', color: '#F59E0B' },
];

const INBOX = [
  { from: 'david_miami', platform: 'IG', msg: 'Yo is the Lambo available May 5?', time: '2m', unread: true },
  { from: '+1 702 555 0188', platform: 'SMS', msg: 'How much for this weekend?', time: '5m', unread: true },
  { from: 'Sarah Chen', platform: 'Email', msg: 'Wedding party - 6 vehicles needed', time: '12m', unread: false },
  { from: 'Maria G.', platform: 'WA', msg: '¿Tienen el Range Rover disponible?', time: '1h', unread: false },
];

// ── Sparkline bars (light)
const Spark = ({ data, active }: { data: number[], active?: boolean }) => (
  <div className="flex items-end gap-px" style={{ height: 20 }}>
    {data.map((h: number, i: number) => (
      <div key={i} style={{ width: 4, height: h, borderRadius: 2, background: i === data.length - 1 ? 'linear-gradient(180deg,#10B981,#84CC16)' : active ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.1)' }} />
    ))}
  </div>
);

// ── Screen: Dashboard (light)
function ScreenDashboard({ feedIdx }: { feedIdx: number }) {
  const feed = [ACTIVITY_FEED[feedIdx % ACTIVITY_FEED.length], ACTIVITY_FEED[(feedIdx+1) % ACTIVITY_FEED.length], ACTIVITY_FEED[(feedIdx+2) % ACTIVITY_FEED.length]];
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 pt-2">
      {/* Revenue card */}
      <div className="rounded-2xl p-3" style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(132,204,22,0.06))', border: '1px solid rgba(16,185,129,0.2)' }}>
        <p style={{ color: '#6B7F78', fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>TODAY'S REVENUE</p>
        <div className="flex items-end justify-between mt-0.5">
          <span style={{ fontSize: 24, fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg,#10B981,#84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$24,800</span>
          <Spark data={[4,6,5,9,7,11,8,14,10,16,13,18]} active />
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {[{l:'↑18%',c:'#10B981'},{l:'47 chats',c:'#84CC16'},{l:'4.2s avg',c:'#94A3B8'}].map((b,i)=>(
            <span key={i} style={{ fontSize: 8, fontWeight: 600, padding: '2px 6px', borderRadius: 40, background: 'rgba(16,185,129,0.08)', color: b.c }}>{b.l}</span>
          ))}
        </div>
      </div>
      {/* 3-col stats */}
      <div className="grid grid-cols-3 gap-1.5">
        {[{l:'LIVE CHATS',v:'47',live:true},{l:'HOT LEADS',v:'8',sub:'+3'},{l:'RESPONSE',v:'4.2s',sub:'avg'}].map((s,i)=>(
          <div key={i} className="rounded-xl p-2 text-center" style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            {s.live && <div className="flex justify-center mb-0.5"><PulseDot size={4} /></div>}
            <p style={{ color: '#0A2620', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>{s.v}</p>
            <p style={{ color: '#94A3B8', fontSize: 7, marginTop: 2 }}>{s.l}</p>
            {s.sub && <p style={{ color: '#10B981', fontSize: 7, fontWeight: 700 }}>{s.sub}</p>}
          </div>
        ))}
      </div>
      {/* Live feed */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between px-2.5 py-1.5" style={{ background: '#F8FFFE', borderBottom: '1px solid #E8F5F0' }}>
          <span style={{ color: '#6B7F78', fontSize: 7, fontWeight: 700, letterSpacing: '0.08em' }}>LIVE ACTIVITY</span>
          <div className="flex items-center gap-1"><PulseDot size={3} /><span style={{ color: '#10B981', fontSize: 7 }}>now</span></div>
        </div>
        {feed.map((item, i) => (
          <div key={i} className="flex items-center justify-between px-2.5 py-1.5 border-b last:border-0" style={{ borderColor: '#F1F5F9', background: i === 0 ? '#F0FDF8' : '#fff' }}>
            <div className="flex items-center gap-1.5 min-w-0">
              <span style={{ fontSize: 7, fontWeight: 700, padding: '1px 4px', borderRadius: 4, background: item.color + '15', color: item.color }}>{item.channel}</span>
              <p style={{ color: i === 0 ? '#0A2620' : '#64748B', fontSize: 8, fontWeight: i===0?600:400 }} className="truncate">{item.action}</p>
            </div>
            <span style={{ fontSize: 9, fontWeight: 800, background: 'linear-gradient(135deg,#10B981,#84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', flexShrink: 0, marginLeft: 4 }}>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Activity (light)
function ScreenActivity() {
  return (
    <div className="flex flex-col gap-1.5 px-3 pb-3 pt-2">
      <p style={{ color: '#6B7F78', fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>ALL CHANNELS · TODAY</p>
      {ACTIVITY_FEED.map((item, i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.color + '15' }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: item.color }}>{item.channel}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: '#0A2620', fontSize: 9, fontWeight: 600 }} className="truncate">{item.action}</p>
            <p style={{ color: '#94A3B8', fontSize: 7 }}>{item.agent} · {item.city}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p style={{ fontSize: 9, fontWeight: 800, background: 'linear-gradient(135deg,#10B981,#84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.amount}</p>
            <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ml-auto" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <svg width="7" height="7" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-xl p-2.5 mt-1" style={{ background: 'linear-gradient(135deg,rgba(16,185,129,0.08),rgba(132,204,22,0.04))', border: '1px solid rgba(16,185,129,0.15)' }}>
        <p style={{ color: '#6B7F78', fontSize: 7, fontWeight: 700 }}>TOTAL TODAY</p>
        <p style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg,#10B981,#84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$47,500</p>
      </div>
    </div>
  );
}

// ── Screen: Fleet (light)
function ScreenFleet() {
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 pt-2">
      <div className="flex items-center justify-between mb-1">
        <p style={{ color: '#6B7F78', fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>MY FLEET · 4 CARS</p>
        <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 40, background: 'rgba(16,185,129,0.1)', color: '#10B981', fontWeight: 700, border: '1px solid rgba(16,185,129,0.2)' }}>2 ACTIVE</span>
      </div>
      {FLEET.map((car, i) => (
        <div key={i} className="rounded-xl p-2.5" style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <p style={{ color: '#0A2620', fontSize: 9, fontWeight: 700 }}>{car.name}</p>
              <p style={{ color: '#94A3B8', fontSize: 7 }}>{car.plate}</p>
            </div>
            <span style={{ fontSize: 7, fontWeight: 700, padding: '2px 6px', borderRadius: 40, background: car.color + '12', color: car.color, border: `1px solid ${car.color}30` }}>{car.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <Spark data={[3,5,4,7,6,8,5,9,7,10,8,11]} active={car.status === 'Rented'} />
            <span style={{ color: '#6B7F78', fontSize: 8, fontWeight: 600 }}>{car.revenue}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Screen: Inbox (light)
function ScreenInbox() {
  return (
    <div className="flex flex-col gap-1.5 px-3 pb-3 pt-2">
      <div className="flex items-center justify-between mb-1">
        <p style={{ color: '#6B7F78', fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>INBOX · AI MANAGED</p>
        <span style={{ fontSize: 8, padding: '2px 6px', borderRadius: 40, background: 'rgba(225,48,108,0.1)', color: '#E1306C', fontWeight: 700 }}>2 NEW</span>
      </div>
      {INBOX.map((msg, i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: msg.unread ? '#F0FDF8' : '#fff', border: `1px solid ${msg.unread ? 'rgba(16,185,129,0.2)' : '#E2E8F0'}` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ fontSize: 9, background: msg.platform === 'IG' ? 'linear-gradient(135deg,#f09433,#e6683c,#bc1888)' : msg.platform === 'WA' ? '#128C7E' : msg.platform === 'Email' ? '#EA4335' : '#007AFF' }}>
            {msg.from.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p style={{ color: msg.unread ? '#0A2620' : '#64748B', fontSize: 9, fontWeight: msg.unread ? 700 : 400 }} className="truncate">{msg.from}</p>
              <span style={{ fontSize: 6, padding: '1px 3px', borderRadius: 3, background: '#F1F5F9', color: '#94A3B8', flexShrink: 0 }}>{msg.platform}</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: 7 }} className="truncate">{msg.msg}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span style={{ color: '#CBD5E1', fontSize: 7 }}>{msg.time}</span>
            {msg.unread && <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1.5 p-2 rounded-xl mt-1" style={{ background: '#F0FDF8', border: '1px solid rgba(16,185,129,0.15)' }}>
        <PulseDot size={4} />
        <p style={{ color: '#10B981', fontSize: 8, fontWeight: 600 }}>AI handling all replies automatically</p>
      </div>
    </div>
  );
}

// ── Screen: Analytics (light)
function ScreenAnalytics() {
  const bars = [22,35,28,45,38,52,41,60,48,72,55,78];
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 pt-2">
      <p style={{ color: '#6B7F78', fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 2 }}>30-DAY PERFORMANCE</p>
      {/* Bar chart */}
      <div className="rounded-xl p-2.5" style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between mb-2">
          <p style={{ color: '#0A2620', fontSize: 9, fontWeight: 700 }}>Revenue Trend</p>
          <span style={{ fontSize: 8, fontWeight: 700, background: 'linear-gradient(135deg,#10B981,#84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>↑ 34%</span>
        </div>
        <div className="flex items-end gap-1" style={{ height: 40 }}>
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i > 8 ? 'linear-gradient(180deg,#10B981,#84CC16)' : 'rgba(16,185,129,0.15)' }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span style={{ color: '#CBD5E1', fontSize: 7 }}>Apr 1</span>
          <span style={{ color: '#CBD5E1', fontSize: 7 }}>Apr 30</span>
        </div>
      </div>
      {/* KPI rows */}
      {[
        { label: 'Bookings closed by AI', value: '94%', bar: 94 },
        { label: 'Response rate', value: '99.8%', bar: 99 },
        { label: 'Review collection', value: '71%', bar: 71 },
        { label: 'Lead conversion', value: '38%', bar: 38 },
      ].map((kpi, i) => (
        <div key={i} className="rounded-xl p-2" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <div className="flex items-center justify-between mb-1">
            <p style={{ color: '#64748B', fontSize: 8 }}>{kpi.label}</p>
            <p style={{ fontSize: 9, fontWeight: 700, background: 'linear-gradient(135deg,#10B981,#84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{kpi.value}</p>
          </div>
          <div style={{ height: 3, borderRadius: 40, background: '#F1F5F9' }}>
            <div style={{ height: '100%', width: `${kpi.bar}%`, borderRadius: 40, background: 'linear-gradient(90deg,#10B981,#84CC16)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Bottom nav tab config
const NAV_TABS = [
  { id: 'dashboard', label: 'Home', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/> },
  { id: 'activity', label: 'Activity', icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></> },
  { id: 'fleet', label: 'Fleet', icon: <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></> },
  { id: 'inbox', label: 'Inbox', icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
  { id: 'analytics', label: 'Stats', icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
];

export const TrackEverywhere = () => {
  const [feedIdx, setFeedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeView, setActiveView] = useState('mobile');
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIdx((i: number) => (i + 1) % ACTIVITY_FEED.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-16 md:py-20 bg-white overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-start mb-5">
          <SectionPill>ONE DASHBOARD · EVERY DEVICE</SectionPill>
        </div>
        <h2 className="font-tight font-bold mb-2" style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#0A2620', lineHeight: 1.15 }}>
          Your fleet.{' '}
          <span style={{ color: '#10B981', fontWeight: 800 }}>In your pocket.</span>
          {' '}<GradientText italic>Always live.</GradientText>
        </h2>
        <div className="mb-3"><SketchUnderline width={260} /></div>
        <p className="text-base mb-10" style={{ color: '#2D4F47', lineHeight: 1.55 }}>
          5 tabs. Every metric. Real-time. Tap through the dashboard below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — feature list + bottom info */}
          <div className="flex flex-col gap-4">
            {[
              { icon: <circle cx="12" cy="12" r="10"/>, title: 'Real-time revenue tracking', desc: 'Every booking reflects instantly — no refresh needed.' },
              { icon: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>, title: 'Instant alerts on every event', desc: 'Bookings, leads, disputes, and missed contacts.' },
              { icon: <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>, title: 'Full fleet status at a glance', desc: 'Rented, available, in maintenance — all live.' },
              { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, title: 'Unified AI inbox', desc: 'Instagram, WhatsApp, SMS, Email — one feed.' },
              { icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>, title: 'Analytics & performance', desc: '30-day revenue, conversion, and review trends.' },
            ].map((f, i) => (
              <div key={i}
                className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all"
                onClick={() => setActiveTab(NAV_TABS[i].id)}
                style={{ background: activeTab === NAV_TABS[i].id ? 'linear-gradient(135deg,rgba(16,185,129,0.08),rgba(132,204,22,0.04))' : '#F8FFFE', border: `1px solid ${activeTab === NAV_TABS[i].id ? 'rgba(16,185,129,0.3)' : '#D1FAE5'}`, transform: activeTab === NAV_TABS[i].id ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.2s' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: activeTab === NAV_TABS[i].id ? 'linear-gradient(135deg,#10B981,#84CC16)' : '#F0FDF4' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeTab === NAV_TABS[i].id ? 'white' : '#10B981'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#0A2620' }}>{f.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7F78' }}>{f.desc}</p>
                </div>
                {activeTab === NAV_TABS[i].id && <div className="ml-auto flex-shrink-0 w-1.5 h-1.5 rounded-full self-center" style={{ background: '#10B981' }} />}
              </div>
            ))}

            {/* Run your fleet — moved up into left column */}
            <div className="flex items-center justify-between px-5 py-4 rounded-2xl mt-2" style={{ background: '#F8FFFE', border: '1px solid #D1FAE5' }}>
              <div>
                <p className="font-bold text-base" style={{ color: '#0A2620' }}>Run your fleet from anywhere.</p>
                <p className="text-sm italic mt-0.5" style={{ color: '#6B7F78' }}>iOS / Android / Web / Desktop</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full"
                style={{ background: '#F0FDF4', color: '#10B981', border: '1px solid #BBF7D0', whiteSpace: 'nowrap' }}>ALL INCLUDED</span>
            </div>
          </div>

          {/* Right — Device mockup with toggle */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
            {/* Mobile / Desktop toggle */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex rounded-full p-1" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
                {['mobile', 'desktop'].map(v => (
                  <button key={v} onClick={() => setActiveView(v)}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize"
                    style={activeView === v
                      ? { background: 'linear-gradient(135deg, #10B981, #84CC16)', color: 'white', border: 'none', cursor: 'pointer' }
                      : { color: '#64748B', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {activeView === 'desktop' ? (
              /* Desktop — light browser mockup */
              <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', boxShadow: '0 8px 32px rgba(16,185,129,0.1), 0 2px 8px rgba(0,0,0,0.06)' }}>
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA41' }} />
                  </div>
                  <div className="flex-1 flex justify-center min-w-0">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md max-w-full" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#10B981' }} />
                      <span className="truncate" style={{ color: '#64748B', fontSize: 10 }}>aiaura.app/dashboard</span>
                    </div>
                  </div>
                </div>
                <div className="flex" style={{ minHeight: 260 }}>
                  {/* Sidebar */}
                  <div className="flex flex-col gap-1 p-1.5 flex-shrink-0" style={{ width: 44, background: '#F8FAFC', borderRight: '1px solid #E2E8F0' }}>
                    {NAV_TABS.map((tab) => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
                        style={{ background: activeTab === tab.id ? 'linear-gradient(135deg,#10B981,#84CC16)' : '#fff', border: activeTab === tab.id ? 'none' : '1px solid #E2E8F0', cursor: 'pointer' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                          stroke={activeTab === tab.id ? 'white' : '#94A3B8'}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{tab.icon}</svg>
                      </button>
                    ))}
                  </div>
                  {/* Main content */}
                  <div className="flex-1 overflow-hidden min-w-0" style={{ overflowY: 'auto', scrollbarWidth: 'none', maxHeight: 320, background: '#F8FAFC' }}>
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-3 py-2 sticky top-0 z-10" style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <div className="min-w-0">
                        <p className="truncate" style={{ color: '#0A2620', fontSize: 11, fontWeight: 700 }}>AIAURA Fleets — {NAV_TABS.find(t=>t.id===activeTab)?.label}</p>
                        <p style={{ color: '#94A3B8', fontSize: 9 }}>live dashboard</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full flex-shrink-0" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <PulseDot size={3} /><span style={{ color: '#10B981', fontSize: 9, fontWeight: 700 }}>LIVE</span>
                      </div>
                    </div>
                    {/* Rich screen content */}
                    <div style={{ transition: 'opacity 0.2s ease', opacity: 1 }}>
                      {activeTab === 'dashboard' && <ScreenDashboard feedIdx={feedIdx} />}
                      {activeTab === 'activity' && <ScreenActivity />}
                      {activeTab === 'fleet' && <ScreenFleet />}
                      {activeTab === 'inbox' && <ScreenInbox />}
                      {activeTab === 'analytics' && <ScreenAnalytics />}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
            /* Mobile phone shell — light */
            <div className="flex justify-center">
            <div className="relative rounded-[44px] overflow-hidden"
              style={{
                width: 260,
                background: '#F8FAFC',
                border: '2.5px solid #E2E8F0',
                boxShadow: '0 24px 56px rgba(16,185,129,0.12), 0 4px 16px rgba(0,0,0,0.06)',
              }}>

              {/* Dynamic island */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="rounded-full flex items-center justify-center gap-1.5 px-3" style={{ width: 88, height: 24, background: '#E2E8F0', border: '1px solid #CBD5E1' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#94A3B8' }} />
                  <div className="w-1 h-1 rounded-full" style={{ background: '#94A3B8' }} />
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pb-1.5">
                <span style={{ color: '#0A2620', fontSize: 10, fontWeight: 600 }}>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex items-end gap-0.5">
                    {[3,5,7,9].map((h,i) => <div key={i} style={{ width: 3, height: h, background: i<3?'#0A2620':'#CBD5E1', borderRadius: 1 }} />)}
                  </div>
                  <svg width="12" height="9" viewBox="0 0 24 18" fill="none"><path d="M1 6.5C5.5 2 10.5 0 12 0s6.5 2 11 6.5" stroke="#0A2620" strokeWidth="2.5" strokeLinecap="round"/><path d="M4.5 10.5C7 8 9.5 7 12 7s5 1 7.5 3.5" stroke="#0A2620" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="15" r="2.5" fill="#0A2620"/></svg>
                  <div className="flex items-center pl-0.5 rounded-sm" style={{ width: 17, height: 9, border: '1.5px solid #94A3B8' }}>
                    <div style={{ width: '75%', height: 5, background: '#10B981', borderRadius: 1 }} />
                  </div>
                </div>
              </div>

              {/* App top bar */}
              <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid #E2E8F0', background: '#fff' }}>
                <div>
                  <p style={{ color: '#0A2620', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>Aiaura Fleets</p>
                  <p style={{ color: '#94A3B8', fontSize: 8 }}>{NAV_TABS.find(t=>t.id===activeTab)?.label} · live</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <PulseDot size={4} />
                  <span style={{ color: '#10B981', fontSize: 8, fontWeight: 700 }}>LIVE</span>
                </div>
              </div>

              {/* Screen content */}
              <div style={{ minHeight: 340, maxHeight: 340, overflowY: 'auto', scrollbarWidth: 'none', background: '#F8FAFC' }}>
                <div style={{ transition: 'opacity 0.2s', opacity: 1 }}>
                  {activeTab === 'dashboard' && <ScreenDashboard feedIdx={feedIdx} />}
                  {activeTab === 'activity' && <ScreenActivity />}
                  {activeTab === 'fleet' && <ScreenFleet />}
                  {activeTab === 'inbox' && <ScreenInbox />}
                  {activeTab === 'analytics' && <ScreenAnalytics />}
                </div>
              </div>

              {/* Bottom nav bar */}
              <div className="flex items-center justify-around px-2 pt-2 pb-1" style={{ borderTop: '1px solid #E2E8F0', background: '#fff' }}>
                {NAV_TABS.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all"
                    style={{ background: activeTab === tab.id ? 'rgba(16,185,129,0.08)' : 'transparent', border: 'none', cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke={activeTab === tab.id ? '#10B981' : '#CBD5E1'}
                      strokeWidth={activeTab === tab.id ? 2.5 : 1.8}
                      strokeLinecap="round" strokeLinejoin="round">
                      {tab.icon}
                    </svg>
                    <span style={{ fontSize: 7, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? '#10B981' : '#CBD5E1' }}>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Home indicator */}
              <div className="flex justify-center py-2" style={{ background: '#fff' }}>
                <div style={{ width: 72, height: 4, borderRadius: 40, background: '#E2E8F0' }} />
              </div>
            </div>
            </div>
            )}
          </div>
        </div>


      </div>
    </section>
  );
}