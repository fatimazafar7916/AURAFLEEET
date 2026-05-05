"use client";

import React, { useState, useEffect } from "react";

/* ============================================================
   INJECT GLOBAL STYLES
   ============================================================ */

const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Geist+Mono:wght@400;600;700;800&display=swap');

:root {
  --mint:        #10B981;
  --mint-mid:    #34D399;
  --mint-light:  #6EE7B7;
  --lime:        #84CC16;
  --ink:         #0A2620;
  --ink-soft:    #64748B;
  --ink-mid:     #2D4F47;
  --page-bg:     #FAFAF8;
  --surface:     #FFFFFF;
  --hairline:    rgba(16,185,129,0.18);
  --grad-cta:    linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --grad-text:   linear-gradient(135deg, #10B981 0%, #84CC16 100%);
  --grad-dark:   linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  --shadow-card: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
  --shadow-glow: 0 0 32px rgba(16,185,129,0.18);
  --font-brand:  'DM Sans', sans-serif;
  --font-mono:   'Geist Mono', ui-monospace, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; }
body { background: var(--page-bg); font-family: var(--font-brand); }
