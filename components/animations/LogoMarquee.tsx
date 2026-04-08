"use client";

import useIsMobile from "@/lib/useIsMobile";
import Image from "next/image";

const LOGOS = [
  { name: "Westinghouse", src: "/images/logos/westinghouse.png", w: 570, h: 562 },
  { name: "Holcim", src: "/images/logos/holcim.png", w: 500, h: 304 },
  { name: "PDVSA", src: "/images/logos/pdvsa.png", w: 796, h: 678 },
  { name: "Unilever", src: "/images/logos/unilever.png", w: 692, h: 688 },
  { name: "Government of Canada", src: "/images/logos/gov-canada.png", w: 1576, h: 634 },
  { name: "Siemens Energy", src: "/images/logos/siemens-energy.png", w: 1400, h: 496 },
  { name: "Schneider Electric", src: "/images/logos/schneider-electric.png", w: 536, h: 228 },
];

interface LogoMarqueeProps {
  speed?: number;
  direction?: "left" | "right";
  style?: React.CSSProperties;
}

export default function LogoMarquee({
  speed = 40,
  direction = "left",
  style,
}: LogoMarqueeProps) {
  const isMobile = useIsMobile();
  const doubled = [...LOGOS, ...LOGOS];
  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const fadeWidth = isMobile ? 60 : 120;

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        padding: "24px 0",
        ...style,
      }}
    >
      {/* Left fade */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fadeWidth, zIndex: 2, background: "linear-gradient(90deg, #0a0a0a, transparent)", pointerEvents: "none" }} />
      {/* Right fade */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: fadeWidth, zIndex: 2, background: "linear-gradient(270deg, #0a0a0a, transparent)", pointerEvents: "none" }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            style={{
              flexShrink: 0,
              padding: isMobile ? "0 20px" : "0 40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.w}
              height={logo.h}
              sizes="80px"
              style={{
                height: isMobile ? 20 : 30,
                width: "auto",
                opacity: 0.45,
                filter: "grayscale(1) brightness(1.8)",
                transition: "opacity 0.3s ease, filter 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.85";
                (e.target as HTMLImageElement).style.filter = "grayscale(0) brightness(1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLImageElement).style.opacity = "0.45";
                (e.target as HTMLImageElement).style.filter = "grayscale(1) brightness(1.8)";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
