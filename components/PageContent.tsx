"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import useIsMobile from "@/lib/useIsMobile";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";
import TextScramble from "@/components/animations/TextScramble";
import CounterSpring from "@/components/animations/CounterSpring";
import MagneticButton from "@/components/animations/MagneticButton";
import GradientMeshBg from "@/components/animations/GradientMeshBg";
import SectionDivider from "@/components/animations/SectionDivider";
import ScrollVelocityText from "@/components/animations/ScrollVelocityText";
import TiltCard from "@/components/animations/TiltCard";
import ImpactNumber from "@/components/animations/ImpactNumber";
import SplitReveal from "@/components/animations/SplitReveal";
import FactStrip from "@/components/animations/FactStrip";
import TestimonialCard from "@/components/animations/TestimonialCard";
import PlanStep from "@/components/animations/PlanStep";
import BlurFade from "@/components/animations/BlurFade";
import InfiniteSlider from "@/components/animations/InfiniteSlider";
import LogoMarquee from "@/components/animations/LogoMarquee";
import VerticalCutReveal from "@/components/animations/VerticalCutReveal";
import AnimatedGridBg from "@/components/animations/AnimatedGridBg";
import PlanTimeline from "@/components/animations/PlanTimeline";
import TestimonialColumns from "@/components/animations/TestimonialColumns";

// Lazy-load Three.js only when user scrolls near the divisions section
const CorridorScene = dynamic(
  () => import("@/components/3d/CorridorScene"),
  { ssr: false, loading: () => null }
);

const LOGO_DIMS: Record<string, { w: number; h: number }> = {
  westinghouse: { w: 570, h: 562 },
  holcim: { w: 500, h: 304 },
  pdvsa: { w: 796, h: 678 },
  unilever: { w: 692, h: 688 },
  "gov-canada": { w: 1576, h: 634 },
  "siemens-energy": { w: 1400, h: 496 },
  "schneider-electric": { w: 536, h: 228 },
};

/* ─── Cursor-tracking Spotlight Card (3D tilt + radial glow) ─── */
function SpotlightCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    const spot = spotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    if (spot) {
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      spot.style.background = `radial-gradient(600px circle at ${px}% ${py}%, rgba(255,255,255,0.07) 0%, transparent 50%)`;
      spot.style.opacity = "1";
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ position: "relative", transition: "transform 0.5s cubic-bezier(0.03,0.98,0.52,0.99)", willChange: "transform", ...style }}>
      <div ref={spotRef} aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        opacity: 0, transition: "opacity 0.4s ease", pointerEvents: "none", zIndex: 2,
      }} />
      {children}
    </div>
  );
}

