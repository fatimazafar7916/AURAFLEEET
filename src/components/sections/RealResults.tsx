"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';
import { TrendingUp, Users, MessageSquare, CheckCircle2, Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

const PulseDot = ({ size = 8 }) => (
  <div className="rounded-full animate-pulse flex-shrink-0 relative" style={{ width: size, height: size, background: '#10B981' }}>
    <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: '#10B981' }} />
  </div>
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic font-serif' : ''} ${className}`}>{children}</span>
);

const SketchUnderline = ({ width = 180, className = '' }) => (
  <svg width={width} height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 9.5C45.5 4.5 135 -2.5 178 8.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const RESULTS = [
  { product: 'AI RECEPTIONIST', amount: '$14,400', action: 'Booked from a 2:14 AM call', attribution: 'Carlos M., MVP Miami', date: 'April 18', tag: 'Lambo Aventador' },
  { product: 'AI OMNICHANNEL', amount: '$4,800', action: 'Weekend rental closed via Instagram DM', attribution: 'Royalty Vegas', date: 'April 22', tag: 'Lamborghini Huracán' },
  { product: 'AI LEAD QUALIFIER', amount: '47', action: 'Hot leads flagged from $2.1M of inquiries', attribution: 'LA Exotic', date: 'April 20', tag: 'Leads scored total' },
  { product: 'AI FOLLOW-UP', amount: '$8,200', action: 'Recovered from a 9-day-old quote', attribution: 'Miami Drive', date: 'April 14', tag: 'Range Rover Sport' },
  { product: 'AI QUOTE & BOOKING', amount: '11s', action: 'Quote-to-deposit time', attribution: 'Atlanta Exotic', date: 'April 12', tag: 'Avg booking $5,200' },
  { product: 'AI REVIEW MANAGER', amount: '184', action: '5-star Google reviews collected', attribution: 'Scottsdale Luxury', date: 'April 10', tag: 'Rating: 4.8 → 4.9' },
  { product: 'AI VIP MANAGER', amount: '$26,400', action: 'Reactivated a Platinum customer', attribution: 'Houston Premium', date: 'April 11', tag: 'Birthday weekend' },
  { product: 'AI EMAIL + SMS', amount: '$47,000', action: 'F1 weekend campaign · 18 bookings', attribution: 'Miami Drive', date: 'April 05', tag: '7.3% conversion' },
  { product: 'AI LISTING OPTIMIZER', amount: '+31%', action: 'Google Business clicks in 30 days', attribution: 'Atlanta Exotic', date: 'April 03', tag: 'Local pack +2' },
  { product: 'AI SOCIAL MANAGER', amount: '2.1M', action: 'Instagram Reels views in April', attribution: 'Las Vegas Exotic', date: 'April 01', tag: '+4,800 followers' },
  { product: 'AI CUSTOMER SUPPORT', amount: '1.4k', action: 'Mid-rental issues resolved', attribution: 'Orlando Luxury', date: 'April 24', tag: 'CSAT: 4.7/5' },
  { product: 'AI WEBSITE CHATBOT', amount: '$94,000', action: 'Booked directly from website chat', attribution: 'Tampa Premium', date: 'April 25', tag: '14% conversion' },
];

const ResultCard = ({ card }: { card: any }) => (
  <div className="w-full h-full flex flex-col p-6 md:p-8 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
    style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
    
    <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
    <div className="absolute top-0 right-0 w-32 h-32 bg-mint-primary/5 rounded-full blur-3xl -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
    
    <div className="flex flex-col flex-1 relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)' }}>
            <CheckCircle2 size={16} stroke="white" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.15em] text-mint uppercase">{card.product}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
          <Calendar size={10} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{card.date}</span>
        </div>
      </div>
      
      <div className="font-serif font-bold text-deep-ink mb-2 transition-all duration-300 group-hover:text-mint" style={{ fontSize: 'clamp(32px, 6vw, 44px)', lineHeight: 1 }}>
        {card.amount}
      </div>
      <p className="text-sm md:text-base font-medium text-ink-soft mb-8 flex-1" style={{ lineHeight: 1.5 }}>{card.action}</p>
      
      <div className="pt-5 border-t flex flex-col gap-3" style={{ borderColor: '#F1F5F9' }}>
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-mint opacity-60" />
          <span className="text-[11px] md:text-xs font-semibold text-slate-500">{card.attribution}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={12} className="text-mint opacity-60" />
          <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-mint-ghost text-mint border border-mint-light/30 uppercase tracking-tight">{card.tag}</span>
        </div>
      </div>
    </div>
  </div>
);

