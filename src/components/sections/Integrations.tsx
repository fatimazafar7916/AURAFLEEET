"use client";

import React, { useState, useEffect } from 'react';
import { SectionPill } from '../ui/SectionPill';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

export const Integrations = () => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  // Animate rotation
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setRotation(prev => (prev + 0.2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Positions for logos around the center (angle in degrees)
  const logoPositions = [
    { name: 'HubSpot', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg', angle: 0, color: '#FF7A59' },
    { name: 'Instagram', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', angle: 30, color: '#E1306C' },
    { name: 'Pipedrive', text: 'pipedrive', angle: 60, color: '#6B4FBB' },
    { name: 'WhatsApp', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', angle: 90, color: '#25D366' },
    { name: 'Phone', text: '📞', angle: 120, color: '#10B981' },
    { name: 'Stripe', text: 'stripe', angle: 150, color: '#635BFF' },
    { name: 'Twilio', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg', angle: 180, color: '#F22F46' },
    { name: 'SMS', text: '💬', angle: 210, color: '#10B981' },
    { name: 'RentSyst', text: 'RentSyst', angle: 240, color: '#4B5563' },
    { name: 'TikTok', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', angle: 270, color: '#000000' },
    { name: 'Gmail', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', angle: 300, color: '#EA4335' },
    { name: 'HQ', text: 'HQ', angle: 330, color: '#2A6FFF' },
  ];

  const radius = 220; // Distance from center

  return (
    <section id="integrations" className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-center mb-6">
          <SectionPill>INTEGRATIONS</SectionPill>
        </div>
        
        <h2 className="font-sans font-bold text-center mb-4" style={{ fontSize: 'clamp(32px,4.5vw,48px)', color: '#0A2620', lineHeight: 1.2 }}>
          Aiaura sits at the <GradientText italic>center</GradientText> of your stack.
        </h2>
        
        <p className="text-lg text-center mb-12" style={{ color: '#64748B', lineHeight: 1.6 }}>
          Connect every channel. Plug into every tool.
        </p>

        {/* Central Orbital Diagram */}
        <div className="flex justify-center mb-12">
          <div className="relative" style={{ width: 600, height: 600 }}>
            {/* Center Logo - Aiaura */}
            <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(132,204,22,0.1))', 
                    boxShadow: '0 0 60px rgba(16,185,129,0.3), 0 8px 32px rgba(0,0,0,0.1)' 
                  }}>
                  <svg width="64" height="64" viewBox="0 0 36 36" fill="none">
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
              </div>
            </div>

            {/* Integration Logos - Orbiting */}
            {logoPositions.map((item, idx) => {
              const angle = (item.angle + rotation) * (Math.PI / 180);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={idx}
                  className="absolute flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-110"
                  style={{ 
                    left: '50%', 
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    transition: 'transform 0.05s linear'
                  }}
                  onMouseEnter={() => setHoveredLogo(item.name)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  {/* Logo container - NO BORDER */}
                  <div 
                    className="relative z-10 w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center transition-all bg-white"
                    style={{ 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    {item.logo ? (
                      <img 
                        src={item.logo} 
                        alt={`${item.name} logo`} 
                        loading="lazy" 
                        className="w-12 h-12 object-contain"
                        onError={(e: any) => { 
                          e.target.style.display='none'; 
                          e.target.parentNode.innerHTML=`<span style="font-size:16px;font-weight:700;color:${item.color}">${item.name.slice(0,2)}</span>`; 
                        }} 
                      />
                    ) : (
                      <span style={{ fontSize: item.text && item.text.length > 3 ? 12 : 24, fontWeight: 700, color: item.color }}>
                        {item.text}
                      </span>
                    )}
                  </div>

                  {/* Pulse dot */}
                  <PulseDot size={5} />

                  {/* Label on hover */}
                  {hoveredLogo === item.name && (
                    <div 
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                      style={{ 
                        background: 'linear-gradient(135deg, #10B981, #84CC16)', 
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                        zIndex: 20
                      }}
                    >
                      {item.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex items-center justify-center px-6 py-4 rounded-2xl max-w-2xl mx-auto" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-base font-semibold" style={{ color: '#0F172A' }}>Keep what works. Aiaura adds what's missing.</span>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full ml-3 flex-shrink-0"
              style={{ background: '#FFFFFF', color: '#10B981', border: '1px solid #BBF7D0' }}>NO MIGRATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
