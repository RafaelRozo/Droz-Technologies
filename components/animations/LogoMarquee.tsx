"use client";

import useIsMobile from "@/lib/useIsMobile";

const LOGOS = [
  { name: "Westinghouse", src: "/images/logos/westinghouse.png" },
  { name: "Holcim", src: "/images/logos/holcim.png" },
  { name: "PDVSA", src: "/images/logos/pdvsa.png" },
  { name: "Unilever", src: "/images/logos/unilever.png" },
  { name: "Government of Canada", src: "/images/logos/gov-canada.png" },
  { name: "Siemens Energy", src: "/images/logos/siemens-energy.png" },
  { name: "Schneider Electric", src: "/images/logos/schneider-electric.png" },
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
            <img
              src={logo.src}
              alt={logo.name}
              style={{
                height: isMobile ? 20 : 30,
                opacity: 0.45,
                filter: "grayscale(1) brightness(1.8)",
                transition: "opacity 0.3s ease, filter 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.filter = "grayscale(0) brightness(1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.45";
                e.currentTarget.style.filter = "grayscale(1) brightness(1.8)";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
