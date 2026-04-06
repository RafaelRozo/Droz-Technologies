"use client";

import { useMotionValue, animate, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  style?: React.CSSProperties;
}

export default function InfiniteSlider({
  children,
  gap = 40,
  speed = 80,
  speedOnHover,
  reverse = false,
  style,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [width, setWidth] = useState(0);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  const measureRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setWidth(node.scrollWidth / 2);
  }, []);

  useEffect(() => {
    if (width === 0) return;

    const contentSize = width + gap;
    const from = reverse ? -contentSize : 0;
    const to = reverse ? 0 : -contentSize;
    const dist = Math.abs(to - from);
    const dur = dist / currentSpeed;

    let controls: ReturnType<typeof animate>;

    if (isTransitioning) {
      const remaining = Math.abs(translation.get() - to);
      const transDur = remaining / currentSpeed;
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: transDur,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((p) => p + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: dur,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [key, translation, currentSpeed, width, gap, isTransitioning, reverse]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => { setIsTransitioning(true); setCurrentSpeed(speedOnHover); },
        onHoverEnd: () => { setIsTransitioning(true); setCurrentSpeed(speed); },
      }
    : {};

  return (
    <div style={{ overflow: "hidden", ...style }}>
      <motion.div
        ref={measureRef}
        style={{
          display: "flex",
          width: "max-content",
          gap,
          x: translation,
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
