"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  radius?: number;
  strength?: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
  "aria-label"?: string;
  "aria-disabled"?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  radius = 120,
  strength = 0.35,
  style,
  className,
  onClick,
  href,
  as = "button",
  "aria-label": ariaLabel,
  "aria-disabled": ariaDisabled,
  disabled,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
      setHovered(true);
    } else {
      x.set(0);
      y.set(0);
      setHovered(false);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Tag = as === "a" ? "a" : "button";
  const linkProps = as === "a" ? { href } : { onClick, type: type || "submit", disabled };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", position: "relative" }}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <Tag
          {...linkProps}
          aria-label={ariaLabel}
          aria-disabled={ariaDisabled}
          className={className}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 36px",
            borderRadius: 9999,
            fontSize: 14,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            background: hovered
              ? "linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)",
            color: "#0a0a0a",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease, outline 0.15s ease",
            transform: hovered ? "scale(1.06) translateY(-1px)" : "scale(1) translateY(0)",
            boxShadow: hovered
              ? [
                  "0 10px 40px rgba(255,255,255,0.18)",
                  "0 4px 12px rgba(0,0,0,0.15)",
                  "inset 0 2px 0 rgba(255,255,255,1)",
                  "inset 0 -1px 0 rgba(0,0,0,0.06)",
                  "inset 0 -4px 8px rgba(0,0,0,0.03)",
                ].join(", ")
              : [
                  "0 6px 20px rgba(0,0,0,0.2)",
                  "0 2px 6px rgba(0,0,0,0.1)",
                  "inset 0 2px 0 rgba(255,255,255,0.8)",
                  "inset 0 -1px 0 rgba(0,0,0,0.06)",
                  "inset 0 -4px 8px rgba(0,0,0,0.04)",
                ].join(", "),
            ...style,
          }}
        >
          {/* Specular bubble highlight */}
          <span style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: hovered ? "55%" : "48%",
            background: hovered
              ? "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%)",
            borderRadius: "9999px 9999px 50% 50%",
            pointerEvents: "none",
            transition: "all 0.3s ease",
            filter: "blur(0.5px)",
          }} />
          {/* Shimmer sweep */}
          <span style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
            animation: "shimmer 5s ease-in-out infinite",
            pointerEvents: "none",
          }} />
          <span style={{ position: "relative", zIndex: 1 }}>
            {children}
          </span>
        </Tag>
      </motion.div>
    </div>
  );
}
