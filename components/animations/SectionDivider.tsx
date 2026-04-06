"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  style?: React.CSSProperties;
  duration?: number;
  color?: string;
}

export default function SectionDivider({
  style,
  duration = 1.5,
  color = "rgba(255,255,255,0.06)",
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
