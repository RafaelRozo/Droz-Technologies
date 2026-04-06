"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type RevealMode = "wipe-left" | "wipe-right" | "wipe-up" | "wipe-down" | "circular" | "diagonal";

interface ImageRevealMaskProps {
  src: string;
  alt: string;
  mode?: RevealMode;
  duration?: number;
  delay?: number;
  once?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const clipPaths: Record<RevealMode, { hidden: string; visible: string }> = {
  "wipe-left": {
    hidden: "inset(0 100% 0 0)",
    visible: "inset(0 0% 0 0)",
  },
  "wipe-right": {
    hidden: "inset(0 0 0 100%)",
    visible: "inset(0 0 0 0%)",
  },
  "wipe-up": {
    hidden: "inset(100% 0 0 0)",
    visible: "inset(0% 0 0 0)",
  },
  "wipe-down": {
    hidden: "inset(0 0 100% 0)",
    visible: "inset(0 0 0% 0)",
  },
  circular: {
    hidden: "circle(0% at 50% 50%)",
    visible: "circle(75% at 50% 50%)",
  },
  diagonal: {
    hidden: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
};

export default function ImageRevealMask({
  src,
  alt,
  mode = "wipe-left",
  duration = 1.2,
  delay = 0,
  once = true,
  style,
  className,
}: ImageRevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-60px",
  });

  const clip = clipPaths[mode];

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", position: "relative", ...style }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          willChange: "clip-path",
        }}
        initial={{ clipPath: clip.hidden, scale: 1.15 }}
        animate={
          isInView
            ? { clipPath: clip.visible, scale: 1 }
            : { clipPath: clip.hidden, scale: 1.15 }
        }
        transition={{
          clipPath: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
          scale: {
            duration: duration + 0.4,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      />
    </div>
  );
}
