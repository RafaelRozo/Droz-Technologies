"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MorphSVGProps {
  pathFrom: string;
  pathTo: string;
  width?: number;
  height?: number;
  viewBox?: string;
  duration?: number;
  delay?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
  trigger?: "inView" | "hover";
  once?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function MorphSVG({
  pathFrom,
  pathTo,
  width = 200,
  height = 200,
  viewBox,
  duration = 1.5,
  delay = 0,
  strokeColor = "white",
  strokeWidth = 1,
  fill = "none",
  trigger = "inView",
  once = true,
  style,
  className,
}: MorphSVGProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-60px",
  });

  const shouldAnimate = trigger === "inView" ? isInView : false;

  const svgProps = {
    ref,
    width,
    height,
    viewBox: viewBox || `0 0 ${width} ${height}`,
    className,
    style: { display: "block", ...style },
  };

  if (trigger === "hover") {
    return (
      <motion.svg {...svgProps} initial="from" whileHover="to">
        <motion.path
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          variants={{
            from: { d: pathFrom },
            to: { d: pathTo },
          }}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    );
  }

  return (
    <svg {...svgProps}>
      <motion.path
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        initial={{ d: pathFrom }}
        animate={shouldAnimate ? { d: pathTo } : { d: pathFrom }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
