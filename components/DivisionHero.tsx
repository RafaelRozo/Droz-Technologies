"use client";

import { useEffect, useRef } from "react";

interface DivisionHeroProps {
  title: string[];
  subtitle: string;
  buttons: { label: string; href: string; primary?: boolean }[];
  videoSrc?: string; // Path to video in /public/videos/
  objectLabel?: string; // e.g. "GOOGLE WILLOW PROCESSOR"
  id: string;
}

export default function DivisionHero({
  title,
  subtitle,
  buttons,
  videoSrc,
  objectLabel,
  id,
}: DivisionHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // GSAP scroll-triggered video playback will be wired here
    // once videos are added
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="division-section"
    >
      {/* Video Background */}
      {videoSrc && (
        <video
          ref={videoRef}
          className="division-video"
          src={videoSrc}
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Placeholder gradient when no video */}
      {!videoSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#0a0a0a]" />
      )}

      {/* Light ray effect */}
      <div className="light-ray" />

      {/* Content */}
      <div className="division-content">
        <h1 className="division-title">
          {title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="division-subtitle">{subtitle}</p>

        <div className="btn-group">
          {buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              className={btn.primary ? "btn-primary" : "btn-secondary"}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>

      {/* Object Label */}
      {objectLabel && <div className="object-label">{objectLabel}</div>}
    </section>
  );
}
