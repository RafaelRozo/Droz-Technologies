"use client";

import { useRef, useState, useEffect } from "react";
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
import VerticalCutReveal from "@/components/animations/VerticalCutReveal";
import AnimatedGridBg from "@/components/animations/AnimatedGridBg";
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
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-40px" }}
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
export default function SoftwareClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[1];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: locale === "fr" ? "Découverte — Nous Cartographions le Vrai Problème" : locale === "es" ? "Descubrimiento — Mapeamos el Problema Real" : "Discovery — We Map the Real Problem",
      desc: locale === "fr"
        ? "Pas un appel Zoom avec votre responsable informatique. Nous parlons aux personnes qui utilisent réellement le système — finance, opérations, équipes terrain — et nous cartographions chaque point de friction. Nous définissons les critères de succès en résultats business, pas en listes de fonctionnalités."
        : locale === "es"
        ? "No una llamada con su gerente de TI. Hablamos con las personas que realmente usan el sistema — finanzas, operaciones, equipos de campo — y mapeamos cada punto de fricción. Definimos los criterios de éxito en resultados de negocio, no en listas de funcionalidades."
        : "Not a Zoom call with your IT manager. We talk to the people who actually use the system — finance, ops, field teams — and map every friction point. We define success criteria in business outcomes, not feature lists.",
    },
    {
      number: "02",
      title: locale === "fr" ? "Architecture — Conçue pour Votre Infrastructure" : locale === "es" ? "Arquitectura — Diseñada para Su Stack" : "Architecture — Built for Your Stack",
      desc: locale === "fr"
        ? "Architecture système conçue autour de votre infrastructure existante. Aucun remplacement forcé. Nous documentons chaque décision pour que votre équipe en soit propriétaire bien après notre départ."
        : locale === "es"
        ? "Arquitectura de sistema diseñada en torno a su infraestructura existente. Sin reemplazos forzados. Documentamos cada decisión para que su equipo la tenga bajo control mucho después de que terminemos."
        : "System architecture designed around your existing infrastructure. No rip-and-replace. We document every decision so your team owns it long after we're done.",
    },
    {
      number: "03",
      title: locale === "fr" ? "Développement — Livré en Semaines" : locale === "es" ? "Desarrollo — Entregado en Semanas" : "Development — Shipped in Weeks",
      desc: locale === "fr"
        ? "Sprints agiles avec des livrables hebdomadaires que vos parties prenantes peuvent réellement utiliser. Un code propre, typé et testé — pas un diaporama de 60 slides sur ce qu'on va construire."
        : locale === "es"
        ? "Sprints ágiles con entregables semanales que sus interesados pueden usar de verdad. Código limpio, tipado y probado — no una presentación de 60 diapositivas sobre lo que vamos a construir."
        : "Agile sprints with weekly deliverables your stakeholders can actually use. Clean, typed, tested code — not a 60-slide deck about what we're about to build.",
    },
    {
      number: "04",
      title: locale === "fr" ? "Tests — On le Casse Avant Vous" : locale === "es" ? "Pruebas — Lo Rompemos Antes que Usted" : "Testing — Breaking It Before You Do",
      desc: locale === "fr"
        ? "Suites de tests automatisés unitaires, d'intégration et E2E. Nous simulons vos pires scénarios de production en staging pour qu'ils n'arrivent pas en direct."
        : locale === "es"
        ? "Suites de pruebas automatizadas unitarias, de integración y E2E. Simulamos sus peores escenarios de producción en staging para que no ocurran en vivo."
        : "Automated unit, integration, and E2E test suites. We simulate your worst production scenarios in staging so they don't happen live.",
    },
    {
      number: "05",
      title: locale === "fr" ? "Déploiement — Disponibilité Sans Excuses" : locale === "es" ? "Despliegue — Disponibilidad Sin Excusas" : "Deployment — Zero Excuses Uptime",
      desc: locale === "fr"
        ? "Pipelines CI/CD, déploiements sans interruption et surveillance 24h/24. Nous ne livrons pas et ne disparaissons pas. Nous restons jusqu'à ce que le SLA soit blindé."
        : locale === "es"
        ? "Pipelines CI/CD, despliegues sin tiempo de inactividad y monitoreo 24/7. No entregamos y desaparecemos. Nos quedamos hasta que el SLA sea a prueba de balas."
        : "CI/CD pipelines, zero-downtime deployments, and 24/7 monitoring. We don't hand off and disappear. We stay until the SLA is bulletproof.",
    },
  ];

  const techItems: TechItem[] = [
    {
      label: locale === "fr" ? "Frontend que Vos Équipes Utilisent Vraiment" : locale === "es" ? "Frontend que Sus Equipos Realmente Usan" : "Frontend That Stakeholders Actually Use",
      desc: locale === "fr"
        ? "Interfaces réactives conçues pour la façon dont vos équipes travaillent réellement — rapports terrain, tableaux de bord exécutifs, saisie de données à fort volume. Pas conçues pour une démo produit."
        : locale === "es"
        ? "Interfaces reactivas construidas para la forma en que sus equipos realmente trabajan — reportes de campo, paneles ejecutivos, ingreso masivo de datos. No diseñadas para una demo de producto."
        : "Reactive UIs built for how your teams actually work — field reporting, executive dashboards, high-volume data entry. Not designed for a product demo.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      label: locale === "fr" ? "Backend qui Gère Votre Charge" : locale === "es" ? "Backend que Soporta Su Carga" : "Backend That Handles Your Load",
      desc: locale === "fr"
        ? "API évolutives et architectures événementielles testées sur votre volume de données réel — pas des benchmarks synthétiques. Sécurité de niveau gouvernemental intégrée dès le premier jour."
        : locale === "es"
        ? "APIs escalables y arquitecturas orientadas a eventos probadas contra su volumen de datos real — no benchmarks sintéticos. Seguridad de grado gubernamental incorporada desde el primer día."
        : "Scalable APIs and event-driven architectures tested against your actual data volume — not synthetic benchmarks. Government-grade security baked in from day one.",
      tags: ["Node.js", "Go", "PostgreSQL", "Redis"],
    },
    {
      label: locale === "fr" ? "Mobile qui Fonctionne Hors Ligne" : locale === "es" ? "Mobile que Funciona Sin Conexión" : "Mobile That Works Offline",
      desc: locale === "fr"
        ? "Applications multiplateformes avec synchronisation locale pour les équipes qui ne peuvent pas toujours compter sur la connectivité. Vos équipes accèdent aux données dont elles ont besoin, quelle que soit la connexion."
        : locale === "es"
        ? "Aplicaciones multiplataforma con sincronización local para equipos que no siempre pueden depender de la conectividad. Su personal obtiene los datos que necesita independientemente de las condiciones de red."
        : "Cross-platform apps with local sync for teams that can't always rely on connectivity. Your people get the data they need regardless of network conditions.",
      tags: ["React Native", "Expo", "Swift", "Kotlin"],
    },
    {
      label: locale === "fr" ? "Cloud qui Coûte Moins avec le Temps" : locale === "es" ? "Nube que Cuesta Menos con el Tiempo" : "Cloud That Costs Less Over Time",
      desc: locale === "fr"
        ? "Infrastructure multi-cloud avec mise à l'échelle automatique et optimisation des coûts intégrés dès le premier jour. Pas retrofittée après votre première facture AWS."
        : locale === "es"
        ? "Infraestructura multi-nube con auto-escalado y optimización de costos incorporados desde el primer día. No añadida después de su primera factura de AWS."
        : "Multi-cloud infrastructure with auto-scaling and cost optimization baked in from day one. Not retrofitted after your first AWS bill.",
      tags: ["AWS", "GCP", "Azure", "Terraform"],
    },
    {
      label: locale === "fr" ? "DevOps qui Livre, pas qui Bloque" : locale === "es" ? "DevOps que Entrega, no que Frena" : "DevOps That Ships, Not Stalls",
      desc: locale === "fr"
        ? "Pipelines automatisés du commit à la production avec une observabilité complète. Votre équipe fait des merges. La plateforme gère le reste."
        : locale === "es"
        ? "Pipelines automatizados de commit a producción con observabilidad completa. Su equipo hace merges. La plataforma se encarga del resto."
        : "Automated pipelines from commit to production with full observability. Your team merges. The platform handles the rest.",
      tags: ["Docker", "Kubernetes", "GitHub Actions", "Grafana"],
    },
    {
      label: locale === "fr" ? "IA qui Fonctionne sur Vos Données" : locale === "es" ? "IA que Funciona con Sus Datos" : "AI That Works on Your Data",
      desc: locale === "fr"
        ? "Entraînement et inférence de modèles conçus pour des données d'entreprise réelles et désordonnées — pas des ensembles de données de démonstration nettoyés. Une automatisation qui réduit vraiment la charge de travail."
        : locale === "es"
        ? "Entrenamiento e inferencia de modelos construidos para datos empresariales reales y desordenados — no conjuntos de datos de demo limpios. Automatización que realmente reduce la carga operativa."
        : "Model training and inference built for messy, real-world enterprise data — not cleaned-up demo datasets. Automation that actually reduces headcount, not just headaches.",
      tags: ["PyTorch", "OpenAI", "LangChain", "MLflow"],
    },
  ];

  const displayMetrics: Metric[] = [
    { value: 40, suffix: "+", prefix: "", label: locale === "fr" ? "Plateformes Livrées" : locale === "es" ? "Plataformas Entregadas" : "Platforms Shipped" },
    { value: 99, suffix: ".99%", prefix: "", label: locale === "fr" ? "Disponibilité" : locale === "es" ? "Disponibilidad" : "Uptime" },
    { value: 4, suffix: " weeks", prefix: "", label: locale === "fr" ? "Délai Moyen de Livraison" : locale === "es" ? "Tiempo Promedio de Entrega" : "Avg Deploy Time" },
    { value: 12, suffix: "", prefix: "", label: locale === "fr" ? "Contrats Gouvernementaux" : locale === "es" ? "Contratos Gubernamentales" : "Govt Contracts" },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle={
          locale === "fr"
            ? "Votre dernier projet logiciel a pris 18 mois. Il ne peut toujours pas générer le rapport dont votre DG a besoin."
            : locale === "es"
            ? "Su último proyecto de software tardó 18 meses. Todavía no puede generar el informe que su CFO necesita."
            : "Your last software project took 18 months. It still can't generate the report your CFO needs."
        }
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
              {locale === "fr" ? "On vous a vendu des feuilles de route, pas des résultats." : locale === "es" ? "Le han vendido hojas de ruta, no resultados." : "You've been sold roadmaps, not results."}
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
                ? "Votre dernière plateforme a pris 18 mois et trois prestataires. Elle ne peut toujours pas générer le rapport dont votre DG a besoin. L'agence qui l'a construite n'a jamais parlé aux personnes qui l'utilisent quotidiennement. Ils ont livré une démo. Pas un produit."
                : locale === "es"
                ? "Su última plataforma tardó 18 meses y tres proveedores. Todavía no puede generar el informe que su CFO necesita realmente. La agencia que la construyó nunca habló con las personas que la usan a diario. Entregaron una demo. No un producto."
                : "Your last platform took 18 months and three vendors. It still can't generate the report your CFO actually needs. The agency that built it has never talked to the people who use it daily. They delivered a demo. Not a product."}
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
                ? "Votre équipe financière a créé un contournement dans Excel. Votre équipe opérationnelle fait des captures d'écran pour envoyer des données par e-mail. Et la fonctionnalité demandée par votre DG au lancement est \"dans la feuille de route\" — Q4, probablement l'année prochaine."
                : locale === "es"
                ? "Su equipo de finanzas construyó un workaround en Excel. Su equipo de operaciones hace capturas de pantalla para enviar datos por correo. Y la funcionalidad que pidió su COO en el lanzamiento está \"en la hoja de ruta\" — Q4, probablemente el próximo año."
                : "Your finance team built a workaround in Excel. Your ops team screenshots data to send it by email. And the feature your COO requested at launch is \"on the roadmap\" — Q4, probably next year."}
            </p>
          </motion.div>
          <div>
            {[
              {
                stat: "68%",
                label: locale === "fr" ? "des projets logiciels dépassent leur délai" : locale === "es" ? "de los proyectos de software superan su plazo" : "of software projects overrun their deadline",
              },
              {
                stat: "1 in 6",
                label: locale === "fr" ? "projets logiciels d'entreprise sont abandonnés" : locale === "es" ? "proyectos de software empresarial son abandonados" : "enterprise software projects are abandoned",
              },
              {
                stat: "18 mo",
                label: locale === "fr" ? "délai moyen avant valeur dans le logiciel industriel" : locale === "es" ? "tiempo promedio al valor en software industrial" : "average time-to-value in industrial software",
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
            ? "Nous n'externalisons pas. Nous ne délocali sons pas. Chaque ligne de code est écrite par des ingénieurs seniors qui livrent en production, pas vers un serveur de staging que personne ne vérifie. Sécurité de niveau gouvernemental. Fiabilité à l'échelle enterprise. Livraison à la vitesse d'une startup."
            : locale === "es"
            ? "No tercerizamos. No trasladamos trabajo al exterior. Cada línea de código la escriben ingenieros senior que entregan a producción, no a un servidor de staging que nadie revisa. Seguridad de grado gubernamental. Confiabilidad a escala empresarial. Velocidad de entrega de startup."
            : "We don't outsource. We don't offshore. Every line of code is written by senior engineers who ship to production, not to a staging server nobody checks. Government-grade security. Enterprise-scale reliability. Startup-speed delivery."}
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
            ? "C'est pourquoi nos clients gouvernementaux nous confient leur infrastructure critique. Pas parce que nous avons fait une meilleure démo — parce que nous avons compris le problème avant d'ouvrir un éditeur de code."
            : locale === "es"
            ? "Por eso nuestros clientes gubernamentales nos confían su infraestructura crítica. No porque dimos una mejor demo — sino porque entendimos el problema antes de abrir un editor de código."
            : "That's why our government clients trust us with critical infrastructure. Not because we gave a better demo — because we understood the problem before we opened a code editor."}
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
                ? "Votre logiciel n'existe pas dans le vide."
                : locale === "es"
                ? "Su software no existe en el vacío."
                : "Your software doesn't exist in a vacuum."}
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            {locale === "fr"
              ? "Lorsque votre plateforme d'entreprise doit ingérer des données de capteurs, contrôler des systèmes de bâtiment ou alimenter des modèles d'IA — nous ne vous renvoyons pas vers un partenaire. Nous marchons dans le couloir."
              : locale === "es"
              ? "Cuando su plataforma empresarial necesita ingerir datos de sensores, controlar sistemas de edificios o alimentar modelos de IA — no lo remitimos a un socio. Caminamos por el pasillo."
              : "When your enterprise platform needs to ingest sensor data, control building systems, or feed AI models — we don't hand you off to a partner. We walk down the hall."}
          </p>
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}
          >
            {[
              {
                name: locale === "fr" ? "Maintenance Prédictive" : locale === "es" ? "Mantenimiento Predictivo" : "Predictive Maintenance",
                desc: locale === "fr" ? "Données de capteurs directement dans votre tableau de bord — sans exports CSV, sans ingestion manuelle." : locale === "es" ? "Datos de sensores fluyendo directamente a su panel — sin exportaciones CSV, sin ingestión manual." : "Sensor data flowing directly into your dashboard — no CSV exports, no manual ingestion.",
                href: "/divisions/predictive-maintenance",
              },
              {
                name: locale === "fr" ? "Construction Intelligente" : locale === "es" ? "Construcción Inteligente" : "Intelligent Construction",
                desc: locale === "fr" ? "Systèmes IoT et BMS avec des API que votre plateforme peut lire et sur lesquelles elle peut agir." : locale === "es" ? "Sistemas IoT de edificios y BMS con APIs que su plataforma puede leer y sobre las que puede actuar." : "Building IoT and BMS systems with APIs your platform can read and act on.",
                href: "/divisions/intelligent-construction",
              },
              {
                name: locale === "fr" ? "Fabrication Industrielle" : locale === "es" ? "Manufactura Industrial" : "Industrial Manufacturing",
                desc: locale === "fr" ? "API d'instruments et protocoles de données auxquels votre logiciel se connecte dès le premier jour." : locale === "es" ? "APIs de instrumentos y protocolos de datos a los que su software se conecta desde el primer día." : "Instrument APIs and data protocols your software connects to on day one.",
                href: "/divisions/industrial-manufacturing",
              },
              {
                name: locale === "fr" ? "Conseil en IA" : locale === "es" ? "Consultoría de IA" : "AI Consulting",
                desc: locale === "fr" ? "Modèles ML entraînés et déployés dans votre produit — pas remis comme un service séparé." : locale === "es" ? "Modelos de ML entrenados y desplegados dentro de su producto — no entregados como un servicio separado." : "ML models trained and deployed inside your product — not handed off as a separate service.",
                href: "/divisions/ai-consulting",
              },
            ].map((d, i) => (
              <motion.a key={d.name} href={d.href}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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

      {/* Process Section */}
      <section style={{ padding: isMobile ? "48px 20px" : "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
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
            {locale === "fr" ? "Comment Nous Livrons" : locale === "es" ? "Cómo Entregamos" : "How We Ship"}
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
            {locale === "fr" ? "Du Lancement à la Production en Quelques Semaines" : locale === "es" ? "Del Inicio a Producción en Semanas" : "From Kickoff to Production in Weeks"}
          </TextReveal>
        </div>
        <ProcessTimeline steps={processSteps} />
      </section>

      <SectionDivider />

      {/* Tech Capabilities */}
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
            {locale === "fr" ? "Logiciels Conçus pour l'Entreprise et le Gouvernement" : locale === "es" ? "Software Construido para Escala Empresarial y Gubernamental" : "Software Built for Enterprise and Government Scale"}
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
      <motion.section
        initial={{ opacity: 0, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        style={{
          padding: isMobile ? "48px 20px" : "100px 48px",
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
            {locale === "fr" ? "Déploiement Sans Interruption" : locale === "es" ? "Despliegue Sin Tiempo de Inactividad" : "Zero-Downtime Deployment"}
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
            {locale === "fr" ? "Livrez Plus Vite — Sans Casser la Production" : locale === "es" ? "Entregue Más Rápido — Sin Romper Producción" : "Ship Faster — Without Breaking Production"}
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
              ? "Chaque projet est livré avec CI/CD automatisé, vérifications de santé et déploiements sans interruption. Pas en option. En standard."
              : locale === "es"
              ? "Cada proyecto se entrega con CI/CD automatizado, comprobaciones de salud y despliegues sin tiempo de inactividad. No como un complemento. Como el estándar."
              : "Every project ships with automated CI/CD, health checks, and zero-downtime deployments. Not as an add-on. As the baseline."}
          </p>
        </div>
        <TerminalShowcase />
      </motion.section>

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
            {locale === "fr" ? "Infrastructure" : locale === "es" ? "Infraestructura" : "Infrastructure"}
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
            {locale === "fr" ? "Infrastructure de données conçue pour survivre à votre charge." : locale === "es" ? "Infraestructura de datos construida para soportar su carga." : "Data infrastructure built to survive your load."}
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
              ? "Backends évolutifs horizontalement, pipelines événementiels et déploiements multi-cloud conçus pour les volumes de données d'entreprise et les exigences de conformité gouvernementale — pas des démos SaaS."
              : locale === "es"
              ? "Backends escalables horizontalmente, pipelines orientados a eventos y despliegues multi-nube diseñados para volúmenes de datos empresariales y requisitos de cumplimiento gubernamental — no demos SaaS."
              : "Horizontally scalable backends, event-driven pipelines, and multi-cloud deployments designed for enterprise data volumes and government compliance requirements — not SaaS demos."}
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
            {locale === "fr" ? "Résultats — Pas des Délais" : locale === "es" ? "Resultados — No Plazos" : "Results — Not Timelines"}
          </p>
        </div>
        <MetricBar metrics={displayMetrics} />
      </section>

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
        <AnimatedGridBg lineOpacity={0.04} sweepOpacity={0.05} />
        <VerticalCutReveal
          as="h2"
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
          staggerDuration={0.06}
          spring={{ stiffness: 70, damping: 11 }}
        >
          {locale === "fr"
            ? "Vous n'avez pas besoin d'une autre feuille de route. Vous avez besoin d'un logiciel qui fonctionne lundi."
            : locale === "es"
            ? "No necesita otra hoja de ruta. Necesita software que funcione el lunes."
            : "You don't need another roadmap. You need software that works on Monday."}
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
            ? "Des plateformes gouvernementales aux SaaS d'entreprise — nous livrons des logiciels de qualité production avec des ingénieurs seniors sur chaque ligne. En semaines, pas en trimestres."
            : locale === "es"
            ? "Desde plataformas gubernamentales hasta SaaS empresarial — entregamos software de grado producción con ingenieros senior en cada línea. En semanas, no en trimestres."
            : "From government platforms to enterprise SaaS — we deliver production-grade software with senior engineers on every line. In weeks, not quarters."}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Livrez Plus Vite" : locale === "es" ? "Entregue Más Rápido" : "Ship Faster"}
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Essai Gratuit" : locale === "es" ? "Prueba Gratuita" : "Start Free Trial"}
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
