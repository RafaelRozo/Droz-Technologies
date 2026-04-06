"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";
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

const PrecisionMachinery = dynamic(() => import("@/components/3d/PrecisionMachinery"), { ssr: false });

/* ─── Accent color for this division ─── */
const ACCENT = "rgba(124,139,59,0.03)";

/* ─── Concentric circles background ─── */
function ConcentricBg({ size = 200 }: { size?: number }) {
  const circles = [0.2, 0.35, 0.5, 0.65, 0.8, 1.0];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{
          position: "absolute",
          right: -size * 0.2,
          bottom: -size * 0.2,
          width: size,
          height: size,
          opacity: 0.35,
        }}
        fill="none"
      >
        {circles.map((r) => (
          <circle
            key={r}
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) * r}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        ))}
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      </svg>
    </div>
  );
}

/* ─── Gear path function ─── */
function gearPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  teeth: number
): string {
  let d = "";
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a1 = i * step;
    const a2 = a1 + step * 0.3;
    const a3 = a1 + step * 0.5;
    const a4 = a1 + step * 0.8;
    const nextA = (i + 1) * step;
    if (i === 0)
      d += `M${(cx + outerR * Math.cos(a1)).toFixed(1)},${(cy + outerR * Math.sin(a1)).toFixed(1)}`;
    d += ` L${(cx + outerR * Math.cos(a2)).toFixed(1)},${(cy + outerR * Math.sin(a2)).toFixed(1)} L${(cx + innerR * Math.cos(a3)).toFixed(1)},${(cy + innerR * Math.sin(a3)).toFixed(1)} L${(cx + innerR * Math.cos(a4)).toFixed(1)},${(cy + innerR * Math.sin(a4)).toFixed(1)} L${(cx + outerR * Math.cos(nextA)).toFixed(1)},${(cy + outerR * Math.sin(nextA)).toFixed(1)}`;
  }
  return d + " Z";
}

/* ─── Gear Visualization ─── */
function GearVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" });

  const largeGearD = gearPath(220, 200, 90, 115, 16);
  const smallGearD = gearPath(407, 200, 55, 72, 10);

  return (
    <div
      ref={ref}
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "40px 32px",
        maxWidth: 640,
        margin: "0 auto",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Gear Train — ISO 6336 Compliant
        </p>
      </div>

      <motion.svg
        viewBox="0 0 640 400"
        style={{ width: "100%", height: "auto", display: "block" }}
        fill="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 32} x2={640} y2={i * 32} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 32} y1={0} x2={i * 32} y2={400} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
        ))}

        <motion.g
          style={{ transformOrigin: "220px 200px" }}
          animate={isInView ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <path d={largeGearD} stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} fill="rgba(255,255,255,0.04)" strokeLinejoin="round" />
          <circle cx={220} cy={200} r={28} stroke="rgba(255,255,255,0.3)" strokeWidth={1} fill="rgba(255,255,255,0.06)" />
          <circle cx={220} cy={200} r={10} stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} fill="#0f0f0f" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={(220 + 10 * Math.cos(rad)).toFixed(1)}
                y1={(200 + 10 * Math.sin(rad)).toFixed(1)}
                x2={(220 + 28 * Math.cos(rad)).toFixed(1)}
                y2={(200 + 28 * Math.sin(rad)).toFixed(1)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
            );
          })}
        </motion.g>

        <motion.g
          style={{ transformOrigin: "407px 200px" }}
          animate={isInView ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        >
          <path d={smallGearD} stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} fill="rgba(255,255,255,0.04)" strokeLinejoin="round" />
          <circle cx={407} cy={200} r={18} stroke="rgba(255,255,255,0.25)" strokeWidth={1} fill="rgba(255,255,255,0.06)" />
          <circle cx={407} cy={200} r={7} stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} fill="#0f0f0f" />
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={(407 + 7 * Math.cos(rad)).toFixed(1)}
                y1={(200 + 7 * Math.sin(rad)).toFixed(1)}
                x2={(407 + 18 * Math.cos(rad)).toFixed(1)}
                y2={(200 + 18 * Math.sin(rad)).toFixed(1)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
            );
          })}
        </motion.g>

        <line x1={120} y1={200} x2={200} y2={200} stroke="rgba(255,255,255,0.15)" strokeWidth={2} strokeDasharray="4 4" />
        <line x1={392} y1={200} x2={490} y2={200} stroke="rgba(255,255,255,0.15)" strokeWidth={2} strokeDasharray="4 4" />

        <text x={220} y={335} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={10} fontFamily="'Outfit', sans-serif" letterSpacing="0.06em">
          Z=16  m=5
        </text>
        <text x={407} y={295} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={10} fontFamily="'Outfit', sans-serif" letterSpacing="0.06em">
          Z=10  m=5
        </text>
      </motion.svg>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {[
          { label: "Module", value: "m = 5" },
          { label: "Pressure Angle", value: "20deg" },
          { label: "Centre Distance", value: "187 mm" },
          { label: "Ratio", value: "1.6:1" },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Production Capability Card ─── */
interface ProdItem {
  title: string;
  desc: string;
}

function ProdCard({ item }: { item: ProdItem }) {
  return (
    <TiltCard
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: 32,
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ConcentricBg size={160} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
            color: "#fff",
            fontWeight: 400,
            marginBottom: 12,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.65,
          }}
        >
          {item.desc}
        </p>
      </div>
    </TiltCard>
  );
}

