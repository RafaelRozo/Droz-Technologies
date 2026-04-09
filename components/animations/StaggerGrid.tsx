"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerGridProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  stagger?: number;
  duration?: number;
  mode?: "wave" | "center-out" | "random";
  once?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function StaggerGrid({
  children,
  columns = 3,
  gap = 20,
  stagger = 0.08,
  duration = 0.7,
  mode = "wave",
  once = true,
  style,
  className,
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-60px",
  });

  const getDelay = (index: number): number => {
    if (mode === "random") return Math.random() * stagger * children.length;
    if (mode === "center-out") {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const rows = Math.ceil(children.length / columns);
      const centerRow = (rows - 1) / 2;
      const centerCol = (columns - 1) / 2;
      const dist = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2),
      );
      return dist * stagger;
    }
    // wave: top-left diagonal
    const row = Math.floor(index / columns);
    const col = index % columns;
    return (row + col) * stagger;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        ...style,
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(4px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 24, scale: 0.96, filter: "blur(4px)" }
          }
          transition={{
            duration,
            delay: getDelay(i),
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
