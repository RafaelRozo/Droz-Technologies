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
import VerticalCutReveal from "@/components/animations/VerticalCutReveal";
import AnimatedGridBg from "@/components/animations/AnimatedGridBg";
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
function PrecisionMetrics({ locale }: { locale: string }) {
  const isMobile = useIsMobile();
  const precisionStats = [
    { display: "2,400/hr", counter: true, value: 2400, suffix: "/hr", label: locale === "fr" ? "Débit Unitaire" : locale === "es" ? "Capacidad por Hora" : "Units Throughput" },
    { display: "±0.001mm", counter: false, value: 0, suffix: "", label: locale === "fr" ? "Tolérance de Précision" : locale === "es" ? "Tolerancia de Precisión" : "Precision Tolerance" },
    { display: "99.7%", counter: false, value: 0, suffix: "", label: locale === "fr" ? "Disponibilité" : locale === "es" ? "Disponibilidad" : "Uptime" },
    { display: "5,000+", counter: true, value: 5000, suffix: "+", label: locale === "fr" ? "Instruments Livrés" : locale === "es" ? "Instrumentos Entregados" : "Instruments Shipped" },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {precisionStats.map((m, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { type: "spring", stiffness: 90, damping: 14 },
            },
          }}
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
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ManufacturingClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[3];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const capabilities: ProdItem[] = [
    {
      title: locale === "fr" ? "Équipements de Vibration — Durcis sur le Terrain" : locale === "es" ? "Equipos de Vibración — Probados en Campo" : "Vibration Equipment — Field-Hardened",
      desc: locale === "fr"
        ? "Analyseurs de vibrations portables et en ligne conçus par des ingénieurs qui les ont utilisés dans des usines pétrochimiques, des cimenteries et des salles de turbines. Pas conçus pour un laboratoire. Testés sur le terrain."
        : locale === "es"
        ? "Analizadores de vibración portátiles y en línea construidos por ingenieros que los han usado en plantas petroquímicas, fábricas de cemento y salas de turbinas. No diseñados para un laboratorio. Probados en el campo."
        : "Portable and online vibration analyzers built by engineers who've used them in petrochemical plants, cement mills, and turbine halls. Not designed for a lab. Tested in the field.",
    },
    {
      title: locale === "fr" ? "Alignement Laser — Certitude Sub-Micronique" : locale === "es" ? "Alineación Láser — Certeza Sub-Micrométrica" : "Laser Alignment — Sub-Micron Certainty",
      desc: locale === "fr"
        ? "Instruments d'alignement d'arbres et géométrique multi-axes avec transfert de données sans fil. Nous les avons calibrés dans notre propre laboratoire. Nous avons aligné plus de 500 machines avec eux. Nous savons ce que les spécifications signifient en pratique."
        : locale === "es"
        ? "Instrumentos de alineación de ejes y geométrica multi-eje con transferencia de datos inalámbrica. Los calibramos en nuestro propio laboratorio. Hemos alineado más de 500 máquinas con ellos. Sabemos lo que las especificaciones significan en la práctica."
        : "Multi-axis shaft and geometric alignment instruments with wireless data transfer. We calibrated these in our own lab. We've aligned over 500 machines with them. We know what the specs mean in practice.",
    },
    {
      title: locale === "fr" ? "Équipements de Thermographie — Voyez l'Invisible" : locale === "es" ? "Equipos de Termografía — Vea lo Invisible" : "Thermography Equipment — See the Invisible",
      desc: locale === "fr"
        ? "Caméras d'imagerie thermique haute résolution calibrées pour les environnements industriels. Parce qu'un point chaud de 2 degrés dans un tableau de commande à 3h du matin fait la différence entre un arrêt contrôlé et un incendie."
        : locale === "es"
        ? "Cámaras de imagen térmica de alta resolución calibradas para entornos industriales. Porque un punto caliente de 2 grados en un tablero eléctrico a las 3 AM es la diferencia entre un paro controlado y un incendio."
        : "High-resolution thermal imaging cameras calibrated for industrial environments. Because a 2-degree hotspot in a switchgear panel at 3 AM is the difference between a controlled shutdown and a fire.",
    },
    {
      title: locale === "fr" ? "Équilibrage de Précision — Tolérance Zéro" : locale === "es" ? "Balanceo de Precisión — Tolerancia Cero" : "Precision Balancing — Zero Tolerance",
      desc: locale === "fr"
        ? "Machines d'équilibrage en place et en atelier pour rotors, ventilateurs, turbines et turbines selon ISO 1940 Grade G0.4. Nous exploitons ces machines dans notre propre division de maintenance — elles doivent être justes."
        : locale === "es"
        ? "Máquinas de balanceo en campo y en taller para rotores, ventiladores, impulsores y turbinas según ISO 1940 Grado G0.4. Operamos estas máquinas en nuestra propia división de mantenimiento — tienen que ser precisas."
        : "Field and shop balancing machines for rotors, fans, impellers, and turbines to ISO 1940 Grade G0.4. We operate these machines in our own maintenance division — they have to be right.",
    },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle={
          locale === "fr"
            ? "Vos instruments de précision ont été calibrés par un fournisseur qui ne les a jamais utilisés sur le terrain."
            : locale === "es"
            ? "Sus instrumentos de precisión fueron calibrados por un proveedor que nunca los ha usado en el campo."
            : "Your precision instruments were calibrated by a vendor who's never used them in the field."
        }
        pill="04 — Division"
        showMesh
      />

      <SectionDivider />

      {/* Velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          {locale === "fr"
            ? "Équipements de Vibration — Alignement Laser — Thermographie — Équilibrage de Rotor — Instruments de Précision — ISO 1940"
            : locale === "es"
            ? "Equipos de Vibración — Alineación Láser — Termografía — Balanceo de Rotor — Instrumentos de Precisión — ISO 1940"
            : "Vibration Equipment — Laser Alignment — Thermography — Rotor Balancing — Precision Instruments — ISO 1940"}
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
                ? "Vous achetez des équipements à des entreprises qui ne les ont jamais utilisés."
                : locale === "es"
                ? "Está comprando equipos a empresas que nunca los han operado."
                : "You're buying equipment from companies that have never operated it."}
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
                ? "Leurs spécifications sont théoriques. Vos tolérances sont réelles. L'instrument qui affiche ±0,001mm sur la fiche technique vous donne ±0,015mm quand votre technicien mesure une turbine de 115 kg à 40°C dans une usine qui fonctionne depuis 1998."
                : locale === "es"
                ? "Sus especificaciones son teóricas. Sus tolerancias son reales. El instrumento que marca ±0,001mm en la ficha técnica le da ±0,015mm cuando su técnico está midiendo un impulsor de 115 kg a 40°C en una planta que lleva funcionando desde 1998."
                : "Their specs are theoretical. Your tolerances are real. The instrument that reads ±0.001mm on the datasheet gives you ±0.015mm when your technician is measuring a 250-pound impeller at 40°C in a plant that's been running since 1998."}
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
                ? "Le support fournisseur, c'est un ticket. Vous recevez un rappel en 72 heures. Entre-temps, votre ligne de production est arrêtée et votre chef d'équipe est au téléphone avec les achats pour trouver un technicien de calibration."
                : locale === "es"
                ? "El soporte del proveedor es un ticket. Recibe una devolución de llamada en 72 horas. Mientras tanto, su línea de producción está parada y su jefe de turno está al teléfono con compras intentando encontrar un técnico de calibración."
                : "Vendor support means a ticket. You get a callback in 72 hours. Meanwhile, your production line is down and your shift manager is on the phone with procurement trying to find a calibration tech."}
            </p>
          </motion.div>
          <div>
            {[
              {
                stat: "±0.001mm",
                label: locale === "fr" ? "l'écart entre la fiche technique et la réalité en conditions difficiles" : locale === "es" ? "la brecha entre la ficha técnica y la realidad en condiciones severas de campo" : "the gap between spec and reality in harsh field conditions",
              },
              {
                stat: "72 hrs",
                label: locale === "fr" ? "temps de réponse moyen du fournisseur quand votre ligne est arrêtée" : locale === "es" ? "tiempo de respuesta promedio del proveedor cuando su línea está parada" : "average vendor response time when your line is down",
              },
              {
                stat: "60%",
                label: locale === "fr" ? "des défaillances d'instruments attribuées à une mauvaise application" : locale === "es" ? "de las fallas de instrumentos atribuidas a una aplicación incorrecta" : "of instrument failures attributed to improper application",
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
          padding: isMobile ? "48px 20px" : "100px 48px",
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
            ? "Nous fabriquons les instruments que d'autres entreprises revendent simplement. Chaque unité calibrée dans notre propre laboratoire. Chaque tolérance vérifiée par des ingénieurs qui utilisent ces outils sur le terrain chaque semaine. Personne d'autre ne contrôle cette chaîne."
            : locale === "es"
            ? "Fabricamos los instrumentos que otras empresas simplemente revenden. Cada unidad calibrada en nuestro propio laboratorio. Cada tolerancia verificada por ingenieros que usan estas herramientas en el campo cada semana. Nadie más controla esa cadena."
            : "We manufacture the instruments other companies just resell. Every unit calibrated in our own lab. Every tolerance verified by engineers who use these tools in the field every week. Nobody else controls that chain."}
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
          {locale === "fr"
            ? "Quand un ingénieur de Westinghouse signale une lecture qui n'a pas de sens, nous ne soumettons pas un ticket de support. Nous envoyons l'ingénieur qui a conçu ce protocole de mesure."
            : locale === "es"
            ? "Cuando un ingeniero de Westinghouse reporta una lectura que no tiene sentido, no abrimos un ticket de soporte. Enviamos al ingeniero que diseñó ese protocolo de medición."
            : "When a Westinghouse engineer reports a reading that doesn't make sense, we don't raise a support ticket. We send the engineer who designed that measurement protocol."}
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
                ? "Nos instruments ne sont que le début."
                : locale === "es"
                ? "Nuestros instrumentos son solo el comienzo."
                : "Our instruments are just the beginning."}
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            {locale === "fr"
              ? "Nous construisons le matériel. Mais nous construisons aussi le logiciel qui le lit, l'IA qui apprend de lui et les programmes de maintenance qui en dépendent. Un seul fournisseur pour le cycle de vie complet."
              : locale === "es"
              ? "Construimos el hardware. Pero también construimos el software que lo lee, la IA que aprende de él y los programas de mantenimiento que dependen de él. Un solo proveedor para el ciclo de vida completo."
              : "We build the hardware. But we also build the software that reads it, the AI that learns from it, and the maintenance programs that depend on it. One vendor for the full lifecycle."}
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}
          >
            {[
              {
                name: locale === "fr" ? "Maintenance Prédictive" : locale === "es" ? "Mantenimiento Predictivo" : "Predictive Maintenance",
                desc: locale === "fr" ? "Nos instruments sur le terrain, nos ingénieurs qui lisent les données — un programme de MP qui connaît déjà votre équipement." : locale === "es" ? "Nuestros instrumentos en el campo, nuestros ingenieros leyendo los datos — un programa de MP que ya conoce su equipo." : "Our instruments in the field, our engineers reading the data — a PM program that already knows your equipment.",
                href: "/divisions/predictive-maintenance",
              },
              {
                name: locale === "fr" ? "Développement Logiciel" : locale === "es" ? "Desarrollo de Software" : "Software Development",
                desc: locale === "fr" ? "Plateformes personnalisées construites pour ingérer et visualiser les données de nos instruments sans maux de tête middleware." : locale === "es" ? "Plataformas personalizadas construidas para ingerir y visualizar datos de nuestros instrumentos sin dolores de cabeza de middleware." : "Custom platforms built to ingest and visualize data from our instruments without middleware headaches.",
                href: "/divisions/software-development",
              },
              {
                name: locale === "fr" ? "Construction Intelligente" : locale === "es" ? "Construcción Inteligente" : "Intelligent Construction",
                desc: locale === "fr" ? "Capteurs et instruments déployés dans les bâtiments et infrastructures — connectés à votre GTC dès le premier jour." : locale === "es" ? "Sensores e instrumentos desplegados dentro de edificios e infraestructura — conectados a su BMS desde el primer día." : "Sensors and instruments deployed inside buildings and infrastructure — connected to your BMS from day one.",
                href: "/divisions/intelligent-construction",
              },
              {
                name: locale === "fr" ? "Conseil en IA" : locale === "es" ? "Consultoría de IA" : "AI Consulting",
                desc: locale === "fr" ? "Modèles entraînés sur les données que génèrent nos instruments — parce que l'ensemble d'entraînement n'est bon que si le matériel derrière l'est aussi." : locale === "es" ? "Modelos entrenados con los datos que generan nuestros instrumentos — porque el conjunto de entrenamiento es tan bueno como el hardware detrás de él." : "Models trained on the data our instruments generate — because the training set is only as good as the hardware behind it.",
                href: "/divisions/ai-consulting",
              },
            ].map((d) => (
              <motion.a
                key={d.name}
                href={d.href}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { type: "spring", stiffness: 90, damping: 14 },
                  },
                }}
                style={{
                  textDecoration: "none", padding: 24, borderRadius: 16,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.01)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.15)"; el.style.transform = "translateY(-2px)"; el.style.background = "rgba(255,255,255,0.06)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2), 0 0 12px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.02)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.transform = ""; el.style.background = "rgba(255,255,255,0.03)"; el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.01)"; }}
              >
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 8 }}>{d.name}</h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{d.desc}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Production Capabilities */}
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
            {locale === "fr" ? "Ce que Nous Fabriquons" : locale === "es" ? "Lo que Fabricamos" : "What We Manufacture"}
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
            {locale === "fr" ? "Instruments qui Performent quand Ça Compte" : locale === "es" ? "Instrumentos que Rinden Cuando Importa" : "Instruments That Perform When It Counts"}
          </TextReveal>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13 } },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 20,
          }}
        >
          {capabilities.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { type: "spring", stiffness: 80, damping: 14 },
                },
              }}
              style={{ height: "100%" }}
            >
              <ProdCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SectionDivider />

      {/* Gear visualization */}
      <section
        style={{
          padding: isMobile ? "48px 20px" : "100px 48px",
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
            {locale === "fr" ? "Précision Mécanique" : locale === "es" ? "Precisión Mecánica" : "Mechanical Precision"}
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
            {locale === "fr" ? "Là où les Millièmes de Millimètre Déterminent le Résultat" : locale === "es" ? "Donde las Milésimas de Milímetro Determinan el Resultado" : "Where Thousandths of a Millimetre Determine the Outcome"}
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
            {locale === "fr"
              ? "Chaque instrument que nous fabriquons est calibré par rapport à des références traçables et validé dans les mêmes conditions où il sera utilisé. Pas un laboratoire. Vos conditions."
              : locale === "es"
              ? "Cada instrumento que fabricamos está calibrado contra referencias trazables y validado en las mismas condiciones donde se usará. No un laboratorio. Sus condiciones."
              : "Every instrument we manufacture is calibrated against traceable references and validated in the same conditions where it will be used. Not a lab. Your conditions."}
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
            padding: isMobile ? "48px 20px" : "120px 48px",
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
            {locale === "fr" ? "Précision à l'Échelle" : locale === "es" ? "Precisión a Escala" : "Precision at Scale"}
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
            {locale === "fr" ? "Tolérance CNC tenue au millième, à chaque passe." : locale === "es" ? "Tolerancia CNC mantenida al milésimo, en cada pasada." : "CNC tolerance held to the thousandth, every run."}
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
            {locale === "fr"
              ? "Instruments fabriqués, calibrés et validés dans les mêmes conditions industrielles où ils seront utilisés — pas un environnement de laboratoire contrôlé."
              : locale === "es"
              ? "Instrumentos fabricados, calibrados y validados en las mismas condiciones industriales donde se usarán — no en un entorno de laboratorio controlado."
              : "Instruments manufactured, calibrated, and validated in the same industrial conditions where they will be used — not a controlled lab environment."}
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
            {locale === "fr" ? "Performance — Sur le Terrain" : locale === "es" ? "Rendimiento — En el Campo" : "Performance — In the Field"}
          </p>
        </div>
        <PrecisionMetrics locale={locale} />
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
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "48px 20px" : "120px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
        }}
      >
        <AnimatedGridBg gridSize={72} lineOpacity={0.025} sweepOpacity={0.035} />
        <VerticalCutReveal
          as="h2"
          staggerDuration={0.055}
          spring={{ stiffness: 80, damping: 13 }}
          delay={0.1}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#fff",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            maxWidth: 640,
            position: "relative",
            zIndex: 1,
          }}
        >
          {locale === "fr"
            ? "Si vos instruments ne performent pas sur le terrain, les spécifications n'ont aucune importance."
            : locale === "es"
            ? "Si sus instrumentos no rinden en el campo, las especificaciones no importan."
            : "If your instruments aren't performing in the field, the specs don't matter."}
        </VerticalCutReveal>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 440,
            lineHeight: 1.7,
            position: "relative",
            zIndex: 1,
          }}
        >
          {locale === "fr"
            ? "Approuvé par Westinghouse, Holcim et Siemens Energy. Instruments industriels conçus et validés par les ingénieurs qui les utilisent chaque jour."
            : locale === "es"
            ? "Confiado por Westinghouse, Holcim y Siemens Energy. Instrumentos de grado industrial diseñados y validados por los ingenieros que los usan todos los días."
            : "Trusted by Westinghouse, Holcim, and Siemens Energy. Industrial-grade instruments engineered and validated by the engineers who use them every day."}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Scalez la Précision" : locale === "es" ? "Escale la Precisión" : "Scale Precision"}
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Essai Gratuit" : locale === "es" ? "Prueba Gratuita" : "Start Free Trial"}
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
