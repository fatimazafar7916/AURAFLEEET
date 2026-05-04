"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SectionPill } from '../ui/SectionPill';

const GradientText = ({ children, italic = false }: any) => (
  <span style={{
    background: 'linear-gradient(135deg, #10B981, #84CC16)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 800,
  }}>{children}</span>
);

// Aiaura center logo
const AiauraLogo = () => (
  <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai1)" opacity="0.9" transform="rotate(0 18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai2)" opacity="0.75" transform="rotate(72 18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai3)" opacity="0.7" transform="rotate(144 18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai4)" opacity="0.8" transform="rotate(216 18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai5)" opacity="0.75" transform="rotate(288 18 18)"/>
    <circle cx="18" cy="18" r="4" fill="white"/>
    <defs>
      <linearGradient id="ai1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981"/><stop offset="1" stopColor="#84CC16"/></linearGradient>
      <linearGradient id="ai2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.7"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.5"/></linearGradient>
      <linearGradient id="ai3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.5"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.3"/></linearGradient>
      <linearGradient id="ai4" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16" stopOpacity="0.6"/><stop offset="1" stopColor="#10B981" stopOpacity="0.4"/></linearGradient>
      <linearGradient id="ai5" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16"/><stop offset="1" stopColor="#10B981"/></linearGradient>
    </defs>
  </svg>
);

