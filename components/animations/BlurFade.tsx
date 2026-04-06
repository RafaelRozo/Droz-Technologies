"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  once?: boolean;
  style?: React.CSSProperties;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "section";
}

export default function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 8,
  blur = "8px",
  once = true,
  style,
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const variants: Variants = {
    hidden: {
      y: yOffset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      style={style}
    >
      {children}
    </Tag>
  );
}
