"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface VideoRevealProps {
  src: string;
  poster?: string;
  mode?: "scroll-play" | "mask-reveal" | "autoplay";
  maskDirection?: "wipe-left" | "wipe-up" | "circular";
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function VideoReveal({
  src,
  poster,
  mode = "autoplay",
  maskDirection = "wipe-left",
  duration = 1.2,
  style,
  className,
}: VideoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const videoTime = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Scroll-driven playback
  useEffect(() => {
    if (mode !== "scroll-play") return;
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = videoTime.on("change", (v) => {
      if (video.duration) {
        video.currentTime = v * video.duration;
      }
    });
    return unsubscribe;
  }, [mode, videoTime]);

  // Autoplay when in view
  useEffect(() => {
    if (mode !== "autoplay") return;
    const video = videoRef.current;
    if (!video) return;
    if (isInView) video.play().catch(() => {});
    else video.pause();
  }, [isInView, mode]);

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    "wipe-left": {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    "wipe-up": {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    circular: {
      hidden: "circle(0% at 50% 50%)",
      visible: "circle(75% at 50% 50%)",
    },
  };

  const clip = clipPaths[maskDirection] || clipPaths["wipe-left"];

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", position: "relative", ...style }}
    >
      {mode === "mask-reveal" ? (
        <motion.video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          initial={{ clipPath: clip.hidden }}
          animate={
            isInView
              ? { clipPath: clip.visible }
              : { clipPath: clip.hidden }
          }
          transition={{
            duration,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop={mode === "autoplay"}
          preload={mode === "scroll-play" ? "auto" : "metadata"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </div>
  );
}
