"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
import dynamic from "next/dynamic";

const DataArchitecture = dynamic(() => import("@/components/3d/DataArchitecture"), { ssr: false });

/* ─── Accent color for this division ─── */
const ACCENT = "rgba(99,102,160,0.03)";

/* ─── Dot matrix background ─── */
const dotMatrixStyle: React.CSSProperties = {
  backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
  backgroundSize: "18px 18px",
};

/* ─── Terminal Typewriter ─── */
const terminalLines = [
  { prefix: "$ ", text: "git push origin main", delay: 0 },
  { prefix: "  ", text: "Enumerating objects: 27, done.", delay: 0.8 },
  { prefix: "  ", text: "Delta compression using up to 16 threads", delay: 1.3 },
  { prefix: "  ", text: "Writing objects: 100% (27/27), 14.3 KiB", delay: 1.8 },
  { prefix: "  ", text: "remote: Resolving deltas: 100% (12/12), done.", delay: 2.4 },
  { prefix: "$ ", text: "railway up --environment production", delay: 3.0 },
  { prefix: "  ", text: "Building image... done in 18s", delay: 3.9 },
  { prefix: "  ", text: "Deploying to production cluster...", delay: 4.6 },
  { prefix: "  ", text: "Health check passed. 3 replicas active.", delay: 5.5 },
  { prefix: "  ", text: "Deployment complete. Live at droz.app", delay: 6.2 },
];

function TerminalShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" });
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay * 1000);
    });
  }, [isInView]);

  return (
    <div
      ref={ref}
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        overflow: "hidden",
        maxWidth: 680,
        margin: "0 auto",
        ...dotMatrixStyle,
      }}
    >
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
          <div key={color} style={{ width: 12, height: 12, borderRadius: "50%", background: color, opacity: 0.8 }} />
        ))}
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            marginLeft: 8,
            letterSpacing: "0.04em",
          }}
        >
          droz-deploy — zsh
        </span>
      </div>
      <div style={{ padding: "28px 28px 36px", fontFamily: "'Courier New', Courier, monospace" }}>
        {terminalLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={visibleLines.includes(i) ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              display: "flex",
              fontSize: 13,
              lineHeight: 1.8,
              color: line.prefix.trim() === "$" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
            }}
          >
            <span style={{ color: line.prefix.trim() === "$" ? "rgba(255,255,255,0.5)" : "transparent", minWidth: 20 }}>
              {line.prefix}
            </span>
            <span>{line.text}</span>
            {i === terminalLines.length - 1 && visibleLines.includes(i) && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                style={{ display: "inline-block", width: 8, height: 14, background: "rgba(255,255,255,0.6)", marginLeft: 2, verticalAlign: "middle" }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Process Timeline ─── */
interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.06)", transform: "translateX(-50%)" }} />

      {steps.map((step, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -32 : 32 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              marginBottom: 48,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "calc(50% - 48px)",
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "28px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 36,
                  color: "rgba(255,255,255,0.06)",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: "#fff",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                {step.title}
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
                {step.desc}
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 12,
                height: 12,
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "50%",
                zIndex: 2,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Tech Card ─── */
interface TechItem {
  label: string;
  desc: string;
  tags: string[];
}

function TechCapabilityCard({ item }: { item: TechItem }) {
  return (
    <TiltCard
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: 28,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h3
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "#fff",
            fontWeight: 400,
          }}
        >
          {item.label}
        </h3>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.65,
          }}
        >
          {item.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4,
                padding: "3px 8px",
              }}
            >
              {tag}
            </span>
          ))}
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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${metrics.length}, 1fr)`,
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
export default function SoftwareClient() {
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[1];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery — We Map the Real Problem",
      desc: "Not a Zoom call with your IT manager. We talk to the people who actually use the system — finance, ops, field teams — and map every friction point. We define success criteria in business outcomes, not feature lists.",
    },
    {
      number: "02",
      title: "Architecture — Built for Your Stack",
      desc: "System architecture designed around your existing infrastructure. No rip-and-replace. We document every decision so your team owns it long after we're done.",
    },
    {
      number: "03",
      title: "Development — Shipped in Weeks",
      desc: "Agile sprints with weekly deliverables your stakeholders can actually use. Clean, typed, tested code — not a 60-slide deck about what we're about to build.",
    },
    {
      number: "04",
      title: "Testing — Breaking It Before You Do",
      desc: "Automated unit, integration, and E2E test suites. We simulate your worst production scenarios in staging so they don't happen live.",
    },
    {
      number: "05",
      title: "Deployment — Zero Excuses Uptime",
      desc: "CI/CD pipelines, zero-downtime deployments, and 24/7 monitoring. We don't hand off and disappear. We stay until the SLA is bulletproof.",
    },
  ];

  const techItems: TechItem[] = [
    {
      label: "Frontend That Stakeholders Actually Use",
      desc: "Reactive UIs built for how your teams actually work — field reporting, executive dashboards, high-volume data entry. Not designed for a product demo.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      label: "Backend That Handles Your Load",
      desc: "Scalable APIs and event-driven architectures tested against your actual data volume — not synthetic benchmarks. Government-grade security baked in from day one.",
      tags: ["Node.js", "Go", "PostgreSQL", "Redis"],
    },
    {
      label: "Mobile That Works Offline",
      desc: "Cross-platform apps with local sync for teams that can't always rely on connectivity. Your people get the data they need regardless of network conditions.",
      tags: ["React Native", "Expo", "Swift", "Kotlin"],
    },
    {
      label: "Cloud That Costs Less Over Time",
      desc: "Multi-cloud infrastructure with auto-scaling and cost optimization baked in from day one. Not retrofitted after your first AWS bill.",
      tags: ["AWS", "GCP", "Azure", "Terraform"],
    },
    {
      label: "DevOps That Ships, Not Stalls",
      desc: "Automated pipelines from commit to production with full observability. Your team merges. The platform handles the rest.",
      tags: ["Docker", "Kubernetes", "GitHub Actions", "Grafana"],
    },
    {
      label: "AI That Works on Your Data",
      desc: "Model training and inference built for messy, real-world enterprise data — not cleaned-up demo datasets. Automation that actually reduces headcount, not just headaches.",
      tags: ["PyTorch", "OpenAI", "LangChain", "MLflow"],
    },
  ];

  const displayMetrics: Metric[] = [
    { value: 40, suffix: "+", prefix: "", label: "Platforms Shipped" },
    { value: 99, suffix: ".99%", prefix: "", label: "Uptime" },
    { value: 4, suffix: " weeks", prefix: "", label: "Avg Deploy Time" },
    { value: 12, suffix: "", prefix: "", label: "Govt Contracts" },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle="Your last software project took 18 months. It still can't generate the report your CFO needs."
        pill="02 — Division"
        showMesh
      />

      <SectionDivider />

      {/* Velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          React — Next.js — TypeScript — Node.js — Go — Kubernetes — PostgreSQL — Terraform — AI Integration
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
              You've been sold roadmaps, not results.
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
              Your last platform took 18 months and three vendors. It still can't generate the
              report your CFO actually needs. The agency that built it has never talked to the
              people who use it daily. They delivered a demo. Not a product.
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
              Your finance team built a workaround in Excel. Your ops team screenshots data to send
              it by email. And the feature your COO requested at launch is "on the roadmap" — Q4,
              probably next year.
            </p>
          </motion.div>
          <div>
            {[
              { stat: "68%", label: "of software projects overrun their deadline" },
              { stat: "1 in 6", label: "enterprise software projects are abandoned" },
              { stat: "18 mo", label: "average time-to-value in industrial software" },
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
          We don't outsource. We don't offshore. Every line of code is written by senior engineers who ship to production, not to a staging server nobody checks. Government-grade security. Enterprise-scale reliability. Startup-speed delivery.
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
          That's why our government clients trust us with critical infrastructure. Not because we gave a better demo — because we understood the problem before we opened a code editor.
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
              Your software doesn't exist in a vacuum.
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            When your enterprise platform needs to ingest sensor data, control building systems, or feed AI models — we don't hand you off to a partner. We walk down the hall.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { name: "Predictive Maintenance", desc: "Sensor data flowing directly into your dashboard — no CSV exports, no manual ingestion.", href: "/divisions/predictive-maintenance" },
              { name: "Intelligent Construction", desc: "Building IoT and BMS systems with APIs your platform can read and act on.", href: "/divisions/intelligent-construction" },
              { name: "Industrial Manufacturing", desc: "Instrument APIs and data protocols your software connects to on day one.", href: "/divisions/industrial-manufacturing" },
              { name: "AI Consulting", desc: "ML models trained and deployed inside your product — not handed off as a separate service.", href: "/divisions/ai-consulting" },
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

      {/* Process Section */}
      <section style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
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
            How We Ship
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
            From Kickoff to Production in Weeks
          </TextReveal>
        </div>
        <ProcessTimeline steps={processSteps} />
      </section>

      <SectionDivider />

      {/* Tech Capabilities */}
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
            What We Deliver
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
            Software Built for Enterprise and Government Scale
          </TextReveal>
        </div>
        <StaggerGrid columns={3} gap={20}>
          {techItems.map((item) => (
            <TechCapabilityCard key={item.label} item={item} />
          ))}
        </StaggerGrid>
      </section>

      <SectionDivider />

      {/* Terminal showcase */}
      <section
        style={{
          padding: "100px 48px",
          maxWidth: 1200,
          margin: "0 auto",
          background: `radial-gradient(ellipse at 50% 100%, ${ACCENT}, transparent 60%)`,
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
            Zero-Downtime Deployment
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
            Ship Faster — Without Breaking Production
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
            Every project ships with automated CI/CD, health checks, and zero-downtime deployments.
            Not as an add-on. As the baseline.
          </p>
        </div>
        <TerminalShowcase />
      </section>

      {/* DataArchitecture as full-section background behind a showcase band */}
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
          <DataArchitecture style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
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
            Infrastructure
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
            Data infrastructure built to survive your load.
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
            Horizontally scalable backends, event-driven pipelines, and multi-cloud deployments
            designed for enterprise data volumes and government compliance requirements — not SaaS demos.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Proof — results framed */}
      <section style={{ background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px 16px" }}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              paddingTop: 60,
              paddingBottom: 24,
            }}
          >
            Results — Not Timelines
          </p>
        </div>
        <MetricBar metrics={displayMetrics} />
      </section>

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
          You don't need another roadmap. You need software that works on Monday.
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
          From government platforms to enterprise SaaS — we deliver production-grade software
          with senior engineers on every line. In weeks, not quarters.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <MagneticButton as="a" href="/contact">
            Ship Faster
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            Start Free Trial
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
