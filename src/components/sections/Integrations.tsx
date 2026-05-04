"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SectionPill } from '../ui/SectionPill';

/* ─────────────────────────────────────────────
   Styles injected once into <head>
───────────────────────────────────────────── */
const ORBIT_CSS = `
@keyframes orbit-spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
@keyframes orbit-spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
@keyframes counter-spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
@keyframes counter-spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
@keyframes orbit-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }

#orbitWrap .orbit-ring-inner {
  animation: orbit-spin-cw 40s linear infinite;
}
#orbitWrap .orbit-ring-outer {
  animation: orbit-spin-ccw 60s linear infinite;
}
#orbitWrap.is-paused .orbit-ring-inner,
#orbitWrap.is-paused .orbit-ring-outer {
  animation-play-state: paused;
}

.orbit-item {
  position: absolute;
  top: 50%; left: 50%;
  /* --angle and --radius set inline */
  transform: rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle)));
  width: 52px; height: 52px;
  margin: -26px 0 0 -26px;
}
.orbit-item-inner-cw {
  width: 100%; height: 100%;
  animation: counter-spin-cw 40s linear infinite;
}
.orbit-item-inner-ccw {
  width: 100%; height: 100%;
  animation: counter-spin-ccw 60s linear infinite;
}
#orbitWrap.is-paused .orbit-item-inner-cw,
#orbitWrap.is-paused .orbit-item-inner-ccw {
  animation-play-state: paused;
}
.orbit-breathe {
  width: 100%; height: 100%;
  animation: orbit-breathe 3.2s ease-in-out infinite;
  animation-delay: var(--breathe-delay, 0s);
}

/* Tooltip */
.orbit-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #0A2620;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  padding: 3px 8px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.18s;
}
.orbit-logo-wrap:hover .orbit-tooltip,
.orbit-logo-wrap:focus .orbit-tooltip,
.orbit-logo-wrap.tapped .orbit-tooltip {
  opacity: 1;
}
.orbit-logo-wrap {
  position: relative;
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  overflow: visible;
  cursor: pointer;
  transition: transform 0.18s;
}
.orbit-logo-wrap:hover,
.orbit-logo-wrap.tapped {
  transform: scale(1.1);
}
`;

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const GradientText = ({ children, italic = false }: { children: React.ReactNode; italic?: boolean }) => (
  <span style={{
    background: 'linear-gradient(135deg, #10B981, #84CC16)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 800,
  }}>{children}</span>
);

const AiauraLogo = () => (
  <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai1)" opacity="0.9"  transform="rotate(0   18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai2)" opacity="0.75" transform="rotate(72  18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai3)" opacity="0.7"  transform="rotate(144 18 18)"/>
    <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#ai4)" opacity="0.8"  transform="rotate(216 18 18)"/>
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

/* ─────────────────────────────────────────────
   Data — inner ring (6 logos) + outer ring (6 logos)
───────────────────────────────────────────── */
type LogoItem = {
  name: string;
  bg: string;
  icon: React.ReactNode;
  breatheDelay: string;
};

const INNER_LOGOS: LogoItem[] = [
  {
    name: 'WhatsApp',
    bg: '#25D366',
    breatheDelay: '0s',
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 30, height: 30, objectFit: 'contain' }} />,
  },
  {
    name: 'Gmail',
    bg: '#fff',
    breatheDelay: '0.53s',
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" style={{ width: 30, height: 30, objectFit: 'contain' }} />,
  },
  {
    name: 'Instagram',
    bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    breatheDelay: '1.07s',
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: 30, height: 30, objectFit: 'contain' }} />,
  },
  {
    name: 'SMS',
    bg: '#34C759',
    breatheDelay: '1.6s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    name: 'TikTok',
    bg: '#010101',
    breatheDelay: '2.13s',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.78a4.85 4.85 0 0 1-1.02-.09z"/></svg>,
  },
  {
    name: 'Phone',
    bg: '#34C759',
    breatheDelay: '2.67s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  },
];