function StatStrip({ inView }: { inView: boolean }) {
  const v1 = useCountUp(24, 2000, inView);
  const v2 = useCountUp(47, 2000, inView);
  const v3 = useCountUp(312, 2000, inView);
  
  const stats = [
    { val: `$${(v1 * 0.1).toFixed(1)}M`, label: 'Recovered for clients', sub: 'Last 30 days', icon: TrendingUp, color: '#10B981' },
    { val: `${v2}`, label: 'Rental operators live', sub: 'Across 14 US States', icon: Users, color: '#84CC16' },
    { val: `${v3}`, label: 'Active conversations', sub: 'Live right now', icon: MessageSquare, color: '#065F46', live: true },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24 relative z-10 px-4 md:px-6">
      {stats.map((s, i) => (
        <div key={i} className="p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-mint/10 hover:-translate-y-1.5" 
          style={{ background: '#ffffff', border: '1px solid #E2E8F0' }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-1000 group-hover:scale-150" 
               style={{ background: `${s.color}15` }} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12" style={{ background: `${s.color}10`, color: s.color }}>
                <s.icon size={24} />
              </div>
              {s.live && <PulseDot />}
            </div>
            
            <div className="font-serif font-bold text-deep-ink mb-1" style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: 1 }}>{s.val}</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-deep-ink uppercase tracking-wide">{s.label}</span>
              <span className="text-xs font-medium text-ink-mute uppercase tracking-widest mt-1 opacity-70">{s.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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

export const RealResults = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(RESULTS.length / itemsPerPage);

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) setPage(0);
  }, [totalPages, page]);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPage((prevPage) => (prevPage + 1) % totalPages);
        setVisible(true);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const currentCards = RESULTS.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <section id="results" className="py-24 md:py-32 overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #F8FCFA 0%, #FAFAF8 100%)' }}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-mint-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-lime-accent/5 rounded-full blur-[120px]" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="flex justify-center mb-6">
            <SectionPill>TRANSPARENCY · LIVE DATA</SectionPill>
          </div>
          <h2 className="font-sans font-bold text-deep-ink mb-6 px-4 leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
            Real results. <br className="md:hidden" />
            <GradientText italic>Real operators.</GradientText>
          </h2>
          <div className="flex justify-center -mt-4 mb-8 md:mb-10">
            <SketchUnderline width={isMobile ? 240 : 380} />
          </div>
          <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Specific bookings recovered, calls captured, and reviews collected by Aiaura — purpose-built for US rental fleets with 5–50 cars.
          </p>
        </div>

        {/* Big Stats */}
        <StatStrip inView={inView} />

        {/* Dynamic Cards Grid */}
        <div className="w-full max-w-6xl mx-auto min-h-[420px]">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-xs md:text-sm font-bold text-ink-mute uppercase tracking-[0.2em]">Latest Activity</h3>
            <div className="flex items-center gap-2 text-mint font-bold text-xs md:text-sm">
              <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              LIVE UPDATES
            </div>
          </div>

          <div 
            className={`grid gap-6 md:gap-8 transition-all duration-700 ease-in-out ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}
            style={{ 
              opacity: visible ? 1 : 0, 
              transform: visible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {currentCards.map((card, i) => (
              <ResultCard key={`${page}-${i}`} card={card} />
            ))}
          </div>
          
          {/* Pagination & Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 md:mt-20">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setVisible(false);
                    setTimeout(() => {
                      setPage(idx);
                      setVisible(true);
                    }, 500);
                  }}
                  className="h-2 rounded-full transition-all duration-500 relative group"
                  style={{ 
                    width: page === idx ? 48 : 12, 
                    background: page === idx ? 'linear-gradient(90deg, #10B981, #84CC16)' : '#E2E8F0'
                  }}
                  aria-label={`Go to page ${idx + 1}`}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-deep-ink text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
            
            <button className="flex items-center gap-3 text-deep-ink font-bold group">
              <span className="text-sm md:text-base border-b-2 border-mint/30 group-hover:border-mint transition-colors">Explore All Case Studies</span>
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-deep-ink group-hover:text-white group-hover:border-deep-ink transition-all duration-300">
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
