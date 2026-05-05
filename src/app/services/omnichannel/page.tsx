"use client";
import React, { useState, useEffect, useRef } from "react";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

/* ============================================================
   GLOBAL STYLES
============================================================ */
const OMNI_CSS = `
:root {
  --mint:       #10B981;
  --mint-mid:   #34D399;
  --lime:       #84CC16;
  --ink:        #0A2620;
  --ink-soft:   #64748B;
  --ink-mid:    #2D4F47;
  --page-bg:    #FAFAF8;
  --hairline:   rgba(16,185,129,0.16);
  --grad-cta:   linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --grad-text:  linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --light-bg:   #F0FDF4;
  --card-bg:    #FFFFFF;
  --dark-bg:    #0A2620;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
.omni-grad-text {
  background: var(--grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.omni-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 14px; border-radius: 999px;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.25);
  color: #10B981;
  font-family: 'JetBrains Mono', 'Geist Mono', monospace;
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
}
.omni-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--mint);
  animation: omni-blink 2s ease-in-out infinite;
}
@keyframes omni-blink { 0%,100%{opacity:1;box-shadow:0 0 6px #10B981}50%{opacity:0.3;box-shadow:none} }
.omni-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px; border: none; cursor: pointer;
  background: var(--grad-cta); color: white;
  font-family: 'JetBrains Mono', 'Geist Mono', monospace; font-size: 13px; font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 24px rgba(16,185,129,0.35);
  transition: transform 0.18s, box-shadow 0.18s;
}
.omni-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(16,185,129,0.5); }
.omni-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px; cursor: pointer;
  background: white; color: var(--ink);
  border: 1px solid rgba(16,185,129,0.3);
  font-family: 'JetBrains Mono', 'Geist Mono', monospace; font-size: 13px; font-weight: 600;
  transition: border-color 0.18s, background 0.18s;
}
.omni-btn-outline:hover { border-color: var(--mint); background: rgba(16,185,129,0.08); }
.msg-bubble {
  display: inline-flex; align-items: flex-start; gap: 8px;
  padding: 10px 14px; border-radius: 16px;
  font-size: 12.5px; font-weight: 500; line-height: 1.45;
  max-width: 88%;
}
.notif-card {
  animation: notif-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  background: white;
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 14px; padding: 11px 14px;
  display: flex; align-items: center; gap: 10px;
  box-shadow: 0 2px 8px rgba(16,185,129,0.08);
}
.notif-icon {
  width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}
@keyframes notif-in {
  from { opacity: 0; transform: translateX(32px) scale(0.92); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes count-bump { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
.live-counter { animation: count-bump 0.4s ease; }
.big-stat {
  font-family: 'JetBrains Mono', 'Geist Mono', monospace;
  font-size: clamp(42px, 7vw, 80px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  background: var(--grad-text);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.omni-reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.omni-reveal.visible { opacity: 1; transform: translateY(0); }
.light-hero { background: var(--page-bg); position: relative; overflow: hidden; }
.grid-bg {
  position:absolute; inset:0; pointer-events:none;
  background-image:linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px);
  background-size: 48px 48px;
}
.hero-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.tcard {
  background: white;
  border: 1px solid rgba(16,185,129,0.14);
  border-radius: 22px; padding: 26px 24px;
  position: relative; overflow: hidden;
}
.tcard::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background: var(--grad-cta); opacity: 0.6;
}
.faq-row { border-bottom: 1px solid rgba(16,185,129,0.1); }
.faq-btn {
  width:100%; background:none; border:none; cursor:pointer;
  display:flex; justify-content:space-between; align-items:center;
  padding: 18px 0; text-align:left;
  font-family:'JetBrains Mono', 'Geist Mono', monospace; font-size:13.5px; font-weight:700; color:var(--ink);
}
.faq-chevron {
  width:22px; height:22px; border-radius:50%;
  background:rgba(16,185,129,0.1); color:var(--mint);
  display:flex; align-items:center; justify-content:center;
  font-size:14px; font-weight:800; flex-shrink:0; transition:transform 0.2s;
}
.faq-body {
  font-size:13px; line-height:1.65; color:var(--ink-soft);
  max-height:0; overflow:hidden; padding-bottom:0;
  transition: max-height 0.32s ease, padding-bottom 0.32s ease;
}
.faq-body.open { max-height:220px; padding-bottom:16px; }
@keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.float-anim { animation: float-y 4s ease-in-out infinite; }
@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.cursor { display:inline-block; width:2px; height:1em; background:var(--mint); vertical-align:middle; animation:cursor-blink 1s step-end infinite; margin-left:1px; }

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .big-stat { font-size: clamp(32px, 10vw, 52px); }
  .omni-btn-primary, .omni-btn-outline { padding: 11px 20px; font-size: 12px; }
  .omni-pill { font-size: 10px; padding: 4px 12px; }
  .tcard { padding: 20px 18px; border-radius: 18px; }
  .faq-btn { font-size: 12px; padding: 12px 0; }
  .faq-body { font-size: 12px; }
  .faq-chevron { width: 20px; height: 20px; font-size: 12px; }
  .notif-card { padding: 9px 12px; }
  
  /* Additional mobile fixes */
  body { overflow-x: hidden; }
  .container { max-width: 100% !important; padding: 0 16px !important; }
  
  /* Grid fixes */
  .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .caps-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
  .how-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
  .testi-grid { grid-template-columns: 1fr !important; }
  .pricing-grid { grid-template-columns: 1fr !important; }
}

@media (max-width: 480px) {
  .container { padding: 0 12px !important; }
  .sec-pad { padding: 40px 0 !important; }
}
`;

