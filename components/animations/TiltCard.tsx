"use client";

import { useRef, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  tiltDegree?: number;
  glowOpacity?: number;
  glowSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function TiltCard({
  children,
  tiltDegree = 6,
  glowOpacity = 0.08,
  glowSize = 600,
  style,
  className,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;

      el.style.transform = `perspective(800px) rotateY(${nx * tiltDegree}deg) rotateX(${-ny * tiltDegree}deg) scale3d(1.02,1.02,1.02)`;

      if (spotRef.current) {
        const px = ((e.clientX - r.left) / r.width) * 100;
        const py = ((e.clientY - r.top) / r.height) * 100;
        spotRef.current.style.background = `radial-gradient(${glowSize}px circle at ${px}% ${py}%, rgba(255,255,255,${glowOpacity}) 0%, transparent 50%)`;
        spotRef.current.style.opacity = "1";
      }

      if (borderRef.current) {
        const px = ((e.clientX - r.left) / r.width) * 100;
        const py = ((e.clientY - r.top) / r.height) * 100;
        borderRef.current.style.background = `radial-gradient(${glowSize * 0.8}px circle at ${px}% ${py}%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
        borderRef.current.style.opacity = "1";
      }
    },
    [tiltDegree, glowOpacity, glowSize],
  );

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
    if (spotRef.current) spotRef.current.style.opacity = "0";
    if (borderRef.current) borderRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        transition:
          "transform 0.5s cubic-bezier(0.03,0.98,0.52,0.99)",
        willChange: "transform",
        borderRadius: 20,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Border glow — decorative */}
      <div
        ref={borderRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: "inherit",
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Inner spotlight — decorative */}
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
