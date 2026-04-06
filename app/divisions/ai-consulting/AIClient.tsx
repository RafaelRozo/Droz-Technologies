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
  SmoothAccordion,
  BlurFade,
} from "@/components/animations";

const NeuralBrain = dynamic(() => import("@/components/3d/NeuralBrain"), { ssr: false });

/* ─── Accent color for this division ─── */
const ACCENT = "rgba(160,59,110,0.03)";

/* ─── Neural Network visualization ─── */
interface NodeLayer {
  count: number;
  x: number;
}

function NeuralNetworkViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" });

  const W = 700;
  const H = 340;
  const layers: NodeLayer[] = [
    { count: 4, x: 100 },
    { count: 5, x: 250 },
    { count: 4, x: 400 },
    { count: 3, x: 550 },
    { count: 1, x: 660 },
  ];

  const nodePositions: { x: number; y: number; layer: number; idx: number }[] = [];
  layers.forEach((layer, li) => {
    const spacing = H / (layer.count + 1);
    for (let i = 0; i < layer.count; i++) {
      nodePositions.push({ x: layer.x, y: spacing * (i + 1), layer: li, idx: i });
    }
  });

  const connections: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  let delayCounter = 0;
  for (let li = 0; li < layers.length - 1; li++) {
    const fromNodes = nodePositions.filter((n) => n.layer === li);
    const toNodes = nodePositions.filter((n) => n.layer === li + 1);
    fromNodes.forEach((from) => {
      toNodes.forEach((to) => {
        connections.push({
          x1: from.x,
          y1: from.y,
          x2: to.x,
          y2: to.y,
          delay: delayCounter * 0.02,
        });
        delayCounter++;
      });
    });
  }

  const layerLabels = ["Input", "Hidden 1", "Hidden 2", "Hidden 3", "Output"];

  return (
    <div
      ref={ref}
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "40px 32px 32px",
        maxWidth: 780,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Multi-Layer Perceptron — Inference Mode
        </p>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", height: "auto", display: "block" }}
          fill="none"
        >
          {connections.map((conn, i) => (
            <motion.line
              key={`conn-${i}`}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={0.75}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: conn.delay, ease: "easeOut" }}
            />
          ))}

          {connections.filter((_, i) => i % 7 === 0).map((conn, i) => (
            <motion.circle
              key={`pulse-${i}`}
              r={2.5}
              fill="rgba(255,255,255,0.5)"
              animate={
                isInView
                  ? {
                      cx: [conn.x1, conn.x2],
                      cy: [conn.y1, conn.y2],
                      opacity: [0, 0.8, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.2,
                delay: 1.5 + i * 0.18,
                repeat: Infinity,
                repeatDelay: 2 + i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          {nodePositions.map((node, i) => {
            const isOutput = node.layer === layers.length - 1;
            const isInput = node.layer === 0;
            const radius = isOutput ? 14 : isInput ? 11 : 9;
            const delay = 0.8 + node.layer * 0.15 + node.idx * 0.06;
            return (
              <motion.g key={`node-${i}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={radius + 6}
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill={isOutput ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}
                  stroke={isOutput ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"}
                  strokeWidth={isOutput ? 1.5 : 1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={3}
                  fill="rgba(255,255,255,0.5)"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  transition={{ duration: 0.3, delay: delay + 0.15 }}
                />
              </motion.g>
            );
          })}

          {layers.map((layer, li) => (
            <motion.text
              key={`label-${li}`}
              x={layer.x}
              y={H - 10}
              textAnchor="middle"
              fill="rgba(255,255,255,0.2)"
              fontSize={9}
              fontFamily="'Outfit', sans-serif"
              letterSpacing="0.06em"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.4 + li * 0.1 }}
            >
              {layerLabels[li]}
            </motion.text>
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginTop: 8,
          }}
        >
          {[
            { label: "Architecture", value: "MLP / 5L" },
            { label: "Activation", value: "ReLU" },
            { label: "Optimizer", value: "AdamW" },
            { label: "Inference", value: "< 12ms" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── AI Capability Tag Card ─── */
interface AICapItem {
  label: string;
  desc: string;
  badge: string;
}

function AICapCard({ item }: { item: AICapItem }) {
  return (
    <TiltCard
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: 28,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              color: "#fff",
              fontWeight: 400,
            }}
          >
            {item.label}
          </h3>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              padding: "3px 8px",
              flexShrink: 0,
              marginLeft: 12,
            }}
          >
            {item.badge}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.65,
            marginTop: "auto",
          }}
        >
          {item.desc}
        </p>
      </div>
    </TiltCard>
  );
}

/* ─── Metrics Row ─── */
function MetricsRow() {
  const stats = [
    { value: 200, suffix: "+", label: "Models in Production" },
    { value: 96, suffix: ".5%", label: "Avg Accuracy" },
    { value: 10, suffix: "TB+", label: "Data Processed" },
    { value: 90, suffix: " days", label: "Proof to Production" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {stats.map((s, i) => (
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
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "#fff",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <CounterSpring target={s.value} suffix={s.suffix} />
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
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */
export default function AIClient() {
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[4];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const capabilities: AICapItem[] = [
    {
      label: "Computer Vision at Production Scale",
      desc: "Object detection, image segmentation, and visual inspection systems trained on your actual data — not ImageNet. Deployed in manufacturing, construction, logistics, and security environments.",
      badge: "Production",
    },
    {
      label: "NLP for Enterprise Knowledge Systems",
      desc: "Document processing, semantic search, and classification across contracts, reports, manuals, and regulatory filings. Because your critical knowledge is buried in PDFs nobody can search.",
      badge: "Production",
    },
    {
      label: "Predictive Models Trained on Messy Reality",
      desc: "Time-series forecasting and anomaly detection integrated with your existing data pipelines — ERP, CRM, IoT, and legacy systems. We've normalized data from platforms that haven't been updated since 2009.",
      badge: "Production",
    },
    {
      label: "Deep Learning at Scale",
      desc: "Custom neural architecture design, training infrastructure, and optimization for your specific domain. Not fine-tuned on someone else's problem. Built from the ground up for yours.",
      badge: "R&D",
    },
    {
      label: "MLOps That Survives Production",
      desc: "Model versioning, CI/CD for ML, drift monitoring, automated retraining, and A/B testing. Because a model that worked in Q1 quietly fails by Q3 when your data distribution shifts.",
      badge: "Infrastructure",
    },
    {
      label: "Edge AI for Constrained Environments",
      desc: "Model compression and deployment to edge devices, embedded systems, and air-gapped infrastructure. Because not every environment has a cloud connection, and not every decision can wait for one.",
      badge: "Embedded",
    },
  ];

  const processItems = [
    {
      title: "Data Audit — We See What Others Miss",
      content:
        "We audit your data assets, infrastructure, and business processes — including the database exports your analysts have been running manually for 6 years, the system integrations nobody documented, and the signal buried in your CRM that predicts churn 90 days out. We identify the highest-ROI AI opportunities before anyone writes a line of model code.",
    },
    {
      title: "Proof of Concept — Real Evidence, Not a Demo",
      content:
        "A 4–6 week sprint to validate the core technical hypothesis on your actual messy data. We deliver a working prototype with documented accuracy benchmarks against your specific failure modes. You make a go/no-go decision with real evidence — not a vendor's optimistic projections.",
    },
    {
      title: "Development — Built to Survive Your Environment",
      content:
        "Full-scale model development with production-quality code, data pipelines, feature engineering, and training infrastructure. We document every architectural decision and surface blockers in weekly reviews — not at the handoff meeting when it's too late to change anything.",
    },
    {
      title: "Deployment — We Stay Until It Works",
      content:
        "Model serving, API integration with your existing systems, monitoring dashboards, and alerting. We don't hand off documentation and disappear. We stay engaged post-launch until your team owns it and performance targets are consistently met — not just on launch day.",
    },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle="Your AI pilot has been in 'proof of concept' for two years. Nobody can explain the ROI."
        pill="05 — Division"
        showNoise
        showMesh
      />

      <SectionDivider />

      {/* Velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          Computer Vision — NLP — Predictive Models — Deep Learning — MLOps — Edge AI — LLMs — Transformers
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
              Every AI consultant shows you a demo that works on clean data.
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
              Your data is messy, fragmented, and lives in 6 different systems — a CRM that's been
              running since 2011, a data warehouse nobody fully migrated, and a decade of analyst
              notes in an Excel file someone's been maintaining on their personal laptop.
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
              That demo will never survive your production environment. And two years from now, your
              AI pilot will still be a PowerPoint deck with a Gantt chart that says "Phase 2: TBD."
            </p>
          </motion.div>
          <div>
            {[
              { stat: "85%", label: "of AI projects never reach production" },
              { stat: "2 years", label: "average time industrial AI stays in 'pilot' phase" },
              { stat: "$1.8M", label: "average cost of a failed enterprise AI project" },
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
          We don't build demos that die in committee. Every model we deploy runs in production, monitored 24/7 by our team. Proof of concept to production in 90 days — with the metrics to prove it.
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
          Other AI consultants hand you a model and a slide deck. We own the outcome. If it isn't
          running in production and hitting your accuracy targets, we aren't done.
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
              AI needs context. We have 20 years of it.
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            Most AI consultancies build models on clean data and hope for the best. We have divisions that generate the industrial data, build the software platforms, instrument the buildings, and maintain the equipment. Your AI model gets context nobody else can provide.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { name: "Predictive Maintenance", desc: "20 years of failure data from real industrial equipment — the training set your anomaly model has always needed.", href: "/divisions/predictive-maintenance" },
              { name: "Software Development", desc: "The enterprise platforms that serve your model's predictions to the people who need to act on them.", href: "/divisions/software-development" },
              { name: "Intelligent Construction", desc: "Building IoT and sensor networks that generate the structured environmental data your models consume.", href: "/divisions/intelligent-construction" },
              { name: "Industrial Manufacturing", desc: "Precision instruments that produce reliable, calibrated data — so your model isn't learning from noise.", href: "/divisions/industrial-manufacturing" },
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

      {/* Neural Network visualization */}
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
            Inference Architecture
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
            Models That Decide in Under 12 Milliseconds
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
            In your environment, a model that takes 2 seconds to respond is a model nobody uses.
            We optimize for latency from day one — not as an afterthought.
          </p>
        </div>
        <NeuralNetworkViz />
      </section>

      {/* NeuralBrain as full-section background behind capabilities intro */}
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
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.55 }}>
          <NeuralBrain style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
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
            Intelligence at Work
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
            Models built for production from day one.
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
            Not trained on clean benchmarks. Built on your actual data — messy, fragmented,
            and real — then deployed into production with monitoring that catches drift before your
            stakeholders notice it.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* AI Capabilities */}
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
            What We Deploy
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
            AI That Survives Your Environment
          </TextReveal>
        </div>
        <StaggerGrid columns={3} gap={20}>
          {capabilities.map((item) => (
            <AICapCard key={item.label} item={item} />
          ))}
        </StaggerGrid>
      </section>

      <SectionDivider />

      {/* Metrics Row — results framed */}
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
            Results — Not Pilots
          </p>
        </div>
        <MetricsRow />
      </section>

      <SectionDivider />

      {/* Process Accordion */}
      <section style={{ padding: "100px 48px", maxWidth: 800, margin: "0 auto" }}>
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
            How We Get There
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
            From Messy Data to Production in 90 Days
          </TextReveal>
        </div>
        <SmoothAccordion
          items={processItems}
          allowMultiple={false}
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />
      </section>

      <SectionDivider />

      {/* Velocity ticker 2 */}
      <div style={{ padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={0.15}>
          PyTorch — TensorFlow — OpenAI — Anthropic — LangChain — HuggingFace — MLflow — Ray — Kubernetes
        </ScrollVelocityText>
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
          You don't have a data problem. You have a context problem. We have 20 years of it.
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
          We'll audit your data, identify your highest-ROI AI opportunity, and give you a clear
          path from where you are to 200+ models in production — in 90 days or less.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <MagneticButton as="a" href="/contact">
            Think Bigger
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            Start Free Trial
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
