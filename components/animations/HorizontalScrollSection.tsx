"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  scrollHeight?: string; // e.g. "300vh"
  style?: React.CSSProperties;
}

export default function HorizontalScrollSection({
  children,
  scrollHeight = "300vh",
  style,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    if (innerRef.current) {
      setScrollRange(innerRef.current.scrollWidth - window.innerWidth);
    }
    const onResize = () => {
      if (innerRef.current) {
        setScrollRange(innerRef.current.scrollWidth - window.innerWidth);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <div
      ref={containerRef}
      style={{ height: scrollHeight, position: "relative", ...style }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div
          ref={innerRef}
          style={{
            x,
            display: "flex",
            willChange: "transform",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
