"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface CounterSpringProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  overshoot?: number;
  once?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function CounterSpring({
  target,
  suffix = "",
  prefix = "",
  duration = 2.2,
  overshoot = 0.08,
  once = true,
  style,
  className,
}: CounterSpringProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView) return;
    if (hasRun.current && once) return;
    hasRun.current = true;

    const durationMs = duration * 1000;
    const overshootEnd = 0.75;
    const settleEnd = 1.0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / durationMs, 1);

      let value: number;
      if (p < overshootEnd) {
        // Ease to overshoot target
        const t = p / overshootEnd;
        const eased =
          t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        value = eased * target * (1 + overshoot);
      } else {
        // Spring back to target
        const t = (p - overshootEnd) / (settleEnd - overshootEnd);
        const from = target * (1 + overshoot);
        const eased = 1 - Math.pow(1 - t, 3);
        value = from + (target - from) * eased;
      }

      setDisplay(`${prefix}${Math.round(value)}${suffix}`);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(`${prefix}${target}${suffix}`);
    };

    requestAnimationFrame(tick);
  }, [isInView, target, suffix, prefix, duration, overshoot, once]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
