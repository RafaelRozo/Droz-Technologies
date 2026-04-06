"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface TextScrambleProps {
  children: string;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function TextScramble({
  children,
  duration = 1.5,
  delay = 0,
  once = true,
  className,
  style,
  as: Tag = "span",
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-60px",
  });
  const [display, setDisplay] = useState(children.replace(/\S/g, " "));
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    if (hasRun.current && once) return;
    hasRun.current = true;

    const target = children;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const tick = () => {
      frame++;
      const progress = frame / totalFrames;

      const result = target
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          const charProgress = i / target.length;
          if (progress > charProgress + 0.3) return char;
          if (progress > charProgress)
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(result);
      if (frame < totalFrames) requestAnimationFrame(tick);
      else setDisplay(target);
    };

    setTimeout(() => requestAnimationFrame(tick), delay * 1000);
  }, [children, duration, delay, once]);

  useEffect(() => {
    if (isInView) scramble();
  }, [isInView, scramble]);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {display}
    </Tag>
  );
}
