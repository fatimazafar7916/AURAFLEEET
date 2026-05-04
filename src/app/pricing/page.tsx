"use client";

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Check } from 'lucide-react';

const PricingCard = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  highlighted = false,
  cta = "Get Started"
}: any) => (
  <div 
    className="relative rounded-3xl p-8 transition-all hover:scale-105"
    style={{
      background: highlighted 
        ? 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(132,204,22,0.04))' 
        : '#FFFFFF',
      border: highlighted 
        ? '2px solid rgba(16,185,129,0.3)' 
        : '1px solid #E2E8F0',
      boxShadow: highlighted 
        ? '0 20px 60px rgba(16,185,129,0.15)' 
        : '0 4px 20px rgba(0,0,0,0.06)'
    }}
  >
    {highlighted && (
      <div 
        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold"
        style={{ 
          background: 'linear-gradient(135deg, #10B981, #84CC16)', 
          color: 'white',
          boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
        }}
      >
        MOST POPULAR
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold mb-2" style={{ color: '#0A2620' }}>{name}</h3>
      <p className="text-sm mb-4" style={{ color: '#64748B' }}>{description}</p>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-5xl font-bold" style={{ 
          background: 'linear-gradient(135deg, #10B981, #84CC16)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          ${price}
        </span>
        <span className="text-lg" style={{ color: '#64748B' }}>/{period}</span>
      </div>
    </div>

    <button 
      className="w-full py-3.5 rounded-full font-semibold text-base mb-6 transition-all hover:scale-105"
      style={{
        background: highlighted 
          ? 'linear-gradient(135deg, #10B981, #84CC16)' 
          : '#F8FFFE',
        color: highlighted ? 'white' : '#10B981',
        border: highlighted ? 'none' : '1px solid #D1FAE5',
        boxShadow: highlighted ? '0 4px 20px rgba(16,185,129,0.3)' : 'none'
      }}
    >
      {cta}
    </button>

    <div className="space-y-3">
      {features.map((feature: string, idx: number) => (
        <div key={idx} className="flex items-start gap-3">
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(16,185,129,0.1)' }}
          >
            <Check size={12} color="#10B981" strokeWidth={3} />
          </div>
          <span className="text-sm" style={{ color: '#475569' }}>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "497",
      period: "month",
      description: "Perfect for small fleets getting started",
      features: [
        "Up to 5 vehicles",
        "AI receptionist (24/7)",
        "Instagram + WhatsApp + SMS",
        "Basic analytics dashboard",
        "Email support",
        "14-day money back guarantee"
      ]
    },
    {
      name: "Professional",
      price: "997",
      period: "month",
      description: "For growing fleets that need more power",
      features: [
        "Up to 20 vehicles",
        "AI receptionist (24/7)",
        "All channels (IG, WA, SMS, Email, Calls)",
        "Advanced analytics & reporting",
        "CRM integrations (HubSpot, Stripe)",
        "Priority support",
        "Custom AI training",
        "Multi-location support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "month",
      description: "For large fleets with custom needs",
      features: [
        "Unlimited vehicles",
        "AI receptionist (24/7)",
        "All channels + custom integrations",
        "White-label dashboard",
        "Dedicated account manager",
        "Custom AI workflows",
        "API access",
        "SLA guarantee",
        "On-premise deployment option"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F0FAF5 0%, #FAFAF8 100%)' }}>
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                background: 'rgba(16,185,129,0.1)', 
                border: '1px solid rgba(16,185,129,0.2)' 
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
              <span className="text-xs font-bold tracking-wider" style={{ color: '#10B981' }}>
                SIMPLE, TRANSPARENT PRICING
              </span>
            </div>
            
            <h1 className="font-sans font-bold mb-4" style={{ fontSize: 'clamp(40px, 5vw, 56px)', color: '#0A2620', lineHeight: 1.2 }}>
              Choose your <span className="text-gradient">plan</span>
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              No hidden fees. Cancel anytime. 14-day money back guarantee.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan, idx) => (
              <PricingCard key={idx} {...plan} />
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-sans font-bold text-3xl text-center mb-8" style={{ color: '#0A2620' }}>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  q: "What's included in the 14-day guarantee?",
                  a: "If you're not satisfied within the first 14 days, we'll refund your payment in full. No questions asked."
                },
                {
                  q: "Do you offer custom pricing?",
                  a: "Yes! For fleets with 50+ vehicles or unique requirements, contact our sales team for custom pricing."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, ACH transfers, and wire transfers for Enterprise plans."
                }
              ].map((faq, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                >
                  <h3 className="font-sans font-bold text-lg mb-2" style={{ color: '#0A2620' }}>
                    {faq.q}
                  </h3>
                  <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="mt-20 p-12 rounded-3xl text-center"
            style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(132,204,22,0.04))',
              border: '1px solid rgba(16,185,129,0.2)'
            }}
          >
            <h2 className="font-sans font-bold text-3xl mb-4" style={{ color: '#0A2620' }}>
              Still have questions?
            </h2>
            <p className="text-lg mb-6" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Our team is here to help you find the perfect plan for your fleet.
            </p>
            <button 
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #10B981, #84CC16)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(16,185,129,0.3)'
              }}
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
