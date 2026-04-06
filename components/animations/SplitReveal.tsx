"use client";

import { useRef, CSSProperties, RefObject } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";

interface SplitRevealProps {
  beforeTitle: string;
  afterTitle: string;
  beforeItems: string[];
  afterItems: string[];
  style?: CSSProperties;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SplitReveal({
  beforeTitle,
  afterTitle,
  beforeItems,
  afterItems,
  style,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as RefObject<Element>, {
    once: true,
    margin: "-80px",
  });
  const isMobile = useIsMobile();

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0a",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 3px 1fr",
          minHeight: isMobile ? "auto" : "60vh",
          position: "relative",
        }}
      >
        {/* ── Left: "Before" column — always visible ── */}
        <div
          style={{
            background: "#0a0a0a",
            padding: isMobile ? "40px 24px" : "80px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: isMobile ? 20 : 32,
          }}
        >
          {/* Label pill */}
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Before
          </p>

          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#f0f0f0",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {beforeTitle}
          </h2>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {beforeItems.map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 16,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.6,
                  paddingLeft: 20,
                  position: "relative",
                }}
              >
                {/* Bullet */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.55em",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Center: vertical divider line (hidden on mobile) ── */}
        <div
          style={{
            position: "relative",
            display: isMobile ? "none" : "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Track */}
          <div
            style={{
              width: 1,
              height: "100%",
              background: "rgba(255,255,255,0.04)",
              position: "absolute",
              top: 0,
            }}
          />
          {/* Animated fill */}
          <motion.div
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{
              width: 1,
              background: "rgba(255,255,255,0.2)",
              position: "absolute",
              top: 0,
              transformOrigin: "top center",
            }}
          />
        </div>

        {/* ── Right: "After" column — clips in on scroll ── */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 20 } : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            isInView
              ? isMobile ? { opacity: 1, y: 0 } : { clipPath: "inset(0 0% 0 0)" }
              : isMobile ? { opacity: 0, y: 20 } : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{ duration: isMobile ? 0.6 : 1.2, ease: EASE, delay: 0.15 }}
          style={{
            background: "#111111",
            overflow: "hidden",
            borderRadius: isMobile ? 16 : 0,
          }}
        >
          <div
            style={{
              padding: isMobile ? "40px 24px" : "80px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: isMobile ? 20 : 32,
              height: "100%",
            }}
          >
            {/* Label pill */}
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              After
            </p>

            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#f0f0f0",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {afterTitle}
            </h2>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {afterItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    fontSize: 16,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                    paddingLeft: 20,
                    position: "relative",
                  }}
                >
                  {/* Checkmark accent */}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.4em",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1,
                    }}
                  >
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
