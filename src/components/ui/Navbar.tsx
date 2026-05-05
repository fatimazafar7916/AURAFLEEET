"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Product menu data structure
  const productCategories = [
    {
      title: "FRONT DESK",
      items: [
        {
          name: "Receptionist",
          description: "Handles voicemail follow-up",
          href: "/services/receptionist",
          badge: "24/7"
        },
        {
          name: "Omnichannel Responder",
          description: "Handles 8 channels simultaneously",
          href: "/services/omnichannel",
          badge: "VIEW →"
        },
        {
          name: "Website Chatbot",
          description: "Converts every landing page visit",
          href: "/services/chatbot"
        },
        {
          name: "Lead Qualifier",
          description: "Scores leads Hot / Warm / Cold / Junk",
          href: "/services/lead-qualifier"
        }
      ]
    },
    {
      title: "SALES & FOLLOW-UP",
      items: [
        {
          name: "Quote & Booking",
          description: "Handles deposits and full payments",
          href: "/services/quote-booking"
        },
        {
          name: "Follow-up",
          description: "Cross-channel nudges: DM → SMS → Email",
          href: "/services/follow-up"
        },
        {
          name: "VIP Manager",
          description: "Auto-upgrades repeat renters",
          href: "/services/vip-manager"
        }
      ]
    },
    {
      title: "REPUTATION",
      items: [
        {
          name: "Review Manager",
          description: "Builds review templates per scenario",
          href: "/services/review-manager"
        },
        {
          name: "List Optimizer",
          description: "Posts fresh photos and offers",
          href: "/services/list-optimizer"
        },
        {
          name: "Customer Support",
          description: "Walks customers through damage reports",
          href: "/services/customer-support"
        }
      ]
    },
    {
      title: "MARKETING",
      items: [
        {
          name: "Email + Text Sender",
          description: "Segments customers by tier",
          href: "/services/email-text-sender"
        },
        {
          name: "AEO/GEO",
          description: "Builds geo-specific landing content",
          href: "/aeo-geo"
        },
        {
          name: "Social Manager",
          description: "Monitors hashtag performance",
          href: "/services/social-manager"
        },
        {
          name: "Quote Slides",
          description: "Personalizes per customer inquiry",
          href: "/services/quote-slides"
        }
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        {
          name: "Vehicle Tracking",
          description: "Monitors when customers cross business boundary",
          href: "/services/vehicle-tracking"
        },
        {
          name: "Finance & Insurance Verification",
          description: "Instant document verification and fraud detection",
          href: "/services/finance-insurance",
          badge: "NEW"
        }
      ]
    }
  ];

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
          <a href="/about"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
            style={{ color: '#2D4F47' }}>
            About
          </a>
          
          {/* Product Mega Menu */}
          <div className="relative"
            onMouseEnter={() => setProductMenuOpen(true)}
            onMouseLeave={() => setProductMenuOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-emerald-600"
              style={{ color: '#2D4F47' }}>
              Product
              <ChevronDown size={14} className={`transition-transform ${productMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mega Menu Dropdown */}
            {productMenuOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                <div className="p-8">
                  <div className="grid grid-cols-5 gap-8">
                    {productCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <h3 className="text-xs font-bold mb-4 tracking-wider"
                          style={{ color: '#10B981', letterSpacing: '0.1em' }}>
                          {category.title}
                        </h3>
                        <div className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <a key={itemIndex} href={item.href}
                              className="block group transition-all hover:bg-gray-50 p-2 rounded-lg -m-2">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold group-hover:text-emerald-600 transition-colors"
                                      style={{ color: '#0A2620' }}>
                                      {item.name}
                                    </span>
                                    {item.badge && (
                                      <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                                        style={{ 
                                          background: item.badge === 'NEW' ? '#10B981' : 'rgba(16,185,129,0.1)', 
                                          color: item.badge === 'NEW' ? 'white' : '#10B981' 
                                        }}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs mt-1 leading-relaxed"
                                    style={{ color: '#64748B' }}>
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm mb-3" style={{ color: '#64748B' }}>
                      Ready to see all solutions in action?
                    </p>
                    <a href="#audit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #10B981 0%, #84CC16 100%)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}>
                      Get Complete Audit →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <a href="/aeo-geo"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
            style={{ color: '#2D4F47' }}>
            AEO-GEO
          </a>
          <a href="/pricing"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
            style={{ color: '#2D4F47' }}>
            Pricing
          </a>
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
          <a href="/about"
            className="block px-6 py-3.5 text-sm font-medium border-b transition-colors hover:text-emerald-600"
            style={{ color: '#2D4F47', borderColor: '#F1F5F9' }}
            onClick={() => setMenuOpen(false)}>
            About
          </a>
          
          {/* Mobile Product Menu */}
          <div className="border-b" style={{ borderColor: '#F1F5F9' }}>
            <button 
              onClick={() => setProductMenuOpen(!productMenuOpen)}
              className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-colors hover:text-emerald-600"
              style={{ color: '#2D4F47' }}>
              Product
              <ChevronDown size={14} className={`transition-transform ${productMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {productMenuOpen && (
              <div className="px-6 pb-4">
                {productCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-4">
                    <h4 className="text-xs font-bold mb-2 tracking-wider"
                      style={{ color: '#10B981' }}>
                      {category.title}
                    </h4>
                    {category.items.map((item, itemIndex) => (
                      <a key={itemIndex} href={item.href}
                        className="block py-2 pl-4 text-sm transition-colors hover:text-emerald-600"
                        style={{ color: '#64748B' }}
                        onClick={() => setMenuOpen(false)}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <a href="/aeo-geo"
            className="block px-6 py-3.5 text-sm font-medium border-b transition-colors hover:text-emerald-600"
            style={{ color: '#2D4F47', borderColor: '#F1F5F9' }}
            onClick={() => setMenuOpen(false)}>
            AEO-GEO
          </a>
          <a href="/pricing"
            className="block px-6 py-3.5 text-sm font-medium border-b transition-colors hover:text-emerald-600"
            style={{ color: '#2D4F47', borderColor: '#F1F5F9' }}
            onClick={() => setMenuOpen(false)}>
            Pricing
          </a>
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
