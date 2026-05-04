"use client";

import React from 'react';

export const FinalCTA = () => {
  return (
    <section 
      id="final-cta" 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ 
        background: '#FAFAF8',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
        
        {/* Heading */}
        <h2 
          className="font-sans font-bold mb-6 md:mb-8"
          style={{ 
            fontSize: 'clamp(32px, 6vw, 56px)', 
            lineHeight: 1.15,
            color: '#0A2620',
            letterSpacing: '-0.02em',
          }}
        >
          Ready to see{' '}
          <span 
            style={{ 
              background: 'linear-gradient(135deg, #10B981 0%, #4ADE5C 50%, #84CC16 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
              fontWeight: 800,
            }}
          >
            what you're missing?
          </span>
        </h2>

        {/* Subheading */}
        <p 
          className="mx-auto mb-10 md:mb-12"
          style={{ 
            color: '#6B7F78',
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          Free 20-minute audit. We'll show you the exact bookings, calls, and reviews you're losing this month.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            className="group relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #4ADE5C 50%, #84CC16 100%)',
              color: 'white',
              fontSize: 'clamp(16px, 2.5vw, 19px)',
              fontWeight: 700,
              padding: 'clamp(16px, 2vw, 20px) clamp(48px, 8vw, 64px)',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(16, 185, 129, 0.35), 0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(16, 185, 129, 0.45), 0 6px 16px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.35), 0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <span>Run my Mirror</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                transition: 'transform 0.3s ease',
              }}
              className="group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Subtle trust badge */}
        <p 
          className="mt-8"
          style={{ 
            color: '#A0B5AD',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          No credit card required · 20 minutes · Free forever
        </p>

      </div>

      {/* Decorative gradient blobs */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, rgba(132, 204, 22, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
};
