"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SectionPill } from '../ui/SectionPill';

/* ─── CSS injected once ─────────────────────────────────────────── */
const STYLES = `
  .qflip-stage {
    max-width: 520px;
    min-height: 200px;
    margin: 0 auto;
    perspective: 1400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qflip-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qflip-card {
    transform-style: preserve-3d;
    transition: transform 600ms cubic-bezier(0.65, 0, 0.35, 1);
    width: 100%;
  }
  .qflip-card.is-flipping {
    transform: rotateX(-90deg);
  }
  .qflip-text {
    font-family: 'DM Sans', sans-serif;
    font-style: italic;
    font-weight: 600;
    font-size: 22px;
    line-height: 1.35;
    color: var(--ink, #0A2620);
    text-align: center;
    padding: 6px 10px 10px;
    backface-visibility: hidden;
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .marker-bg {
    position: absolute;
    left: -2px;
    top: 50%;
    transform: translateY(-50%);
    width: calc(100% + 4px);
    height: 70%;
    z-index: -1;
    pointer-events: none;
    overflow: visible;
  }
  .qflip-meta {
    font-family: 'Geist Mono', 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-mute, #9DB4AE);
    text-align: center;
    margin: 16px 0 0;
  }
  .qflip-meta .q-num {
    color: var(--mint-deep, #059669);
    font-variant-numeric: tabular-nums;
    transition: color 200ms;
  }
  .questions-tagline {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-align: center;
    margin-top: 36px;
    margin-bottom: 0;
    color: var(--ink, #0A2620);
  }
  .questions-tagline .grad {
    background: var(--grad-cta, linear-gradient(135deg, #10B981, #84CC16));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
  }
  .questions-sub {
    font-size: 13.5px;
    color: var(--ink-soft, #6B7F78);
    text-align: center;
    max-width: 38ch;
    margin: 8px auto 0;
  }
  .questions-sub-mute {
    font-size: 13px;
    color: var(--ink-mute, #9DB4AE);
    text-align: center;
    max-width: 38ch;
    margin: 18px auto 0;
  }
  .sec-head {
    text-align: center;
    margin-bottom: 28px;
  }
  .sec-head h2 {
    font-size: clamp(30px, 4vw, 40px);
    font-weight: 700;
    color: var(--ink, #0A2620);
    line-height: 1.2;
    margin: 12px 0 0;
  }
  .sec-head h2 .grad-italic {
    background: var(--grad-cta, linear-gradient(135deg, #10B981, #84CC16));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-style: italic;
  }
`;

const QUESTIONS = [
  "How many calls did you miss last weekend?",
  "How many Instagram DMs are unread right now?",
  "How many of your past customers haven't been contacted in 90 days?",
  "How many quotes are sitting open without follow-up?",
  "What's your conversion rate on Spanish-speaking inquiries?",
  "How many bookings did you lose to a faster competitor last month?",
  "What's your true cost of one missed phone call?",
  "Which channel converts at your highest rate — and how do you know?",
  "Which lead source has the highest close rate this quarter?",
  "Does your brand show up when tourists ask ChatGPT for the best rentals?",
  "Are your weekly numbers 100% accurate — or guesswork?",
  "Do you know what's happening in your business while you sleep?",
  "Still waiting on your team's reports to know what's happening?",
];

const TOTAL = QUESTIONS.length;

/* Rough marker SVG paths that look hand-drawn */
const MarkerBg = () => (
  <svg className="marker-bg" viewBox="0 0 520 48" preserveAspectRatio="none" aria-hidden="true">
    <path
      d="M4 28 C60 18, 200 14, 340 20 C420 24, 490 26, 516 22 C490 34, 420 38, 340 34 C200 28, 60 32, 4 38 Z"
      fill="rgba(167,243,208,0.55)"
    />
    <path
      d="M8 30 C80 22, 220 18, 360 24 C440 28, 500 26, 514 24 C500 36, 440 40, 360 36 C220 30, 80 36, 8 40 Z"
      fill="rgba(167,243,208,0.40)"
    />
  </svg>
);

export const QuestionsYouCanNotAnswer = () => {
  const [current, setCurrent] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flipToNext = () => {
    const card = cardRef.current;
    if (!card) return;

    // Start flip (tip top toward viewer)
    card.classList.add('is-flipping');

    // At the midpoint (300ms), swap the text content
    timerRef.current = setTimeout(() => {
      setCurrent(prev => {
        const next = (prev + 1) % TOTAL;
        setDisplayIdx(next);
        return next;
      });
      // Remove class so card flips back to upright
      card.classList.remove('is-flipping');
    }, 300);
  };

  useEffect(() => {
    // Hold for 5s, then flip
    timerRef.current = setTimeout(flipToNext, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const qNum = String(displayIdx + 1).padStart(2, '0');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <section
        id="questions"
        style={{
          background: '#FAFAF8',
          padding: '56px 16px',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>

          {/* Header */}
          <div className="sec-head">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <SectionPill>AIAURA KNOWS</SectionPill>
            </div>
            <h2>
              Be honest.{' '}
              <span className="grad-italic">How would you answer these?</span>
            </h2>
          </div>

          {/* Flip card stage */}
          <div className="qflip-stage">
            <div className="qflip-wrap">
              <div className="qflip-card" ref={cardRef} id="qflipCard">
                <div className="qflip-text" id="qflipText">
                  <MarkerBg />
                  <span id="qflipLabel">{QUESTIONS[displayIdx]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress label */}
          <p className="qflip-meta">
            <span className="q-num">{qNum}</span>
            {' '}OF {TOTAL} QUESTIONS
          </p>

          {/* Outro */}
          <p className="questions-tagline">
            You don't know.{' '}
            <span className="grad">Aiaura does.</span>
          </p>
          <p className="questions-sub">
            Aiaura answers every one of them. Within 60 days.
          </p>
          <p className="questions-sub-mute">
            Aiaura tracks every single thing automatically. And reports to you.
          </p>

        </div>
      </section>
    </>
  );
};