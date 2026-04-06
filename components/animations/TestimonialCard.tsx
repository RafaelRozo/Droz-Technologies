"use client";

import { CSSProperties } from "react";
import { motion } from "framer-motion";
import CounterSpring from "@/components/animations/CounterSpring";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  metricValue?: number;
  metricSuffix?: string;
  metricPrefix?: string;
  metricLabel?: string;
  style?: CSSProperties;
}

export default function TestimonialCard({
  quote,
  name,
  title,
  company,
  metricValue,
  metricSuffix = "",
  metricPrefix = "",
  metricLabel = "",
  style,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        maxWidth: 800,
        marginLeft: "5%",
        padding: 48,
        background: "#111111",
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Large decorative quotation mark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 16,
          left: 32,
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "6rem",
          lineHeight: 1,
          color: "rgba(255,255,255,0.06)",
          userSelect: "none",
          pointerEvents: "none",
          fontWeight: 400,
        }}
      >
        &ldquo;
      </span>

      {/* Inner layout: quote block + optional metric */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {/* Left: quote + attribution */}
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Quote text */}
          <blockquote
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 18,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              fontStyle: "italic",
              margin: 0,
              paddingTop: 40, // clear the decorative quote mark
            }}
          >
            {quote}
          </blockquote>

          {/* Attribution */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#f0f0f0",
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.01em",
              }}
            >
              {title}
              {company ? `, ${company}` : ""}
            </p>
          </div>
        </div>

        {/* Right: metric highlight (optional) */}
        {metricValue !== undefined && (
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 8,
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              paddingLeft: 40,
              minWidth: 160,
            }}
          >
            <CounterSpring
              target={metricValue}
              prefix={metricPrefix}
              suffix={metricSuffix}
              duration={2.4}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.03em",
                color: "#f0f0f0",
                lineHeight: 1,
                display: "block",
                textAlign: "right",
              }}
            />
            {metricLabel && (
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textAlign: "right",
                }}
              >
                {metricLabel}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
