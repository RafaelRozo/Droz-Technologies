"use client";

import { useRef, useCallback, CSSProperties } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  metric?: string;
  metricLabel?: string;
}

interface TestimonialColumnsProps {
  testimonials: Testimonial[];
  style?: CSSProperties;
}

function TestimonialCardItem({ t }: { t: Testimonial }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 28,
        marginBottom: 16,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 8,
          right: 16,
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontSize: 48,
          lineHeight: 1,
          color: "rgba(255,255,255,0.06)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        &rdquo;
      </span>

      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          margin: 0,
          marginBottom: 20,
        }}
      >
        {t.quote}
      </p>

      {t.metric && (
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: 32,
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {t.metric}
          </span>
          {t.metricLabel && (
            <span
              style={{
                display: "block",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              {t.metricLabel}
            </span>
          )}
        </div>
      )}

      <div>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: 14,
            color: "#fff",
            margin: 0,
          }}
        >
          {t.name}
        </p>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            margin: 0,
            marginTop: 2,
          }}
        >
          {t.role}
        </p>
      </div>
    </motion.div>
  );
}

function ScrollingColumn({
  testimonials,
  speed,
  direction,
}: {
  testimonials: Testimonial[];
  speed: number;
  direction: 1 | -1;
}) {
  const y = useMotionValue(0);
  const hovered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const multiplier = hovered.current ? 0.2 : 1;
    const move = speed * direction * (delta / 1000) * multiplier;
    let next = y.get() + move;

    // Get half height for seamless loop reset
    const el = containerRef.current;
    if (el) {
      const halfHeight = el.scrollHeight / 2;
      if (halfHeight > 0) {
        if (direction === -1 && next < -halfHeight) next += halfHeight;
        if (direction === 1 && next > 0) next -= halfHeight;
      }
    }

    y.set(next);
  });

  // Duplicate cards for seamless loop
  const cards = [...testimonials, ...testimonials];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        height: "100%",
      }}
      onMouseEnter={() => { hovered.current = true; }}
      onMouseLeave={() => { hovered.current = false; }}
    >
      <motion.div
        ref={containerRef}
        style={{
          y,
          willChange: "transform",
        }}
      >
        {cards.map((t, i) => (
          <TestimonialCardItem key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialColumns({
  testimonials,
  style,
}: TestimonialColumnsProps) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  // Split testimonials across columns
  const col1 = testimonials.filter((_, i) => i % 2 === 0);
  const col2 = testimonials.filter((_, i) => i % 2 === 1);

  // Static fallback for mobile or reduced motion
  if (isMobile || prefersReduced) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16,
          ...style,
        }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCardItem key={i} t={t} />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        maxHeight: 500,
        overflow: "hidden",
        maskImage:
          "linear-gradient(to bottom, transparent, black 60px, black calc(100% - 60px), transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 60px, black calc(100% - 60px), transparent)",
        ...style,
      }}
    >
      <ScrollingColumn testimonials={col1} speed={25} direction={-1} />
      <ScrollingColumn testimonials={col2} speed={20} direction={-1} />
    </div>
  );
}
