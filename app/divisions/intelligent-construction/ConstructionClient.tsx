"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import dynamic from "next/dynamic";

const CraneConstruction = dynamic(() => import("@/components/3d/CraneConstruction"), { ssr: false });

/* ─── Accent color for this division ─── */
const ACCENT = "rgba(160,139,59,0.03)";

/* ─── Diagonal hatching background ─── */
const hatchStyle: React.CSSProperties = {
  backgroundImage: `repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.025) 10px,
    rgba(255,255,255,0.025) 11px
  )`,
};

/* ─── Blueprint grid background ─── */
const blueprintGridStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
  `,
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
};

/* ─── Animated Building Blueprint SVG ─── */
function BlueprintBuilding() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      style={{
        background: "#080a0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "48px 40px",
        maxWidth: 820,
        margin: "0 auto",
        ...blueprintGridStyle,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          fontFamily: "'Outfit', sans-serif",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        DRZ-BLDG-001 — ELEVATION VIEW
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          fontFamily: "'Outfit', sans-serif",
          fontSize: 10,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.15)",
        }}
      >
        REV 3.2
      </div>

      <svg
        viewBox="0 0 700 320"
        style={{ width: "100%", height: "auto", display: "block", marginTop: 16 }}
        fill="none"
      >
        <motion.line
          x1={60} y1={295} x2={640} y2={295}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.rect
          x={150} y={80} width={400} height={215}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.02)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.rect
          x={140} y={72} width={420} height={16}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1}
          fill="rgba(255,255,255,0.03)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {[145, 210, 258].map((y, i) => (
          <motion.line
            key={y}
            x1={150} y1={y} x2={550} y2={y}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay: 1.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {[230, 310, 390, 470].map((x, i) => (
          <motion.line
            key={x}
            x1={x} y1={80} x2={x} y2={295}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay: 2.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {[166, 236, 316, 396, 476].map((x, i) =>
          [92, 118].map((y, j) => (
            <motion.rect
              key={`w1-${i}-${j}`}
              x={x} y={y} width={44} height={30}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1}
              fill="rgba(255,255,255,0.04)"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 2.5 + i * 0.06 + j * 0.04 }}
            />
          ))
        )}
        {[166, 236, 316, 396, 476].map((x, i) =>
          [158, 184].map((y, j) => (
            <motion.rect
              key={`w2-${i}-${j}`}
              x={x} y={y} width={44} height={30}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1}
              fill="rgba(255,255,255,0.04)"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 2.8 + i * 0.06 + j * 0.04 }}
            />
          ))
        )}
        <motion.rect
          x={313} y={245} width={74} height={50}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.03)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        />
        <motion.line
          x1={70} y1={80} x2={70} y2={295}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
        />
        <motion.polygon
          points="70,80 66,92 74,92"
          fill="rgba(255,255,255,0.25)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 4.1 }}
        />
        <motion.polygon
          points="70,295 66,283 74,283"
          fill="rgba(255,255,255,0.25)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 4.1 }}
        />
        <motion.text
          x={55} y={192}
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          fontSize={10}
          fontFamily="'Outfit', sans-serif"
          transform="rotate(-90, 55, 192)"
          letterSpacing="0.08em"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 4.3 }}
        >
          12,400 MM
        </motion.text>
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {[
          { label: "Scale", value: "1:100" },
          { label: "Drawn By", value: "DRZ-ENG" },
          { label: "Date", value: "2026" },
          { label: "Sheet", value: "A-201" },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Capability Card ─── */
interface CapItem {
  title: string;
  desc: string;
}

function CapCard({ item }: { item: CapItem }) {
  return (
    <TiltCard
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: 28,
        height: "100%",
        ...hatchStyle,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0 }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.3)", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.3)", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 4, height: 4, background: "rgba(255,255,255,0.5)", transform: "translate(-50%, -50%) rotate(45deg)" }} />
          </div>
          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              color: "#fff",
              fontWeight: 400,
            }}
          >
            {item.title}
          </h3>
        </div>
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
      </div>
    </TiltCard>
  );
}

/* ─── Stats Row ─── */
interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

function StatsRow({ stats }: { stats: StatItem[] }) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${stats.length}, 1fr)`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "48px 32px",
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
            <CounterSpring target={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} />
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
export default function ConstructionClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[2];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const capabilities: CapItem[] = [
    {
      title: locale === "fr" ? "Systèmes Intelligents qui Survivent à l'Installateur" : locale === "es" ? "Sistemas Inteligentes que Sobreviven al Instalador" : "Smart Systems That Outlast the Installer",
      desc: locale === "fr"
        ? "Plateformes BAS intégrées connectant CVC, éclairage, contrôle d'accès et énergie — documentées et maintenues par la même équipe qui les a construites. Aucun verrouillage propriétaire."
        : locale === "es"
        ? "Plataformas BAS integradas que conectan climatización, iluminación, control de acceso y energía — documentadas y mantenidas por el mismo equipo que las construyó. Sin dependencia de proveedores propietarios."
        : "Integrated BAS platforms connecting HVAC, lighting, access control, and energy — documented and maintained by the same team that built them. No proprietary lock-in.",
    },
    {
      title: locale === "fr" ? "BIM qui Guide la Construction, pas Seulement la Conception" : locale === "es" ? "BIM que Guía la Construcción, no Solo el Diseño" : "BIM That Guides Construction, Not Just Design",
      desc: locale === "fr"
        ? "Flux de travail BIM de la conception à la gestion des installations, avec détection de conflits et planification 4D. Le modèle ne reste pas dans un dossier — il pilote le projet."
        : locale === "es"
        ? "Flujos de trabajo BIM desde el diseño hasta la gestión de instalaciones, con detección de interferencias y programación 4D. El modelo no se queda en una carpeta — dirige el proyecto."
        : "BIM workflows from design through construction and facility management, with clash detection and 4D scheduling. The model doesn't sit in a folder — it runs the project.",
    },
    {
      title: locale === "fr" ? "Réseaux IoT qui Rapportent Vraiment" : locale === "es" ? "Redes IoT que Realmente Reportan" : "IoT Networks That Actually Report",
      desc: locale === "fr"
        ? "Réseaux de capteurs distribués pour la santé structurelle, la qualité environnementale, l'occupation et la maintenance prédictive. Tableaux de bord en temps réel sur lesquels votre équipe peut agir — pas des alertes ignorées."
        : locale === "es"
        ? "Redes de sensores distribuidos para salud estructural, calidad ambiental, ocupación y mantenimiento predictivo. Paneles en tiempo real sobre los que su equipo puede actuar — no alertas que ignoran."
        : "Distributed sensor arrays for structural health, environmental quality, occupancy, and predictive maintenance. Real-time dashboards your team can act on — not alerts they ignore.",
    },
    {
      title: locale === "fr" ? "Économies d'Énergie Visibles sur la Facture" : locale === "es" ? "Ahorros de Energía que Aparecen en la Factura" : "Energy Cuts That Show Up on the Bill",
      desc: locale === "fr"
        ? "Gestion énergétique pilotée par l'IA qui réduit la consommation de 20 à 40% grâce à la prévision de la demande et l'équilibrage de charge dynamique. Nous garantissons la réduction — pas seulement le système."
        : locale === "es"
        ? "Gestión energética impulsada por IA que reduce el consumo en un 20–40% mediante pronóstico de demanda y balanceo dinámico de carga. Garantizamos la reducción — no solo el sistema."
        : "AI-driven energy management that reduces consumption 20–40% through demand forecasting and dynamic load balancing. We guarantee the reduction — not just the system.",
    },
    {
      title: locale === "fr" ? "Sécurité qui ne Repose pas sur la Conformité" : locale === "es" ? "Seguridad que no Depende del Cumplimiento Normativo" : "Safety That Doesn't Rely on Compliance",
      desc: locale === "fr"
        ? "Vision par ordinateur et systèmes portables détectant les violations d'EPI, les proximités dangereuses et les conditions hazardeuses en temps réel. Avant l'incident, pas après le rapport."
        : locale === "es"
        ? "Visión artificial y sistemas portátiles que detectan violaciones de EPP, proximidad peligrosa y condiciones de riesgo en tiempo real. Antes del incidente, no después del informe."
        : "Computer vision and wearable systems detecting PPE violations, unsafe proximity, and hazardous conditions in real time. Before the incident, not after the report.",
    },
    {
      title: locale === "fr" ? "Contrôle Qualité à Chaque Étape" : locale === "es" ? "Control de Calidad en Cada Etapa" : "Quality Control at Every Stage",
      desc: locale === "fr"
        ? "Inspection automatisée avec photogrammétrie, relevés par drone et détection de défauts IA selon les spécifications BIM. Les défauts détectés sur site coûtent 1/100e des défauts détectés après occupation."
        : locale === "es"
        ? "Inspección automatizada con fotogrametría, levantamientos con drones y detección de defectos por IA según especificaciones BIM. Los defectos detectados en obra cuestan 1/100 de los detectados post-ocupación."
        : "Automated inspection with photogrammetry, drone surveys, and AI defect detection against BIM specs. Defects caught on-site cost 1/100th of defects caught post-occupancy.",
    },
  ];

  const stats: StatItem[] = [
    { value: 150, suffix: "+", label: locale === "fr" ? "Projets Réalisés" : locale === "es" ? "Proyectos Completados" : "Projects Completed" },
    { value: 35, suffix: "%", label: locale === "fr" ? "Énergie Réduite" : locale === "es" ? "Energía Reducida" : "Energy Reduced" },
    { value: 98, suffix: "%", label: locale === "fr" ? "Livraison à Temps" : locale === "es" ? "Entrega a Tiempo" : "On-Time Delivery" },
    { value: 2, suffix: "M+", label: locale === "fr" ? "m² Instrumentés" : locale === "es" ? "m² Instrumentados" : "Sqm Instrumented" },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle={
          locale === "fr"
            ? "Votre bâtiment a été conçu en 2005. Les coûts énergétiques ont triplé. Votre GTC ne communique toujours pas avec votre CVC."
            : locale === "es"
            ? "Su edificio fue diseñado en 2005. Los costos de energía se han triplicado. Su BMS todavía no puede comunicarse con su climatización."
            : "Your building was designed in 2005. Energy costs have tripled. Your BMS still can't talk to your HVAC."
        }
        pill="03 — Division"
        showMesh
      />

      <SectionDivider />

      {/* Velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          {locale === "fr"
            ? "Bâtiment Intelligent — Intégration BIM — Capteurs IoT — Optimisation Énergétique — Surveillance Sécurité — Contrôle Qualité"
            : locale === "es"
            ? "Edificio Inteligente — Integración BIM — Sensores IoT — Optimización Energética — Monitoreo de Seguridad — Control de Calidad"
            : "Smart Building — BIM Integration — IoT Sensors — Energy Optimization — Safety Monitoring — Quality Control"}
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
                ? "Chaque entrepreneur promet des \"bâtiments intelligents\". Puis ils partent et personne ne peut mettre à jour le firmware."
                : locale === "es"
                ? "Cada contratista promete \"edificios inteligentes\". Luego se van y nadie puede actualizar el firmware."
                : "Every contractor promises \"smart buildings.\" Then they leave and nobody can update the firmware."}
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
                ? "Vous avez acheté des capteurs d'un fournisseur, un tableau de bord d'un autre et un GTC d'un troisième. Ils ne communiquent pas entre eux. Votre gestionnaire d'énergie exporte des fichiers CSV à la fin de chaque mois et personne ne les regarde."
                : locale === "es"
                ? "Compró sensores de un proveedor, un panel de otro y un BMS de un tercero. No se comunican entre sí. Su gerente de energía exporta archivos CSV al final de cada mes y nadie los mira."
                : "You bought sensors from one vendor, a dashboard from another, and a BMS from a third. They don't talk to each other. Your energy manager exports CSV files at the end of every month and nobody looks at them."}
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
                ? "Quand la climatisation tombe en panne à 2h du matin, vous recevez un appel — pas une alerte. Quand les coûts d'énergie explosent, vous examinez les factures — pas les données en temps réel. Votre bâtiment a le matériel pour être intelligent. Il lui manque juste le logiciel pour agir."
                : locale === "es"
                ? "Cuando la climatización falla a las 2 AM, recibe una llamada — no una alerta. Cuando los costos de energía se disparan, revisa facturas — no datos en tiempo real. Su edificio tiene el hardware para ser inteligente. Solo le falta el software para actuar."
                : "When the HVAC fails at 2 AM, you get a call — not an alert. When energy costs spike, you review invoices — not real-time data. Your building has the hardware for intelligence. It just doesn't have the software to act on it."}
            </p>
          </motion.div>
          <div>
            {[
              {
                stat: "30%",
                label: locale === "fr" ? "d'énergie gaspillée dans les bâtiments commerciaux avec un ancien GTC" : locale === "es" ? "de energía desperdiciada en edificios comerciales con BMS obsoleto" : "of energy wasted in commercial buildings with legacy BMS",
              },
              {
                stat: "5 vendors",
                label: locale === "fr" ? "nombre moyen d'entrepreneurs dans un projet de bâtiment 'intelligent'" : locale === "es" ? "número promedio de contratistas en un proyecto de edificio 'inteligente'" : "average number of contractors in a 'smart' building project",
              },
              {
                stat: "$2.4M",
                label: locale === "fr" ? "coût moyen d'un défaut post-occupation par projet commercial" : locale === "es" ? "costo promedio de un defecto post-ocupación por proyecto comercial" : "average cost of a post-occupancy defect per commercial project",
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
            ? "Nous n'installons pas seulement des systèmes intelligents. Nous comprenons la physique du bâtiment — ponts thermiques, performance de façade, modélisation énergétique. La technologie est la partie facile. Savoir où la mettre, c'est ce qui demande de l'expérience."
            : locale === "es"
            ? "No solo instalamos sistemas inteligentes. Entendemos la ciencia del edificio — puentes térmicos, rendimiento de fachada, modelado energético. La tecnología es la parte fácil. Saber dónde colocarla es lo que requiere experiencia."
            : "We don't just install smart systems. We understand building science — thermal bridging, façade performance, energy modeling. The technology is the easy part. Knowing where to put it is what takes experience."}
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
            ? "Quand quelque chose ne fonctionne pas à 2h du matin, il y a un seul numéro à appeler. Une équipe qui comprend le bâtiment, pas seulement le produit qu'elle vous a vendu."
            : locale === "es"
            ? "Cuando algo no funciona a las 2 AM, hay un solo número al que llamar. Un equipo que entiende el edificio, no solo el producto que le vendió."
            : "When something doesn't work at 2 AM, there's one number to call. A team that understands the building, not just the product they sold you."}
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
                ? "Un bâtiment intelligent n'est intelligent que comme son écosystème."
                : locale === "es"
                ? "Un edificio inteligente es tan inteligente como su ecosistema."
                : "A smart building is only as smart as its ecosystem."}
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            {locale === "fr"
              ? "Les capteurs dans vos murs génèrent des données. Nous pouvons construire le logiciel pour les analyser, fabriquer les instruments pour les étendre et déployer l'IA pour les optimiser. Mais seulement si vous en avez besoin."
              : locale === "es"
              ? "Los sensores en sus paredes generan datos. Podemos construir el software para analizarlos, fabricar los instrumentos para extenderlos y desplegar la IA para optimizarlos. Pero solo si lo necesita."
              : "The sensors in your walls generate data. We can build the software to analyze it, manufacture the instruments to extend it, and deploy the AI to optimize it. But only if you need it."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {[
              {
                name: locale === "fr" ? "Maintenance Prédictive" : locale === "es" ? "Mantenimiento Predictivo" : "Predictive Maintenance",
                desc: locale === "fr" ? "Programmes de surveillance continue pour les systèmes mécaniques et électriques de votre bâtiment — avant l'appel à 2h du matin." : locale === "es" ? "Programas de monitoreo continuo para los sistemas mecánicos y eléctricos de su edificio — antes de la llamada a las 2 AM." : "Continuous monitoring programs for your building's mechanical and electrical systems — before the 2 AM call.",
                href: "/divisions/predictive-maintenance",
              },
              {
                name: locale === "fr" ? "Développement Logiciel" : locale === "es" ? "Desarrollo de Software" : "Software Development",
                desc: locale === "fr" ? "Plateformes personnalisées qui lisent les données de votre bâtiment et les transforment en décisions sur lesquelles votre équipe peut agir." : locale === "es" ? "Plataformas personalizadas que leen los datos de su edificio y los convierten en decisiones sobre las que su equipo de instalaciones puede actuar." : "Custom platforms that read your building data and turn it into decisions your facilities team can act on.",
                href: "/divisions/software-development",
              },
              {
                name: locale === "fr" ? "Fabrication Industrielle" : locale === "es" ? "Manufactura Industrial" : "Industrial Manufacturing",
                desc: locale === "fr" ? "Capteurs et instruments de précision conçus spécifiquement pour la surveillance structurelle et environnementale." : locale === "es" ? "Sensores e instrumentos de precisión construidos específicamente para monitoreo estructural y ambiental." : "Precision sensors and instruments purpose-built for structural and environmental monitoring.",
                href: "/divisions/industrial-manufacturing",
              },
              {
                name: locale === "fr" ? "Conseil en IA" : locale === "es" ? "Consultoría de IA" : "AI Consulting",
                desc: locale === "fr" ? "Modèles de prévision de la demande et de détection d'anomalies entraînés sur les patterns réels d'énergie et d'occupation de votre bâtiment." : locale === "es" ? "Modelos de pronóstico de demanda y detección de anomalías entrenados con los patrones reales de energía y ocupación de su edificio." : "Demand forecasting and anomaly detection models trained on your building's actual energy and occupancy patterns.",
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

      {/* Capabilities Grid */}
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
            {locale === "fr" ? "Ce que Nous Livrons" : locale === "es" ? "Lo que Entregamos" : "What We Deliver"}
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
            {locale === "fr" ? "Des Bâtiments qui Deviennent Plus Intelligents avec le Temps" : locale === "es" ? "Edificios que se Vuelven más Inteligentes con el Tiempo" : "Buildings That Get Smarter Over Time"}
          </TextReveal>
        </div>
        <StaggerGrid columns={3} gap={20}>
          {capabilities.map((item) => (
            <CapCard key={item.title} item={item} />
          ))}
        </StaggerGrid>
      </section>

      <SectionDivider />

      {/* Blueprint section */}
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
            {locale === "fr" ? "Documentation Technique" : locale === "es" ? "Documentación Técnica" : "Technical Documentation"}
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
            {locale === "fr" ? "Chaque Système, Documenté pour Durer" : locale === "es" ? "Cada Sistema, Documentado para Durar" : "Every System, Documented to Last"}
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
              ? "Nous remettons le firmware, les schémas et les runbooks. Votre équipe de facility management peut mettre à jour, étendre et maintenir — sans nous appeler d'abord."
              : locale === "es"
              ? "Entregamos el firmware, los esquemas y los runbooks. Su equipo de instalaciones puede actualizar, extender y mantener — sin llamarnos primero."
              : "We hand over the firmware, the schemas, and the runbooks. Your facility team can update, extend, and maintain — without calling us first."}
          </p>
        </div>
        <BlueprintBuilding />
      </section>

      {/* CraneConstruction as full-section background */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "80vh",
          background: "#080a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 3D Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }}>
          <CraneConstruction style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
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
            {locale === "fr" ? "Construction en Action" : locale === "es" ? "Construcción en Acción" : "Construction in Action"}
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
            {locale === "fr" ? "Ingénierie de précision depuis les fondations." : locale === "es" ? "Ingeniería de precisión desde los cimientos." : "Precision engineering from the ground up."}
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
              ? "Détection de conflits BIM en temps réel, planification 4D et inspection qualité guidée par IA — actifs du premier coup de pelle jusqu'à la remise des clés."
              : locale === "es"
              ? "Detección de interferencias BIM en tiempo real, programación 4D e inspección de calidad guiada por IA — activos desde el inicio de obra hasta la entrega."
              : "Real-time BIM clash detection, 4D scheduling, and AI-guided quality inspection active from groundbreak through handover."}
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Project Stats — results framed */}
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
            {locale === "fr" ? "Résultats — Pas des Rendus" : locale === "es" ? "Resultados — No Renders" : "Results — Not Renders"}
          </p>
        </div>
        <StatsRow stats={stats} />
      </section>

      <SectionDivider />

      {/* Clients marquee */}
      <div style={{ padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={0.15}>
          Smart Buildings — Facade Systems — Advanced Materials — Sustainable Construction — IoT Integration
        </ScrollVelocityText>
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
          {locale === "fr"
            ? "Votre bâtiment génère déjà des données. Vous ne pouvez tout simplement pas encore les lire."
            : locale === "es"
            ? "Su edificio ya está generando datos. Simplemente todavía no puede leerlos."
            : "Your building is already generating data. You just can't read it yet."}
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
          {locale === "fr"
            ? "Un audit d'intégration. Nous vous montrerons exactement ce que vos systèmes actuels manquent et à quoi ressemble une réduction d'énergie de 35% pour votre bâtiment spécifique."
            : locale === "es"
            ? "Una auditoría de integración. Le mostraremos exactamente qué les falta a sus sistemas actuales y cómo se ve una reducción del 35% en energía para su edificio específico."
            : "One integration audit. We'll show you exactly what your existing systems are missing and what 35% energy reduction looks like for your specific building."}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Construisez Plus Intelligent" : locale === "es" ? "Construya Más Inteligente" : "Build Smarter"}
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Essai Gratuit" : locale === "es" ? "Prueba Gratuita" : "Start Free Trial"}
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
