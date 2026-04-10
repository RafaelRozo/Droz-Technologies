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
import VerticalCutReveal from "@/components/animations/VerticalCutReveal";
import AnimatedGridBg from "@/components/animations/AnimatedGridBg";

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
  const { locale } = useLocale();

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
        {locale === "fr" ? "Pannes Détectées Avant qu'Elles Se Produisent" : locale === "es" ? "Fallas Detectadas Antes de que Ocurran" : "Failures Detected Before They Happen"}
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
        {locale === "fr"
          ? "L'analyse continue des vibrations et des fréquences capture les signatures de défauts des semaines avant qu'un palier cède, qu'un arbre se désaligne ou qu'un déséquilibre détruise une turbine."
          : locale === "es"
          ? "El análisis continuo de vibraciones y frecuencias captura firmas de fallas semanas antes de que un rodamiento falle, un eje se desalinee o un desequilibrio destruya una turbina."
          : "Continuous vibration and frequency analysis captures fault signatures weeks before a bearing fails, a shaft misaligns, or an imbalance destroys a turbine."}
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
            { color: "rgba(255,255,255,0.7)", label: locale === "fr" ? "Signal en Direct" : locale === "es" ? "Señal en Vivo" : "Live Signal" },
            { color: "rgba(255,255,255,0.3)", label: locale === "fr" ? "Référence" : locale === "es" ? "Referencia" : "Baseline" },
            { color: "rgba(255,255,255,0.25)", label: locale === "fr" ? "Seuil d'Alerte" : locale === "es" ? "Umbral de Alerta" : "Alert Threshold" },
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
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>
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
      title: locale === "fr" ? "Analyse Vibratoire — Fini les Suppositions" : locale === "es" ? "Análisis de Vibración — Sin Más Suposiciones" : "Vibration Analysis — Stop Guessing",
      desc: locale === "fr"
        ? "Analyse FFT haute fréquence qui détecte les défauts de roulements, les déséquilibres et les désalignements avant qu'ils déclenchent des alarmes. Votre technicien part à la retraite. Les données, elles, restent."
        : locale === "es"
        ? "Análisis FFT de alta frecuencia que detecta fallas de rodamientos, desequilibrios y desalineaciones antes de que activen alarmas. Su técnico se jubila. Los datos no."
        : "High-frequency FFT analysis that catches bearing faults, imbalance, and misalignment before they trigger alarms. Your tech leaves. The data doesn't.",
      metric: 99,
      metricSuffix: ".7%",
      metricLabel: locale === "fr" ? "Taux de Détection" : locale === "es" ? "Tasa de Detección" : "Detection Rate",
    },
    {
      title: locale === "fr" ? "Alignement Laser — Zéro Reprise" : locale === "es" ? "Alineación Láser — Cero Retrabajos" : "Laser Alignment — Zero Rework",
      desc: locale === "fr"
        ? "Alignement d'arbres et géométrique sub-micronique pour turbines, pompes, moteurs et compresseurs. Le désalignement est la première cause de défaillance des roulements. Nous l'éliminons."
        : locale === "es"
        ? "Alineación de ejes y geométrica sub-micrométrica para turbinas, bombas, motores y compresores. El desalineamiento es la causa número 1 de falla de rodamientos. Lo eliminamos."
        : "Sub-micron precision shaft and geometric alignment for turbines, pumps, motors, and compressors. Misalignment is the #1 cause of bearing failure. We eliminate it.",
      metric: 500,
      metricSuffix: "+",
      metricLabel: locale === "fr" ? "Machines Alignées" : locale === "es" ? "Máquinas Alineadas" : "Machines Aligned",
    },
    {
      title: locale === "fr" ? "Thermographie — Voyez ce qui Est Caché" : locale === "es" ? "Termografía — Vea lo que Está Oculto" : "Thermography — See What's Hidden",
      desc: locale === "fr"
        ? "Imagerie infrarouge qui détecte les points chauds dans les systèmes électriques et les composants mécaniques des semaines avant qu'ils s'aggravent. La panne était toujours là — vous ne pouviez tout simplement pas la voir."
        : locale === "es"
        ? "Imágenes infrarrojas que detectan puntos calientes en sistemas eléctricos y componentes mecánicos semanas antes de que escalen. La falla siempre estuvo ahí — simplemente no podía verla."
        : "Infrared imaging that finds hotspots in electrical systems and mechanical components weeks before they escalate. The failure was always there — you just couldn't see it.",
      metric: 45,
      metricSuffix: "%",
      metricLabel: locale === "fr" ? "Réduction des Arrêts" : locale === "es" ? "Reducción de Paros" : "Downtime Reduction",
    },
    {
      title: locale === "fr" ? "Équilibrage de Rotor — Précision à Pleine Vitesse" : locale === "es" ? "Balanceo de Rotor — Precisión a Máxima Velocidad" : "Rotor Balancing — Precision at Speed",
      desc: locale === "fr"
        ? "Équilibrage en place et en atelier de ventilateurs, turbines et turbines selon la norme ISO 1940. Parce que les vibrations à 3 600 tr/min ne pardonnent pas l'imprécision."
        : locale === "es"
        ? "Balanceo en sitio y en taller de ventiladores, turbinas e impulsores según norma ISO 1940. Porque la vibración a 3.600 RPM no perdona la imprecisión."
        : "In-situ and shop balancing of fans, turbines, and impellers to ISO 1940 spec. Because vibration at 3,600 RPM doesn't forgive imprecision.",
      metric: 20,
      metricSuffix: "+",
      metricLabel: locale === "fr" ? "Ans d'Expérience Terrain" : locale === "es" ? "Años en el Campo" : "Years in the Field",
    },
  ];

  const displayMetrics: Metric[] = [
    { value: 340, suffix: "+", prefix: "", label: locale === "fr" ? "Pannes Prédites" : locale === "es" ? "Fallas Predichas" : "Failures Predicted" },
    { value: 2, suffix: ".1M", prefix: "$", label: locale === "fr" ? "Arrêts Évités" : locale === "es" ? "Paros Evitados" : "Downtime Prevented" },
    { value: 89, suffix: " days", prefix: "", label: locale === "fr" ? "Délai de Retour sur Investissement" : locale === "es" ? "Tiempo al ROI" : "Time to ROI" },
    { value: 12000, suffix: "+", prefix: "", label: locale === "fr" ? "Actifs Surveillés" : locale === "es" ? "Activos Monitoreados" : "Assets Monitored" },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle={
          locale === "fr"
            ? "Votre meilleur technicien de maintenance prend sa retraite dans 8 mois. Ce savoir-faire n'a jamais été documenté."
            : locale === "es"
            ? "Su mejor técnico de mantenimiento se jubila en 8 meses. Ese conocimiento nunca fue documentado."
            : "Your best maintenance tech retires in 8 months. That knowledge has never been documented."
        }
        pill="01 — Division"
        showMesh
      />

      <SectionDivider />

      {/* Scroll velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          {locale === "fr"
            ? "Analyse Vibratoire — Alignement Laser — Thermographie — Équilibrage — IA Prédictive — Détection de Défauts"
            : locale === "es"
            ? "Análisis de Vibración — Alineación Láser — Termografía — Balanceo de Rotor — IA Predictiva — Detección de Fallas"
            : "Vibration Analysis — Laser Alignment — Thermography — Rotor Balancing — Predictive AI — Fault Detection"}
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
              {locale === "fr" ? "Le Problème" : locale === "es" ? "El Problema" : "The Problem"}
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
              {locale === "fr"
                ? "Vous gérez une opération de 50 M$ sur l'intuition de trois personnes."
                : locale === "es"
                ? "Está operando una planta de $50 M con la intuición de tres personas."
                : "You're running a $50M operation on the intuition of three people."}
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
              {locale === "fr"
                ? "Quand ils partent, des décennies d'expertise en diagnostic s'en vont avec eux. Votre GMAO a des ordres de travail. Elle n'a pas de reconnaissance de tendances. Elle ne sait pas que votre pompe n°3 surchauffe toujours avant que l'accouplement lâche. Eux, ils le savaient. Maintenant, ils sont partis."
                : locale === "es"
                ? "Cuando se van, décadas de experiencia en diagnóstico se van con ellos. Su CMMS tiene órdenes de trabajo. No tiene reconocimiento de patrones. No sabe que su bomba N°3 siempre se calienta antes de que el acoplamiento falle. Ellos sí lo sabían. Ahora ya no están."
                : "When they leave, decades of diagnostic expertise walks out the door. Your CMMS has work orders. It doesn't have pattern recognition. It doesn't know that your #3 pump always runs hot before the coupling fails. They knew. Now they're gone."}
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
              {locale === "fr"
                ? "Votre programme de maintenance planifiée détecte ce qui est prévu. La maintenance prédictive détecte ce qui se passe réellement — en temps réel, avant que ça vous coûte un quart de production."
                : locale === "es"
                ? "Su programa de mantenimiento planificado detecta lo que está programado. El mantenimiento predictivo detecta lo que está ocurriendo en realidad — en tiempo real, antes de que le cueste un turno."
                : "Your planned maintenance program catches what's scheduled. Predictive maintenance catches what's actually happening — in real time, before it costs you a shift."}
            </p>
          </motion.div>
          <div>
            {[
              {
                stat: "78%",
                label: locale === "fr" ? "des défaillances industrielles ne sont pas liées à l'âge" : locale === "es" ? "de las fallas industriales no están relacionadas con la edad" : "of industrial failures are not age-related",
              },
              {
                stat: "3x",
                label: locale === "fr" ? "le coût d'une réparation d'urgence vs. planifiée" : locale === "es" ? "el costo de una reparación de emergencia vs. planificada" : "cost of emergency vs. planned repair",
              },
              {
                stat: "6 weeks",
                label: locale === "fr" ? "de préavis moyen avant une défaillance prévisible" : locale === "es" ? "de aviso promedio antes de una falla predecible" : "average notice before a predictable failure",
              },
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
          {locale === "fr" ? "Pourquoi Uniquement Droz" : locale === "es" ? "Por Qué Solo Droz" : "Why Only Droz"}
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
          {locale === "fr"
            ? "Nous diagnostiquons les défaillances d'équipements à l'oreille depuis 2004. Nous avons transformé ça en logiciel. Personne d'autre n'a 20 ans de données terrain ET l'équipe d'ingénieurs pour construire l'IA qui apprend de ces données."
            : locale === "es"
            ? "Llevamos diagnosticando fallas de equipos de oído desde 2004. Lo convertimos en software. Nadie más tiene 20 años de datos de campo Y el equipo de ingeniería para construir la IA que aprende de ellos."
            : "We've been diagnosing equipment failures by ear since 2004. We turned that into software. Nobody else has 20 years of field data AND the engineering team to build the AI that learns from it."}
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
          {locale === "fr"
            ? "D'autres fournisseurs vendent des logiciels. Nous, nous vendions du conseil en premier — à Westinghouse, Holcim, PDVSA — avant d'écrire la moindre ligne de code ML. Cette différence est présente dans chaque modèle que nous déployons."
            : locale === "es"
            ? "Otros proveedores venden software. Nosotros vendíamos consultoría primero — a Westinghouse, Holcim, PDVSA — antes de escribir una sola línea de código ML. Esa diferencia está en cada modelo que desplegamos."
            : "Other vendors sell software. We sold consulting first — to Westinghouse, Holcim, PDVSA — before we ever wrote a line of ML code. That difference is in every model we deploy."}
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
              {locale === "fr" ? "Partie d'un Tout Plus Grand" : locale === "es" ? "Parte de Algo Mayor" : "Part of Something Bigger"}
            </p>
          </BlurFade>
          <BlurFade delay={0.2} as="h2">
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff", fontWeight: 400,
              lineHeight: 1.3, maxWidth: 700, marginBottom: 24,
            }}>
              {locale === "fr"
                ? "Les données collectées par vos capteurs n'ont pas à s'arrêter à un fichier CSV."
                : locale === "es"
                ? "Los datos que recopilan sus sensores no tienen por qué quedarse en un CSV."
                : "The data your sensors collect doesn't have to stop at a CSV."}
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            {locale === "fr"
              ? "La plupart des fournisseurs de MP vous remettent un rapport. Nous pouvons construire le logiciel sur mesure qui transforme vos données de vibration en décisions automatisées, ou déployer des modèles d'IA qui prédisent les pannes avant que vos analystes ne repèrent la tendance."
              : locale === "es"
              ? "La mayoría de los proveedores de MP le entregan un informe. Nosotros podemos construir el software personalizado que convierte sus datos de vibración en decisiones automatizadas, o desplegar modelos de IA que predicen fallas antes de que sus analistas detecten el patrón."
              : "Most PM providers hand you a report. We can build the custom software that turns your vibration data into automated decisions, or deploy AI models that predict failures before your analysts spot the pattern."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
            {[
              {
                name: locale === "fr" ? "Développement Logiciel" : locale === "es" ? "Desarrollo de Software" : "Software Development",
                desc: locale === "fr"
                  ? "Tableaux de bord personnalisés et plateformes d'entreprise qui consomment vos données de capteurs en temps réel."
                  : locale === "es"
                  ? "Paneles personalizados y plataformas empresariales que consumen sus datos de sensores en tiempo real."
                  : "Custom dashboards and enterprise platforms that consume your sensor data in real time.",
                href: "/divisions/software-development",
              },
              {
                name: locale === "fr" ? "Conseil en IA" : locale === "es" ? "Consultoría de IA" : "AI Consulting",
                desc: locale === "fr"
                  ? "Modèles ML entraînés sur vos données historiques de défaillance pour repousser la détection encore plus tôt."
                  : locale === "es"
                  ? "Modelos de ML entrenados con sus datos históricos de fallas para adelantar aún más la detección."
                  : "ML models trained on your historical failure data to push detection further ahead of the curve.",
                href: "/divisions/ai-consulting",
              },
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
            {locale === "fr" ? "Ce que Vous Obtenez" : locale === "es" ? "Lo que Usted Obtiene" : "What You Get"}
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
            {locale === "fr" ? "Des Diagnostics qui Orientent les Décisions" : locale === "es" ? "Diagnósticos que Impulsan Decisiones" : "Diagnostics That Drive Decisions"}
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
            {locale === "fr" ? "Résultats — Pas des Promesses" : locale === "es" ? "Resultados — No Promesas" : "Results — Not Promises"}
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatedGridBg />
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
            letterSpacing: "-0.02em",
            maxWidth: 640,
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {locale === "fr"
            ? "Votre prochaine panne est déjà dans les données."
            : locale === "es"
            ? "Su próxima falla ya está en los datos."
            : "Your next failure is already in the data."}
        </VerticalCutReveal>
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
          {locale === "fr"
            ? "Nos ingénieurs évalueront vos actifs, identifieront vos équipements les plus à risque et concevront un programme qui commence à générer de la valeur en moins de 90 jours."
            : locale === "es"
            ? "Nuestros ingenieros evaluarán sus activos, identificarán sus equipos de mayor riesgo y diseñarán un programa que comience a generar valor en menos de 90 días."
            : "Our engineers will assess your assets, identify your highest-risk equipment, and design a program that starts returning value in under 90 days."}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Prédire l'Imprévisible" : locale === "es" ? "Prediga lo Impredecible" : "Predict the Unpredictable"}
          </MagneticButton>
          <MagneticButton as="a" href="/contact" variant="glass">
            {locale === "fr" ? "Évaluation Gratuite" : locale === "es" ? "Evaluación Gratuita" : "Start Free Trial"}
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
