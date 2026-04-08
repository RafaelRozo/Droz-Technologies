"use client";

import { useMemo } from "react";

interface GradientMeshBgProps {
  blobCount?: number;
  opacity?: number;
  style?: React.CSSProperties;
}

export default function GradientMeshBg({
  blobCount = 3,
  opacity = 0.03,
  style,
}: GradientMeshBgProps) {
  const blobs = useMemo(() =>
    Array.from({ length: blobCount }, (_, i) => {
      const angle = (i / blobCount) * Math.PI * 2;
      const radiusX = 15 + ((i * 7 + 3) % 10);
      const radiusY = 15 + ((i * 11 + 5) % 10);
      const duration = 18 + i * 6;
      const size = 350 + i * 100;

      return {
        id: i,
        size,
        duration,
        startX: 50 + Math.cos(angle) * radiusX,
        startY: 50 + Math.sin(angle) * radiusY,
        dx: Math.cos(angle + Math.PI) * radiusX - Math.cos(angle) * radiusX,
        dy: Math.sin(angle + Math.PI) * radiusY - Math.sin(angle) * radiusY,
      };
    }),
  [blobCount]);

  const keyframes = blobs.map(b => `
    @keyframes gmb-${b.id} {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(${b.dx.toFixed(1)}vw, ${b.dy.toFixed(1)}vh); }
    }
  `).join("");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      {blobs.map((blob) => (
        <div
          key={blob.id}
          style={{
            position: "absolute",
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, transparent 60%)`,
            filter: "blur(40px)",
            left: `${blob.startX}%`,
            top: `${blob.startY}%`,
            animation: `gmb-${blob.id} ${blob.duration}s ease-in-out infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
