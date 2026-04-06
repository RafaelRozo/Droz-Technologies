"use client";

import { motion } from "framer-motion";

type Direction = "left" | "center" | "right";

interface PlanStepProps {
  number: number;
  title: string;
  description: string;
  direction: Direction;
  isLast?: boolean;
  delay?: number;
}

const initialVariants: Record<Direction, { opacity: number; x?: number; y?: number }> = {
  left:   { opacity: 0, x: -60 },
  center: { opacity: 0, y: 30 },
  right:  { opacity: 0, x: 60 },
};

const animateVariants: Record<Direction, { opacity: number; x?: number; y?: number }> = {
  left:   { opacity: 1, x: 0 },
  center: { opacity: 1, y: 0 },
  right:  { opacity: 1, x: 0 },
};

export default function PlanStep({
  number,
  title,
  description,
  direction,
  isLast = false,
  delay = 0,
}: PlanStepProps) {
  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={animateVariants[direction]}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Step number */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "4rem",
          lineHeight: 1,
          color: "rgba(255,255,255,0.1)",
          letterSpacing: "-0.04em",
          marginBottom: 12,
          userSelect: "none",
        }}
      >
        {String(number).padStart(2, "0")}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          fontSize: 18,
          color: "#f0f0f0",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
          marginBottom: 10,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.7,
          letterSpacing: "0.01em",
        }}
      >
        {description}
      </p>

      {/* Connecting dashed line — hidden on last step */}
      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            marginTop: 24,
            height: 60,
            borderLeft: "2px dashed rgba(255,255,255,0.06)",
            alignSelf: "flex-start",
            marginLeft: 0,
          }}
        />
      )}
    </motion.div>
  );
}
