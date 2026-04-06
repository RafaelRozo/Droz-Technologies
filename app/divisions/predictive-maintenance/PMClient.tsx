"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";
import useIsMobile from "@/lib/useIsMobile";
import PageHero from "@/components/shared/PageHero";
import {
  StaggerGrid,
  TiltCard,
  CounterSpring,
  MagneticButton,
  SectionDivider,
  TextReveal,
  ScrollVelocityText,
  BlurFade,
} from "@/components/animations";
import LogoMarquee from "@/components/animations/LogoMarquee";

const TurbineAssembly = dynamic(() => import("@/components/3d/TurbineAssembly"), { ssr: false });

/* ─── Accent color for this division ─── */
const ACCENT = "rgba(59,130,160,0.03)";

/* ─── Graph paper grid background pattern ─── */
const graphPaperStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "20px 20px",
};

/* ─── Animated Waveform SVG ─── */
function WaveformSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const width = 1000;
  const height = 120;
  const cy = height / 2;
  const amplitude = 40;
  const frequency = 3;
  let d = `M 0 ${cy}`;
  for (let x = 0; x <= width; x += 4) {
    const y = cy + amplitude * Math.sin((x / width) * Math.PI * 2 * frequency);
    d += ` L ${x} ${y.toFixed(1)}`;
  }

  return (
    <div
      ref={containerRef}
      style={{
        padding: isMobile ? "48px 20px" : "120px 48px",
        background: `radial-gradient(ellipse at 60% 50%, ${ACCENT}, transparent 70%), #0a0a0a`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
    >
      <TextReveal
        as="h2"
        mode="word"
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          color: "#fff",
          fontWeight: 400,
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        Failures Detected Before They Happen
      </TextReveal>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          maxWidth: 520,
          lineHeight: 1.7,
        }}
      >
        Continuous vibration and frequency analysis captures fault signatures weeks before a bearing fails,
        a shaft misaligns, or an imbalance destroys a turbine.
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#0f0f0f",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "32px 24px",
          ...graphPaperStyle,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          {["0 Hz", "250 Hz", "500 Hz", "750 Hz", "1 kHz"].map((label) => (
            <span
              key={label}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto", display: "block" }}
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={i * (width / 4)}
              y1={0}
              x2={i * (width / 4)}
              y2={height}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={1}
            />
          ))}
          <line x1={0} y1={cy} x2={width} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="4 4" />
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d={d.replace(
              /L (\d+\.?\d*) (\d+\.?\d*)/g,
              (_, x, y) => `L ${x} ${(parseFloat(y) + 15).toFixed(1)}`
            )}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.line
            x1={0} y1={cy - amplitude * 0.85}
            x2={width} y2={cy - amplitude * 0.85}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 1.8 }}
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, gap: 20 }}>
          {[
            { color: "rgba(255,255,255,0.7)", label: "Live Signal" },
            { color: "rgba(255,255,255,0.3)", label: "Baseline" },
            { color: "rgba(255,255,255,0.25)", label: "Alert Threshold" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 20, height: 1.5, background: color }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Capability card ─── */
interface CapabilityItem {
  title: string;
  desc: string;
  metric: number;
  metricSuffix: string;
  metricLabel: string;
}

function CapabilityCard({ item }: { item: CapabilityItem }) {
  return (
    <TiltCard
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: 32,
        height: "100%",
        ...graphPaperStyle,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRight: "none",
              borderBottom: "none",
            }}
          />
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.5rem, 2vw, 2rem)",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <CounterSpring target={item.metric} suffix={item.metricSuffix} />
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              {item.metricLabel}
            </div>
          </div>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
              color: "#fff",
              fontWeight: 400,
              marginBottom: 10,
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
            }}
          >
            {item.desc}
          </p>
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ width: 4, height: 4, border: "1px solid rgba(255,255,255,0.2)", transform: "rotate(45deg)" }} />
        </div>
      </div>
    </TiltCard>
  );
}

/* ─── Metrics Bar ─── */
interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

