"use client";

import { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CounterSpring from "@/components/animations/CounterSpring";

interface ImpactNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  subtitle: string;
  style?: CSSProperties;
}

export default function ImpactNumber({
  target,
  suffix = "",
  prefix = "",
  subtitle,
  style,
}: ImpactNumberProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        padding: "80px 48px",
        ...style,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          position: "relative",
        }}
      >
        {/* Subtle radial pulse behind number */}
        <motion.div
          aria-hidden="true"
          animate={
            prefersReduced
              ? { scale: 1, opacity: 0.5 }
              : { scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }
          }
          transition={
            prefersReduced
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Giant number */}
        <CounterSpring
          target={target}
          suffix={suffix}
          prefix={prefix}
          duration={2.2}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(8rem, 20vw, 16rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#f0f0f0",
            display: "block",
            textAlign: "center",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.02em",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}
