"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.5 = half scroll speed, 1.5 = 1.5x, -0.5 = reverse
  style?: React.CSSProperties;
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  style,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = 200 * (1 - speed);
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
