"use client";

import React from "react";

interface HeroTextPanelProps {
  title: string[];
  subtitle: string;
  buttons: { label: string; href: string }[];
  objectLabel?: string;
}

const HeroTextPanel = React.forwardRef<HTMLDivElement, HeroTextPanelProps>(
  ({ title, subtitle, buttons, objectLabel }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 6vw",
          zIndex: 10,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {/* Glassmorphism backing */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "55%",
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage:
              "linear-gradient(90deg, black 0%, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, black 0%, black 50%, transparent 100%)",
            zIndex: -1,
          }}
        />

        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(3rem, 6.5vw, 6rem)",
            lineHeight: 1.02,
            color: "white",
            fontWeight: 400,
            maxWidth: "600px",
          }}
        >
          {title.map((line, j) => (
            <span key={j} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </h2>

        <p
          style={{
            marginTop: "1.5rem",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.85rem, 1vw, 1rem)",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "#d0d0d0",
            maxWidth: "460px",
          }}
        >
          {subtitle}
        </p>

        <div style={{ display: "flex", gap: "0.875rem", marginTop: "2rem" }}>
          {buttons.map((btn, k) => (
            <a
              key={k}
              href={btn.href}
              style={{
                padding: "0.7rem 1.75rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                textDecoration: "none",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                transition: "border-color 0.3s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.25)")
              }
            >
              {btn.label}
            </a>
          ))}
        </div>

        {objectLabel && (
          <div
            style={{
              position: "absolute",
              bottom: "5vh",
              right: "5vw",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            {objectLabel}
          </div>
        )}
      </div>
    );
  }
);

HeroTextPanel.displayName = "HeroTextPanel";
export default HeroTextPanel;
