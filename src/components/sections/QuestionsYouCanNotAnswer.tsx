"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';

const PulseDot = ({ size = 6 }) => (
  <div className="rounded-full animate-pulse" style={{ width: size, height: size, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
);

const GradientText = ({ children, italic = false, className = '' }: any) => (
  <span className={`text-gradient ${italic ? 'italic' : ''} ${className}`}>{children}</span>
);

const SketchUnderline = ({ width = 180 }) => (
  <svg width={width} height="12" viewBox="0 0 180 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9.5C45.5 4.5 135 -2.5 178 8.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const QUESTIONS = [
  "How many calls did you miss last weekend?",
  "How many Instagram DMs are unread right now?",
  "Which 3 customers almost booked, then ghosted?",
  "What's your slowest response time this month?",
  "How many of your past customers haven't been contacted in 90 days?",
  "Which platforms have your worst reviews?",
  "How many quotes are sitting open without follow-up?",
  "What's your conversion rate on Spanish-speaking inquiries?",
  "Which of your cars made you the most money this month?",
  "What's happening on your accounts right now while you read this?",
];

export const QuestionsYouCanNotAnswer = () => {
  const [activeQ, setActiveQ] = useState(2);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [completedQs, setCompletedQs] = useState([0, 1]);
  const typeRef = useRef<NodeJS.Timeout | number | null>(null);

  const startTyping = (qIdx: number) => {
    const text = QUESTIONS[qIdx];
    setTypedText(''); setIsTyping(true); let i = 0;
    const type = () => {
      i++; setTypedText(text.slice(0, i));
      if (i < text.length) { typeRef.current = setTimeout(type, 30) as unknown as number; }
      else {
        setIsTyping(false);
        typeRef.current = setTimeout(() => {
          setCompletedQs(prev => [...prev, qIdx]);
          setActiveQ((qIdx + 1) % QUESTIONS.length);
        }, 2500) as unknown as number;
      }
    };
    typeRef.current = setTimeout(type, 300) as unknown as number;
  };

  useEffect(() => {
    if (typeof typeRef.current === 'number') clearTimeout(typeRef.current);
    startTyping(activeQ);
    return () => clearTimeout(typeRef.current!);
  }, [activeQ]);

  const windowQs = [];
  for (let offset = -2; offset <= 2; offset++) {
    const idx = ((activeQ + offset) % QUESTIONS.length + QUESTIONS.length) % QUESTIONS.length;
    windowQs.push({ idx, offset });
  }

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex justify-start mb-5">
          <SectionPill>THE QUESTIONS YOU CAN NOT ANSWER</SectionPill>
        </div>
        <h2 className="font-sans font-bold mb-2" style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#0A2620', lineHeight: 1.15 }}>
          Be honest. <GradientText italic>How would you answer these?</GradientText>
        </h2>
        <div className="mb-3"><SketchUnderline width={280} /></div>
        <p className="text-base mb-10" style={{ color: '#6B7F78' }}>
          Aiaura answers every one of them automatically.
        </p>

        {/* Question stack */}
        <div className="relative flex flex-col gap-4 mb-8 py-4 px-6 rounded-3xl" style={{ background: '#ffffff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
          {windowQs.map(({ idx, offset }) => {
            const isActive = offset === 0;
            const isCompleted = completedQs.includes(idx) && offset < 0;
            let opacity = 1;
            if (offset === -2) opacity = 0.2;
            else if (offset === -1) opacity = 0.45;
            else if (offset === 1) opacity = 0.3;
            else if (offset === 2) opacity = 0.15;
            const fontSize = isActive ? 22 : (Math.abs(offset) === 1 ? 16 : 13);

            return (
              <div key={`${idx}-${offset}`} className="relative flex items-start gap-3 transition-all duration-500" style={{ opacity }}>
                <div className="flex-1 relative">
                  {isActive && (
                    <span className="absolute -inset-x-2 -inset-y-1 rounded-xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', zIndex: 0 }} />
                  )}
                  <p className="font-sans italic relative z-10 leading-snug"
                    style={{ fontSize, color: isActive ? '#0A2620' : '#6B7F78', fontWeight: isActive ? 600 : 400 }}>
                    {isActive ? (
                      <>{typedText}{isTyping && <span className="animate-pulse" style={{ color: '#10B981' }}>|</span>}</>
                    ) : QUESTIONS[idx]}
                  </p>
                  {isActive && typedText.length > 8 && (
                    <div className="mt-1"><SketchUnderline width={Math.min(typedText.length * 9, 320)} /></div>
                  )}
                </div>

                {isCompleted && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #84CC16)' }}>
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
                {isActive && (
                  <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full mt-1"
                    style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', whiteSpace: 'nowrap' }}>
                    <PulseDot size={5} />
                    <span className="text-xs font-mono font-bold" style={{ color: '#10B981' }}>AIAURA KNOWS →</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress dots only — no label */}
        <div className="flex items-center gap-1.5 justify-center mb-8">
          {QUESTIONS.map((_, i) => (
            <div key={i} className="rounded-full transition-all" style={{
              width: i === activeQ ? 18 : 6, height: 6,
              background: completedQs.includes(i) || i === activeQ ? 'linear-gradient(135deg, #10B981, #84CC16)' : '#CBD5E1',
              boxShadow: i === activeQ ? '0 0 6px rgba(16,185,129,0.4)' : 'none',
            }} />
          ))}
        </div>

        {/* Tagline strip */}
        <div className="rounded-2xl p-5" style={{ background: '#F8FFFE', border: '1px solid #D1FAE5' }}>
          <p className="font-sans font-bold text-base" style={{ color: '#0A2620' }}>
            You don't know. <GradientText>Aiaura does.</GradientText>
          </p>
          <p className="text-sm italic mt-1" style={{ color: '#6B7F78' }}>
            Tracks every answer automatically across every channel, every customer, every booking.
          </p>
        </div>
      </div>
    </section>
  );
};
