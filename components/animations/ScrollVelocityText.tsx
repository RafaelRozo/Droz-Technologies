"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface ScrollVelocityTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  style?: React.CSSProperties;
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function ScrollVelocityText({
  children,
  baseVelocity = -0.3,
  className,
  style,
}: ScrollVelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 50,
  });

  const prevScrollY = useRef(0);
  const directionFactor = useRef(1);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const delta = latest - prevScrollY.current;
      prevScrollY.current = latest;
      scrollVelocity.set(delta);
    });
  }, [scrollY, scrollVelocity]);

  useAnimationFrame((_, delta) => {
    let moveBy = baseVelocity * (delta / 1000) * 20;

    const velocity = smoothVelocity.get();
    if (velocity < 0) directionFactor.current = -1;
    else if (velocity > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * velocity * 0.15;
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const repeatedText = `${children} \u2022 `.repeat(8);

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "relative",
        ...style,
      }}
    >
      <motion.div
        style={{
          x,
          display: "inline-block",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "rgba(255,255,255,0.35)",
          willChange: "transform",
        }}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
}