const OUTER_LOGOS: LogoItem[] = [
  {
    name: 'Twilio',
    bg: '#fff',
    breatheDelay: '0s',
    icon: <svg width="28" height="28" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="28" stroke="#F22F46" strokeWidth="4"/><circle cx="20" cy="20" r="5" fill="#F22F46"/><circle cx="40" cy="20" r="5" fill="#F22F46"/><circle cx="20" cy="40" r="5" fill="#F22F46"/><circle cx="40" cy="40" r="5" fill="#F22F46"/></svg>,
  },
  {
    name: 'Stripe',
    bg: '#635BFF',
    breatheDelay: '0.45s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>,
  },
  {
    name: 'Pipedrive',
    bg: '#1A1A2E',
    breatheDelay: '0.9s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="5" stroke="#6B4FBB" strokeWidth="2.5"/><line x1="12" y1="15" x2="12" y2="22" stroke="#6B4FBB" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  },
  {
    name: 'Slack',
    bg: '#fff',
    breatheDelay: '1.35s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/></svg>,
  },
  {
    name: 'HubSpot',
    bg: '#FF7A59',
    breatheDelay: '1.8s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M18.164 7.931V5.085a2.198 2.198 0 0 0 1.266-1.978V3.05a2.2 2.2 0 0 0-2.199-2.199h-.057a2.2 2.2 0 0 0-2.199 2.199v.057a2.198 2.198 0 0 0 1.252 1.973v2.851a6.232 6.232 0 0 0-2.965 1.297L5.498 3.786a2.44 2.44 0 0 0 .072-.571 2.452 2.452 0 1 0-2.451 2.452c.444 0 .86-.121 1.216-.33l9.678 5.524A6.232 6.232 0 0 0 13.18 13.3a6.233 6.233 0 0 0 1.024 3.428l-2.94 2.94a1.936 1.936 0 1 0 1.066 1.045l2.974-2.974a6.235 6.235 0 1 0 2.86-9.808zm-.99 8.988a3.044 3.044 0 1 1 0-6.089 3.044 3.044 0 0 1 0 6.089z"/></svg>,
  },
  {
    name: 'Zapier',
    bg: '#FF4A00',
    breatheDelay: '2.25s',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12.003 0C5.374 0 0 5.376 0 12.003 0 18.63 5.374 24 12.003 24 18.63 24 24 18.629 24 12.003 24 5.376 18.629 0 12.003 0zm5.051 14.22h-3.267l2.31 2.31a.807.807 0 0 1-1.141 1.141l-2.31-2.31v3.267a.807.807 0 0 1-1.614 0v-3.267l-2.31 2.31a.807.807 0 0 1-1.141-1.141l2.31-2.31H6.625a.807.807 0 0 1 0-1.614h3.266l-2.31-2.31a.807.807 0 0 1 1.141-1.141l2.31 2.31V8.2a.807.807 0 0 1 1.614 0v3.266l2.31-2.31a.807.807 0 0 1 1.141 1.141l-2.31 2.31h3.267a.807.807 0 0 1 0 1.614z"/></svg>,
  },
];

/* ─────────────────────────────────────────────
   OrbitRing helper
───────────────────────────────────────────── */
function OrbitRing({
  logos,
  ringSize,
  ringClass,
  itemClass,
  paused,
  onLogoInteract,
}: {
  logos: LogoItem[];
  ringSize: number;
  ringClass: string;
  itemClass: string;
  paused: boolean;
  onLogoInteract: (name: string | null) => void;
}) {
  const radius = ringSize / 2;
  const angleStep = 360 / logos.length;

  return (
    <div
      className={ringClass}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: ringSize, height: ringSize,
        marginTop: -radius, marginLeft: -radius,
        borderRadius: '50%',
        border: '1px dashed rgba(16,185,129,0.25)',
      }}
    >
      {logos.map((logo, i) => (
        <div
          key={logo.name}
          className="orbit-item"
          style={{
            '--angle': `${i * angleStep}deg`,
            '--radius': `${radius}px`,
          } as React.CSSProperties}
        >
          <div className={itemClass} style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            <div
              className="orbit-breathe"
              style={{ '--breathe-delay': logo.breatheDelay } as React.CSSProperties}
            >
              <div
                className="orbit-logo-wrap"
                style={{ background: logo.bg }}
                onMouseEnter={() => onLogoInteract(logo.name)}
                onMouseLeave={() => onLogoInteract(null)}
                tabIndex={0}
                aria-label={logo.name}
              >
                {logo.icon}
                <span className="orbit-tooltip">{logo.name}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export const Integrations = () => {
  const [paused, setPaused] = useState(false);
  const [tapped, setTapped] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById('orbit-styles')) return;
    const style = document.createElement('style');
    style.id = 'orbit-styles';
    style.textContent = ORBIT_CSS;
    document.head.appendChild(style);
  }, []);

  // Touch: first tap pauses + highlights, second tap or outside releases
  const handleTouch = (name: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    if (tapped === name) {
      setPaused(false);
      setTapped(null);
    } else {
      setPaused(true);
      setTapped(name);
    }
  };

  useEffect(() => {
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setPaused(false);
        setTapped(null);
      }
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, []);

  const handleLogoHover = (name: string | null) => {
    if (name) {
      setPaused(true);
    } else {
      setPaused(false);
      setTapped(null);
    }
  };

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

        {/* ── Orbit Diagram ── */}
        <div className="flex justify-center mb-10">
          <div
            id="orbitWrap"
            ref={wrapRef}
            className={paused ? 'is-paused' : ''}
            style={{
              position: 'relative',
              width: 380,
              height: 380,
            }}
          >
            {/* Soft radial glow */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              width: 260, height: 260, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.13) 0%, rgba(132,204,22,0.06) 50%, transparent 75%)',
              pointerEvents: 'none',
            }} />

            {/* Inner ring — 200px — clockwise 40s */}
            <OrbitRing
              logos={INNER_LOGOS}
              ringSize={200}
              ringClass="orbit-ring-inner"
              itemClass="orbit-item-inner-cw"
              paused={paused}
              onLogoInteract={handleLogoHover}
            />

            {/* Outer ring — 320px — counter-clockwise 60s */}
            <OrbitRing
              logos={OUTER_LOGOS}
              ringSize={320}
              ringClass="orbit-ring-outer"
              itemClass="orbit-item-inner-ccw"
              paused={paused}
              onLogoInteract={handleLogoHover}
            />

            {/* Center logo */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 20,
              width: 88, height: 88,
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(16,185,129,0.13), rgba(132,204,22,0.08))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(16,185,129,0.22), 0 4px 20px rgba(0,0,0,0.08)',
            }}>
              <AiauraLogo />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center px-6 py-4 rounded-2xl max-w-xl mx-auto"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>
              Keep what works. Aiaura adds what's missing.
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full ml-2 flex-shrink-0"
              style={{ background: '#FFFFFF', color: '#10B981', border: '1px solid #BBF7D0' }}>
              NO MIGRATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};