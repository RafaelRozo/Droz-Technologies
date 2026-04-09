"use client";

import { useRef, CSSProperties, ReactNode, RefObject } from "react";
import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";

interface PlanTimelineProps {
  children: ReactNode;
  style?: CSSProperties;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const planTimelineItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function PlanTimeline({ children, style }: PlanTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start 80%", "end 60%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      {/* Progress line track */}
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(255,255,255,0.06)",
            zIndex: 0,
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "rgba(255,255,255,0.15)",
              transformOrigin: "left",
              scaleX: prefersReduced ? 1 : lineScale,
            }}
          />
        </div>
      )}

      {/* Staggered children */}
      <motion.div
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? undefined : "hidden"}
        whileInView={prefersReduced ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 32 : 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
