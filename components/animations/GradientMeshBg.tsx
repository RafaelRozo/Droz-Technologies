"use client";

import { motion } from "framer-motion";

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
  const blobs = Array.from({ length: blobCount }, (_, i) => {
    const angle = (i / blobCount) * Math.PI * 2;
    const radiusX = 15 + Math.random() * 10;
    const radiusY = 15 + Math.random() * 10;
    const duration = 18 + i * 6;
    const size = 350 + i * 100;

    return {
      id: i,
      size,
      duration,
      startX: 50 + Math.cos(angle) * radiusX,
      startY: 50 + Math.sin(angle) * radiusY,
      midX: 50 + Math.cos(angle + Math.PI) * radiusX,
      midY: 50 + Math.sin(angle + Math.PI) * radiusY,
    };
  });

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
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          style={{
            position: "absolute",
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, transparent 60%)`,
            filter: "blur(40px)",
            willChange: "transform",
          }}
          animate={{
            left: [`${blob.startX}%`, `${blob.midX}%`, `${blob.startX}%`],
            top: [`${blob.startY}%`, `${blob.midY}%`, `${blob.startY}%`],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
