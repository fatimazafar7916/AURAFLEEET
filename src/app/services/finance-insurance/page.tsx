"use client";
import { useState, useEffect, useRef } from "react";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

/* ============================================================
   GLOBAL STYLES - Light Theme
============================================================ */
const FINANCE_CSS = `
:root {
  --mint:       #10B981;
  --lime:       #84CC16;
  --ink:        #0A2620;
  --ink-soft:   #64748B;
  --page-bg:    #FAFAF8;
  --grad-cta:   linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --grad-text:  linear-gradient(135deg, #10B981 0%, #84CC16 100%);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
.finance-grad-text {
  background: var(--grad-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.finance-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 14px; border-radius: 999px;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.25);
  color: #10B981;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
}
.finance-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--mint);
  animation: finance-blink 2s ease-in-out infinite;
}
@keyframes finance-blink { 0%,100%{opacity:1;box-shadow:0 0 6px #10B981}50%{opacity:0.3;box-shadow:none} }
.finance-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px; border: none; cursor: pointer;
  background: var(--grad-cta); color: white;
  font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 24px rgba(16,185,129,0.35);
  transition: transform 0.18s, box-shadow 0.18s;
}
.finance-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(16,185,129,0.5); }
.finance-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px; cursor: pointer;
  background: white; color: var(--ink);
  border: 1px solid rgba(16,185,129,0.3);
  font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600;
  transition: border-color 0.18s, background 0.18s;
}
.finance-btn-outline:hover { border-color: var(--mint); background: rgba(16,185,129,0.08); }
.light-hero { background: var(--page-bg); position: relative; overflow: hidden; }
.grid-bg {
  position:absolute; inset:0; pointer-events:none;
  background-image:linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px);
  background-size: 48px 48px;
}
.hero-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.feature-card {
  background: white;
  border: 1px solid rgba(16,185,129,0.14);
  border-radius: 22px; padding: 26px 24px;
  position: relative; overflow: hidden;
  box-shadow: 0 2px 12px rgba(16,185,129,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(16,185,129,0.12);
}
.big-stat {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(42px, 7vw, 80px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  background: var(--grad-text);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.process-step {
  background: white;
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 18px;
  padding: 24px;
  position: relative;
  box-shadow: 0 2px 12px rgba(16,185,129,0.06);
}
.process-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--grad-cta);
  border-radius: 18px 18px 0 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  /* Critical mobile fixes */
  body { overflow-x: hidden !important; }
  * { max-width: 100% !important; }
  
  .big-stat { font-size: clamp(32px, 10vw, 52px); }
  .finance-btn-primary, .finance-btn-outline { padding: 11px 20px; font-size: 12px; width: 100%; justify-content: center; }
  .finance-pill { font-size: 10px; padding: 4px 12px; }
  .feature-card { padding: 20px 18px; border-radius: 18px; }
  .process-step { padding: 18px; border-radius: 16px; }
  
  /* Grid fixes for mobile */
  .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .features-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
  .process-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
  .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
  
  /* Container and padding fixes */
  .container { max-width: 100% !important; padding: 0 16px !important; }
  .section-padding { padding: clamp(40px, 8vh, 80px) 0 !important; }
  
  /* Button fixes */
  .cta-buttons { flex-direction: column !important; gap: 12px !important; }
  .finance-btn-primary, .finance-btn-outline { max-width: 300px; margin: 0 auto; }
  
  /* Text alignment */
  h1, h2, h3 { text-align: center !important; }
  
  /* Section spacing */
  section { padding: clamp(40px, 8vh, 80px) 0 !important; }
}

@media (max-width: 480px) {
  .container { padding: 0 12px !important; }
  .section-padding { padding: clamp(32px, 6vh, 60px) 0 !important; }
  .feature-card { padding: 16px; }
  .process-step { padding: 16px; }
  .stats-grid { grid-template-columns: 1fr !important; }
  .finance-btn-primary, .finance-btn-outline { padding: 10px 16px; font-size: 11px; }
}
  .finance-pill { font-size: 10px; padding: 4px 12px; }
  .feature-card { padding: 20px 18px; border-radius: 18px; }
  .process-step { padding: 18px; }
}
`;

function InjectFinanceStyles() {
  useEffect(() => {
    if (document.getElementById("finance-page-styles")) return;
    const el = document.createElement("style");
    el.id = "finance-page-styles";
    el.textContent = FINANCE_CSS;
    document.head.appendChild(el);
  }, []);
  return null;
}

