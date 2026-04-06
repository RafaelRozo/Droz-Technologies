"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  zIndex?: number;
}

export default function ScrollProgressBar({
  color = "rgba(255,255,255,0.4)",
  height = 2,
  zIndex = 100,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        background: color,
        transformOrigin: "0%",
        scaleX,
        zIndex,
      }}
    />
  );
}