/* ─── Floating Label Input ─── */
function FloatingInput({ label, type = "text", textarea = false, name }: { label: string; type?: string; textarea?: boolean; name?: string }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const active = focused || filled;
  const s: React.CSSProperties = {
    width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14,
    padding: textarea ? "28px 20px 16px" : "24px 20px 8px", color: "#fff",
    fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 15, outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s", resize: "none" as const,
    borderColor: focused ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
    boxShadow: focused ? "0 0 0 3px rgba(255,255,255,0.04)" : "none",
  };
  const lbl: React.CSSProperties = {
    position: "absolute", left: 20, top: active ? 8 : textarea ? 18 : 16,
    fontSize: active ? 10 : 15, fontFamily: "'Outfit', sans-serif", fontWeight: active ? 500 : 300,
    color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)", transition: "all 0.2s ease",
    pointerEvents: "none", letterSpacing: active ? "0.06em" : "0",
    textTransform: active ? "uppercase" as const : "none" as const,
  };
  const handlers = {
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFocused(false); setFilled(e.target.value.length > 0); },
  };
  const inputId = `page-field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={inputId} style={lbl}>{label}</label>
      {textarea ? <textarea id={inputId} name={name || inputId} rows={5} style={s} {...handlers} /> : <input id={inputId} name={name || inputId} type={type} style={s} {...handlers} />}
    </div>
  );
}

/* ─── SVG path generators ─── */
function sinePath(amp: number, freq: number, cy: number, w = 1000): string {
  const pts: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * w;
    const y = cy + Math.sin((i / 200) * Math.PI * 2 * freq) * amp;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

/* ─── Shared style constants ─── */
const PILL: React.CSSProperties = {
  display: "inline-block", fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500,
  color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase",
  marginBottom: 20, padding: "5px 14px", borderRadius: 100,
  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
};
const CARD_SHADOW = "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.25)";

/* ─── Division-specific backgrounds ─── */
function EngineeringBg() {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={{ position: "absolute", bottom: "10%", left: 0, width: "100%", height: 120, opacity: 0.05 }}>
        <path d={sinePath(40, 4, 100)} stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="8 12" style={{ animation: "wave-flow 3s linear infinite" }} />
      </svg>
      <div style={{ position: "absolute", right: "12%", top: "18%", width: 100, height: 100, opacity: 0.04 }}>
        <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: "100%", background: "#fff" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "#fff" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.6)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>
    </>
  );
}

function SoftwareBg() {
  return <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />;
}


function AIBg() {
  return <div style={{ position: "absolute", top: "15%", right: "8%", width: 450, height: 450, background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 60%)", pointerEvents: "none" }} />;
}

/* ─── Division-specific card content ─── */
function EngineeringCard() {
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 28 }}>
        SYSTEM DIAGNOSTICS
      </div>
      {[
        { label: "Vibration", value: "0.02 mm/s", tag: "NOMINAL" },
        { label: "Temperature", value: "72.4\u00B0C", tag: "OPTIMAL" },
        { label: "Bearing Health", value: "98.7%", tag: "EXCELLENT" },
        { label: "Rotor Balance", value: "0.001 mm", tag: "PRECISION" },
      ].map(m => (
        <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{m.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{m.value}</span>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)", fontFamily: "'Outfit', sans-serif" }}>{m.tag}</span>
          </div>
        </div>
      ))}
      <svg viewBox="0 0 400 50" style={{ width: "100%", height: 50, marginTop: 20, opacity: 0.12 }}>
        <motion.path d={sinePath(15, 8, 25, 400)} stroke="white" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 2 }} viewport={{ once: true }} />
      </svg>
    </div>
  );
}

function SoftwareCard() {
  const lines = [
    "$ droz deploy --production",
    "",
    "\u25B8 Building enterprise platform...",
    "\u25B8 Running 2,847 tests... \u2713 passed",
    "\u25B8 Security audit... \u2713 clean",
    "\u25B8 Deploying to 6 regions...",
    "",
    "\u2713 Deployment complete",
    "  Uptime: 99.99% | Latency: 12ms",
  ];
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.2)", marginLeft: 8 }}>terminal</span>
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 2.2, color: "rgba(255,255,255,0.3)" }}>
        {lines.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            viewport={{ once: true }}
          >
            {line || "\u00A0"}
          </motion.div>
        ))}
        <span style={{ display: "inline-block", width: 8, height: 16, background: "rgba(255,255,255,0.4)", animation: "typing-cursor 1s step-end infinite" }} />
      </div>
    </div>
  );
}

function AICard() {
  const l1 = [40, 80, 120, 160];
  const l2 = [50, 90, 130];
  const l3 = [70, 110];
  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 28 }}>
        NEURAL ARCHITECTURE
      </div>
      <svg aria-hidden="true" viewBox="0 0 360 180" style={{ width: "100%", height: 180, marginBottom: 20 }}>
        {l1.map((y, i) => (
          <g key={`l1-${i}`}>
            <motion.circle cx="40" cy={y} r="4" fill="rgba(255,255,255,0.15)"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }} />
            {l2.map((y2, j) => (
              <motion.line key={j} x1="44" y1={y} x2="136" y2={y2}
                stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ delay: 0.4 + (i + j) * 0.05, duration: 0.5 }}
                viewport={{ once: true }} />
            ))}
          </g>
        ))}
        {l2.map((y, i) => (
          <g key={`l2-${i}`}>
            <motion.circle cx="140" cy={y} r="4" fill="rgba(255,255,255,0.2)"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }} viewport={{ once: true }} />
            {l3.map((y2, j) => (
              <motion.line key={j} x1="144" y1={y} x2="236" y2={y2}
                stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ delay: 0.8 + (i + j) * 0.05, duration: 0.5 }}
                viewport={{ once: true }} />
            ))}
          </g>
        ))}
        {l3.map((y, i) => (
          <g key={`l3-${i}`}>
            <motion.circle cx="240" cy={y} r="4" fill="rgba(255,255,255,0.2)"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }} viewport={{ once: true }} />
            <motion.line x1="244" y1={y} x2="316" y2="90"
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }} />
          </g>
        ))}
        <motion.circle cx="320" cy="90" r="6" fill="rgba(255,255,255,0.25)"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ delay: 1.0, type: "spring" }} viewport={{ once: true }} />
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["Computer Vision", "NLP", "Predictive Models", "Deep Learning", "MLOps", "Edge AI"].map(tag => (
          <span key={tag} style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 400,
            color: "rgba(255,255,255,0.4)", padding: "6px 14px", borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Division component arrays ─── */
const DIVISION_BGS = [EngineeringBg, SoftwareBg, AIBg];
const DIVISION_CARDS = [EngineeringCard, SoftwareCard, AICard];
const DIVISION_SLUGS = ["predictive-maintenance", "software-development", "ai-consulting"];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function PageContent() {
  const { locale } = useLocale();
  const t = getTexts(locale);
  const n = t.narrative;
  const divisions = t.divisionsGrid;
  const isMobile = useIsMobile();

  // Cycling subtitle text
  const subtitlePhrases = [
    "Predictive Maintenance",
    "Software Development",
    "AI Consulting",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % subtitlePhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [corridorProgress, setCorridorProgress] = useState(0);
  const divisionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: divScrollProgress } = useScroll({
    target: divisionsRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(divScrollProgress, "change", (v) => {
    setCorridorProgress(v);
  });

  return (
    <>
      {/* ═══════ 1. BRAND HOOK ═══════ */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "100px 20px 64px" : "160px 48px",
      }}>
        <GradientMeshBg blobCount={3} opacity={0.02} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          {/* Company identity */}
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(5rem, 12vw, 10rem)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                marginBottom: 24,
              }}
            >
              <TextScramble duration={1.8}>{n.brandHook.title}</TextScramble>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                color: "rgba(255,255,255,0.6)",
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: 600,
                margin: "0 auto",
                height: isMobile ? "2em" : "2.8em",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {subtitlePhrases.map((phrase, i) => (
                <motion.span
                  key={phrase}
                  initial={{ opacity: 0, y: 100 }}
                  animate={
                    phraseIndex === i
                      ? { y: 0, opacity: 1 }
                      : { y: phraseIndex > i ? -150 : 150, opacity: 0 }
                  }
                  transition={{ type: "spring", stiffness: 50, damping: 12 }}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                  }}
                >
                  {phrase}
                </motion.span>
              ))}
            </motion.div>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              fontWeight: 300,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 16,
            }}>
              Three divisions. One company.
            </p>
          </div>

          {/* Team image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ borderRadius: 20, overflow: "hidden", marginBottom: 40, maxHeight: 500 }}
          >
            <Image src="/images/team.png" alt="Droz Technologies team" width={1200} height={896} sizes="(max-width: 768px) 100vw, 900px" priority style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s" }} />
          </motion.div>

          {/* 3 Division thumbnails */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 16 }}
          >
            {divisions.map((div, i) => (
              <motion.a
                key={div.slug}
                href={`/divisions/${div.slug}`}
                variants={{
                  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 12 } },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  textDecoration: "none",
                  position: "relative",
                  borderRadius: 14,
                  overflow: "hidden",
                  aspectRatio: "3/2",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  if (img) { img.style.transform = "scale(1.08)"; img.style.filter = "brightness(0.75)"; }
                  const overlay = e.currentTarget.querySelector("[data-overlay]") as HTMLElement;
                  if (overlay) overlay.style.opacity = "1";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                  if (img) { img.style.transform = "scale(1)"; img.style.filter = "brightness(0.55)"; }
                  const overlay = e.currentTarget.querySelector("[data-overlay]") as HTMLElement;
                  if (overlay) overlay.style.opacity = "0.7";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <Image
                  src={`/images/divisions/${div.slug}.png`}
                  alt={div.name}
                  fill
                  sizes={isMobile ? "50vw" : "20vw"}
                  style={{
                    objectFit: "cover", display: "block",
                    filter: "brightness(0.55)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease",
                  }}
                />
                <div data-overlay style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
                  opacity: 0.7, transition: "opacity 0.4s ease",
                }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 500,
                    color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase",
                    marginBottom: 4,
                  }}>
                    {String(i + 1).padStart(2, "0")} — Division
                  </span>
                  <span style={{
                    fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic",
                    fontSize: 15, fontWeight: 400, color: "#fff",
                  }}>
                    {div.name}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Client logos — premium cloud with fade edges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            style={{ marginTop: 64 }}
          >
            <div style={{
              display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 16 : 8,
              borderTop: "1px solid rgba(255,255,255,0.04)",
              paddingTop: 32,
            }}>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 400,
                color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase",
                whiteSpace: "nowrap", flexShrink: 0, paddingRight: isMobile ? 0 : 24,
                borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)",
                borderBottom: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
                paddingBottom: isMobile ? 12 : 0,
                marginRight: isMobile ? 0 : 24,
              }}>
                Trusted by
              </p>
              <div style={{
                flex: 1, overflow: "hidden",
                maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 48,
                  animation: "marquee-left 50s linear infinite",
                  width: "max-content",
                }}>
                  {[...["westinghouse", "holcim", "pdvsa", "unilever", "gov-canada", "siemens-energy", "schneider-electric"], ...["westinghouse", "holcim", "pdvsa", "unilever", "gov-canada", "siemens-energy", "schneider-electric"]].map((logo, i) => (
                    <Image
                      key={`${logo}-${i}`}
                      src={`/images/logos/${logo}.png`}
                      alt={logo}
                      width={LOGO_DIMS[logo].w} height={LOGO_DIMS[logo].h} sizes="60px"
                      style={{
                        height: 24, width: "auto", flexShrink: 0,
                        opacity: 0.35, filter: "grayscale(1) brightness(2)",
                        transition: "opacity 0.4s ease, filter 0.4s ease",
                      }}
                      onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = "0.85"; (e.target as HTMLImageElement).style.filter = "grayscale(0) brightness(1)"; }}
                      onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = "0.35"; (e.target as HTMLImageElement).style.filter = "grayscale(1) brightness(2)"; }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ 2. PROBLEM ═══════ */}
      <section style={{
        background: "#0a0a0a",
        padding: isMobile ? "64px 20px" : "160px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr",
            gap: isMobile ? 32 : 80,
            alignItems: "center",
          }}>
            {/* Left: problem text — enters from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <span style={PILL}>{n.problem.eyebrow}</span>
              <BlurFade delay={0.1} as="h2" style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#fff",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 28,
              }}>
                {n.problem.headline}
              </BlurFade>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 17,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                maxWidth: 600,
              }}>
                {n.problem.body}
              </p>
            </motion.div>

            {/* Right: cost number — massive, materializes into focus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true, margin: "-80px" }}
              style={{ textAlign: "right" }}
            >
              <span style={{
                display: "block",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(4.5rem, 9vw, 8rem)",
                color: "#f0f0f0",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}>
                {n.problem.costNumber}
              </span>
              <span style={{
                display: "block",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginTop: 14,
              }}>
                {n.problem.costLabel}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Subtle bottom divider */}
        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }} />
      </section>

      {/* ═══════ 3. AGITATION ═══════ */}
      <section style={{
        background: "#0d0c0b",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.05) 50%, transparent 90%)" }} />

        <div style={{ padding: "120px 0" }}>
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              padding: "0 48px",
              marginBottom: 32,
            }}
          >
            The Numbers
          </motion.p>

          {n.agitation.facts.map((fact, i) => (
            <FactStrip
              key={i}
              number={fact.number}
              text={fact.text}
              delay={i * 0.15}
              direction={i % 2 === 0 ? "right" : "left"}
              showSeparator={i < n.agitation.facts.length - 1}
            />
          ))}
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.05) 50%, transparent 90%)" }} />
      </section>

      {/* ═══════ 4. THE GUIDE ═══════ */}
      <section style={{
        background: "#0a0a0a",
        padding: isMobile ? "80px 20px" : "200px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* The emptiness is deliberate. One idea. Maximum space. */}
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <VerticalCutReveal
            as="h2"
            delay={0.1}
            staggerDuration={0.05}
            spring={{ stiffness: 80, damping: 12 }}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#fff",
              fontWeight: 400,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              justifyContent: "center",
            }}
          >
            {n.guide.headline}
          </VerticalCutReveal>
          <SectionDivider style={{ marginTop: 40 }} />
        </div>
      </section>

      {/* ═══════ 5. THE PLAN ═══════ */}
      <section style={{
        background: "#0a0a0a",
        padding: isMobile ? "48px 20px 64px" : "80px 48px 120px",
        position: "relative",
      }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.05) 50%, transparent 90%)", marginBottom: 80 }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 64,
            }}
          >
            How It Works
          </motion.p>

          <PlanTimeline>
            {n.plan.steps.map((step, i) => {
              const dirs: Array<"left" | "center" | "right"> = ["left", "center", "right"];
              return (
                <PlanStep
                  key={i}
                  number={i + 1}
                  title={step.title}
                  description={step.desc}
                  direction={dirs[i]}
                  isLast={i === n.plan.steps.length - 1}
                  controlled
                />
              );
            })}
          </PlanTimeline>

          {/* CTA after Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            viewport={{ once: true }}
            style={{ marginTop: 64 }}
          >
            <MagneticButton as="a" href="/contact">Talk to an Engineer</MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═══════ 6. SOCIAL PROOF ═══════ */}
      <section style={{
        background: "#0f0f0f",
        padding: isMobile ? "64px 0 40px" : "120px 0 80px",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ padding: isMobile ? "0 20px" : "0 48px", marginBottom: 64 }}>
          <TestimonialColumns
            testimonials={[
              { quote: n.testimonial.quote, name: n.testimonial.name, role: `${n.testimonial.title}, ${n.testimonial.company}`, metric: "$2.1M", metricLabel: n.testimonial.metricLabel },
              { quote: n.testimonial.quote, name: n.testimonial.name, role: `${n.testimonial.title}, ${n.testimonial.company}` },
              { quote: n.testimonial.quote, name: n.testimonial.name, role: `${n.testimonial.title}, ${n.testimonial.company}`, metric: "$2.1M", metricLabel: n.testimonial.metricLabel },
              { quote: n.testimonial.quote, name: n.testimonial.name, role: `${n.testimonial.title}, ${n.testimonial.company}` },
              { quote: n.testimonial.quote, name: n.testimonial.name, role: `${n.testimonial.title}, ${n.testimonial.company}`, metric: "$2.1M", metricLabel: n.testimonial.metricLabel },
              { quote: n.testimonial.quote, name: n.testimonial.name, role: `${n.testimonial.title}, ${n.testimonial.company}` },
            ]}
          />
        </div>

        {/* Logo marquee below testimonial */}
        <LogoMarquee speed={50} direction="left" />
        <LogoMarquee speed={55} direction="right" />
      </section>

      {/* ═══════ 7. STAKES ═══════ */}
      <ImpactNumber
        target={n.stakes.number}
        prefix="$"
        suffix={n.stakes.suffix}
        subtitle={n.stakes.subtitle}
        style={{ minHeight: "100vh", background: "#0a0a0a" }}
      />

      {/* ═══════ 8. BEFORE / AFTER ═══════ */}
      <SplitReveal
        beforeTitle={n.beforeAfter.beforeTitle}
        afterTitle={n.beforeAfter.afterTitle}
        beforeItems={n.beforeAfter.beforeItems}
        afterItems={n.beforeAfter.afterItems}
      />

      {/* ═══════ 9. ONLY WE ═══════ */}
      <section style={{
        background: "#0a0a0a",
        padding: isMobile ? "80px 20px" : "200px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Soft glow behind the text */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 400,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <VerticalCutReveal
            as="p"
            delay={0.1}
            staggerDuration={0.04}
            spring={{ stiffness: 80, damping: 12 }}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "rgba(255,255,255,0.92)",
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "-0.02em",
              justifyContent: "center",
            }}
          >
            {n.onlyWe}
          </VerticalCutReveal>
        </div>
      </section>

      {/* ═══════ 10. DIVISIONS ═══════ */}
      {corridorProgress > 0 && <CorridorScene scrollProgress={corridorProgress} />}
      <div id="divisions" ref={divisionsRef}>
        {/* Header */}
        <section style={{ padding: isMobile ? "80px 20px 40px" : "140px 48px 60px", background: "rgba(15,15,15,0.92)", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}
          >
            Our Divisions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(2.25rem, 3.5vw, 3rem)", color: "#fff", fontWeight: 400, lineHeight: 1.15, marginBottom: 12 }}
          >
            {t.divisionsSection.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}
          >
            {t.divisionsSection.subtitle}
          </motion.p>
        </section>

        {/* Division Sections */}
        {divisions.map((div, i) => {
          const fromRight = i % 2 !== 0;
          const num = String(i + 1).padStart(2, "0");
          const BgDecor = DIVISION_BGS[i];
          const CardContent = DIVISION_CARDS[i];
          const slug = div.slug || DIVISION_SLUGS[i];

          return (
            <section key={div.name} style={{
              position: "relative", overflow: "hidden",
              minHeight: isMobile ? "auto" : "75vh", padding: isMobile ? "60px 20px" : "100px 48px",
              background: i % 2 === 0 ? "rgba(10,10,10,0.92)" : "rgba(15,15,15,0.92)",
            }}>
              {BgDecor && <div aria-hidden="true"><BgDecor /></div>}

              <div style={{
                maxWidth: 1200, margin: "0 auto",
                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 40 : 80, alignItems: "center",
                position: "relative", zIndex: 2,
              }}>
                {/* Text content */}
                <motion.div
                  initial={{ opacity: 0, x: fromRight ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-80px" }}
                  style={{ order: isMobile ? 0 : (fromRight ? 1 : 0) }}
                >
                  <span style={PILL}>{num} &mdash; Division</span>
                  <h3 style={{
                    fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic",
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#fff",
                    fontWeight: 400, lineHeight: 1.1, marginBottom: 20,
                  }}>
                    {div.name}
                  </h3>

                  {/* Pain point */}
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 15,
                    color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 460,
                    marginBottom: 12, fontStyle: "italic",
                  }}>
                    {div.painPoint}
                  </p>

                  {/* Solution */}
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 16,
                    color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: 460,
                    marginBottom: 36,
                  }}>
                    {div.solution}
                  </p>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <MagneticButton as="a" href={`/divisions/${slug}`}>
                      {div.cta || "Explore Division"}
                    </MagneticButton>
                    <MagneticButton as="a" href="/contact" variant="glass" aria-label={`Get started with ${div.name}`}>
                      Get Started
                    </MagneticButton>
                  </div>
                </motion.div>

                {/* Visual card */}
                <motion.div
                  initial={{ opacity: 0, x: fromRight ? -100 : 100, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  style={{ order: isMobile ? 1 : (fromRight ? 0 : 1) }}
                >
                  <SpotlightCard style={{ borderRadius: 20, overflow: "hidden", boxShadow: CARD_SHADOW, background: "#111" }}>
                    <div style={{ padding: "48px 40px", minHeight: 420, position: "relative", overflow: "hidden" }}>
                      <span style={{
                        fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic",
                        fontSize: "10rem", color: "rgba(255,255,255,0.025)",
                        position: "absolute", right: 16, bottom: -24,
                        lineHeight: 1, userSelect: "none",
                      }}>
                        {num}
                      </span>
                      {CardContent && <CardContent />}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ═══════ 11. SOLUTIONS (Bento) ═══════ */}
      <section id="solutions" style={{ background: "#0a0a0a", padding: isMobile ? "64px 20px" : "140px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textAlign: "center", marginBottom: 16 }}
          >
            Capabilities
          </motion.p>
          <BlurFade delay={0.1} as="h2" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2.25rem, 3.5vw, 3rem)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 12, textAlign: "center" }}>
            {t.solutions.heading}
          </BlurFade>
          <BlurFade delay={0.2} as="p" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto 60px", textAlign: "center" }}>
            {t.solutions.subtitle}
          </BlurFade>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(6, 1fr)", gap: 16 }}
          >
            {t.solutions.items.map((item, i) => {
              const span = i < 2 ? 3 : 2;
              return (
                <motion.div key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.97, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 12 } },
                  }}
                  whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{
                    gridColumn: isMobile ? "span 1" : `span ${span}`, borderRadius: 20,
                    padding: i < 2 ? "44px 40px" : "36px 32px", background: "#111",
                    position: "relative", overflow: "hidden", cursor: "default",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                    const dot = e.currentTarget.querySelector("[data-dot]") as HTMLElement;
                    if (dot) dot.style.opacity = "1";
                    const glow = e.currentTarget.querySelector("[data-glow]") as HTMLElement;
                    if (glow) glow.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                    const dot = e.currentTarget.querySelector("[data-dot]") as HTMLElement;
                    if (dot) dot.style.opacity = "0";
                    const glow = e.currentTarget.querySelector("[data-glow]") as HTMLElement;
                    if (glow) glow.style.opacity = "0";
                  }}
                >
                  {/* Dot pattern overlay — revealed on hover */}
                  <div data-dot style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                    opacity: 0, transition: "opacity 0.4s ease", pointerEvents: "none",
                  }} />
                  {/* Gradient border glow — top edge */}
                  <div data-glow style={{
                    position: "absolute", top: -1, left: "10%", right: "10%", height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    opacity: 0, transition: "opacity 0.4s ease", pointerEvents: "none",
                  }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 500,
                      color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase",
                      marginBottom: 12, display: "block",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: i < 2 ? "1.125rem" : "1rem", fontWeight: 500, color: "#fff", marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ 12. CLIENTS (Velocity Marquee) ═══════ */}
      <section style={{ background: "#0f0f0f", padding: "100px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textAlign: "center", marginBottom: 16 }}
        >
          Trusted By
        </motion.p>
        <BlurFade delay={0.1} as="h2" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)", color: "#fff", fontWeight: 400, lineHeight: 1.15, marginBottom: 12, textAlign: "center" }}>
          {t.clients.heading}
        </BlurFade>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 50px", textAlign: "center", padding: "0 20px" }}>
          {t.clients.subtitle}
        </p>
        <div style={{
          maskImage: "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}>
          <InfiniteSlider speed={60} speedOnHover={20} gap={48}>
            {["westinghouse", "holcim", "pdvsa", "unilever", "gov-canada", "siemens-energy", "schneider-electric"].map(logo => (
              <Image key={logo} src={`/images/logos/${logo}.png`} alt={logo}
                width={LOGO_DIMS[logo].w} height={LOGO_DIMS[logo].h} sizes="80px"
                style={{ height: 28, width: "auto", flexShrink: 0, opacity: 0.4, filter: "grayscale(1) brightness(1.8)", transition: "opacity 0.3s, filter 0.3s" }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = "0.85"; (e.target as HTMLImageElement).style.filter = "grayscale(0) brightness(1)"; }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = "0.4"; (e.target as HTMLImageElement).style.filter = "grayscale(1) brightness(1.8)"; }}
              />
            ))}
          </InfiniteSlider>
        </div>
        <div style={{
          maskImage: "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        }}>
          <InfiniteSlider speed={60} speedOnHover={20} gap={48} reverse>
            {["westinghouse", "holcim", "pdvsa", "unilever", "gov-canada", "siemens-energy", "schneider-electric"].map(logo => (
              <Image key={logo} src={`/images/logos/${logo}.png`} alt={logo}
                width={LOGO_DIMS[logo].w} height={LOGO_DIMS[logo].h} sizes="80px"
                style={{ height: 28, width: "auto", flexShrink: 0, opacity: 0.4, filter: "grayscale(1) brightness(1.8)", transition: "opacity 0.3s, filter 0.3s" }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = "0.85"; (e.target as HTMLImageElement).style.filter = "grayscale(0) brightness(1)"; }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = "0.4"; (e.target as HTMLImageElement).style.filter = "grayscale(1) brightness(1.8)"; }}
              />
            ))}
          </InfiniteSlider>
        </div>
      </section>

      {/* ═══════ 13. CTA STRIP ═══════ */}
      <section style={{ background: "#0a0a0a", padding: isMobile ? "64px 20px" : "140px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <AnimatedGridBg gridSize={60} lineOpacity={0.03} sweepCount={3} sweepOpacity={0.04} />
        <GradientMeshBg blobCount={2} opacity={0.02} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <VerticalCutReveal
            as="h2"
            delay={0.1}
            staggerDuration={0.04}
            spring={{ stiffness: 80, damping: 12 }}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#fff",
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 56,
              justifyContent: "center",
            }}
          >
            {n.finalCta.headline}
          </VerticalCutReveal>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}
          >
            <MagneticButton as="a" href="/contact">
              {n.finalCta.primary}
            </MagneticButton>
            <a
              href="/contact"
              style={{
                padding: "14px 36px", borderRadius: 9999, fontSize: 14,
                fontFamily: "'Outfit', sans-serif", fontWeight: 400,
                border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)",
                textDecoration: "none", background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.02)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                display: "inline-flex", alignItems: "center",
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.25)"; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.08)"; el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15), 0 0 16px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.03)"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.7)"; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.02)"; el.style.transform = "translateY(0)"; }}
            >
              {n.finalCta.secondary}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════ 14. CONTACT ═══════ */}
      <section id="contact" style={{ background: "#0a0a0a", padding: isMobile ? "64px 20px" : "160px 48px", position: "relative" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 500, height: 400, background: "radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "clamp(2.25rem, 3.5vw, 3rem)", color: "#fff", fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}
            >
              {t.contact.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "1.0625rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
            >
              {t.contact.body}
            </motion.p>
          </div>
          <motion.form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = Object.fromEntries(new FormData(form));
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
                if (res.ok) {
                  form.reset();
                  alert("Message sent! An engineer will follow up within 24 hours.");
                } else {
                  alert("Something went wrong. Please email ricardorozo@droztechnologies.com directly.");
                }
              } catch {
                alert("Network error. Please email ricardorozo@droztechnologies.com directly.");
              }
            }}
            initial="hidden"
            whileInView="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              <FloatingInput label={t.contact.form.name} name="name" />
              <FloatingInput label={t.contact.form.email} type="email" name="email" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <FloatingInput label={t.contact.form.company} name="company" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <FloatingInput label={t.contact.form.message} textarea name="message" />
            </motion.div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <MagneticButton type="submit">
                {t.contact.form.send}
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer is in global layout */}
    </>
  );
}
