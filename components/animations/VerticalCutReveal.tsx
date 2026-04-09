"use client";

import { CSSProperties, ElementType, useMemo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface VerticalCutRevealProps {
  children: string;
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
  staggerDuration?: number;
  spring?: { stiffness?: number; damping?: number };
  delay?: number;
  once?: boolean;
}

const itemVariants: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

export default function VerticalCutReveal({
  children,
  as: Tag = "span",
  style,
  className,
  staggerDuration = 0.05,
  spring = { stiffness: 80, damping: 12 },
  delay = 0,
  once = true,
}: VerticalCutRevealProps) {
  const prefersReduced = useReducedMotion();
  const words = useMemo(() => children.split(" "), [children]);

  if (prefersReduced) {
    return (
      <Tag style={style} className={className}>
        {children}
      </Tag>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
      className={className}
      role="text"
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: "hidden", display: "inline-block" }}
          aria-hidden="true"
        >
          <motion.span
            variants={itemVariants}
            transition={{
              type: "spring",
              stiffness: spring.stiffness,
              damping: spring.damping,
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.3em" }} />
          )}
        </span>
      ))}
    </motion.div>
  );
}
