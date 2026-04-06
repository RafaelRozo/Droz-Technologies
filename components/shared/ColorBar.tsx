"use client";

import { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ColorBarProps {
  accentColor?: string;
  style?: CSSProperties;
}

export default function ColorBar({
  accentColor = "rgba(255,255,255,0.08)",
}: ColorBarProps) {
  // Track scroll progress of the entire page (no target = window)
  const { scrollYProgress } = useScroll();

  // The lit segment is a 10% window centered at the current scroll percentage.
  // We map scroll progress [0,1] to the top edge of the lit window in vh units.
  // The window occupies 10% of the bar height. We clamp so it never goes
  // outside [0%, 90%].
  const litTop = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const litBottom = useTransform(scrollYProgress, (v) => {
    const pct = Math.min(Math.max(v, 0), 1);
    const center = pct * 100;
    const bottom = Math.min(100 - (center + 5), 100);
    return `${bottom}%`;
  });

  // Convert accentColor to a CSS custom property on the wrapper so the bottom
  // bar gradient can reference it via var(--accent).
  const cssVars = { "--accent": accentColor } as CSSProperties;

  return (
    // A zero-size wrapper that just provides the --accent CSS variable scope
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, ...cssVars }}>
      {/* ── Bottom bar ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 60,
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 20%, var(--accent) 80%, transparent 100%)",
          transition: "background 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      />

      {/* ── Left bar track ── */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          zIndex: 55,
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/*
          Lit segment: a motion.div whose top/bottom are driven by scroll.
          It sits inside the overflow-hidden track so it is naturally clipped.
        */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: litTop,
            bottom: litBottom,
            background: `linear-gradient(180deg, transparent 0%, ${accentColor} 20%, ${accentColor} 80%, transparent 100%)`,
            willChange: "top, bottom",
          }}
        />
      </div>
    </div>
  );
}
