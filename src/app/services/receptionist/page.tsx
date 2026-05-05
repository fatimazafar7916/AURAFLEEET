"use client";
import React, { useState, useEffect } from "react";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

/* ============================================================
INJECT GLOBAL STYLES
============================================================ */

const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Geist+Mono:wght@400;600;700;800&display=swap');

:root {
  --mint:        #10B981;
  --mint-mid:    #34D399;
  --mint-light:  #6EE7B7;
  --lime:        #84CC16;
  --ink:         #0A2620;
  --ink-soft:    #64748B;
  --ink-mid:     #2D4F47;
  --page-bg:     #FAFAF8;
  --surface:     #FFFFFF;
  --hairline:    rgba(16,185,129,0.18);
  --grad-cta:    linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --grad-text:   linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --grad-dark:   linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --shadow-card: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
  --shadow-glow: 0 0 32px rgba(16,185,129,0.18);
  --font-brand:  'DM Sans', sans-serif;
  --font-mono:   'Geist Mono', ui-monospace, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; }
body { background: var(--page-bg); font-family: var(--font-brand); }

/* ── Gradient text ── */
.grad-text {
  background: var(--grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Section pill ── */
.sec-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 14px; border-radius: 999px;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.22);
  color: #10B981;
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
}

.sec-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--mint); box-shadow: 0 0 6px var(--mint);
  animation: pilldot 2s ease-in-out infinite;
}

@keyframes pilldot { 0%,100%{opacity:1}50%{opacity:0.35} }

/* ── Buttons ── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px; border: none; cursor: pointer;
  background: var(--grad-cta); color: white;
  font-family: var(--font-brand); font-size: 15px; font-weight: 700;
  box-shadow: 0 4px 20px rgba(16,185,129,0.3);
  transition: transform 0.18s, box-shadow 0.18s;
  white-space: nowrap;
}

.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(16,185,129,0.4); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px; cursor: pointer;
  background: transparent; color: var(--ink);
  border: 1px solid rgba(10,38,32,0.2);
  font-family: var(--font-brand); font-size: 15px; font-weight: 600;
  transition: border-color 0.18s, background 0.18s;
  white-space: nowrap;
}

.btn-ghost:hover { border-color: var(--mint); background: rgba(16,185,129,0.05); }

/* ── Cards ── */
.glass-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,255,255,0.90));
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid var(--hairline);
  border-radius: 24px;
  box-shadow: var(--shadow-card);
  position: relative; overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: var(--grad-cta); opacity: 0.5;
}

.dark-card {
  background: var(--grad-dark);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 24px;
  position: relative; overflow: hidden;
}

.dark-card-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--grad-cta);
}

/* ── Stat badge ── */
.stat-badge {
  display: inline-flex; flex-direction: column; align-items: center;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.2);
  border-radius: 16px; padding: 12px 16px; gap: 2px;
}

.stat-badge-num {
  font-family: var(--font-brand);
  font-size: 24px; font-weight: 800; line-height: 1;
  background: var(--grad-text);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.stat-badge-label {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 600; color: var(--ink-soft);
  letter-spacing: 0.06em; text-transform: uppercase;
}

/* ── Call bubbles ── */
.call-bubble {
  padding: 10px 14px; border-radius: 18px; max-width: 85%;
  font-family: var(--font-brand); font-size: 13px; line-height: 1.5; font-weight: 500;
}

.call-bubble-ai   { background: linear-gradient(135deg,#10B981,#84CC16); color:white; align-self:flex-start; border-bottom-left-radius:4px; }
.call-bubble-user { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.85); align-self:flex-end; border-bottom-right-radius:4px; }
.call-bubble-label { font-family:var(--font-mono); font-size:9px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:4px; }

/* ── Timeline ── */
.timeline-line {
  position:absolute; left:17px; top:40px; bottom:0;
  width:2px; background:linear-gradient(180deg,#10B981,rgba(16,185,129,0.1));
}

.timeline-dot {
  width:34px; height:34px; border-radius:50%; flex-shrink:0;
  background:var(--grad-cta);
  display:flex; align-items:center; justify-content:center;
  font-family:var(--font-mono); font-size:11px; font-weight:800; color:white;
  box-shadow:0 0 0 4px rgba(16,185,129,0.15);
  position:relative; z-index:1;
}

/* ── Pricing featured ── */
.pricing-card-featured {
  background:var(--grad-dark); border:2px solid var(--mint);
  border-radius:28px; position:relative; overflow:hidden;
}

/* ── Animations ── */
@keyframes fadeup  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes scalein { from{opacity:0;transform:scale(0.95)}      to{opacity:1;transform:scale(1)} }
@keyframes wave    { 0%,100%{height:8px} 50%{height:22px} }
@keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(16,185,129,0.2)} 50%{box-shadow:0 0 40px rgba(16,185,129,0.5)} }
@keyframes ticker-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }

.anim-fadeup  { animation:fadeup  0.6s ease both; }
.anim-scalein { animation:scalein 0.5s ease both; }

