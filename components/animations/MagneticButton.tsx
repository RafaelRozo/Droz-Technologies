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
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 36px",
            borderRadius: 9999,
            fontSize: 14,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            background: "#fff",
            color: "#0a0a0a",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.3s ease, outline 0.15s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            boxShadow: hovered
              ? "0 8px 32px rgba(255,255,255,0.15)"
              : "0 2px 8px rgba(0,0,0,0.3)",
            ...style,
          }}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
