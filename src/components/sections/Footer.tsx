"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionPill } from '../ui/SectionPill';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

const CTAButton = ({ children, className = '', href, onClick }: any) => (
  <a href={href} onClick={onClick} className={`inline-flex items-center justify-center font-bold rounded-full transition-all hover:scale-105 active:scale-95 ${className}`}
    style={{ background: '#0A2620', color: '#ffffff', border: '1px solid #10B981', boxShadow: '0 8px 24px rgba(16,185,129,0.2)' }}>
    {children}
  </a>
);

const LinkedinIcon = ({ size, color }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const TwitterIcon = ({ size, color }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const YoutubeIcon = ({ size, color }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const FAQS = [
  { q: "How long does it take to get Aiaura up and running?", a: "Most US car rental operators are fully live within 14 days of sign-up. We do the technical heavy lifting: provisioning your phone numbers, verifying Meta business accounts, and connecting your existing tools. You bring the keys to your accounts and join one 30-minute kickoff call." },
  { q: "Do I have to replace my existing rental software?", a: "No. Aiaura plugs into your existing rental management software, CRM, payment processor, and other tools without requiring you to migrate or replace anything. We work alongside HQ Rental, RentSyst, Bluebird, HubSpot, Salesforce, Stripe, Twilio, and 14 more tools." },
  { q: "What if Aiaura makes a mistake at 3 AM?", a: "Aiaura starts in Test Mode where you approve every reply before it goes out, for the first 24 to 72 hours. Once you trust it, you switch to Live Mode. You can revert to Test Mode anytime. Aiaura also escalates urgent situations directly to your phone with a critical-priority notification." },
  { q: "Will Aiaura sound robotic or hurt my luxury brand?", a: "No. Aiaura learns your exact brand voice during onboarding through guided training sessions. It uses real-sounding voice synthesis for phone calls and matches your tone across text channels. We A/B test brand voice with your customers." },
  { q: "Can Aiaura handle Spanish-speaking customers?", a: "Yes. Aiaura speaks 22+ languages including Spanish, Portuguese, French, Mandarin, Russian, and Arabic. It detects the customer's language automatically and replies in the same language. For Miami operators, this typically captures an additional 10–15% of bookings." },
  { q: "What does Aiaura cost?", a: "Most US car rental operators with 5–50 cars choose the $1,999/month Boutique bundle. Run our free 5-minute audit to see your custom price based on fleet size and products needed." },
  { q: "What if I want to cancel?", a: "We offer a 60-day money-back promise. If Aiaura doesn't pay for itself in your first 60 days, we refund every cent. No fine print. No locked-in contracts. Cancel anytime month-to-month after the initial 60 days." },
  { q: "Are you a US company?", a: "Yes. We are a Delaware C-Corp with US data hosting on AWS US-East and a US-based customer success team. Our founder leads strategy calls personally." },
  { q: "Will Aiaura work with my existing phone number?", a: "Yes. You can keep your existing business phone number (we forward calls through Twilio) or get a new local number with your area code (305 Miami, 213 LA, 702 Vegas, etc.)." },
  { q: "How is Aiaura different from Air.ai or Smith.ai?", a: "Air.ai was shut down by the FTC in March 2026. Smith.ai handles phones only and does not know car rental specifics. Aiaura is built only for US car rental operators with 12 specialized AI products and a 60-day money-back guarantee." },
  { q: "Can I customize what Aiaura says?", a: "Yes. During onboarding we train Aiaura on your exact brand voice, pricing rules, fleet inventory, and policies. You can edit any prompt or response template anytime." },
  { q: "What about chargebacks and fraud?", a: "Aiaura includes AI Booking Protector which flags high-risk bookings before deposit clears, verifies driver licenses, and builds evidence packets for chargeback disputes automatically." },
  { q: "Can my team see what Aiaura is doing?", a: "Yes. The dashboard runs on phone, tablet, and laptop with real-time sync. You and your team can watch every conversation, take over manually, review activity logs, and see live revenue captured." },
  { q: "Does Aiaura integrate with my CRM?", a: "Yes. Aiaura connects to HubSpot, Salesforce, Pipedrive, Zoho CRM, plus the built-in CRMs of HQ Rental, RentSyst, and Bluebird. Customer records sync bi-directionally in real-time." },
  { q: "Is my customer data secure?", a: "Yes. All data is hosted on AWS US-East with SOC 2-track infrastructure, encryption at rest and in transit. We are CCPA, GDPR, and TCPA compliant. You own the data and can export anytime." },
];

function FAQItem({ item, idx, open, onToggle }: any) {
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(idx); }
    if (e.key === 'Escape' && open) onToggle(idx);
  };
  return (
    <div className="rounded-xl md:rounded-2xl overflow-hidden transition-all"
      style={{ background: '#ffffff', border: open ? '1px solid #BBF7D0' : '1px solid #E2E8F0', boxShadow: open ? '0 4px 20px rgba(16,185,129,0.08)' : 'none' }}>
      <button
        className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-left gap-3 md:gap-4 transition-colors hover:bg-slate-50"
        onClick={() => onToggle(idx)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-controls={`faq-answer-${idx}`}
        style={{ minHeight: 56 }}>
        <span className="font-sans font-semibold text-xs md:text-sm leading-snug" style={{ color: '#0A2620' }}>{item.q}</span>
        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: open ? 'linear-gradient(135deg, #10B981, #84CC16)' : '#F1F5F9', border: open ? 'none' : '1px solid #E2E8F0', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, background 0.2s ease' }}>
          <ChevronDown size={12} color={open ? 'white' : '#6B7F78'} />
        </div>
      </button>
      <div id={`faq-answer-${idx}`} role="region" style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
        <div className="px-4 md:px-6 pb-4 md:pb-5 pt-1">
          <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#2D4F47', lineHeight: 1.65 }}>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export const Footer = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 lg:py-20 bg-bg-paper overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="flex justify-center mb-4 md:mb-5">
            <SectionPill>COMMON QUESTIONS</SectionPill>
          </div>
          <h2 className="font-sans font-bold text-center mb-2" style={{ fontSize: 'clamp(20px,4vw,36px)', color: '#0A2620', lineHeight: 1.2 }}>
            Common questions, <GradientText italic>straight answers.</GradientText>
          </h2>
          <p className="text-sm md:text-base text-center mb-3 md:mb-4" style={{ color: '#6B7F78' }}>
            Still have questions? Book a 20-minute call — no sales pressure, just answers.
          </p>
          <div className="flex justify-center mb-6 md:mb-8">
            <a href="#audit" className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all hover:scale-105"
              style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <PulseDot size={6} />
              <span className="text-xs md:text-sm font-semibold" style={{ color: '#10B981' }}>Talk to Us →</span>
            </a>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2">
            {FAQS.map((item, idx) => (
              <FAQItem key={idx} item={item} idx={idx} open={openFaq === idx} onToggle={(i: number) => setOpenFaq(p => p === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="audit" className="py-12 md:py-16 lg:py-24" style={{ background: '#FAFAF8' }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="font-sans font-bold mb-4 md:mb-5" style={{ fontSize: 'clamp(24px, 5vw, 48px)', color: '#0A2620', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Ready to see{' '}
            <span style={{ background: 'linear-gradient(135deg, #10B981 0%, #4ADE5C 50%, #84CC16 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic', fontWeight: 800 }}>
              what you're missing?
            </span>
          </h2>
          <p className="mx-auto mb-8 md:mb-10" style={{ color: '#6B7F78', fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: 1.65, maxWidth: 520 }}>
            Free 20-minute audit. We'll show you the exact bookings, calls, and reviews you're losing this month.
          </p>
          <div className="flex justify-center">
            <button
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #4ADE5C 50%, #84CC16 100%)',
                color: 'white',
                fontSize: 'clamp(14px, 2.5vw, 18px)',
                fontWeight: 700,
                padding: 'clamp(14px, 2vw, 20px) clamp(32px, 8vw, 72px)',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 12px 40px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(16, 185, 129, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.35)';
              }}
            >
              <span>Run my Mirror</span>
              <span style={{ fontSize: '1.1em' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F172A', borderTop: '1px solid #1E293B' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-10">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-3 md:mb-4">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#fpl1)" opacity="0.9" transform="rotate(0 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#fpl2)" opacity="0.75" transform="rotate(72 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#fpl3)" opacity="0.7" transform="rotate(144 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#fpl4)" opacity="0.8" transform="rotate(216 18 18)"/>
                  <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#fpl5)" opacity="0.75" transform="rotate(288 18 18)"/>
                  <circle cx="18" cy="18" r="3.5" fill="white"/>
                  <defs>
                    <linearGradient id="fpl1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981"/><stop offset="1" stopColor="#84CC16"/></linearGradient>
                    <linearGradient id="fpl2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.7"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.5"/></linearGradient>
                    <linearGradient id="fpl3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.5"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.3"/></linearGradient>
                    <linearGradient id="fpl4" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16" stopOpacity="0.6"/><stop offset="1" stopColor="#10B981" stopOpacity="0.4"/></linearGradient>
                    <linearGradient id="fpl5" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16"/><stop offset="1" stopColor="#10B981"/></linearGradient>
                  </defs>
                </svg>
                <span className="font-sans font-bold text-base md:text-lg">
                  <span style={{ color: '#ffffff' }}>Aiaura</span>
                  <span style={{ color: '#10B981' }}> Fleets</span>
                </span>
              </div>
              <p className="text-xs md:text-sm leading-relaxed" style={{ color: '#94A3B8', maxWidth: 240 }}>
                AI staff for US car rental operators with 5–50 cars. Built to never miss a booking.
              </p>
            </div>

            {/* Links */}
            {[
              { heading: 'Product', links: ['Features', 'Integrations', 'Pricing'] },
              { heading: 'Company', links: ['About', 'FAQ', 'Contact'] },
              { heading: 'Legal', links: ['Privacy', 'Terms'] },
            ].map(col => (
              <div key={col.heading}>
                <p className="text-xs font-mono font-bold tracking-widest mb-3 md:mb-4" style={{ color: '#10B981' }}>{col.heading}</p>
                {col.links.map(link => (
                  <a key={link} href="#" className="block text-xs md:text-sm mb-2 md:mb-2.5 transition-colors hover:text-white" style={{ color: '#94A3B8' }}>{link}</a>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 md:pt-8 border-t gap-3 md:gap-4" style={{ borderColor: '#1E293B' }}>
            <p className="text-xs md:text-sm text-center sm:text-left" style={{ color: '#94A3B8' }}>
              © 2026 Aiaura Fleets. Built for US car rental operators.
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              {[LinkedinIcon, TwitterIcon, YoutubeIcon].map((Icon, i) => (
                <a key={i} href="#" className="transition-all hover:scale-110">
                  <Icon size={16} color="#10B981" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
