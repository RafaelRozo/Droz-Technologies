"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  mode?: "char" | "word" | "line";
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function TextReveal({
  children,
  mode = "char",
  stagger = 0.03,
  duration = 0.5,
  delay = 0,
  once = true,
  className,
  style,
  as: Tag = "div",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-80px",
  });

  const units =
    mode === "char"
      ? children.split("")
      : mode === "word"
        ? children.split(" ")
        : children.split("\n");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{ ...style, display: "inline-block", overflow: "hidden" }}
    >
      {units.map((unit, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit === " " ? "\u00A0" : unit}
          </motion.span>
          {mode === "word" && i < units.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}
