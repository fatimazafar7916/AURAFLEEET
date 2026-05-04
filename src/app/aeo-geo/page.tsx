"use client";

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MapPin, Search, Zap, TrendingUp } from 'lucide-react';

export default function AeoGeoPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F0FAF5 0%, #FAFAF8 100%)' }}>
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
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
                AEO-GEO OPTIMIZATION
              </span>
            </div>
            
            <h1 className="font-sans font-bold mb-6" style={{ fontSize: 'clamp(40px, 5vw, 56px)', color: '#0A2620', lineHeight: 1.2 }}>
              Dominate{' '}
              <span className="text-gradient italic">local search</span>
              {' '}with AI
            </h1>
            
            <p className="text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              When someone asks "luxury car rental near me" or "rent a Lamborghini in Miami," 
              Aiaura makes sure your fleet is the answer—across Google, ChatGPT, Perplexity, and every AI assistant.
            </p>
          </div>

          {/* What is AEO-Geo */}
          <div className="mb-16 p-10 rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h2 className="font-sans font-bold text-3xl mb-6" style={{ color: '#0A2620' }}>
              What is AEO-Geo?
            </h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              <strong style={{ color: '#0A2620' }}>Answer Engine Optimization (AEO)</strong> is the next evolution of SEO. 
              Instead of ranking on page one, you become the direct answer AI assistants give to users.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              <strong style={{ color: '#0A2620' }}>Geographic (Geo)</strong> targeting means we optimize for location-based queries—
              the exact searches luxury car rental customers make: "exotic car rental Miami Beach," 
              "Lamborghini rental near Wynwood," "luxury SUV rental Las Vegas Strip."
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="font-sans font-bold text-3xl mb-8 text-center" style={{ color: '#0A2620' }}>
              How Aiaura Dominates Local AI Search
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Search size={24} />,
                  title: "Real-Time Query Monitoring",
                  description: "We track every AI search query mentioning your city, vehicles, and competitors. You see exactly what customers are asking."
                },
                {
                  icon: <MapPin size={24} />,
                  title: "Hyper-Local Content Generation",
                  description: "Aiaura automatically creates location-specific content: neighborhood guides, event coverage, and local landmarks—all optimized for AI engines."
                },
                {
                  icon: <Zap size={24} />,
                  title: "Instant Response Signals",
                  description: "Every 4-second response, every booking, every review tells AI engines you're the fastest, most reliable option in your market."
                },
                {
                  icon: <TrendingUp size={24} />,
                  title: "Competitive Displacement",
                  description: "We identify gaps where competitors rank and systematically replace them in AI answers with your fleet."
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(16,185,129,0.1)' }}
                  >
                    <div style={{ color: '#10B981' }}>{feature.icon}</div>
                  </div>
                  <h3 className="font-sans font-bold text-xl mb-2" style={{ color: '#0A2620' }}>
                    {feature.title}
                  </h3>
                  <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Example Queries */}
          <div 
            className="mb-16 p-10 rounded-3xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(132,204,22,0.04))',
              border: '1px solid rgba(16,185,129,0.2)'
            }}
          >
            <h2 className="font-sans font-bold text-3xl mb-6 text-center" style={{ color: '#0A2620' }}>
              Queries We Optimize For
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "luxury car rental near me",
                "rent a Lamborghini in Miami",
                "exotic car rental South Beach",
                "best luxury car rental Las Vegas",
                "Range Rover rental Scottsdale",
                "wedding car rental Orlando",
                "McLaren rental near Brickell",
                "luxury SUV rental for weekend"
              ].map((query, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl flex items-center gap-3"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(16,185,129,0.1)' }}
                  >
                    <Search size={16} color="#10B981" />
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                    "{query}"
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Why It Matters */}
          <div className="mb-16 p-10 rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h2 className="font-sans font-bold text-3xl mb-6" style={{ color: '#0A2620' }}>
              Why AEO-Geo Matters for Your Fleet
            </h2>
            <div className="space-y-4">
              {[
                {
                  stat: "73%",
                  text: "of luxury car rental searches now start with AI assistants (ChatGPT, Perplexity, Google AI)"
                },
                {
                  stat: "4.2x",
                  text: "higher conversion rate from AI-referred traffic vs. traditional search"
                },
                {
                  stat: "89%",
                  text: "of users trust the first AI answer they receive—there's no page 2"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div 
                    className="text-3xl font-bold flex-shrink-0"
                    style={{ 
                      background: 'linear-gradient(135deg, #10B981, #84CC16)', 
                      WebkitBackgroundClip: 'text', 
                      WebkitTextFillColor: 'transparent',
                      minWidth: 80
                    }}
                  >
                    {item.stat}
                  </div>
                  <p className="text-lg pt-1" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Markets We Cover */}
          <div className="mb-16">
            <h2 className="font-sans font-bold text-3xl mb-8 text-center" style={{ color: '#0A2620' }}>
              Markets We Dominate
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Miami", "Las Vegas", "Los Angeles", "Scottsdale",
                "Orlando", "Atlanta", "Dallas", "Houston",
                "San Diego", "Phoenix", "Tampa", "Fort Lauderdale"
              ].map((city, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl text-center transition-all hover:scale-105"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                >
                  <MapPin size={20} color="#10B981" className="mx-auto mb-2" />
                  <span className="font-semibold text-sm" style={{ color: '#0A2620', fontFamily: 'var(--font-sans)' }}>
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className="p-12 rounded-3xl text-center"
            style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(132,204,22,0.04))',
              border: '1px solid rgba(16,185,129,0.2)'
            }}
          >
            <h2 className="font-sans font-bold text-3xl mb-4" style={{ color: '#0A2620' }}>
              Ready to own your local market?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Aiaura's AEO-Geo optimization is included in every plan. 
              Start dominating AI search results in your city today.
            </p>
            <button 
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #10B981, #84CC16)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(16,185,129,0.3)'
              }}
            >
              Get Started with AEO-Geo
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