// Each integration: position is % from center (0,0 = center), label position
const INTEGRATIONS = [
  // top area
  { name: 'WhatsApp',   type: 'icon',  bg: '#25D366', x: -18, y: -34, size: 64,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{width:36,height:36,objectFit:'contain'}} /> },
  { name: 'TikTok',     type: 'icon',  bg: '#000',    x: 14,  y: -38, size: 60,
    icon: <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" style={{width:32,height:32,objectFit:'contain'}} onError={(e:any)=>{e.target.style.display='none';e.target.parentNode.innerHTML='<span style="color:white;font-size:18px;font-weight:800">TT</span>';}} /> },
  // left area
  { name: 'Phone',      type: 'icon',  bg: '#34C759', x: -38, y: -12, size: 62,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Phone_icon.svg/1200px-Phone_icon.svg.png" alt="Phone" style={{width:34,height:34,objectFit:'contain'}} onError={(e:any)=>{e.target.style.display='none';e.target.parentNode.innerHTML='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';}} /> },
  { name: 'SMS',        type: 'icon',  bg: '#34C759', x: -30, y: 10,  size: 58,
    icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  // right area
  { name: 'Gmail',      type: 'icon',  bg: '#fff',    x: 36,  y: -8,  size: 62,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" style={{width:36,height:36,objectFit:'contain'}} /> },
  { name: 'Twilio',     type: 'icon',  bg: '#fff',    x: 44,  y: 10,  size: 56,
    icon: <svg width="28" height="28" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="28" stroke="#F22F46" strokeWidth="4"/><circle cx="20" cy="20" r="5" fill="#F22F46"/><circle cx="40" cy="20" r="5" fill="#F22F46"/><circle cx="20" cy="40" r="5" fill="#F22F46"/><circle cx="40" cy="40" r="5" fill="#F22F46"/></svg> },
  // bottom area
  { name: 'Instagram',  type: 'icon',  bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', x: -16, y: 32, size: 62,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{width:36,height:36,objectFit:'contain'}} /> },
  { name: 'WhatsApp2',  type: 'icon',  bg: '#25D366', x: 12,  y: 36,  size: 58,
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{width:32,height:32,objectFit:'contain'}} /> },
  // text labels (no box, just styled text)
  { name: 'pipedrive',  type: 'label', color: '#6B4FBB', italic: false, bold: false, x: -32, y: -28, fontSize: 15 },
  { name: 'stripe',     type: 'label', color: '#635BFF', italic: true,  bold: false, x: 22,  y: -22, fontSize: 18 },
  { name: 'RentSyst',   type: 'label', color: '#1E293B', italic: false, bold: false, x: 30,  y: 26,  fontSize: 14 },
  { name: 'HQ',         type: 'label', color: '#1E293B', italic: false, bold: true,  x: -22, y: 38,  fontSize: 22 },
];

// Small floating green dots scattered around
const DOTS = [
  { x: -8,  y: -46 },
  { x: 26,  y: -46 },
  { x: -44, y: -20 },
  { x: 50,  y: -2  },
  { x: 52,  y: 22  },
  { x: -10, y: 46  },
  { x: 20,  y: 48  },
  { x: -46, y: 28  },
];

export const Integrations = () => {
  const angleRef = useRef(0);
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      angleRef.current = (angleRef.current + 0.15) % 360;
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Container size
  const SIZE = 520;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  // Scale factor: positions are in % of half-size
  const scale = SIZE / 2 / 52;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <section id="integrations" className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center mb-6">
          <SectionPill>INTEGRATIONS</SectionPill>
        </div>

        <h2 className="font-sans font-bold text-center mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)', color: '#0A2620', lineHeight: 1.2 }}>
          Aiaura sits at the <GradientText italic>center</GradientText> of your stack.
        </h2>
        <p className="text-base text-center mb-10" style={{ color: '#64748B', lineHeight: 1.6 }}>
          Connect every channel. Plug into every tool.
        </p>

        {/* Diagram */}
        <div className="flex justify-center mb-10">
          <div
            className="relative"
            style={{ width: SIZE, height: SIZE, maxWidth: '100%' }}
          >
            {/* Soft radial glow behind center */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              width: 220, height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(132,204,22,0.06) 50%, transparent 75%)',
              pointerEvents: 'none',
            }} />

            {/* Rotating group */}
            {INTEGRATIONS.map((item, idx) => {
              // Convert base x/y (in "units") to pixel offset, then rotate around center
              const baseX = item.x * scale;
              const baseY = item.y * scale;
              const rad = toRad(angle);
              const rx = baseX * Math.cos(rad) - baseY * Math.sin(rad);
              const ry = baseX * Math.sin(rad) + baseY * Math.cos(rad);
              const px = cx + rx;
              const py = cy + ry;

              if (item.type === 'label') {
                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: px,
                      top: py,
                      transform: 'translate(-50%, -50%)',
                      fontSize: item.fontSize,
                      fontWeight: item.bold ? 800 : 600,
                      fontStyle: item.italic ? 'italic' : 'normal',
                      color: item.color,
                      whiteSpace: 'nowrap',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {item.name}
                  </div>
                );
              }

              const size = item.size ?? 60;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: px,
                    top: py,
                    width: size,
                    height: size,
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                    borderRadius: 16,
                    background: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                    overflow: 'hidden',
                  }}
                >
                  {item.icon}
                </div>
              );
            })}

            {/* Green dots — also rotate */}
            {DOTS.map((dot, idx) => {
              const baseX = dot.x * scale;
              const baseY = dot.y * scale;
              const rad = toRad(angle);
              const rx = baseX * Math.cos(rad) - baseY * Math.sin(rad);
              const ry = baseX * Math.sin(rad) + baseY * Math.cos(rad);
              return (
                <div
                  key={`dot-${idx}`}
                  style={{
                    position: 'absolute',
                    left: cx + rx,
                    top: cy + ry,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#10B981',
                    transform: 'translate(-50%,-50%)',
                    boxShadow: '0 0 6px rgba(16,185,129,0.6)',
                  }}
                />
              );
            })}

            {/* Center Aiaura logo — fixed, does NOT rotate */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 20,
              width: 100, height: 100,
              borderRadius: 28,
              background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(132,204,22,0.08))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(16,185,129,0.2), 0 4px 20px rgba(0,0,0,0.08)',
            }}>
              <AiauraLogo />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center px-6 py-4 rounded-2xl max-w-xl mx-auto" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>Keep what works. Aiaura adds what's missing.</span>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full ml-2 flex-shrink-0"
              style={{ background: '#FFFFFF', color: '#10B981', border: '1px solid #BBF7D0' }}>NO MIGRATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
