"use client";

import { CSSProperties } from "react";
import { motion } from "framer-motion";

interface FactStripProps {
  number: string;
  text: string;
  delay?: number;
  style?: CSSProperties;
}

export default function FactStrip({
  number,
  text,
  delay = 0,
  style,
}: FactStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        width: "100%",
        padding: "20px 48px",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        gap: 40,
        ...style,
      }}
    >
      {/* Number / icon */}
      <span
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          color: "#f0f0f0",
          letterSpacing: "-0.03em",
          whiteSpace: "nowrap",
          flexShrink: 0,
          minWidth: 120,
        }}
      >
        {number}
      </span>

      {/* Separator tick */}
      <div
        style={{
          width: 1,
          height: 32,
          background: "rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      />

      {/* Text */}
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.6,
          letterSpacing: "0.01em",
        }}
      >
        {text}
      </p>
    </motion.div>
  );
}
