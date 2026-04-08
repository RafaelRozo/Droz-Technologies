"use client";

import TextReveal from "@/components/animations/TextReveal";
import GradientMeshBg from "@/components/animations/GradientMeshBg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  pill?: string;
  textRevealMode?: "char" | "word";
  showNoise?: boolean;
  showMesh?: boolean;
  style?: React.CSSProperties;
}

export default function PageHero({
  title,
  subtitle,
  pill,
  textRevealMode = "word",
  showNoise = false,
  showMesh = true,
  style,
}: PageHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        overflow: "hidden",
        padding: "140px 48px 100px",
        ...style,
      }}
    >
      {showMesh && <GradientMeshBg blobCount={3} opacity={0.025} />}
      {showNoise && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800 }}>
        {pill && (
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 24,
            }}
          >
            {pill}
          </p>
        )}

        <TextReveal
          as="h1"
          mode={textRevealMode}
          stagger={textRevealMode === "word" ? 0.08 : 0.03}
          duration={0.6}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "#fff",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </TextReveal>

        {subtitle && (
          <TextReveal
            as="p"
            mode="word"
            stagger={0.05}
            delay={0.4}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              marginTop: 28,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {subtitle}
          </TextReveal>
        )}
      </div>

      {/* Bottom divider line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />
    </section>
  );
}