/* ── Ticker ── */
.ticker-track { display:flex; gap:0; animation:ticker-scroll 30s linear infinite; width:max-content; }
.ticker-wrap  { overflow:hidden; }
.ticker-item  {
  padding:0 28px; font-family:var(--font-mono);
  font-size:11px; font-weight:700; letter-spacing:0.06em;
  color:var(--mint); text-transform:uppercase; white-space:nowrap;
  display:flex; align-items:center; gap:14px;
}
.ticker-sep { color:var(--lime); font-size:13px; }

/* ── Comparison table ── */
.cmp-table { width:100%; border-collapse:collapse; }
.cmp-table th {
  padding:12px 14px; font-family:var(--font-mono); font-size:10px; font-weight:700;
  letter-spacing:0.06em; text-transform:uppercase; color:var(--ink-soft); background:#F8FAFC;
}
.cmp-table td { padding:12px 14px; font-family:var(--font-brand); font-size:13px; border-top:1px solid #F1F5F9; }
.cmp-row-hl  { background:rgba(16,185,129,0.03); }

/* ── FAQ ── */
.faq-item { border-bottom:1px solid var(--hairline); }
.faq-q {
  width:100%; background:none; border:none; cursor:pointer;
  display:flex; justify-content:space-between; align-items:center;
  padding:18px 0; text-align:left;
  font-family:var(--font-brand); font-size:15px; font-weight:700; color:var(--ink);
}
.faq-icon {
  width:24px; height:24px; border-radius:50%; flex-shrink:0;
  background:rgba(16,185,129,0.1);
  display:flex; align-items:center; justify-content:center;
  font-size:15px; font-weight:800; color:var(--mint);
  transition:transform 0.2s;
}
.faq-a {
  font-family:var(--font-brand); font-size:14px; line-height:1.65; color:var(--ink-soft);
  padding-bottom:0; max-height:0; overflow:hidden;
  transition:max-height 0.35s ease, padding-bottom 0.35s ease;
}
.faq-a.open { max-height:300px; padding-bottom:18px; }

/* ── Live dot ── */
.live-dot {
  width:8px; height:8px; border-radius:50%; background:#10B981;
  animation:glow-pulse 2s ease-in-out infinite; flex-shrink:0;
}

/* ── Waveform ── */
.wave-bar {
  width:3px; border-radius:2px;
  background:linear-gradient(180deg,#10B981,#84CC16);
  animation:wave 0.8s ease-in-out infinite;
}

/* ══════════════════════════════════════════════════════════
MOBILE RESPONSIVE — ≤ 768px
══════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  /* Hero grid → single column */
  .hero-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
  .hero-right  { display: none !important; } /* hide big call card on mobile */

  /* Stats row → 2×2 wrap */
  .stats-row   { gap: 8px !important; }
  .stat-badge  { flex: 1 1 calc(50% - 8px); min-width: 0; }

  /* CTA row → stack */
  .cta-row     { flex-direction: column !important; gap: 10px !important; }
  .btn-primary, .btn-ghost { width: 100%; justify-content: center; }

  /* Capabilities tabs → scroll */
  .caps-tabs   { overflow-x: auto; -webkit-overflow-scrolling: touch; justify-content: flex-start !important; flex-wrap: nowrap !important; padding-bottom: 4px; }
  .caps-tabs::-webkit-scrollbar { display: none; }
  .caps-grid   { grid-template-columns: 1fr !important; gap: 24px !important; }

  /* How it works grid → single col */
  .how-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }

  /* Comparison table → scroll wrapper */
  .cmp-scroll  { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .cmp-table   { min-width: 540px; }

  /* Testimonials → single col */
  .testi-grid  { grid-template-columns: 1fr !important; }

  /* Pricing → single col */
  .pricing-grid { grid-template-columns: 1fr !important; }

  /* Bottom CTA card padding */
  .cta-card-inner { padding: 36px 24px !important; }

  /* Section padding */
  .sec-pad { padding: 56px 0 !important; }
  .sec-pad-sm { padding: 40px 0 !important; }

  /* General container */
  .container { padding: 0 16px !important; }

  /* Ticker font */
  .ticker-item { font-size: 10px; padding: 0 18px; }

  /* Comparison font */
  .cmp-table td, .cmp-table th { padding: 10px 12px; font-size: 12px; }

  /* Additional mobile fixes */
  .dark-card { margin: 0 !important; }
  .glass-card { margin: 0 !important; }
  
  /* Ensure no horizontal overflow */
  body { overflow-x: hidden; }
  .container { max-width: 100% !important; }
}

@media (max-width: 480px) {
  .stat-badge-num { font-size: 20px; }
  .faq-q { font-size: 12px; padding: 12px 0; }
  .faq-a { font-size: 12px; }
  .faq-icon { width: 20px; height: 20px; font-size: 12px; }
  
  /* Extra small mobile adjustments */
  .container { padding: 0 12px !important; }
  .sec-pad { padding: 40px 0 !important; }
  .cta-card-inner { padding: 24px 16px !important; }
}
`;

function InjectStyles() {
  useEffect(() => {
    if (document.getElementById("recep-page-styles")) return;
    const el = document.createElement("style");
    el.id = "recep-page-styles";
    el.textContent = PAGE_CSS;
    document.head.appendChild(el);
  }, []);
  return null;
}

/* ============================================================
SHARED PRIMITIVES
============================================================ */

const GreenCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="rgba(16,185,129,0.12)" />
    <polyline points="4.5,8.5 7,11 11.5,5.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="rgba(203,213,225,0.2)" />
    <line x1="5" y1="5" x2="11" y2="11" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="11" y1="5" x2="5" y2="11" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const mono: React.CSSProperties = { fontFamily: "'Geist Mono', ui-monospace, monospace" };

/* ============================================================
SECTION 1 — HERO
============================================================ */

const HeroSection = () => {
  const [waveActive, setWaveActive] = useState(false);
  const [callStep, setCallStep] = useState(0);

  const CONVO = [
    { role: "ai",   text: "Thank you for calling Apex Auto Rentals! This is Aiaura, how can I help you today?" },
    { role: "user", text: "Hi, do you have any SUVs available for this weekend?" },
    { role: "ai",   text: "Absolutely! We have 3 SUVs available. Rates start at $89/day. Which would you like to reserve?" },
    { role: "user", text: "The Explorer sounds good. Can I book it right now?" },
    { role: "ai",   text: "Of course! Sending a booking link to your phone now. Confirmed in under 2 minutes." },
  ];

  useEffect(() => {
    setWaveActive(true);
    const t = setInterval(() => setCallStep(s => s < CONVO.length - 1 ? s + 1 : s), 2200);
    return () => clearInterval(t);
  }, []);

  const WAVE_DELAYS = [0, 0.1, 0.2, 0.15, 0.25, 0.08, 0.18, 0.3, 0.12, 0.22];

  return (
    <section style={{ background: "var(--page-bg)", padding: "72px 0 56px", overflow: "hidden" }}>
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div className="anim-fadeup" style={{ animationDelay: "0ms" }}>
              <span className="sec-pill">
                <span className="sec-pill-dot" />
                AI SOLUTIONS — RECEPTIONIST
              </span>
            </div>

            <div className="anim-fadeup" style={{ animationDelay: "80ms" }}>
              <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                Never miss<br />another{" "}
                <span className="grad-text">rental call.</span>
              </h1>
            </div>

            <div className="anim-fadeup" style={{ animationDelay: "160ms" }}>
              <p style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: 460 }}>
                Aiaura answers every inbound call in under 2 rings — 24/7, in 22 languages. She books rentals, quotes prices, and live-transfers VIPs directly to you. Zero hold music. Zero missed revenue.
              </p>
            </div>

            {/* Stats */}
            <div className="anim-fadeup stats-row" style={{ animationDelay: "240ms", display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { num: "24/7", label: "Always On" }, 
                { num: "22+", label: "Languages" }, 
                { num: "<2s", label: "Answer time" }, 
                { num: "100%", label: "Call coverage" }
              ].map((s) => (
                <div className="stat-badge" key={s.label}>
                  <span className="stat-badge-num">{s.num}</span>
                  <span className="stat-badge-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="anim-fadeup cta-row" style={{ animationDelay: "320ms", display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary">
                <span className="live-dot" />
                Hear Aiaura Live
              </button>
              <button className="btn-ghost">Book a Demo →</button>
            </div>

            {/* Trust */}
            <div className="anim-fadeup" style={{ animationDelay: "400ms", display: "flex", alignItems: "center", gap: 8 }}>
              <GreenCheck />
              <span style={{ ...mono, fontSize: 11, color: "var(--ink-soft)", fontWeight: 600 }}>
                Live in 14 days · No tech team · 60-day money-back
              </span>
            </div>
          </div>

          {/* RIGHT — live call card (hidden on mobile via CSS) */}
          <div className="hero-right anim-scalein" style={{ animationDelay: "200ms" }}>
            <div className="dark-card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="dark-card-accent" />

              {/* Header */}
              <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#10B981,#84CC16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-brand)", color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>
                        Aiaura — AI Receptionist
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="live-dot" style={{ width: 6, height: 6 }} />
                        <span style={{ ...mono, fontSize: 10, color: "#34D399", fontWeight: 600 }}>LIVE CALL</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 3, height: 28 }}>
                    {WAVE_DELAYS.map((d, i) => 
                      <div key={i} className="wave-bar" style={{ animationDelay: `${d}s`, animationDuration: `${0.6 + d * 0.5}s`, height: waveActive ? undefined : 4 }} />
                    )}
                  </div>
                </div>

                <div style={{ marginTop: 10, display: "flex", gap: 14 }}>
                  {[
                    { label: "Caller", value: "+1 (702) 555-0134" }, 
                    { label: "Duration", value: "0:42" }, 
                    { label: "Language", value: "English" }, 
                    { label: "Sentiment", value: "😊 Positive" }
                  ].map((m) => (
                    <div key={m.label}>
                      <p style={{ ...mono, fontSize: 8, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {m.label}
                      </p>
                      <p style={{ fontFamily: "var(--font-brand)", fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversation */}
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, minHeight: 260 }}>
                {CONVO.slice(0, callStep + 1).map((msg, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "ai" ? "flex-start" : "flex-end" }}>
                    <p className="call-bubble-label" style={{ color: msg.role === "ai" ? "#34D399" : "rgba(255,255,255,0.4)", paddingLeft: msg.role === "ai" ? 4 : 0, paddingRight: msg.role === "user" ? 4 : 0 }}>
                      {msg.role === "ai" ? "AIAURA (AI)" : "CUSTOMER"}
                    </p>
                    <div className={`call-bubble ${msg.role === "ai" ? "call-bubble-ai" : "call-bubble-user"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ padding: "10px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
                {["Transfer to Owner", "Take Message", "End Call"].map((a, i) => (
                  <button key={a} style={{ 
                    flex: 1, padding: "8px 4px", borderRadius: 8, cursor: "pointer", 
                    ...mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", 
                    background: i === 0 ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)", 
                    border: i === 0 ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.1)", 
                    color: i === 0 ? "#34D399" : "rgba(255,255,255,0.5)" 
                  }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
/* ============================================================
SECTION 2 — TICKER
============================================================ */

const TickerSection = () => {
  const ITEMS = [
    "Picks up in under 2 rings", 
    "Books rentals inside the call", 
    "22+ languages", 
    "Full call transcripts", 
    "Sentiment detection", 
    "Live-transfer VIPs instantly", 
    "Voicemail follow-up", 
    "Works 24 / 7 / 365"
  ];
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div style={{ background: "#F0FDF4", borderTop: "1px solid rgba(16,185,129,0.15)", borderBottom: "1px solid rgba(16,185,129,0.15)", padding: "13px 0", overflow: "hidden" }}>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {doubled.map((item, i) => 
            <div className="ticker-item" key={i}>
              {item}
              <span className="ticker-sep">✦</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
/* ============================================================
SECTION 3 — CAPABILITIES
============================================================ */

const CapabilitiesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const statCard = (val: string, label: string, sub: string) => (
    <div key={label} style={{ background: "#F8FAFC", borderRadius: 16, padding: "16px 14px", border: "1px solid #E2E8F0" }}>
      <p style={{ fontFamily: "var(--font-brand)", fontSize: 24, fontWeight: 800, background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
        {val}
      </p>
      <p style={{ fontFamily: "var(--font-brand)", fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 4 }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--font-brand)", fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
        {sub}
      </p>
    </div>
  );

  const TABS = [
    {
      label: "Inbound Calls", 
      icon: "📞",
      headline: "Every call answered. Every time.",
      body: "Aiaura picks up within 2 rings, 24 hours a day. She greets callers in their preferred language, understands natural speech, and handles the full booking flow — from availability check to confirmed reservation.",
      features: [
        "Answers in under 2 rings, always", 
        "Detects caller language automatically", 
        "Handles simultaneous call queues", 
        "Records and transcribes every call", 
        "Sends SMS summary post-call", 
        "Never puts callers on hold"
      ],
      visual: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            ["100%", "Calls Answered", "No more missed calls"], 
            ["1.4s", "Avg Answer Time", "Under 2 rings"], 
            ["22+", "Languages", "Auto-detected"], 
            ["87%", "Call Resolution", "Without human help"]
          ].map(([v, l, s]) => statCard(v, l, s))}
        </div>
      ),
    },
    {
      label: "Bookings", 
      icon: "📋",
      headline: "Close the booking inside the call.",
      body: "Aiaura doesn't just take a message — she closes the deal. She checks live availability, applies event-driven pricing, generates a Stripe payment link, and sends the DocuSign contract — all in one call.",
      features: [
        "Real-time fleet availability check", 
        "Instant price quotes with dynamic rules", 
        "Sends Stripe payment link by SMS", 
        "DocuSign contract dispatch", 
        "Deposits and full payments handled", 
        "Booking confirmation auto-sent"
      ],
      visual: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["01", "Availability check", "0.8s"], 
            ["02", "Price quote generated", "1.2s"], 
            ["03", "Stripe link sent via SMS", "3.1s"], 
            ["04", "DocuSign contract dispatched", "4.4s"], 
            ["05", "Booking confirmed", "5.9s"]
          ].map(([step, label, time]) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(16,185,129,0.05)", borderRadius: 12, border: "1px solid rgba(16,185,129,0.2)" }}>
              <span style={{ ...mono, fontSize: 10, fontWeight: 800, color: "var(--mint)", minWidth: 22 }}>
                {step}
              </span>
              <span style={{ fontFamily: "var(--font-brand)", flex: 1, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                {label}
              </span>
              <span style={{ ...mono, fontSize: 10, color: "var(--ink-soft)" }}>
                {time}
              </span>
              <GreenCheck />
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Sentiment & VIP", 
      icon: "⭐",
      headline: "Knows who's calling before they speak.",
      body: "Aiaura cross-references your CRM on every incoming call. She detects sentiment in real-time, flags frustrated callers, upgrades known VIPs automatically, and live-transfers your best customers directly to you.",
      features: [
        "CRM cross-reference on every call", 
        "Real-time sentiment scoring", 
        "Live-transfer for VIP & hot leads", 
        "Flags frustrated or high-risk callers", 
        "Remembers past customer preferences", 
        "Escalation rules fully configurable"
      ],
      visual: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { tier: "PLATINUM", name: "Marcus Webb", action: "Live-transferring to owner", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" }, 
            { tier: "GOLD", name: "Sarah Chen", action: "Applied 10% loyalty discount", color: "#10B981", bg: "rgba(16,185,129,0.06)" }, 
            { tier: "NEW", name: "+1 (702) 555-0291", action: "Lead captured — nurture started", color: "#6366F1", bg: "rgba(99,102,241,0.06)" }, 
            { tier: "FLAGGED", name: "+1 (213) 555-0188", action: "Fraud signals detected", color: "#EF4444", bg: "rgba(239,68,68,0.06)" }
          ].map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: c.bg, borderRadius: 12, border: `1px solid ${c.color}30` }}>
              <span style={{ ...mono, fontSize: 9, fontWeight: 800, padding: "3px 7px", borderRadius: 999, background: c.color + "22", color: c.color, letterSpacing: "0.06em", flexShrink: 0 }}>
                {c.tier}
              </span>
              <span style={{ fontFamily: "var(--font-brand)", flex: 1, fontSize: 12, fontWeight: 700, color: "var(--ink)", minWidth: 0 }}>
                {c.name}
              </span>
              <span style={{ fontFamily: "var(--font-brand)", fontSize: 11, color: "var(--ink-soft)", flexShrink: 0 }}>
                {c.action}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Transcripts", 
      icon: "📝",
      headline: "Every word. Stored and searchable.",
      body: "Every call is recorded, transcribed, and tagged automatically. Search across months of calls in seconds. Spot trends, coach your team, resolve disputes, and get a weekly digest to your inbox.",
      features: [
        "Full call recordings stored 90 days", 
        "AI transcription with speaker labels", 
        "Keyword and sentiment search", 
        "Weekly digest email to owner", 
        "Dispute resolution evidence", 
        "Exportable CSV and PDF reports"
      ],
      visual: (
        <div className="dark-card" style={{ padding: "16px 18px" }}>
          <div className="dark-card-accent" />
          <p style={{ ...mono, fontSize: 9, fontWeight: 700, color: "#34D399", letterSpacing: "0.08em", marginBottom: 12, marginTop: 4 }}>
            TRANSCRIPT — CALL #4821 — TODAY 2:14 PM
          </p>
          {[
            { speaker: "AIAURA", text: "Thank you for calling — how can I help?", t: "0:02" }, 
            { speaker: "CUSTOMER", text: "Do you have a Mustang available Saturday?", t: "0:06" }, 
            { speaker: "AIAURA", text: "Yes, one Mustang GT — $149/day. Reserve it?", t: "0:09" }, 
            { speaker: "CUSTOMER", text: "Yes, let's do it.", t: "0:18" }, 
            { speaker: "AIAURA", text: "Perfect — sending payment link now.", t: "0:20" }
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ ...mono, fontSize: 9, fontWeight: 800, color: l.speaker === "AIAURA" ? "#34D399" : "rgba(255,255,255,0.4)", minWidth: 62, letterSpacing: "0.04em" }}>
                {l.speaker}
              </span>
              <span style={{ fontFamily: "var(--font-brand)", fontSize: 12, color: "rgba(255,255,255,0.8)", lineHeight: 1.45, flex: 1 }}>
                {l.text}
              </span>
              <span style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
                {l.t}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Booking Intent", "Payment Ready", "Positive Sentiment"].map((tag) => 
              <span key={tag} style={{ ...mono, fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(16,185,129,0.15)", color: "#34D399", letterSpacing: "0.04em" }}>
                {tag}
              </span>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="sec-pad" style={{ background: "var(--page-bg)", padding: "80px 0" }}>
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="sec-pill" style={{ marginBottom: 14, display: "inline-flex" }}>
            <span className="sec-pill-dot" />
            CAPABILITIES
          </span>
          <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.12, marginTop: 12 }}>
            Everything Aiaura can do <span className="grad-text">for your shop.</span>
          </h2>
        </div>

        {/* Tabs — scrollable on mobile */}
        <div className="caps-tabs" style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ 
              padding: "9px 16px", borderRadius: 999, cursor: "pointer", 
              fontFamily: "var(--font-brand)", fontSize: 13, fontWeight: 700, 
              background: activeTab === i ? "linear-gradient(135deg,#10B981,#84CC16)" : "white", 
              color: activeTab === i ? "white" : "var(--ink-soft)", 
              border: activeTab === i ? "none" : "1px solid #E2E8F0", 
              transition: "all 0.18s", 
              boxShadow: activeTab === i ? "0 4px 16px rgba(16,185,129,0.3)" : "none", 
              whiteSpace: "nowrap" 
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="caps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "start" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(20px,2.5vw,24px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.2 }}>
              {TABS[activeTab].headline}
            </h3>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: 14, lineHeight: 1.65, color: "var(--ink-soft)", marginBottom: 22 }}>
              {TABS[activeTab].body}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {TABS[activeTab].features.map((f) => 
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <GreenCheck />
                  <span style={{ fontFamily: "var(--font-brand)", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                    {f}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            {TABS[activeTab].visual}
          </div>
        </div>
      </div>
    </section>
  );
};
/* ============================================================
SECTION 4 — HOW IT WORKS
============================================================ */

const HowItWorksSection = () => {
  const STEPS = [
    { num: "01", title: "We forward your number", body: "We set up a forwarding rule on your existing phone number. Zero downtime, zero new hardware. Takes under 15 minutes.", detail: "Works with any carrier — AT&T, Verizon, T-Mobile, VoIP" },
    { num: "02", title: "Aiaura learns your business", body: "We train Aiaura on your fleet, pricing rules, deposit policies, and brand voice. You review and approve everything before she goes live.", detail: "Training takes 2–3 business days" },
    { num: "03", title: "Test Mode — safe sandbox", body: "Aiaura goes live in Test Mode for 7 days. All calls are monitored. You can fine-tune her responses and escalation rules in real-time.", detail: "No live calls handled without your approval" },
    { num: "04", title: "Go fully live", body: "After you approve Test Mode, Aiaura is fully live. Every call, booking, and transcript synced to your dashboard in real-time.", detail: "Full go-live in 14 days or less" },
  ];

  return (
    <section className="sec-pad" style={{ background: "#F8FAFC", padding: "80px 0", borderTop: "1px solid #E2E8F0" }}>
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="sec-pill" style={{ marginBottom: 14, display: "inline-flex" }}>
              <span className="sec-pill-dot" />
              HOW IT WORKS
            </span>
            <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.12, margin: "14px 0 14px" }}>
              Live in <span className="grad-text">14 days.</span><br />No tech team.
            </h2>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: 14, lineHeight: 1.65, color: "var(--ink-soft)", marginBottom: 28 }}>
              We handle the full setup. You review and approve. Most shops are live within two weeks from first call.
            </p>
            <button className="btn-primary">Start Setup →</button>
          </div>

          <div style={{ position: "relative" }}>
            <div className="timeline-line" />
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < STEPS.length - 1 ? 28 : 0 }}>
                <div className="timeline-dot">{s.num}</div>
                <div style={{ paddingTop: 4, flex: 1 }}>
                  <h4 style={{ fontFamily: "var(--font-brand)", fontSize: 15, fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>
                    {s.title}
                  </h4>
                  <p style={{ fontFamily: "var(--font-brand)", fontSize: 13, lineHeight: 1.55, color: "var(--ink-soft)", marginBottom: 8 }}>
                    {s.body}
                  </p>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(16,185,129,0.08)", color: "var(--mint)", border: "1px solid rgba(16,185,129,0.18)" }}>
                    {s.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
SECTION 5 — COMPARISON TABLE
============================================================ */

const ComparisonSection = () => {
  const ROWS: { feature: string; aiaura: boolean | string; human: boolean | string; voicemail: boolean | string }[] = [
    { feature: "Answers 24/7", aiaura: true, human: false, voicemail: false },
    { feature: "Books rentals inside the call", aiaura: true, human: true, voicemail: false },
    { feature: "Speaks 22+ languages", aiaura: true, human: false, voicemail: false },
    { feature: "Call recording & transcription", aiaura: true, human: false, voicemail: false },
    { feature: "Detects caller sentiment", aiaura: true, human: false, voicemail: false },
    { feature: "Sends Stripe payment link", aiaura: true, human: true, voicemail: false },
    { feature: "Live-transfers VIP callers", aiaura: true, human: true, voicemail: false },
    { feature: "Zero hold music", aiaura: true, human: false, voicemail: false },
    { feature: "Scales with call volume", aiaura: true, human: false, voicemail: false },
    { feature: "Cost per month", aiaura: "Flat rate", human: "$3,200+", voicemail: "Lost revenue" },
  ];

  const cell = (v: boolean | string, color?: string) =>
    typeof v === "boolean"
      ? v ? <GreenCheck /> : <Cross />
      : <span style={{ ...mono, fontSize: 11, fontWeight: 800, color: color || "var(--mint)" }}>{v}</span>;

  return (
    <section className="sec-pad" style={{ background: "var(--page-bg)", padding: "80px 0" }}>
      <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="sec-pill" style={{ marginBottom: 14, display: "inline-flex" }}>
            <span className="sec-pill-dot" />
            WHY AIAURA
          </span>
          <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.12, marginTop: 12 }}>
            vs. the alternatives.
          </h2>
        </div>

        <div className="cmp-scroll glass-card" style={{ overflow: "hidden", padding: 0 }}>
          <table className="cmp-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left", width: "40%" }}>FEATURE</th>
                <th style={{ color: "#10B981", background: "rgba(16,185,129,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <div className="live-dot" style={{ width: 6, height: 6 }} />
                    AIAURA
                  </div>
                </th>
                <th>HUMAN STAFF</th>
                <th>VOICEMAIL</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "cmp-row-hl" : ""}>
                  <td style={{ fontFamily: "var(--font-brand)", fontWeight: 600, color: "var(--ink)" }}>
                    {r.feature}
                  </td>
                  <td style={{ textAlign: "center", background: "rgba(16,185,129,0.03)" }}>
                    {cell(r.aiaura)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {cell(r.human, "var(--ink-soft)")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {cell(r.voicemail, "#EF4444")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
/* ============================================================
SECTION 6 — TESTIMONIALS
============================================================ */

const TestimonialsSection = () => {
  const T = [
    { quote: "We were losing 30–40% of after-hours calls to voicemail. Since Aiaura went live, we haven't missed a single booking. Revenue up $8,400 in the first month.", name: "Derek Fontaine", role: "Owner — Apex Auto Rentals, Las Vegas", avatar: "DF", stars: 5, metric: "+$8,400", metricLabel: "First month revenue" },
    { quote: "My Spanish-speaking customers used to get frustrated. Aiaura switches languages in real time — they don't even know they're talking to AI. Retention is up 22%.", name: "Maria Castellanos", role: "Owner — Sol Rentals, Miami", avatar: "MC", stars: 5, metric: "+22%", metricLabel: "Customer retention" },
    { quote: "I used to work weekends just to answer calls. Now I sleep. Aiaura handles everything, books the rental, sends the contract. I just see confirmed bookings in the morning.", name: "James Okafor", role: "Owner — JO Premium Cars, Atlanta", avatar: "JO", stars: 5, metric: "0 hrs", metricLabel: "Weekend call duty" },
  ];

  return (
    <section className="sec-pad" style={{ background: "#F0FDF4", padding: "80px 0", borderTop: "1px solid rgba(16,185,129,0.12)" }}>
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="sec-pill" style={{ marginBottom: 14, display: "inline-flex" }}>
            <span className="sec-pill-dot" />
            RESULTS
          </span>
          <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.12, marginTop: 12 }}>
            Owners who never miss a call.
          </h2>
        </div>

        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {T.map((t) => (
            <div key={t.name} className="glass-card" style={{ padding: "22px 20px" }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {Array(t.stars).fill(0).map((_, i) => 
                  <span key={i} style={{ color: "#F59E0B", fontSize: 13 }}>★</span>
                )}
              </div>
              <p style={{ fontFamily: "var(--font-brand)", fontSize: 14, lineHeight: 1.65, color: "var(--ink-soft)", marginBottom: 16, fontStyle: "italic" }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, padding: "10px 14px", background: "rgba(16,185,129,0.06)", borderRadius: 12, border: "1px solid rgba(16,185,129,0.15)" }}>
                <span style={{ fontFamily: "var(--font-brand)", fontSize: 22, fontWeight: 800, background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {t.metric}
                </span>
                <span style={{ fontFamily: "var(--font-brand)", fontSize: 11, color: "var(--ink-soft)", fontWeight: 600 }}>
                  {t.metricLabel}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#10B981,#84CC16)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-brand)", fontSize: 12, fontWeight: 800, color: "white", flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-brand)", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-brand)", fontSize: 11, color: "var(--ink-soft)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
SECTION 7 — PRICING
============================================================ */

const PricingSection = () => {
  const PLANS = [
    { name: "Starter", price: "$149", period: "/mo", desc: "Perfect for single-location shops under 100 calls/month.", features: ["Up to 200 inbound minutes/mo", "Booking & quote handling", "SMS confirmation dispatch", "English + 1 language", "Call transcripts (30 days)", "Email support"], cta: "Start Free Trial", featured: false },
    { name: "Growth", price: "$349", period: "/mo", desc: "The most popular plan for growing rental shops.", features: ["Unlimited inbound minutes", "All Starter features", "22+ languages", "Live VIP transfer", "Sentiment detection", "CRM sync (Pipedrive / HQ)", "Transcripts — 90 days", "Priority support"], cta: "Start Free Trial", badge: "Most Popular", featured: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For multi-location operators and fleets of 50+ vehicles.", features: ["All Growth features", "Multiple location numbers", "White-glove onboarding", "Custom voice & persona", "Dedicated account manager", "SLA guarantee"], cta: "Book a Call", featured: false },
  ];

  return (
    <section className="sec-pad" style={{ background: "var(--page-bg)", padding: "80px 0" }}>
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="sec-pill" style={{ marginBottom: 14, display: "inline-flex" }}>
            <span className="sec-pill-dot" />
            PRICING
          </span>
          <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.12, marginTop: 12 }}>
            Flat rate. No surprises.
          </h2>
          <p style={{ fontFamily: "var(--font-brand)", fontSize: 14, color: "var(--ink-soft)", marginTop: 8 }}>
            60-day money-back guarantee. Cancel anytime.
          </p>
        </div>

        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, alignItems: "start" }}>
          {PLANS.map((p) => (
            <div key={p.name} className={p.featured ? "pricing-card-featured" : "glass-card"} style={{ padding: "26px 22px" }}>
              {p.featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--grad-cta)" }} />}
              
              {p.badge && (
                <div style={{ marginBottom: 10 }}>
                  <span style={{ ...mono, fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 999, background: "rgba(16,185,129,0.2)", color: "#34D399", letterSpacing: "0.06em" }}>
                    ✦ {p.badge}
                  </span>
                </div>
              )}

              <p style={{ fontFamily: "var(--font-brand)", fontSize: 14, fontWeight: 700, color: p.featured ? "rgba(255,255,255,0.6)" : "var(--ink-soft)", marginBottom: 6 }}>
                {p.name}
              </p>

              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ 
                  fontFamily: "var(--font-brand)", fontSize: 38, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", 
                  color: p.featured ? "white" : undefined, 
                  background: p.featured ? "none" : "var(--grad-text)", 
                  WebkitBackgroundClip: p.featured ? "unset" : "text", 
                  WebkitTextFillColor: p.featured ? "white" : "transparent", 
                  backgroundClip: p.featured ? "unset" : "text" 
                }}>
                  {p.price}
                </span>
                {p.period && (
                  <span style={{ fontFamily: "var(--font-brand)", fontSize: 14, color: p.featured ? "rgba(255,255,255,0.5)" : "var(--ink-soft)", fontWeight: 600 }}>
                    {p.period}
                  </span>
                )}
              </div>

              <p style={{ fontFamily: "var(--font-brand)", fontSize: 13, color: p.featured ? "rgba(255,255,255,0.55)" : "var(--ink-soft)", marginBottom: 20, lineHeight: 1.5 }}>
                {p.desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
                {p.features.map((f) => 
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <GreenCheck />
                    <span style={{ fontFamily: "var(--font-brand)", fontSize: 13, fontWeight: 600, color: p.featured ? "rgba(255,255,255,0.8)" : "var(--ink)" }}>
                      {f}
                    </span>
                  </div>
                )}
              </div>

              <button style={{ 
                width: "100%", padding: "13px", borderRadius: 12, cursor: "pointer", 
                fontFamily: "var(--font-brand)", fontSize: 14, fontWeight: 700, 
                background: p.featured ? "linear-gradient(135deg,#10B981,#84CC16)" : "transparent", 
                color: p.featured ? "white" : "var(--ink)", 
                border: p.featured ? "none" : "1.5px solid rgba(10,38,32,0.2)", 
                boxShadow: p.featured ? "0 4px 20px rgba(16,185,129,0.35)" : "none", 
                transition: "all 0.18s" 
              }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
/* ============================================================
SECTION 8 — FAQ
============================================================ */

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  const FAQS = [
    { q: "Will customers know they're talking to AI?", a: "Aiaura introduces herself by name but we never hide that she's AI — and most customers don't care. What they care about is getting answered fast, getting answers, and getting booked. Aiaura does all three better than voicemail." },
    { q: "What if Aiaura can't answer a question?", a: "Aiaura is trained on your specific fleet and policies. For anything outside her knowledge, she takes a message and schedules a callback — she never guesses or gives wrong information. You get a notification instantly." },
    { q: "Can I customize her voice and name?", a: "Yes. On the Growth and Enterprise plans you can choose from multiple voice options and give Aiaura any name you like. She'll introduce herself as your brand's receptionist." },
    { q: "What happens to calls when I want to talk to the customer?", a: "Aiaura can live-transfer any caller to you or another team member at any point. She announces the transfer, gives you context on who's calling and why, and connects the call seamlessly." },
    { q: "Does it work with my existing phone number?", a: "Yes. We set up call forwarding on your existing number — no porting, no new hardware, no downtime. Your number stays yours. Setup takes about 15 minutes." },
    { q: "How long does setup take?", a: "Most shops are fully live in 14 days or less. We handle training, setup, and Test Mode. You review and approve everything before Aiaura handles a single live call." },
  ];

  return (
    <section className="sec-pad" style={{ background: "#F8FAFC", padding: "clamp(60px, 8vh, 80px) 0", borderTop: "1px solid #E2E8F0" }}>
      <div className="container" style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vh, 44px)" }}>
          <span className="sec-pill" style={{ marginBottom: 14, display: "inline-flex" }}>
            <span className="sec-pill-dot" />
            FAQ
          </span>
          <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(20px,3.5vw,36px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.12, marginTop: 12 }}>
            Common questions answered.
          </h2>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span style={{ paddingRight: "clamp(8px, 2vw, 16px)", flex: 1, textAlign: "left" }}>{f.q}</span>
                <div className="faq-icon" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>
                  +
                </div>
              </button>
              <div className={`faq-a${open === i ? " open" : ""}`}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
SECTION 9 — BOTTOM CTA
============================================================ */

const BottomCTASection = () => (
  <section style={{ background: "var(--page-bg)", padding: "72px 0 96px" }}>
    <div className="container" style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
      <div className="dark-card cta-card-inner" style={{ padding: "52px 40px" }}>
        <div className="dark-card-accent" />
        
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(132,204,22,0.12))", margin: "0 auto 22px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(16,185,129,0.25)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </div>

        <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14 }}>
          Your next call is <span className="grad-text">already ringing.</span>
        </h2>

        <p style={{ fontFamily: "var(--font-brand)", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 420, margin: "0 auto 32px" }}>
          Stop sending customers to voicemail. Aiaura answers every call, books every rental, and pays for itself — guaranteed.
        </p>

        <div className="cta-row" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <button className="btn-primary" style={{ fontSize: 15, padding: "15px 32px" }}>
            <span className="live-dot" />
            Hear Aiaura Live
          </button>
          <button className="btn-ghost" style={{ fontSize: 15, padding: "15px 32px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
            Book a Demo →
          </button>
        </div>

        <p style={{ ...mono, fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.06em" }}>
          60-DAY MONEY-BACK · LIVE IN 14 DAYS · NO TECH TEAM
        </p>
      </div>
    </div>
  </section>
);

/* ============================================================
PAGE ROOT
============================================================ */

export default function ReceptionistPage() {
  return (
    <>
      <InjectStyles />
      <ServicePageTemplate>
        <div style={{ fontFamily: "var(--font-brand)" }}>
          <HeroSection />
          <TickerSection />
          <CapabilitiesSection />
          <HowItWorksSection />
          <ComparisonSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <BottomCTASection />
        </div>
      </ServicePageTemplate>
    </>
  );
}