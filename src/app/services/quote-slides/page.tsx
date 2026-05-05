"use client";

import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";

export default function QuoteSlidesPage() {
  return (
    <ServicePageTemplate>
      <div style={{ 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "#FAFAF8",
        padding: "80px 20px"
      }}>
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <h1 style={{ 
            fontSize: "clamp(32px, 5vw, 48px)", 
            fontWeight: 800, 
            color: "#0A2620", 
            marginBottom: "16px",
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            Quote Slides
          </h1>
          <p style={{ 
            fontSize: "18px", 
            color: "#64748B", 
            marginBottom: "24px",
            fontFamily: "'Inter', sans-serif"
          }}>
            Personalizes per customer inquiry
          </p>
          <div style={{
            padding: "12px 24px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "999px",
            display: "inline-block"
          }}>
            <span style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#10B981",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em"
            }}>
              CONTENT COMING SOON
            </span>
          </div>
        </div>
      </div>
    </ServicePageTemplate>
  );
}