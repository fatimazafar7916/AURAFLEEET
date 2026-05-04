"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'rgba(250,250,248,0.98)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #D6EDE3' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(10,38,32,0.07)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
            <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#nl1)" opacity="0.9" transform="rotate(0 18 18)"/>
            <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#nl2)" opacity="0.75" transform="rotate(72 18 18)"/>
            <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#nl3)" opacity="0.7" transform="rotate(144 18 18)"/>
            <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#nl4)" opacity="0.8" transform="rotate(216 18 18)"/>
            <ellipse cx="18" cy="10" rx="5" ry="9" fill="url(#nl5)" opacity="0.75" transform="rotate(288 18 18)"/>
            <circle cx="18" cy="18" r="3.5" fill="white"/>
            <defs>
              <linearGradient id="nl1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981"/><stop offset="1" stopColor="#84CC16"/></linearGradient>
              <linearGradient id="nl2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.8"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.6"/></linearGradient>
              <linearGradient id="nl3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#10B981" stopOpacity="0.6"/><stop offset="1" stopColor="#84CC16" stopOpacity="0.4"/></linearGradient>
              <linearGradient id="nl4" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16" stopOpacity="0.7"/><stop offset="1" stopColor="#10B981" stopOpacity="0.5"/></linearGradient>
              <linearGradient id="nl5" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#84CC16"/><stop offset="1" stopColor="#10B981"/></linearGradient>
            </defs>
          </svg>
          <span className="font-tight font-bold text-lg leading-none tracking-tight">
            <span style={{ color: '#0A2620', fontWeight: 700 }}>Aiaura</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}> Fleets</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {['Product', 'How it works', 'Integrations', 'FAQ'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g,'-')}`}
              className="text-sm font-medium transition-colors hover:text-emerald-600"
              style={{ color: '#2D4F47' }}>
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href="#audit"
            className="hidden sm:flex items-center gap-1 px-5 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ height: 40, background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}>
            Get audit →
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(8px)' }}>
            {menuOpen ? <X size={16} color="#0A2620" /> : <Menu size={16} color="#0A2620" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-menu-open lg:hidden border-t mx-4 mb-2 rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          {['Product', 'How it works', 'Integrations', 'FAQ', 'Sign in'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g,'-')}`}
              className="block px-6 py-3.5 text-sm font-medium border-b transition-colors hover:text-emerald-600"
              style={{ color: '#2D4F47', borderColor: '#F1F5F9' }}
              onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <a href="#audit"
            className="block mx-4 my-3 text-center py-3 rounded-full text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)' }}
            onClick={() => setMenuOpen(false)}>
            Get audit →
          </a>
        </div>
      )}
    </nav>
  );
};
