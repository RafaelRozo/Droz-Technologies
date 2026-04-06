"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

interface StickyRevealSectionProps {
  children: (progress: ReturnType<typeof useTransform<number, number>>) => React.ReactNode;
  scrollHeight?: string;
  style?: React.CSSProperties;
}

export default function StickyRevealSection({
  children,
  scrollHeight = "400vh",
  style,
}: StickyRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{ height: scrollHeight, position: "relative", ...style }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children(progress)}
      </div>
    </div>
  );
}