function MetricBar({ metrics }: { metrics: Metric[] }) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${metrics.length}, 1fr)`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            padding: "40px 32px",
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#fff",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <CounterSpring target={m.value} suffix={m.suffix} prefix={m.prefix ?? ""} />
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */
export default function PMClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[0];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const capabilities: CapabilityItem[] = [
    {
      title: "Vibration Analysis — Stop Guessing",
      desc: "High-frequency FFT analysis that catches bearing faults, imbalance, and misalignment before they trigger alarms. Your tech leaves. The data doesn't.",
      metric: 99,
      metricSuffix: ".7%",
      metricLabel: "Detection Rate",
    },
    {
      title: "Laser Alignment — Zero Rework",
      desc: "Sub-micron precision shaft and geometric alignment for turbines, pumps, motors, and compressors. Misalignment is the #1 cause of bearing failure. We eliminate it.",
      metric: 500,
      metricSuffix: "+",
      metricLabel: "Machines Aligned",
    },
    {
      title: "Thermography — See What's Hidden",
      desc: "Infrared imaging that finds hotspots in electrical systems and mechanical components weeks before they escalate. The failure was always there — you just couldn't see it.",
      metric: 45,
      metricSuffix: "%",
      metricLabel: "Downtime Reduction",
    },
    {
      title: "Rotor Balancing — Precision at Speed",
      desc: "In-situ and shop balancing of fans, turbines, and impellers to ISO 1940 spec. Because vibration at 3,600 RPM doesn't forgive imprecision.",
      metric: 20,
      metricSuffix: "+",
      metricLabel: "Years in the Field",
    },
  ];

  const displayMetrics: Metric[] = [
    { value: 340, suffix: "+", prefix: "", label: "Failures Predicted" },
    { value: 2, suffix: ".1M", prefix: "$", label: "Downtime Prevented" },
    { value: 89, suffix: " days", prefix: "", label: "Time to ROI" },
    { value: 12000, suffix: "+", prefix: "", label: "Assets Monitored" },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle="Your best maintenance tech retires in 8 months. That knowledge has never been documented."
        pill="01 — Division"
        showMesh
      />

      <SectionDivider />

      {/* Scroll velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          Vibration Analysis — Laser Alignment — Thermography — Rotor Balancing — Predictive AI — Fault Detection
        </ScrollVelocityText>
      </div>

      <SectionDivider />

      {/* Problem Section — enters from left */}
      <section
        style={{
          padding: isMobile ? "48px 20px" : "100px 48px",
          maxWidth: 1200,
          margin: "0 auto",
          background: `radial-gradient(ellipse at 0% 50%, ${ACCENT}, transparent 60%)`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 24 : 80,
            alignItems: "center",
          }}
        >
          <motion.div
            ref={problemRef}
            initial={{ opacity: 0, x: -80 }}
            animate={problemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 20,
              }}
            >
              The Problem
            </p>
            <BlurFade delay={0.1} blur="10px" duration={0.7} as="div">
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#fff",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              You're running a $50M operation on the intuition of three people.
            </h2>
            </BlurFade>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                marginBottom: 20,
              }}
            >
              When they leave, decades of diagnostic expertise walks out the door. Your CMMS has
              work orders. It doesn't have pattern recognition. It doesn't know that your #3 pump
              always runs hot before the coupling fails. They knew. Now they're gone.
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
              }}
            >
              Your planned maintenance program catches what's scheduled. Predictive maintenance
              catches what's actually happening — in real time, before it costs you a shift.
            </p>
          </motion.div>
          <div>
            {[
              { stat: "78%", label: "of industrial failures are not age-related" },
              { stat: "3x", label: "cost of emergency vs. planned repair" },
              { stat: "6 weeks", label: "average notice before a predictable failure" },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                style={{
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(2rem, 3vw, 2.75rem)",
                    color: "#fff",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.42)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Only We — centered, Instrument Serif italic, large */}
      <section
        style={{
          padding: isMobile ? "64px 20px" : "160px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
        }}
      >
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Why Only Droz
        </p>
        <BlurFade delay={0.2} blur="10px" duration={0.7} as="div">
        <TextReveal
          as="h2"
          mode="word"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#fff",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            maxWidth: 820,
            lineHeight: 1.2,
          }}
        >
          We've been diagnosing equipment failures by ear since 2004. We turned that into software. Nobody else has 20 years of field data AND the engineering team to build the AI that learns from it.
        </TextReveal>
        </BlurFade>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(255,255,255,0.45)",
            maxWidth: 540,
            lineHeight: 1.7,
            marginTop: 12,
          }}
        >
          Other vendors sell software. We sold consulting first — to Westinghouse, Holcim, PDVSA — before we ever wrote a line of ML code. That difference is in every model we deploy.
        </p>
      </section>

      <SectionDivider />

      {/* ═══════ The Droz Advantage ═══════ */}
      <section style={{
        background: "#0d0d0d",
        padding: isMobile ? "48px 20px" : "120px 48px",
        position: "relative",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <BlurFade delay={0.1}>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", marginBottom: 20,
            }}>
              Part of Something Bigger
            </p>
          </BlurFade>
          <BlurFade delay={0.2} as="h2">
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff", fontWeight: 400,
              lineHeight: 1.3, maxWidth: 700, marginBottom: 24,
            }}>
              The data your sensors collect doesn't have to stop at a CSV.
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            Most PM providers hand you a report. We can build the custom software that turns your vibration data into automated decisions, or deploy AI models that predict failures before your analysts spot the pattern.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {[
              { name: "Software Development", desc: "Custom dashboards and enterprise platforms that consume your sensor data in real time.", href: "/divisions/software-development" },
              { name: "Intelligent Construction", desc: "Predictive maintenance programs for building systems — HVAC, elevators, and electrical infrastructure.", href: "/divisions/intelligent-construction" },
              { name: "Industrial Manufacturing", desc: "The instruments that collect the vibration and alignment data your program runs on.", href: "/divisions/industrial-manufacturing" },
              { name: "AI Consulting", desc: "ML models trained on your historical failure data to push detection further ahead of the curve.", href: "/divisions/ai-consulting" },
            ].map((d, i) => (
              <motion.a key={d.name} href={d.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  textDecoration: "none", padding: 24, borderRadius: 16,
                  background: "#111", border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}
              >
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 8 }}>{d.name}</h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{d.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Capabilities — outcomes framed */}
      <section style={{ padding: isMobile ? "48px 20px" : "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 16,
            }}
          >
            What You Get
          </p>
          <TextReveal
            as="h2"
            mode="word"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#fff",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Diagnostics That Drive Decisions
          </TextReveal>
        </div>
        <StaggerGrid columns={2} gap={20}>
          {capabilities.map((item) => (
            <CapabilityCard key={item.title} item={item} />
          ))}
        </StaggerGrid>
      </section>

      <SectionDivider />

      {/* Proof — results framed */}
      <section style={{ background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}, transparent 60%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 16px" }}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 0,
              paddingTop: 60,
              paddingBottom: 24,
            }}
          >
            Results — Not Promises
          </p>
        </div>
        <MetricBar metrics={displayMetrics} />
      </section>

      <SectionDivider />

      {/* Waveform visualization + TurbineAssembly as full-section background */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "80vh",
          background: "#0a0a0a",
        }}
      >
        {/* 3D Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }}>
          <TurbineAssembly style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>

        {/* Content overlay */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <WaveformSection />
        </div>
      </section>

      <SectionDivider />

      {/* Clients marquee */}
      <div style={{ padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <LogoMarquee speed={50} direction="right" />
      </div>

      <SectionDivider />

      {/* CTA */}
      <section
        style={{
          padding: isMobile ? "48px 20px" : "120px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
        }}
      >
        <BlurFade delay={0.15} blur="10px" duration={0.7} as="div">
        <TextReveal
          as="h2"
          mode="word"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#fff",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            maxWidth: 640,
          }}
        >
          Your next failure is already in the data.
        </TextReveal>
        </BlurFade>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 440,
            lineHeight: 1.7,
          }}
        >
          Our engineers will assess your assets, identify your highest-risk equipment,
          and design a program that starts returning value in under 90 days.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <MagneticButton as="a" href="/contact">
            Predict the Unpredictable
          </MagneticButton>
          <a
            href="/contact"
            style={{
              padding: "14px 36px",
              borderRadius: 9999,
              fontSize: 14,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              background: "transparent",
              transition: "border-color 0.3s ease, color 0.3s ease, background 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; }}
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </main>
  );
}