/* ─── Precision Metrics ─── */
const precisionStats = [
  { display: "2,400/hr", counter: true, value: 2400, suffix: "/hr", label: "Units Throughput" },
  { display: "±0.001mm", counter: false, value: 0, suffix: "", label: "Precision Tolerance" },
  { display: "99.7%", counter: false, value: 0, suffix: "", label: "Uptime" },
  { display: "5,000+", counter: true, value: 5000, suffix: "+", label: "Instruments Shipped" },
];

function PrecisionMetrics() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {precisionStats.map((m, i) => (
        <div
          key={i}
          style={{
            padding: "48px 24px",
            textAlign: "center",
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              color: "#fff",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {m.counter ? (
              <CounterSpring target={m.value} suffix={m.suffix} />
            ) : (
              <span>{m.display}</span>
            )}
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
export default function ManufacturingClient() {
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[3];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const capabilities: ProdItem[] = [
    {
      title: "Vibration Equipment — Field-Hardened",
      desc: "Portable and online vibration analyzers built by engineers who've used them in petrochemical plants, cement mills, and turbine halls. Not designed for a lab. Tested in the field.",
    },
    {
      title: "Laser Alignment — Sub-Micron Certainty",
      desc: "Multi-axis shaft and geometric alignment instruments with wireless data transfer. We calibrated these in our own lab. We've aligned over 500 machines with them. We know what the specs mean in practice.",
    },
    {
      title: "Thermography Equipment — See the Invisible",
      desc: "High-resolution thermal imaging cameras calibrated for industrial environments. Because a 2-degree hotspot in a switchgear panel at 3 AM is the difference between a controlled shutdown and a fire.",
    },
    {
      title: "Precision Balancing — Zero Tolerance",
      desc: "Field and shop balancing machines for rotors, fans, impellers, and turbines to ISO 1940 Grade G0.4. We operate these machines in our own maintenance division — they have to be right.",
    },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle="Your precision instruments were calibrated by a vendor who's never used them in the field."
        pill="04 — Division"
        showMesh
      />

      <SectionDivider />

      {/* Velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          Vibration Equipment — Laser Alignment — Thermography — Rotor Balancing — Precision Instruments — ISO 1940
        </ScrollVelocityText>
      </div>

      <SectionDivider />

      {/* Problem Section — enters from left */}
      <section
        style={{
          padding: "100px 48px",
          maxWidth: 1200,
          margin: "0 auto",
          background: `radial-gradient(ellipse at 0% 50%, ${ACCENT}, transparent 60%)`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
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
              You're buying equipment from companies that have never operated it.
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
              Their specs are theoretical. Your tolerances are real. The instrument that reads
              ±0.001mm on the datasheet gives you ±0.015mm when your technician is measuring a
              250-pound impeller at 40°C in a plant that's been running since 1998.
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
              Vendor support means a ticket. You get a callback in 72 hours. Meanwhile, your
              production line is down and your shift manager is on the phone with procurement
              trying to find a calibration tech.
            </p>
          </motion.div>
          <div>
            {[
              { stat: "±0.001mm", label: "the gap between spec and reality in harsh field conditions" },
              { stat: "72 hrs", label: "average vendor response time when your line is down" },
              { stat: "60%", label: "of instrument failures attributed to improper application" },
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
                    fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
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
                    color: "rgba(255,255,255,0.35)",
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

      {/* Only We */}
      <section
        style={{
          padding: "100px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
          background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}, transparent 65%)`,
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
          We manufacture the instruments other companies just resell. Every unit calibrated in our own lab. Every tolerance verified by engineers who use these tools in the field every week. Nobody else controls that chain.
        </TextReveal>
        </BlurFade>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(255,255,255,0.35)",
            maxWidth: 540,
            lineHeight: 1.7,
            marginTop: 8,
          }}
        >
          When a Westinghouse engineer reports a reading that doesn't make sense, we don't raise
          a support ticket. We send the engineer who designed that measurement protocol.
        </p>
      </section>

      <SectionDivider />

      {/* ═══════ The Droz Advantage ═══════ */}
      <section style={{
        background: "#0d0d0d",
        padding: "120px 48px",
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
              Our instruments are just the beginning.
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            We build the hardware. But we also build the software that reads it, the AI that learns from it, and the maintenance programs that depend on it. One vendor for the full lifecycle.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { name: "Predictive Maintenance", desc: "Our instruments in the field, our engineers reading the data — a PM program that already knows your equipment.", href: "/divisions/predictive-maintenance" },
              { name: "Software Development", desc: "Custom platforms built to ingest and visualize data from our instruments without middleware headaches.", href: "/divisions/software-development" },
              { name: "Intelligent Construction", desc: "Sensors and instruments deployed inside buildings and infrastructure — connected to your BMS from day one.", href: "/divisions/intelligent-construction" },
              { name: "AI Consulting", desc: "Models trained on the data our instruments generate — because the training set is only as good as the hardware behind it.", href: "/divisions/ai-consulting" },
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

      {/* Production Capabilities */}
      <section style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
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
            What We Manufacture
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
            Instruments That Perform When It Counts
          </TextReveal>
        </div>
        <StaggerGrid columns={2} gap={20}>
          {capabilities.map((item) => (
            <ProdCard key={item.title} item={item} />
          ))}
        </StaggerGrid>
      </section>

      <SectionDivider />

      {/* Gear visualization */}
      <section
        style={{
          padding: "100px 48px",
          maxWidth: 1200,
          margin: "0 auto",
          background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}, transparent 60%)`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            Mechanical Precision
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
            Where Thousandths of a Millimetre Determine the Outcome
          </TextReveal>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 15,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 480,
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Every instrument we manufacture is calibrated against traceable references and
            validated in the same conditions where it will be used. Not a lab. Your conditions.
          </p>
        </div>
        <GearVisualization />
      </section>

      {/* PrecisionMachinery as full-section background behind metrics intro */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "80vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 3D Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }}>
          <PrecisionMachinery style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>

        {/* Content overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "120px 48px",
            textAlign: "center",
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
              marginBottom: 20,
            }}
          >
            Precision at Scale
          </p>
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
              maxWidth: 720,
              margin: "0 auto",
              lineHeight: 1.2,
            }}
          >
            CNC tolerance held to the thousandth, every run.
          </TextReveal>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 15,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 480,
              margin: "24px auto 0",
              lineHeight: 1.7,
            }}
          >
            Instruments manufactured, calibrated, and validated in the same industrial conditions
            where they will be used — not a controlled lab environment.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Precision Metrics — results framed */}
      <section style={{ background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}, transparent 60%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 48px 0" }}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 24,
            }}
          >
            Performance — In the Field
          </p>
        </div>
        <PrecisionMetrics />
      </section>

      <SectionDivider />

      {/* Marquee */}
      <div style={{ padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <LogoMarquee speed={50} direction="right" />
      </div>

      <SectionDivider />

      {/* CTA */}
      <section
        style={{
          padding: "120px 48px",
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
          If your instruments aren't performing in the field, the specs don't matter.
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
          Trusted by Westinghouse, Holcim, and Siemens Energy. Industrial-grade instruments
          engineered and validated by the engineers who use them every day.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <MagneticButton as="a" href="/contact">
            Scale Precision
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            Start Free Trial
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