/* ── HERO SECTION ── */
const HeroSection = () => {
  const [verificationCount, setVerificationCount] = useState(1247);
  
  useEffect(() => {
    const t = setInterval(() => {
      setVerificationCount(c => c + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="light-hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(60px, 10vh, 80px) 0 clamp(80px, 12vh, 140px)" }}>
      <div className="grid-bg" />
      <div className="hero-orb" style={{ width: 500, height: 500, background: "rgba(16,185,129,0.08)", top: -100, right: -100 }} />
      <div className="hero-orb" style={{ width: 300, height: 300, background: "rgba(132,204,22,0.05)", bottom: 100, left: -80 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "clamp(20px, 4vw, 32px)" }}>
          <span className="finance-pill">
            <span className="finance-pill-dot" />AI SOLUTIONS — FINANCE & INSURANCE
          </span>
        </div>
        <div style={{ marginBottom: "clamp(20px, 3vw, 28px)" }}>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 92px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink)", fontFamily: "'JetBrains Mono', monospace" }}>
            Instant verification.<br />
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" }}>Zero{" "}</span>
            <span className="finance-grad-text" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 400 }}>delays.</span>
          </h1>
        </div>
        <div style={{ marginBottom: "clamp(28px, 5vw, 44px)" }}>
          <p style={{ fontSize: "clamp(14px,1.6vw,19px)", color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 560, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            AI-powered finance and insurance verification that processes applications in seconds, not hours. Reduce fraud, speed up approvals, and close more deals.
          </p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(32px, 6vw, 56px)", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: "clamp(16px, 3vw, 28px)", marginBottom: "clamp(28px, 5vw, 44px)", flexWrap: "wrap" }}>
              {[
                { num: "15", label: "Second average\nverification time", suffix: "s" },
                { num: "99.7", label: "Accuracy rate for\nfraud detection", suffix: "%" },
                { num: "24", label: "Hours processing\nevery single day", suffix: "/7" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <span className="big-stat">{s.num}</span>
                    {s.suffix && <span style={{ fontSize: "clamp(18px,3vw,36px)", fontWeight: 800, background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.04em" }}>{s.suffix}</span>}
                  </div>
                  <p style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "0.04em", marginTop: 4, lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.label}</p>
                </div>
              ))}
            </div>
            
            <div style={{ marginBottom: "clamp(24px, 4vw, 36px)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)", padding: "clamp(10px, 2vw, 14px) clamp(14px, 3vw, 20px)", borderRadius: 16, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span key={verificationCount} style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", background: "var(--grad-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>{verificationCount.toLocaleString()}</span>
                  <span style={{ fontSize: "clamp(8px, 1.5vw, 9px)", color: "var(--ink-soft)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Verified today</span>
                </div>
                <div style={{ width: 1, height: "clamp(28px, 5vw, 36px)", background: "rgba(16,185,129,0.2)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {[
                    { label: "Approved", count: Math.floor(verificationCount * 0.78), color: "#10B981" },
                    { label: "Flagged", count: Math.floor(verificationCount * 0.15), color: "#F59E0B" },
                    { label: "Rejected", count: Math.floor(verificationCount * 0.07), color: "#EF4444" },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
                        <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{item.label}</span>
                      </div>
                      <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", color: item.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="finance-btn-primary"><span className="finance-pill-dot" />Start Verification</button>
              <button className="finance-btn-outline">See Demo →</button>
            </div>
          </div>
          
          <div>
            <div style={{ background: "white", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 18, padding: "clamp(12px, 2vw, 16px)", boxShadow: "0 4px 16px rgba(16,185,129,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>LIVE VERIFICATION FEED</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", animation: "finance-blink 1.5s infinite" }} />
                  <span style={{ fontSize: "clamp(8px, 1.6vw, 9px)", color: "#10B981", fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</span>
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { time: "3:42 PM", type: "Credit Check", customer: "John D.", result: "Approved", score: "742", status: "success" },
                  { time: "3:41 PM", type: "Insurance Verify", customer: "Sarah M.", result: "Confirmed", score: "Valid", status: "success" },
                  { time: "3:40 PM", type: "Income Verify", customer: "Mike R.", result: "Flagged", score: "Review", status: "warning" },
                  { time: "3:39 PM", type: "Identity Check", customer: "Lisa K.", result: "Approved", score: "98%", status: "success" },
                ].map((verification, i) => (
                  <div key={i} style={{ padding: "10px 12px", background: verification.status === 'success' ? "#F0FDF4" : "#FFFBEB", borderRadius: 12, border: `1px solid ${verification.status === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: "clamp(10px, 2vw, 11px)", fontWeight: 700, color: "var(--ink)" }}>{verification.customer}</span>
                      <span style={{ fontSize: "clamp(8px, 1.6vw, 9px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', monospace" }}>{verification.time}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", color: "var(--ink-soft)" }}>{verification.type}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: "clamp(9px, 1.8vw, 10px)", color: verification.status === 'success' ? "#10B981" : "#F59E0B", fontWeight: 700 }}>{verification.result}</span>
                        <span style={{ fontSize: "clamp(8px, 1.6vw, 9px)", color: "var(--ink-soft)", fontFamily: "'JetBrains Mono', monospace" }}>({verification.score})</span>
                      </div>
                    </div>
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

/* ── PROCESS SECTION ── */
const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Document Upload",
      description: "Customer uploads ID, insurance cards, pay stubs, or bank statements through secure portal.",
      time: "< 30 seconds"
    },
    {
      number: "02", 
      title: "AI Analysis",
      description: "Advanced OCR and machine learning verify document authenticity and extract key data points.",
      time: "5-10 seconds"
    },
    {
      number: "03",
      title: "Cross-Reference",
      description: "Real-time checks against credit bureaus, insurance databases, and fraud detection systems.",
      time: "3-5 seconds"
    },
    {
      number: "04",
      title: "Instant Decision",
      description: "Automated approval, flagging, or rejection with detailed reasoning and next steps.",
      time: "< 2 seconds"
    }
  ];

  return (
    <section style={{ background: "var(--page-bg)", padding: "clamp(60px, 10vh, 100px) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 7vh, 64px)" }}>
          <span className="finance-pill" style={{ marginBottom: 14, display: "inline-flex" }}><span className="finance-pill-dot" />PROCESS</span>
          <h2 style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            From upload to approval in <span className="finance-grad-text">15 seconds.</span>
          </h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
          {steps.map((step, i) => (
            <div key={i} className="process-step">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--grad-cta)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>
                  {step.number}
                </div>
                <div style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "#10B981", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>
                  {step.time}
                </div>
              </div>
              <h3 style={{ fontSize: "clamp(16px, 2.5vw, 18px)", fontWeight: 800, color: "var(--ink)", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>{step.title}</h3>
              <p style={{ fontSize: "clamp(13px, 2vw, 14px)", color: "var(--ink-soft)", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FEATURES SECTION ── */
const FeaturesSection = () => {
  const features = [
    {
      title: "Fraud Detection",
      description: "Advanced AI algorithms detect document tampering, identity theft, and suspicious patterns with 99.7% accuracy."
    },
    {
      title: "Real-Time Processing",
      description: "Instant verification through direct API connections to credit bureaus, banks, and insurance providers."
    },
    {
      title: "Credit Analysis", 
      description: "Comprehensive credit scoring with alternative data sources for thin-file and subprime customers."
    },
    {
      title: "Bank Verification",
      description: "Verify account ownership, balance history, and income patterns through secure bank connections."
    },
    {
      title: "Insurance Validation",
      description: "Confirm active coverage, policy limits, and claims history across all major insurance carriers."
    },
    {
      title: "Compliance Ready",
      description: "FCRA, GLBA, and state-compliant processes with full audit trails and regulatory reporting."
    },
  ];

  return (
    <section style={{ background: "#F0FDF4", padding: "clamp(60px, 10vh, 100px) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 5vw, 32px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 7vh, 64px)" }}>
          <span className="finance-pill" style={{ marginBottom: 14, display: "inline-flex" }}><span className="finance-pill-dot" />CAPABILITIES</span>
          <h2 style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.035em", lineHeight: 1.1, marginTop: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            Complete verification. <span className="finance-grad-text">Zero compromise.</span>
          </h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
          {features.map((feature, i) => (
            <div key={i} className="feature-card">
              <h3 style={{ fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 800, color: "var(--ink)", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>{feature.title}</h3>
              <p style={{ fontSize: "clamp(13px, 2vw, 14px)", color: "var(--ink-soft)", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── PAGE ROOT ── */
export default function FinanceInsurancePage() {
  return (
    <>
      <InjectFinanceStyles />
      <ServicePageTemplate>
        <div style={{ fontFamily: "'Inter', 'JetBrains Mono', ui-monospace, sans-serif" }}>
          <HeroSection />
          <ProcessSection />
          <FeaturesSection />
        </div>
      </ServicePageTemplate>
    </>
  );
}