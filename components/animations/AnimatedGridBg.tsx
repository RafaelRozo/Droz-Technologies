"use client";

import { CSSProperties, useId } from "react";

interface AnimatedGridBgProps {
  gridSize?: number;
  lineOpacity?: number;
  sweepCount?: number;
  sweepOpacity?: number;
  style?: CSSProperties;
}

export default function AnimatedGridBg({
  gridSize = 60,
  lineOpacity = 0.03,
  sweepCount = 3,
  sweepOpacity = 0.04,
  style,
}: AnimatedGridBgProps) {
  const id = useId();
  const styleId = `animated-grid-${id.replace(/:/g, "")}`;

  const sweepDurations = [8, 11, 14];
  const sweepDelays = [0, 3, 6];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${styleId}-drift {
              0% { background-position: 0 0, 0 0; }
              100% { background-position: ${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px; }
            }
            @keyframes ${styleId}-sweep {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .${styleId}-grid { animation: none !important; }
              .${styleId}-sweep { animation: none !important; opacity: 0 !important; }
            }
          `,
        }}
      />

      {/* Grid pattern */}
      <div
        className={`${styleId}-grid`}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,${lineOpacity}) 1px, transparent 1px),
            linear-gradient(0deg, rgba(255,255,255,${lineOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          animation: `${styleId}-drift 20s linear infinite`,
        }}
      />

      {/* Horizontal sweep lines */}
      {Array.from({ length: Math.min(sweepCount, 3) }).map((_, i) => (
        <div
          key={i}
          className={`${styleId}-sweep`}
          style={{
            position: "absolute",
            top: `${20 + i * 30}%`,
            left: 0,
            width: "40%",
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${sweepOpacity}), transparent)`,
            animation: `${styleId}-sweep ${sweepDurations[i]}s linear infinite`,
            animationDelay: `${sweepDelays[i]}s`,
          }}
        />
      ))}
    </div>
  );
}
