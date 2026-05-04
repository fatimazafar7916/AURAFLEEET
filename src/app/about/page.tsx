"use client";

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F0FAF5 0%, #FAFAF8 100%)' }}>
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
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
                ABOUT AIAURA FLEETS
              </span>
            </div>
            
            <h1 className="font-sans font-bold mb-6" style={{ fontSize: 'clamp(40px, 5vw, 56px)', color: '#0A2620', lineHeight: 1.2 }}>
              We're building the future of{' '}
              <span className="text-gradient italic">
                fleet management
              </span>
            </h1>
            
            <p className="text-xl leading-relaxed" style={{ color: '#64748B' }}>
              Aiaura Fleets is the AI-powered operating system for luxury car rental businesses. 
              We help fleet owners never miss a booking, never lose a customer, and never break their brand.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16 p-10 rounded-3xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <h2 className="font-sans font-bold text-3xl mb-4" style={{ color: '#0A2620' }}>Our Mission</h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              Every day, luxury car rental operators lose thousands of dollars because they can't respond fast enough. 
              A DM at 11 PM. A text while driving. An email during a delivery. By the time they reply, the customer has moved on.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: '#475569', fontFamily: 'var(--font-sans)' }}>
              We built Aiaura to solve this. Our AI receptionist answers every message, books every rental, 
              and handles every inquiry—instantly, 24/7, across every channel. No more missed opportunities. 
              No more lost revenue. Just pure, automated growth.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <h2 className="font-sans font-bold text-3xl mb-6" style={{ color: '#0A2620' }}>The Story</h2>
            <div className="space-y-6">
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}>
                <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
                  Aiaura Fleets was born from a simple observation: the best luxury car rental operators 
                  weren't winning because they had better cars. They were winning because they responded faster.
                </p>
              </div>
              
              <div className="p-8 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
                  We spent months talking to fleet owners in Miami, Las Vegas, LA, and Scottsdale. 
                  The pattern was clear: every minute of delay meant lost bookings. Every missed message 
                  meant a customer going to a competitor.
                </p>
              </div>
              
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}>
                <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
                  So we built an AI that never sleeps, never misses a message, and never lets a booking slip away. 
                  Today, Aiaura handles thousands of conversations every day, booking rentals while operators sleep, 
                  drive, or focus on what matters: growing their business.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="font-sans font-bold text-3xl mb-8 text-center" style={{ color: '#0A2620' }}>Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Speed First",
                  description: "Every second counts. We optimize for response time above everything else."
                },
                {
                  title: "Never Break Brand",
                  description: "Our AI speaks your language, matches your tone, and represents your business perfectly."
                },
                {
                  title: "Radical Transparency",
                  description: "You see every conversation, every booking, every metric. No black boxes."
                },
                {
                  title: "Operator-Obsessed",
                  description: "We build for the people running fleets, not investors or algorithms."
                }
              ].map((value, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
                >
                  <h3 className="font-sans font-bold text-xl mb-2" style={{ color: '#0A2620' }}>
                    {value.title}
                  </h3>
                  <p className="text-base" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div 
            className="p-10 rounded-3xl text-center mb-16"
            style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(132,204,22,0.04))',
              border: '1px solid rgba(16,185,129,0.2)'
            }}
          >
            <h2 className="font-sans font-bold text-3xl mb-8" style={{ color: '#0A2620' }}>By the Numbers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "4.2s", label: "Average response time" },
                { number: "99.8%", label: "Messages answered" },
                { number: "24/7", label: "Always available" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div 
                    className="text-5xl font-bold mb-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #10B981, #84CC16)', 
                      WebkitBackgroundClip: 'text', 
                      WebkitTextFillColor: 'transparent' 
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#64748B' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="font-sans font-bold text-3xl mb-4" style={{ color: '#0A2620' }}>
              Ready to transform your fleet?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#64748B', fontFamily: 'var(--font-sans)' }}>
              Join the operators who never miss a booking.
            </p>
            <button 
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #10B981, #84CC16)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(16,185,129,0.3)'
              }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
