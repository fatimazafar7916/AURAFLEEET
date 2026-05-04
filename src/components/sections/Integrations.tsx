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

const INNER_ORBIT = [
  { name: 'Instagram', color: '#E1306C', logo: 'https://img.freepik.com/premium-vector/instagram-vector-logo-icon-social-media-logotype_901408-392.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'WhatsApp', color: '#25D366', logo: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-whatsapp-icon-png-image_3584844.jpg' },
  { name: 'Facebook', color: '#0084FF', logo: 'https://static.vecteezy.com/system/resources/thumbnails/042/148/655/small/facebook-logo-facebook-social-media-icon-free-png.png' },
  { name: 'SMS', color: '#10B981', logo: 'https://png.pngtree.com/element_our/20190528/ourmid/pngtree-sms-icon-image_1131639.jpg' },
];
const OUTER_ORBIT = [
  { name: 'HubSpot', color: '#FF7A59', logo: 'https://e7.pngegg.com/pngimages/281/858/png-clipart-logo-hubspot-inc-marketing-asg-capital-group-pty-ltd-brand-marketing-text-orange-thumbnail.png' },
  { name: 'Stripe', color: '#635BFF', logo: 'https://icon2.cleanpng.com/20180419/ile/avu920jgz.webp' },
  { name: 'Twilio', color: '#F22F46', logo: 'https://w7.pngwing.com/pngs/918/671/png-transparent-twilio-full-logo-tech-companies-thumbnail.png' },
  { name: 'HQ Rental', color: '#2A6FFF', logo: 'https://hqrentalsoftware.com/wp-content/uploads/2019/05/HQ-Logo_2019.jpg' },
];

const ALL_LOGOS = [
  { name: 'Instagram', logo: 'https://img.freepik.com/premium-vector/instagram-vector-logo-icon-social-media-logotype_901408-392.jpg?semt=ais_hybrid&w=740&q=80', color: '#E1306C' },
  { name: 'WhatsApp', logo: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-whatsapp-icon-png-image_3584844.jpg', color: '#25D366' },
  { name: 'Facebook', logo: 'https://static.vecteezy.com/system/resources/thumbnails/042/148/655/small/facebook-logo-facebook-social-media-icon-free-png.png', color: '#0084FF' },
  { name: 'SMS', logo: 'https://png.pngtree.com/element_our/20190528/ourmid/pngtree-sms-icon-image_1131639.jpg', color: '#10B981' },
  { name: 'HubSpot', logo: 'https://e7.pngegg.com/pngimages/281/858/png-clipart-logo-hubspot-inc-marketing-asg-capital-group-pty-ltd-brand-marketing-text-orange-thumbnail.png', color: '#FF7A59' },
  { name: 'Stripe', logo: 'https://icon2.cleanpng.com/20180419/ile/avu920jgz.webp', color: '#635BFF' },
  { name: 'Twilio', logo: 'https://w7.pngwing.com/pngs/918/671/png-transparent-twilio-full-logo-tech-companies-thumbnail.png', color: '#F22F46' },
  { name: 'HQ Rental', logo: 'https://hqrentalsoftware.com/wp-content/uploads/2019/05/HQ-Logo_2019.jpg', color: '#2A6FFF' },
  { name: 'GoHighLevel', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVBHpWPSG8zXRE_4XJBwcxCB9uWj377MGYJA&s', color: '#F59E0B' },
];

const MORE_INTEGRATIONS = [
  'Gmail', 'Outlook', 'RingCentral', 'TikTok DMs', 'Twitter/X', 'Apple Business Messages',
  'RentSyst', 'Bluebird', 'Rent Centric', 'Navotar', 'Salesforce', 'Pipedrive',
  'Zoho CRM', 'Square', 'Google Calendar', 'Calendly', 'DocuSign', 'QuickBooks',
];

function OrbitLogo({ item, radius, angle, onHover }: { item: any; radius: number; angle: number; onHover: (name: string | null) => void }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return (
    <div className="absolute flex flex-col items-center gap-1 cursor-pointer group"
      style={{ left: '50%', top: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
      onMouseEnter={() => onHover(item.name)} onMouseLeave={() => onHover(null)}>
      <div className="w-11 h-11 rounded-2xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110 bg-white"
        style={{ boxShadow: `0 4px 16px ${item.color}35, 0 2px 8px rgba(0,0,0,0.1)`, border: `1.5px solid ${item.color}25` }}>
        <img src={item.logo} alt={`${item.name} logo`} loading="lazy" className="w-full h-full object-cover" onError={(e: any) => { e.target.style.display='none'; e.target.parentNode.style.background=item.color; }} />
      </div>
      <PulseDot size={4} />
    </div>
  );
}

function CounterStat() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('counting'); // 'counting' | 'holding'
  const frameRef = useRef<NodeJS.Timeout | number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const run = () => {
      setPhase('counting');
      setCount(0);
      startTimeRef.current = Date.now();
      const duration = 1500;
      const tick = () => {
        const elapsed = Date.now() - startTimeRef.current!;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * 15));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setPhase('holding');
          frameRef.current = setTimeout(run, 7000) as unknown as number;
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    };
    run();
    return () => {
      if (typeof frameRef.current === 'number') cancelAnimationFrame(frameRef.current);
      else clearTimeout(frameRef.current!);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-5 rounded-2xl"
      style={{ background: 'linear-gradient(135deg, #0A2620 0%, #0F3D2F 100%)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 8px 32px rgba(16,185,129,0.15)' }}>
      <div className="flex items-baseline gap-0.5">
        <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #10B981, #84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{count}</span>
        <span style={{ fontSize: 32, fontWeight: 800, background: 'linear-gradient(135deg, #10B981, #84CC16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+</span>
      </div>
      <div className="w-10 h-0.5 my-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
      <p className="text-xs font-mono font-bold tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>CHANNELS</p>
      <p className="text-xs font-mono font-bold tracking-widest text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>& TOOLS</p>
      {phase === 'holding' && <div className="mt-2"><PulseDot size={4} /></div>}
    </div>
  );
}

export const Integrations = () => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [innerAngle, setInnerAngle] = useState(0);
  const [outerAngle, setOuterAngle] = useState(0);
  const canvasSize = 300; const innerR = 95; const outerR = 145;

  useEffect(() => {
    let frame: number; let last = Date.now();
    const animate = () => {
      const now = Date.now(); const dt = now - last; last = now;
      setInnerAngle(a => a + (dt / 40000) * 360);
      setOuterAngle(a => a - (dt / 60000) * 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="integrations" className="py-16 md:py-20 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center mb-4">
          <SectionPill>WORKS WITH YOUR STACK</SectionPill>
        </div>
        <h2 className="font-sans font-bold text-center mb-2" style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#0A2620', lineHeight: 1.15 }}>
        AIAURA sits at the{' '}
        <GradientText>center of your stack.</GradientText>
        </h2>
        <div className="flex justify-center mb-3"><SketchUnderline width={220} /></div>
        <p className="text-base text-center mb-8" style={{ color: '#2D4F47', lineHeight: 1.55 }}>
          Connect every channel. Plug into every tool. Replace none of them.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Orbital diagram */}
          <div className="relative flex-shrink-0" style={{ width: canvasSize, height: canvasSize }}>
            <svg className="absolute inset-0" width={canvasSize} height={canvasSize}>
              <circle cx={canvasSize/2} cy={canvasSize/2} r={innerR} stroke="#D1FAE5" strokeWidth="1.5" strokeDasharray="4 8" fill="none" />
              <circle cx={canvasSize/2} cy={canvasSize/2} r={outerR} stroke="#E0F2FE" strokeWidth="1.5" strokeDasharray="4 12" fill="none" />
            </svg>

            {/* Center */}
            <div className="absolute flex flex-col items-center gap-1" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(132,204,22,0.1))', border: '2px solid rgba(16,185,129,0.3)', boxShadow: '0 0 24px rgba(16,185,129,0.2)' }}>
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#io1)" opacity="0.9" transform="rotate(0 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#io2)" opacity="0.75" transform="rotate(72 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#io3)" opacity="0.7" transform="rotate(144 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#io4)" opacity="0.8" transform="rotate(216 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#io5)" opacity="0.75" transform="rotate(288 18 18)"/>
                  <circle cx="18" cy="18" r="4" fill="white"/>
                  <defs>
                    <linearGradient id="io1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981"/><stop offset="1" stopColor="#84CC16"/></linearGradient>
                    <linearGradient id="io2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.7"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.5"/></linearGradient>
                    <linearGradient id="io3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.5"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.3"/></linearGradient>
                    <linearGradient id="io4" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16" stopOpacity="0.6"/><stop offset="1" stopColor="#10B981" stopOpacity="0.4"/></linearGradient>
                    <linearGradient id="io5" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16"/><stop offset="1" stopColor="#10B981"/></linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#10B981' }}>AIAURA Fleets</span>
              <PulseDot size={5} />
            </div>

            {INNER_ORBIT.map((item, i) => <OrbitLogo key={item.name} item={item} radius={innerR} angle={innerAngle + i * 90} onHover={setHoveredLogo} />)}
            {OUTER_ORBIT.map((item, i) => <OrbitLogo key={item.name} item={item} radius={outerR} angle={outerAngle + i * 90 + 45} onHover={setHoveredLogo} />)}

            {hoveredLogo && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-mono font-bold"
                style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)', color: 'white', whiteSpace: 'nowrap', zIndex: 10 }}>
                {hoveredLogo} / Connected
              </div>
            )}
          </div>

          {/* Right side info */}
          <div className="flex-1">
            {/* Marquee logo strip */}
            <div className="overflow-hidden mb-5 rounded-2xl py-4 px-2" style={{ background: '#F8FFFE', border: '1px solid #E8F9F1', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
              <div className="flex gap-5 w-max"
                style={{ animation: 'marquee-logos 20s linear infinite' }}>
                {[...ALL_LOGOS, ...ALL_LOGOS].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ boxShadow: `0 4px 20px ${item.color}30, 0 2px 8px rgba(0,0,0,0.06)`, border: `2px solid ${item.color}18` }}>
                      <img src={item.logo} alt={`${item.name} integration logo`} loading="lazy" className="w-full h-full object-cover"
                        onError={(e: any) => { e.target.style.display='none'; e.target.parentNode.innerHTML=`<span style="font-size:11px;font-weight:700;color:${item.color}">${item.name.slice(0,2)}</span>`; }} />
                    </div>
                    <span className="text-xs font-semibold text-center leading-tight whitespace-nowrap" style={{ color: '#4B6B63' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <CounterStat />
              <button onClick={() => setShowMore(!showMore)}
                className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
                style={{ background: '#F8FFFE', border: '1px solid #D1FAE5' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>+</div>
                <span className="text-xs font-mono font-bold tracking-widest" style={{ color: '#10B981' }}>+ 18 MORE CHANNELS & TOOLS</span>
              </button>
            </div>

            {showMore && (
              <div className="rounded-2xl p-4 mb-4" style={{ background: '#F8FFFE', border: '1px solid #D1FAE5' }}>
                <div className="flex flex-wrap gap-2">
                  {MORE_INTEGRATIONS.map(name => (
                    <span key={name} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: '#ffffff', border: '1px solid #E2E8F0', color: '#475569' }}>{name}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-5 py-4 rounded-2xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>Keep what works. Aiaura adds what's missing.</span>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full ml-3 flex-shrink-0"
                style={{ background: '#FFFFFF', color: '#10B981', border: '1px solid #BBF7D0' }}>NO MIGRATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