function InjectOmniStyles() {
  useEffect(() => {
    if (document.getElementById("omni-page-styles")) return;
    const el = document.createElement("style");
    el.id = "omni-page-styles";
    el.textContent = OMNI_CSS;
    document.head.appendChild(el);
  }, []);
  return null;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const CHANNELS = [
  {
    name: "Instagram", color: "#E1306C",
    bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", emoji: "",
    convo: [
      { dir: "in",  text: "Hey! Is the Mustang still available this Saturday?", meta: "Comment on post" },
      { dir: "out", text: "Hi! Yes, the Mustang GT is available Saturday ✅ Sending you a booking link now!", meta: "Auto-DM in 4s" },
      { dir: "in",  text: "Amazing, just paid!", meta: "3 mins later" },
      { dir: "out", text: "Booking confirmed. Contract sent to your email. See you Saturday at 9 AM!", meta: "Instant" },
    ],
  },
  {
    name: "WhatsApp", color: "#25D366", bg: "#25D366", emoji: "",
    convo: [
      { dir: "in",  text: "Do you have any luxury cars available next weekend?", meta: "Inbound" },
      { dir: "out", text: "We have a Mercedes S-Class and BMW 7 Series available. Both start at $249/day. Which interests you?", meta: "2s reply" },
      { dir: "in",  text: "The Benz! Can I pay a deposit now?", meta: "" },
      { dir: "out", text: "Absolutely — here's your secure deposit link: pay.aiaura.io/apex/s241", meta: "Instant" },
    ],
  },
  {
    name: "SMS", color: "#34C759", bg: "#34C759", emoji: "",
    convo: [
      { dir: "in",  text: "hi do u have corvettes", meta: "Inbound text" },
      { dir: "out", text: "Hey! Yes — 2024 Corvette Stingray available. $289/day. Want me to hold it for you?", meta: "4s" },
      { dir: "in",  text: "yes please for fri-sun", meta: "" },
      { dir: "out", text: "Done! Holding it for Fri–Sun. Sending contract & payment link now", meta: "Instant" },
    ],
  },
  {
    name: "Email", color: "#EA4335", bg: "#EA4335", emoji: "",
    convo: [
      { dir: "in",  text: "Hello, I'm looking for a fleet of 5 vehicles for a corporate event on the 18th.", meta: "Email inquiry" },
      { dir: "out", text: "Hello! We'd love to accommodate your corporate booking. I'm preparing a custom fleet quote for 5 vehicles on the 18th — you'll receive it within 10 minutes.", meta: "Immediate" },
      { dir: "in",  text: "Perfect, our budget is around $2,000 for the weekend.", meta: "" },
      { dir: "out", text: "Great news — I have a package within budget: 3 SUVs + 2 sedans, full insurance, $1,920 total. DocuSign contract attached. Ready to confirm?", meta: "9 min later" },
    ],
  },
];

/* ── HERO ── */
const HeroSection = () => {
  const [activeNotif, setActiveNotif] = useState(0);
  const [msgCount, setMsgCount] = useState(247);
  const NOTIFS = [
    { channel: "Instagram", color: "#E1306C", bg: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", icon: "", text: "New comment booking — Mustang GT, Saturday", time: "just now" },
    { channel: "WhatsApp",  color: "#25D366", bg: "#25D366", icon: "", text: "Payment received — Mercedes S-Class, $498", time: "12s ago" },
    { channel: "SMS",       color: "#34C759", bg: "#34C759", icon: "", text: "Lead captured — Corvette inquiry, hot", time: "34s ago" },
    { channel: "Email",     color: "#EA4335", bg: "#EA4335", icon: "", text: "Corporate fleet inquiry — 5 vehicles, $2,000 budget", time: "1 min ago" },
  ];
  useEffect(() => {
    const t = setInterval(() => {
      setActiveNotif(n => (n + 1) % NOTIFS.length);
      setMsgCount(c => c + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="light-hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(60px, 10vh, 80px) 0 clamp(80px, 12vh, 140px)" }}>
      <div className="grid-bg" />
      <div className="hero-orb" style={{ width: 500, height: 500, background: "rgba(16,185,129,0.08)", top: -100, right: -100 }} />
      <div className="hero-orb" style={{ width: 300, height: 300, background: "rgba(132,204,22,0.05)", bottom: 100, left: -80 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "clamp(20px, 4vw, 32px)" }}>
          <span className="omni-pill">
            <span className="omni-pill-dot" />AI SOLUTIONS — OMNICHANNEL RESPONDER
          </span>
        </div>
        <div style={{ marginBottom: "clamp(20px, 3vw, 28px)" }}>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 92px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink)", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace" }}>
            8 channels.<br />
            <span style={{ fontFamily: "'Fraunces', 'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" }}>One{" "}</span>
            <span className="omni-grad-text" style={{ fontFamily: "'Fraunces', 'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>AI voice.</span>
          </h1>
        </div>
        <div style={{ marginBottom: "clamp(28px, 5vw, 44px)" }}>
          <p style={{ fontSize: "clamp(14px,1.6vw,19px)", color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 560, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            Replies on Instagram, WhatsApp, SMS, and Email — all at once, all in your voice, all within seconds. Closes bookings inside the conversation. No human needed.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(32px, 6vw, 56px)", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: "clamp(16px, 3vw, 28px)", marginBottom: "clamp(28px, 5vw, 44px)", flexWrap: "wrap" }}>
              {[
                { num: "8",  label: "Channels handled\nsimultaneously", suffix: "" },
                { num: "4",  label: "Second auto-DM\non Instagram",     suffix: "s" },
                { num: "24", label: "Hours a day,\n7 days a week",      suffix: "/7" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <span className="big-stat">{s.num}</span>
                    {s.suffix && <span style={{ fontSize: "clamp(18px,3vw,36px)", fontWeight: 800, background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.04em" }}>{s.suffix}</span>}
                  </div>
                  <p style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace", fontWeight: 600, letterSpacing: "0.04em", marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "clamp(24px, 4vw, 36px)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)", padding: "clamp(10px, 2vw, 14px) clamp(14px, 3vw, 20px)", borderRadius: 16, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span key={msgCount} className="live-counter" style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, fontFamily: "'JetBrains Mono', 'Geist Mono', monospace", background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>{msgCount.toLocaleString()}</span>
                  <span style={{ fontSize: "clamp(8px, 1.5vw, 9px)", color: "var(--ink-soft)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Messages today</span>
                </div>
                <div style={{ width: 1, height: "clamp(28px, 5vw, 36px)", background: "rgba(16,185,129,0.2)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {CHANNELS.map(ch => (
                    <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: ch.color, boxShadow: `0 0 5px ${ch.color}` }} />
                      <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace", fontWeight: 600 }}>{ch.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="omni-btn-primary"><span className="omni-pill-dot" />See It Live</button>
              <button className="omni-btn-outline">Book a Demo →</button>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "white", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 18, padding: "clamp(12px, 2vw, 16px)", boxShadow: "0 4px 16px rgba(16,185,129,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace" }}>LIVE ACTIVITY</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", animation: "omni-blink 1.5s infinite" }} />
                    <span style={{ fontSize: "clamp(8px, 1.6vw, 9px)", color: "#10B981", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</span>
                  </div>
                </div>
                {NOTIFS.map((n, i) => (
                  <div key={i} className="notif-card" style={{ marginBottom: i < NOTIFS.length - 1 ? 8 : 0, opacity: activeNotif === i ? 1 : 0.5, transform: `scale(${activeNotif === i ? 1 : 0.98})`, transition: "opacity 0.3s, transform 0.3s", border: activeNotif === i ? `1px solid ${n.color}44` : "1px solid rgba(16,185,129,0.1)" }}>
                    <div className="notif-icon" style={{ background: n.bg }}></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                        <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", fontWeight: 800, color: n.color, letterSpacing: "0.04em" }}>{n.channel}</span>
                        <span style={{ fontSize: "clamp(8px, 1.6vw, 9px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace" }}>{n.time}</span>
                      </div>
                      <p style={{ fontSize: "clamp(11px, 2vw, 12px)", color: "var(--ink)", fontWeight: 500, lineHeight: 1.35 }}>{n.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: "omni-blink 1s infinite" }} />
                <span style={{ fontSize: "clamp(10px, 2vw, 11.5px)", color: "var(--ink)", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace", fontWeight: 600 }}>
                  Responding to {CHANNELS[activeNotif].name} in real-time<span className="cursor" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── CHANNEL SHOWCASE ── */
const ChannelShowcaseSection = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % CHANNELS.length), 4000);
    return () => clearInterval(t);
  }, []);
  const ch = CHANNELS[active];

  const FEATURES: Record<string, { title: string; body: string }[]> = {
    Instagram: [
      { title: "Auto-DM in 4 seconds", body: "Every comment on your posts triggers an instant personalized DM — before a competitor even sees it." },
      { title: "Closes bookings in chat", body: "AI sends Stripe links, collects payment, and confirms the booking — all inside Instagram DMs." },
      { title: "Detects urgency, escalates", body: "Urgent inquiries or VIPs get flagged and transferred to you instantly with full context." },
    ],
    WhatsApp: [
      { title: "Full booking in one thread", body: "From first message to paid deposit — the entire rental is closed inside a single WhatsApp conversation." },
      { title: "Speaks any language", body: "Switches to the customer's language automatically. No manual settings. Works for 22+ languages." },
      { title: "Sends contracts & invoices", body: "DocuSign and Stripe links delivered directly in the chat. Customer signs, pays, confirmed." },
    ],
    SMS: [
      { title: "TCPA-compliant texting", body: "All outbound SMS follows TCPA compliance rules. Zero legal risk, full peace of mind." },
      { title: "Understands shorthand", body: "\"do u have a vette fri-sun\" → full booking response in under 4 seconds. Natural language, understood." },
      { title: "Broadcast campaigns", body: "Send promotional SMS to past customers, segmented by tier. Tracks replies, stops on response." },
    ],
    Email: [
      { title: "Corporate & fleet inquiries", body: "Handles multi-vehicle corporate requests with custom quotes, fleet packages, and contract dispatch." },
      { title: "Replies in under 10 minutes", body: "Every email inquiry gets a full personalized response within 10 minutes — including quotes and availability." },
      { title: "Full paper trail", body: "Every email thread is logged, tagged, and searchable. Disputes, confirmations, receipts — all there." },
    ],
  };

  return (
    <section style={{ background: "var(--page-bg)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <div>
            <span className="omni-pill" style={{ marginBottom: 14, display: "inline-flex" }}><span className="omni-pill-dot" />CHANNEL BY CHANNEL</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 12 }}>
              Watch it work on <span className="omni-grad-text">every platform.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {CHANNELS.map((c, i) => (
              <button key={c.name} onClick={() => setActive(i)} style={{ padding: "8px 16px", borderRadius: 999, cursor: "pointer", fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 700, background: active === i ? c.color : "white", color: active === i ? "white" : "var(--ink-soft)", border: active === i ? "none" : "1px solid #E2E8F0", transition: "all 0.2s", boxShadow: active === i ? `0 4px 16px ${c.color}44` : "none" }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: ch.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}></div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" }}>{ch.name} Responder</h3>
                <p style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 600 }}>AI-powered · Always on · Closes bookings</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(FEATURES[ch.name] || []).map((f) => (
                <div key={f.title} style={{ display: "flex", gap: 12, padding: "14px 16px", background: "#FAFAF8", borderRadius: 14, border: "1px solid #E2E8F0" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ch.color, marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${ch.color}` }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{f.title}</p>
                    <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: "var(--dark-bg)", borderRadius: 24, overflow: "hidden", border: `1px solid ${ch.color}33` }}>
              <div style={{ background: ch.bg, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 18 }}></div>
                <div>
                  <p style={{ color: "white", fontWeight: 800, fontSize: 13, margin: 0 }}>{ch.name}</p>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 10, margin: 0 }}>AI Responder — Online</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.9)", animation: "omni-blink 1.5s infinite" }} />
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>LIVE</span>
                </div>
              </div>
              <div style={{ padding: "18px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                {ch.convo.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.dir === "out" ? "flex-end" : "flex-start" }}>
                    {m.meta && <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Geist Mono', monospace", fontWeight: 600, marginBottom: 3, paddingLeft: m.dir === "in" ? 4 : 0, paddingRight: m.dir === "out" ? 4 : 0 }}>{m.meta}</span>}
                    <div className="msg-bubble" style={{ background: m.dir === "out" ? "linear-gradient(135deg, #10B981, #84CC16)" : "rgba(255,255,255,0.08)", color: "white", borderBottomLeftRadius: m.dir === "in" ? 4 : 18, borderBottomRightRadius: m.dir === "out" ? 4 : 18 }}>{m.text}</div>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", background: "rgba(255,255,255,0.05)", borderRadius: 14, width: "fit-content" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", animation: `omni-blink 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── BENTO ── */
const BentoSection = () => {
  const ref = useReveal();
  const [bookingCount, setBookingCount] = useState(1284);
  const [responseTime, setResponseTime] = useState(3.8);
  useEffect(() => {
    const t = setInterval(() => {
      setBookingCount(c => c + 1);
      setResponseTime(parseFloat((3.2 + Math.random() * 1.2).toFixed(1)));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "#F0FDF4", borderTop: "1px solid rgba(16,185,129,0.12)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="omni-pill" style={{ marginBottom: 14, display: "inline-flex" }}><span className="omni-pill-dot" />PLATFORM FEATURES</span>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 12 }}>
            One inbox. Every channel. <span className="omni-grad-text">Zero gaps.</span>
          </h2>
        </div>
        <div ref={ref} className="omni-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {/* Live bookings */}
          <div style={{ gridColumn: "1 / 3", background: "var(--dark-bg)", border: "0.5px solid rgba(16,185,129,0.2)", borderRadius: 22, padding: "32px 32px", display: "flex", alignItems: "center", gap: 40, position: "relative", overflow: "hidden" }}>
            <div className="grid-bg" style={{ opacity: 0.5 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span key={bookingCount} className="live-counter big-stat" style={{ fontSize: 72 }}>{bookingCount.toLocaleString()}</span>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Geist Mono', monospace", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 6 }}>Bookings closed this month</p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {CHANNELS.map((ch, idx) => (
                <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 6, borderRadius: 3, background: ch.color, opacity: 0.8 }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "'Geist Mono', monospace", fontWeight: 600 }}>{ch.name}</span>
                  <span style={{ fontSize: 11, color: ch.color, fontFamily: "'Geist Mono', monospace", fontWeight: 700, marginLeft: "auto" }}>{Math.floor(bookingCount * [0.38, 0.29, 0.20, 0.13][idx])}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Response time */}
          <div style={{ background: "white", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 22, padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Avg response time</p>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span key={responseTime} className="live-counter" style={{ fontSize: 52, fontWeight: 800, fontFamily: "'Geist Mono', monospace", background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, letterSpacing: "-0.04em" }}>{responseTime}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "var(--mint)", letterSpacing: "-0.02em" }}>s</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>Across all 8 channels</p>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "#E2E8F0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(responseTime / 10) * 100}%`, background: "var(--grad-cta)", borderRadius: 2, transition: "width 0.5s ease" }} />
            </div>
          </div>
          {/* Language */}
          <div style={{ background: "white", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 22, padding: "28px 24px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>Auto-language detection</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ lang: "English", flag: "🇺🇸", pct: 68 }, { lang: "Spanish", flag: "🇲🇽", pct: 19 }, { lang: "French", flag: "🇫🇷", pct: 8 }, { lang: "Arabic", flag: "🇦🇪", pct: 5 }].map((l) => (
                <div key={l.lang} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{l.flag}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", minWidth: 54 }}>{l.lang}</span>
                  <div style={{ flex: 1, height: 5, borderRadius: 2.5, background: "#F1F5F9", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${l.pct}%`, background: "var(--grad-cta)", borderRadius: 2.5 }} />
                  </div>
                  <span style={{ fontSize: 10, color: "var(--ink-soft)", fontFamily: "'Geist Mono', monospace", minWidth: 28, textAlign: "right" }}>{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Instagram auto-DM */}
          <div style={{ background: "var(--dark-bg)", border: "0.5px solid rgba(132,204,22,0.2)", borderRadius: 22, padding: "28px 24px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Instagram auto-DM</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ label: "Comment detected", t: "0.0s" }, { label: "Intent classified", t: "0.3s" }, { label: "DM sent", t: "4.1s" }, { label: "Booking link sent", t: "8.2s" }].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(16,185,129,0.2)", border: "1px solid #10B981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><polyline points="1.5,4 3,5.5 6.5,2" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{s.label}</span>
                  <span style={{ fontSize: 10, color: "#10B981", fontFamily: "'Geist Mono', monospace" }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Unified inbox */}
          <div style={{ background: "white", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 22, padding: "28px 24px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 18 }}>Unified inbox view</p>
            {[{ ch: "Instagram", color: "#E1306C", msg: "Mustang confirmed", t: "2m", unread: 0 }, { ch: "WhatsApp", color: "#25D366", msg: "Payment received", t: "4m", unread: 2 }, { ch: "SMS", color: "#34C759", msg: "Corvette, Fri–Sun", t: "6m", unread: 0 }, { ch: "Email", color: "#EA4335", msg: "Fleet quote sent", t: "9m", unread: 1 }].map((m) => (
              <div key={m.ch} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #F8FAFC" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", minWidth: 64 }}>{m.ch}</span>
                <span style={{ flex: 1, fontSize: 11, color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.msg}</span>
                <span style={{ fontSize: 10, color: "#CBD5E1", fontFamily: "'Geist Mono', monospace" }}>{m.t}</span>
                {m.unread > 0 && <div style={{ width: 16, height: 16, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 800 }}>{m.unread}</div>}
              </div>
            ))}
          </div>
          {/* Escalation */}
          <div style={{ gridColumn: "1 / 4", background: "linear-gradient(135deg, #0F172A 0%, #1A2E1A 100%)", border: "0.5px solid rgba(16,185,129,0.2)", borderRadius: 22, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Smart escalation</p>
              <h3 style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.2, maxWidth: 420 }}>The AI knows when to hand it to <span className="omni-grad-text">you.</span></h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 10, maxWidth: 380, lineHeight: 1.55 }}>VIPs, frustrated customers, fraud signals, or corporate deals over your threshold — escalated instantly with full context.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[{ label: "VIP detected", color: "#F59E0B" }, { label: "Fraud signal", color: "#EF4444" }, { label: "Corporate deal", color: "#6366F1" }, { label: "Unhappy customer", color: "#F97316" }].map((t) => (
                <span key={t.label} style={{ padding: "7px 14px", borderRadius: 999, background: t.color + "18", border: `1px solid ${t.color}44`, color: t.color, fontSize: 11, fontWeight: 700, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.04em" }}>↑ {t.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── PROOF WALL ── */
const ProofWallSection = () => {
  const ref = useReveal();
  const TESTIMONIALS = [
    { quote: "We run 8 channels now with zero extra staff. Aiaura replies faster than any human we've hired.", name: "Troy Mendes", role: "Apex Exotics, Phoenix", metric: "+$14K/mo", avatar: "TM", stars: 5 },
    { quote: "The Instagram DM feature alone paid for a year of Aiaura in 3 weeks. Booked 23 cars from comments.", name: "Kezia Obi", role: "KO Luxury Rentals, Houston", metric: "23 bookings", avatar: "KO", stars: 5 },
    { quote: "My Spanish-speaking customers now get instant replies in Spanish. Retention is up, complaints are down.", name: "Carlos Vega", role: "SunSet Cars, Miami", metric: "+31% retention", avatar: "CV", stars: 5 },
    { quote: "I replaced a $2,800/month answering service and a $1,200/month chatbot with one Aiaura plan.", name: "Diana Park", role: "Park Premium, LA", metric: "$4K/mo saved", avatar: "DP", stars: 5 },
    { quote: "Every channel, one inbox, one AI voice. My brand is consistent whether it's 2pm or 2am.", name: "Leon Baptiste", role: "LB Fleet, New York", metric: "24/7 coverage", avatar: "LB", stars: 5 },
    { quote: "Response times went from 4 hours to 4 seconds. Our Google reviews jumped from 4.1 to 4.8 in 60 days.", name: "Sandra Kwon", role: "Velocity Rentals, Chicago", metric: "4.1→4.8 ★", avatar: "SK", stars: 5 },
  ];
  return (
    <section style={{ background: "var(--page-bg)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="omni-pill" style={{ marginBottom: 14, display: "inline-flex" }}><span className="omni-pill-dot" />RESULTS</span>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 12 }}>
            Operators who <span className="omni-grad-text">never miss a message.</span>
          </h2>
        </div>
        <div ref={ref} className="omni-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="tcard">
              <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>{Array(t.stars).fill(0).map((_, i) => <span key={i} style={{ color: "#F59E0B", fontSize: 13 }}>★</span>)}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--ink-soft)", fontStyle: "italic", marginBottom: 18 }}>"{t.quote}"</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "rgba(16,185,129,0.06)", borderRadius: 10, border: "1px solid rgba(16,185,129,0.15)", marginBottom: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 800, background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t.metric}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--grad-cta)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--ink-soft)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FAQ ── */
const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const FAQS = [
    { q: "Can Aiaura really handle 8 channels at the same time?", a: "Yes. The AI runs as many parallel conversations as needed — there's no queue. A customer on Instagram, a WhatsApp inquiry, and an email can all get full responses simultaneously, each in the right tone and format for that channel." },
    { q: "Will it sound like a robot on Instagram?", a: "No. Aiaura is trained on your voice, your fleet, and your style. It writes DMs the way a great customer service rep would — warm, fast, and on-brand. Most customers have no idea they're talking to AI." },
    { q: "What stops it from replying to spam or junk?", a: "The AI classifies every inbound message for intent. Spam, trolls, and irrelevant messages are silently ignored or logged without replying. You can tune sensitivity to your preference." },
    { q: "Does it work with my existing Instagram business account?", a: "Yes. We connect via official Instagram Business API. No credential sharing, no scraping. Just a one-time authorization from your Meta Business Suite. Same for WhatsApp Business API." },
    { q: "What if a customer asks something the AI doesn't know?", a: "It will acknowledge, take down their details, and let you know immediately. It never fabricates an answer. You get a notification with the full context so you can follow up personally." },
    { q: "How long until it's live?", a: "14 days or less from signup. We handle the integrations, train the AI on your business, and run a Test Mode period so you can review responses before it goes fully live." },
  ];
  return (
    <section style={{ background: "var(--page-bg)", padding: "clamp(60px, 8vh, 100px) 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vh, 56px)" }}>
          <span className="omni-pill" style={{ marginBottom: 14, display: "inline-flex" }}><span className="omni-pill-dot" />FAQ</span>
          <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 12 }}>Questions, answered.</h2>
        </div>
        {FAQS.map((f, i) => (
          <div key={i} className="faq-row">
            <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
              <span style={{ paddingRight: "clamp(8px, 2vw, 16px)", flex: 1, textAlign: "left" }}>{f.q}</span>
              <div className="faq-chevron" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</div>
            </button>
            <div className={`faq-body${open === i ? " open" : ""}`}>{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── BOTTOM CTA ── */
const BottomCTASection = () => (
  <section style={{ background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)", padding: "clamp(80px, 12vh, 120px) 0", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(16,185,129,0.15)" }}>
    <div className="grid-bg" style={{ opacity: 0.4 }} />
    <div className="hero-orb" style={{ width: 700, height: 500, background: "rgba(16,185,129,0.08)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(120px)" }} />
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)", textAlign: "center", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(8px, 2vw, 12px)", marginBottom: "clamp(28px, 5vh, 36px)", flexWrap: "wrap" }}>
        {CHANNELS.map((ch, i) => (
          <div key={ch.name} className="float-anim" style={{ width: "clamp(36px, 7vw, 44px)", height: "clamp(36px, 7vw, 44px)", borderRadius: 12, background: ch.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(16px, 3.5vw, 20px)", boxShadow: `0 8px 24px ${ch.color}44`, animationDelay: `${i * 0.4}s` }}></div>
        ))}
      </div>
      <h2 style={{ fontSize: "clamp(32px,6vw,72px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "clamp(16px, 3vh, 20px)", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace" }}>
        Every message.<br />
        <span className="omni-grad-text" style={{ fontFamily: "'Fraunces', 'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(36px,6.5vw,78px)" }}>Every channel.</span>
      </h2>
      <p style={{ fontSize: "clamp(13px,1.6vw,18px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto clamp(36px, 6vh, 48px)", fontFamily: "'Inter', sans-serif" }}>
        Stop losing bookings to slow replies. Aiaura responds in seconds — Instagram, WhatsApp, SMS, Email — all in your voice, all the time.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: "clamp(20px, 3vh, 24px)" }}>
        <button className="omni-btn-primary" style={{ fontSize: "clamp(12px, 2.2vw, 14px)", padding: "clamp(14px, 2.5vw, 16px) clamp(28px, 5vw, 36px)" }}><span className="omni-pill-dot" />Start Free Trial</button>
        <button className="omni-btn-outline" style={{ fontSize: "clamp(11px, 2vw, 13px)", padding: "clamp(14px, 2.5vw, 16px) clamp(22px, 4vw, 28px)" }}>Hear It Respond Live →</button>
      </div>
      <p style={{ fontSize: "clamp(9px, 1.8vw, 11px)", color: "var(--ink-soft)", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', 'Geist Mono', monospace", fontWeight: 700 }}>60-DAY MONEY-BACK · LIVE IN 14 DAYS · NO TECH TEAM</p>
    </div>
  </section>
);

/* ── PAGE ROOT ── */
export default function OmnichannelPage() {
  return (
    <>
      <InjectOmniStyles />
      <ServicePageTemplate>
        <div style={{ fontFamily: "'Inter', 'JetBrains Mono', ui-monospace, sans-serif" }}>
          <HeroSection />
          <ChannelShowcaseSection />
          <BentoSection />
          <ProofWallSection />
          <FAQSection />
          <BottomCTASection />
        </div>
      </ServicePageTemplate>
    </>
  );
}
