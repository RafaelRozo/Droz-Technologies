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
  SmoothAccordion,
  BlurFade,
  VerticalCutReveal,
  AnimatedGridBg,
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
function MetricsRow({ locale }: { locale: string }) {
  const isMobile = useIsMobile();
  const stats = [
    { value: 200, suffix: "+", label: locale === "fr" ? "Modèles en Production" : locale === "es" ? "Modelos en Producción" : "Models in Production" },
    { value: 96, suffix: ".5%", label: locale === "fr" ? "Précision Moyenne" : locale === "es" ? "Precisión Promedio" : "Avg Accuracy" },
    { value: 10, suffix: "TB+", label: locale === "fr" ? "Données Traitées" : locale === "es" ? "Datos Procesados" : "Data Processed" },
    { value: 90, suffix: " days", label: locale === "fr" ? "Preuve à Production" : locale === "es" ? "Prueba a Producción" : "Proof to Production" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Page ─── */
export default function AIClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);
  const division = t.divisionsGrid[4];

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef as React.RefObject<Element>, { once: true, margin: "-80px" });

  const capabilities: AICapItem[] = [
    {
      label: locale === "fr" ? "Vision par Ordinateur à l'Échelle de Production" : locale === "es" ? "Visión Artificial a Escala de Producción" : "Computer Vision at Production Scale",
      desc: locale === "fr"
        ? "Systèmes de détection d'objets, segmentation d'images et inspection visuelle entraînés sur vos données réelles — pas ImageNet. Déployés dans des environnements de fabrication, construction, logistique et sécurité."
        : locale === "es"
        ? "Sistemas de detección de objetos, segmentación de imágenes e inspección visual entrenados con sus datos reales — no ImageNet. Desplegados en entornos de fabricación, construcción, logística y seguridad."
        : "Object detection, image segmentation, and visual inspection systems trained on your actual data — not ImageNet. Deployed in manufacturing, construction, logistics, and security environments.",
      badge: locale === "fr" ? "Production" : locale === "es" ? "Producción" : "Production",
    },
    {
      label: locale === "fr" ? "NLP pour les Systèmes de Connaissance d'Entreprise" : locale === "es" ? "NLP para Sistemas de Conocimiento Empresarial" : "NLP for Enterprise Knowledge Systems",
      desc: locale === "fr"
        ? "Traitement de documents, recherche sémantique et classification de contrats, rapports, manuels et dossiers réglementaires. Parce que vos connaissances critiques sont enfouies dans des PDF que personne ne peut rechercher."
        : locale === "es"
        ? "Procesamiento de documentos, búsqueda semántica y clasificación de contratos, informes, manuales y expedientes regulatorios. Porque su conocimiento crítico está enterrado en PDFs que nadie puede buscar."
        : "Document processing, semantic search, and classification across contracts, reports, manuals, and regulatory filings. Because your critical knowledge is buried in PDFs nobody can search.",
      badge: locale === "fr" ? "Production" : locale === "es" ? "Producción" : "Production",
    },
    {
      label: locale === "fr" ? "Modèles Prédictifs Entraînés sur la Réalité Désordonnée" : locale === "es" ? "Modelos Predictivos Entrenados en la Realidad Desordenada" : "Predictive Models Trained on Messy Reality",
      desc: locale === "fr"
        ? "Prévision de séries temporelles et détection d'anomalies intégrées à vos pipelines de données existants — ERP, CRM, IoT et systèmes hérités. Nous avons normalisé des données de plateformes qui n'ont pas été mises à jour depuis 2009."
        : locale === "es"
        ? "Pronóstico de series temporales y detección de anomalías integrados con sus pipelines de datos existentes — ERP, CRM, IoT y sistemas legados. Hemos normalizado datos de plataformas que no han sido actualizadas desde 2009."
        : "Time-series forecasting and anomaly detection integrated with your existing data pipelines — ERP, CRM, IoT, and legacy systems. We've normalized data from platforms that haven't been updated since 2009.",
      badge: locale === "fr" ? "Production" : locale === "es" ? "Producción" : "Production",
    },
    {
      label: locale === "fr" ? "Apprentissage Profond à l'Échelle" : locale === "es" ? "Aprendizaje Profundo a Escala" : "Deep Learning at Scale",
      desc: locale === "fr"
        ? "Conception d'architectures neuronales personnalisées, infrastructure d'entraînement et optimisation pour votre domaine spécifique. Pas affiné sur le problème de quelqu'un d'autre. Construit de zéro pour le vôtre."
        : locale === "es"
        ? "Diseño de arquitecturas neuronales personalizadas, infraestructura de entrenamiento y optimización para su dominio específico. No ajustado fino sobre el problema de otro. Construido desde cero para el suyo."
        : "Custom neural architecture design, training infrastructure, and optimization for your specific domain. Not fine-tuned on someone else's problem. Built from the ground up for yours.",
      badge: "R&D",
    },
    {
      label: locale === "fr" ? "MLOps qui Survit en Production" : locale === "es" ? "MLOps que Sobrevive en Producción" : "MLOps That Survives Production",
      desc: locale === "fr"
        ? "Versionnage de modèles, CI/CD pour ML, surveillance du dérive, réentraînement automatisé et tests A/B. Parce qu'un modèle qui fonctionnait en T1 échoue silencieusement en T3 quand votre distribution de données change."
        : locale === "es"
        ? "Versionado de modelos, CI/CD para ML, monitoreo de deriva, reentrenamiento automatizado y pruebas A/B. Porque un modelo que funcionaba en Q1 falla silenciosamente en Q3 cuando cambia la distribución de sus datos."
        : "Model versioning, CI/CD for ML, drift monitoring, automated retraining, and A/B testing. Because a model that worked in Q1 quietly fails by Q3 when your data distribution shifts.",
      badge: locale === "fr" ? "Infrastructure" : locale === "es" ? "Infraestructura" : "Infrastructure",
    },
    {
      label: locale === "fr" ? "IA en Périphérie pour Environnements Contraints" : locale === "es" ? "IA en el Borde para Entornos con Restricciones" : "Edge AI for Constrained Environments",
      desc: locale === "fr"
        ? "Compression et déploiement de modèles sur des appareils périphériques, systèmes embarqués et infrastructures isolées. Parce que tous les environnements n'ont pas une connexion cloud, et toutes les décisions ne peuvent pas attendre."
        : locale === "es"
        ? "Compresión y despliegue de modelos en dispositivos de borde, sistemas embebidos e infraestructura aislada. Porque no todos los entornos tienen conexión a la nube, y no todas las decisiones pueden esperar por una."
        : "Model compression and deployment to edge devices, embedded systems, and air-gapped infrastructure. Because not every environment has a cloud connection, and not every decision can wait for one.",
      badge: locale === "fr" ? "Embarqué" : locale === "es" ? "Embebido" : "Embedded",
    },
  ];

  const processItems = [
    {
      title: locale === "fr" ? "Audit des Données — Nous Voyons ce que les Autres Manquent" : locale === "es" ? "Auditoría de Datos — Vemos lo que Otros Pierden" : "Data Audit — We See What Others Miss",
      content: locale === "fr"
        ? "Nous auditons vos actifs de données, votre infrastructure et vos processus métier — y compris les exports de base de données que vos analystes exécutent manuellement depuis 6 ans, les intégrations de systèmes que personne n'a documentées, et le signal enfoui dans votre CRM qui prédit le churn 90 jours à l'avance. Nous identifions les opportunités IA au meilleur ROI avant que quiconque n'écrive une ligne de code de modèle."
        : locale === "es"
        ? "Auditamos sus activos de datos, infraestructura y procesos de negocio — incluyendo las exportaciones de base de datos que sus analistas han estado ejecutando manualmente durante 6 años, las integraciones de sistemas que nadie documentó, y la señal enterrada en su CRM que predice la fuga de clientes 90 días antes. Identificamos las oportunidades de IA con mayor ROI antes de que nadie escriba una línea de código de modelo."
        : "We audit your data assets, infrastructure, and business processes — including the database exports your analysts have been running manually for 6 years, the system integrations nobody documented, and the signal buried in your CRM that predicts churn 90 days out. We identify the highest-ROI AI opportunities before anyone writes a line of model code.",
    },
    {
      title: locale === "fr" ? "Preuve de Concept — Preuves Réelles, Pas une Démo" : locale === "es" ? "Prueba de Concepto — Evidencia Real, No una Demo" : "Proof of Concept — Real Evidence, Not a Demo",
      content: locale === "fr"
        ? "Un sprint de 4 à 6 semaines pour valider l'hypothèse technique centrale sur vos données réelles et désordonnées. Nous livrons un prototype fonctionnel avec des benchmarks de précision documentés par rapport à vos modes de défaillance spécifiques. Vous prenez une décision go/no-go avec de vraies preuves — pas les projections optimistes d'un fournisseur."
        : locale === "es"
        ? "Un sprint de 4 a 6 semanas para validar la hipótesis técnica central con sus datos reales y desordenados. Entregamos un prototipo funcional con benchmarks de precisión documentados frente a sus modos de falla específicos. Usted toma una decisión de go/no-go con evidencia real — no las proyecciones optimistas de un proveedor."
        : "A 4–6 week sprint to validate the core technical hypothesis on your actual messy data. We deliver a working prototype with documented accuracy benchmarks against your specific failure modes. You make a go/no-go decision with real evidence — not a vendor's optimistic projections.",
    },
    {
      title: locale === "fr" ? "Développement — Conçu pour Survivre à Votre Environnement" : locale === "es" ? "Desarrollo — Construido para Sobrevivir su Entorno" : "Development — Built to Survive Your Environment",
      content: locale === "fr"
        ? "Développement de modèle à pleine échelle avec code de qualité production, pipelines de données, feature engineering et infrastructure d'entraînement. Nous documentons chaque décision architecturale et remontons les blocages lors des revues hebdomadaires — pas à la réunion de remise quand il est trop tard pour changer quoi que ce soit."
        : locale === "es"
        ? "Desarrollo de modelos a escala completa con código de calidad de producción, pipelines de datos, ingeniería de características e infraestructura de entrenamiento. Documentamos cada decisión arquitectónica y sacamos a la luz los bloqueos en revisiones semanales — no en la reunión de entrega cuando ya es demasiado tarde para cambiar algo."
        : "Full-scale model development with production-quality code, data pipelines, feature engineering, and training infrastructure. We document every architectural decision and surface blockers in weekly reviews — not at the handoff meeting when it's too late to change anything.",
    },
    {
      title: locale === "fr" ? "Déploiement — Nous Restons jusqu'à ce que Ça Marche" : locale === "es" ? "Despliegue — Nos Quedamos hasta que Funcione" : "Deployment — We Stay Until It Works",
      content: locale === "fr"
        ? "Service de modèle, intégration API avec vos systèmes existants, tableaux de bord de surveillance et alertes. Nous ne remettons pas la documentation et ne disparaissons pas. Nous restons engagés après le lancement jusqu'à ce que votre équipe soit autonome et que les objectifs de performance soient atteints de façon constante — pas seulement le jour du lancement."
        : locale === "es"
        ? "Servicio del modelo, integración de API con sus sistemas existentes, paneles de monitoreo y alertas. No entregamos la documentación y desaparecemos. Nos mantenemos comprometidos post-lanzamiento hasta que su equipo sea autónomo y los objetivos de rendimiento se alcancen consistentemente — no solo el día del lanzamiento."
        : "Model serving, API integration with your existing systems, monitoring dashboards, and alerting. We don't hand off documentation and disappear. We stay engaged post-launch until your team owns it and performance targets are consistently met — not just on launch day.",
    },
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <PageHero
        title={division.name}
        subtitle={
          locale === "fr"
            ? "Votre pilote IA est en 'preuve de concept' depuis deux ans. Personne ne peut expliquer le ROI."
            : locale === "es"
            ? "Su piloto de IA lleva dos años en 'prueba de concepto'. Nadie puede explicar el ROI."
            : "Your AI pilot has been in 'proof of concept' for two years. Nobody can explain the ROI."
        }
        pill="05 — Division"
        showNoise
        showMesh
      />

      <SectionDivider />

      {/* Velocity ticker */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <ScrollVelocityText baseVelocity={-0.2}>
          {locale === "fr"
            ? "Vision par Ordinateur — NLP — Modèles Prédictifs — Apprentissage Profond — MLOps — IA Périphérique — LLMs — Transformers"
            : locale === "es"
            ? "Visión Artificial — NLP — Modelos Predictivos — Aprendizaje Profundo — MLOps — IA en el Borde — LLMs — Transformers"
            : "Computer Vision — NLP — Predictive Models — Deep Learning — MLOps — Edge AI — LLMs — Transformers"}
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
                ? "Chaque consultant en IA vous montre une démo qui fonctionne sur des données propres."
                : locale === "es"
                ? "Cada consultor de IA le muestra una demo que funciona con datos limpios."
                : "Every AI consultant shows you a demo that works on clean data."}
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
                ? "Vos données sont désordonnées, fragmentées et vivent dans 6 systèmes différents — un CRM qui fonctionne depuis 2011, un entrepôt de données que personne n'a entièrement migré, et une décennie de notes d'analystes dans un fichier Excel que quelqu'un maintient sur son ordinateur personnel."
                : locale === "es"
                ? "Sus datos están desordenados, fragmentados y viven en 6 sistemas diferentes — un CRM que lleva funcionando desde 2011, un almacén de datos que nadie migró completamente, y una década de notas de analistas en un archivo Excel que alguien mantiene en su laptop personal."
                : "Your data is messy, fragmented, and lives in 6 different systems — a CRM that's been running since 2011, a data warehouse nobody fully migrated, and a decade of analyst notes in an Excel file someone's been maintaining on their personal laptop."}
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
                ? "Cette démo ne survivra jamais à votre environnement de production. Et dans deux ans, votre pilote IA sera encore un diaporama PowerPoint avec un diagramme de Gantt qui dit \"Phase 2 : À définir\"."
                : locale === "es"
                ? "Esa demo nunca sobrevivirá su entorno de producción. Y dos años después, su piloto de IA seguirá siendo una presentación de PowerPoint con un diagrama de Gantt que dice \"Fase 2: Por definir\"."
                : "That demo will never survive your production environment. And two years from now, your AI pilot will still be a PowerPoint deck with a Gantt chart that says \"Phase 2: TBD.\""}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
            animate={problemInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(4px)", y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              {
                stat: "85%",
                label: locale === "fr" ? "des projets IA n'atteignent jamais la production" : locale === "es" ? "de los proyectos de IA nunca llegan a producción" : "of AI projects never reach production",
              },
              {
                stat: "2 years",
                label: locale === "fr" ? "temps moyen qu'une IA industrielle reste en phase 'pilote'" : locale === "es" ? "tiempo promedio que una IA industrial permanece en fase 'piloto'" : "average time industrial AI stays in 'pilot' phase",
              },
              {
                stat: "$1.8M",
                label: locale === "fr" ? "coût moyen d'un projet IA d'entreprise échoué" : locale === "es" ? "costo promedio de un proyecto de IA empresarial fallido" : "average cost of a failed enterprise AI project",
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
          </motion.div>
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
            ? "Nous ne construisons pas des démos qui meurent en comité. Chaque modèle que nous déployons fonctionne en production, surveillé 24h/24 par notre équipe. De la preuve de concept à la production en 90 jours — avec les métriques pour le prouver."
            : locale === "es"
            ? "No construimos demos que mueren en comité. Cada modelo que desplegamos funciona en producción, monitoreado 24/7 por nuestro equipo. De la prueba de concepto a producción en 90 días — con las métricas para demostrarlo."
            : "We don't build demos that die in committee. Every model we deploy runs in production, monitored 24/7 by our team. Proof of concept to production in 90 days — with the metrics to prove it."}
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
            ? "D'autres consultants en IA vous remettent un modèle et un diaporama. Nous sommes responsables du résultat. Si ça ne fonctionne pas en production et n'atteint pas vos objectifs de précision, nous ne sommes pas terminés."
            : locale === "es"
            ? "Otros consultores de IA le entregan un modelo y una presentación. Nosotros somos responsables del resultado. Si no está funcionando en producción y alcanzando sus objetivos de precisión, no hemos terminado."
            : "Other AI consultants hand you a model and a slide deck. We own the outcome. If it isn't running in production and hitting your accuracy targets, we aren't done."}
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
                ? "L'IA a besoin de contexte. Nous en avons 20 ans."
                : locale === "es"
                ? "La IA necesita contexto. Tenemos 20 años de él."
                : "AI needs context. We have 20 years of it."}
            </h2>
          </BlurFade>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 16,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40,
          }}>
            {locale === "fr"
              ? "La plupart des cabinets de conseil en IA construisent des modèles sur des données propres et espèrent le mieux. Nous avons des divisions qui génèrent les données industrielles, construisent les plateformes logicielles, instrumentent les bâtiments et maintiennent les équipements. Votre modèle IA obtient un contexte que personne d'autre ne peut fournir."
              : locale === "es"
              ? "La mayoría de las consultoras de IA construyen modelos con datos limpios y esperan lo mejor. Tenemos divisiones que generan los datos industriales, construyen las plataformas de software, instrumentan los edificios y mantienen los equipos. Su modelo de IA obtiene un contexto que nadie más puede proporcionar."
              : "Most AI consultancies build models on clean data and hope for the best. We have divisions that generate the industrial data, build the software platforms, instrument the buildings, and maintain the equipment. Your AI model gets context nobody else can provide."}
          </p>
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 16 }}
          >
            {[
              {
                name: locale === "fr" ? "Maintenance Prédictive" : locale === "es" ? "Mantenimiento Predictivo" : "Predictive Maintenance",
                desc: locale === "fr" ? "20 ans de données de défaillance provenant d'équipements industriels réels — l'ensemble d'entraînement dont votre modèle d'anomalie a toujours eu besoin." : locale === "es" ? "20 años de datos de fallas de equipos industriales reales — el conjunto de entrenamiento que su modelo de anomalías siempre necesitó." : "20 years of failure data from real industrial equipment — the training set your anomaly model has always needed.",
                href: "/divisions/predictive-maintenance",
              },
              {
                name: locale === "fr" ? "Développement Logiciel" : locale === "es" ? "Desarrollo de Software" : "Software Development",
                desc: locale === "fr" ? "Les plateformes d'entreprise qui transmettent les prédictions de votre modèle aux personnes qui doivent agir dessus." : locale === "es" ? "Las plataformas empresariales que entregan las predicciones de su modelo a las personas que necesitan actuar sobre ellas." : "The enterprise platforms that serve your model's predictions to the people who need to act on them.",
                href: "/divisions/software-development",
              },
              {
                name: locale === "fr" ? "Construction Intelligente" : locale === "es" ? "Construcción Inteligente" : "Intelligent Construction",
                desc: locale === "fr" ? "Réseaux IoT et de capteurs qui génèrent les données environnementales structurées que vos modèles consomment." : locale === "es" ? "Redes IoT y de sensores que generan los datos ambientales estructurados que consumen sus modelos." : "Building IoT and sensor networks that generate the structured environmental data your models consume.",
                href: "/divisions/intelligent-construction",
              },
              {
                name: locale === "fr" ? "Fabrication Industrielle" : locale === "es" ? "Manufactura Industrial" : "Industrial Manufacturing",
                desc: locale === "fr" ? "Instruments de précision qui produisent des données fiables et calibrées — pour que votre modèle n'apprenne pas du bruit." : locale === "es" ? "Instrumentos de precisión que producen datos confiables y calibrados — para que su modelo no aprenda del ruido." : "Precision instruments that produce reliable, calibrated data — so your model isn't learning from noise.",
                href: "/divisions/industrial-manufacturing",
              },
            ].map((d) => (
              <motion.a key={d.name} href={d.href}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
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

      {/* Neural Network visualization */}
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
            {locale === "fr" ? "Architecture d'Inférence" : locale === "es" ? "Arquitectura de Inferencia" : "Inference Architecture"}
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
            {locale === "fr" ? "Modèles qui Décident en Moins de 12 Millisecondes" : locale === "es" ? "Modelos que Deciden en Menos de 12 Milisegundos" : "Models That Decide in Under 12 Milliseconds"}
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
              ? "Dans votre environnement, un modèle qui prend 2 secondes à répondre est un modèle que personne n'utilise. Nous optimisons la latence dès le premier jour — pas comme une réflexion après coup."
              : locale === "es"
              ? "En su entorno, un modelo que tarda 2 segundos en responder es un modelo que nadie usa. Optimizamos para latencia desde el primer día — no como un pensamiento de último momento."
              : "In your environment, a model that takes 2 seconds to respond is a model nobody uses. We optimize for latency from day one — not as an afterthought."}
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
            {locale === "fr" ? "L'Intelligence au Travail" : locale === "es" ? "Inteligencia en Acción" : "Intelligence at Work"}
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
            {locale === "fr" ? "Modèles conçus pour la production dès le premier jour." : locale === "es" ? "Modelos construidos para producción desde el primer día." : "Models built for production from day one."}
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
              ? "Pas entraînés sur des benchmarks propres. Construits sur vos données réelles — désordonnées, fragmentées et réelles — puis déployés en production avec une surveillance qui détecte la dérive avant que vos parties prenantes ne le remarquent."
              : locale === "es"
              ? "No entrenados en benchmarks limpios. Construidos sobre sus datos reales — desordenados, fragmentados y reales — luego desplegados en producción con monitoreo que detecta la deriva antes de que sus interesados lo noten."
              : "Not trained on clean benchmarks. Built on your actual data — messy, fragmented, and real — then deployed into production with monitoring that catches drift before your stakeholders notice it."}
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* AI Capabilities */}
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
            {locale === "fr" ? "Ce que Nous Déployons" : locale === "es" ? "Lo que Desplegamos" : "What We Deploy"}
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
            {locale === "fr" ? "IA qui Survit à Votre Environnement" : locale === "es" ? "IA que Sobrevive su Entorno" : "AI That Survives Your Environment"}
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
            {locale === "fr" ? "Résultats — Pas des Pilotes" : locale === "es" ? "Resultados — No Pilotos" : "Results — Not Pilots"}
          </p>
        </div>
        <MetricsRow locale={locale} />
      </section>

      <SectionDivider />

      {/* Process Accordion */}
      <section style={{ padding: isMobile ? "48px 20px" : "100px 48px", maxWidth: 800, margin: "0 auto" }}>
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
            {locale === "fr" ? "Comment Nous y Arrivons" : locale === "es" ? "Cómo Llegamos Ahí" : "How We Get There"}
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
            {locale === "fr" ? "Des Données Désordonnées à la Production en 90 Jours" : locale === "es" ? "De los Datos Desordenados a Producción en 90 Días" : "From Messy Data to Production in 90 Days"}
          </TextReveal>
        </div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)", y: 16 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmoothAccordion
            items={processItems}
            allowMultiple={false}
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          />
        </motion.div>
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
        <AnimatedGridBg gridSize={60} lineOpacity={0.03} sweepOpacity={0.04} />
        <VerticalCutReveal
          staggerDuration={0.04}
          delay={0.1}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#fff",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            maxWidth: 640,
            lineHeight: 1.2,
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {locale === "fr"
            ? "Vous n'avez pas un problème de données. Vous avez un problème de contexte. Nous en avons 20 ans."
            : locale === "es"
            ? "No tiene un problema de datos. Tiene un problema de contexto. Tenemos 20 años de él."
            : "You don't have a data problem. You have a context problem. We have 20 years of it."}
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
            ? "Nous auditerons vos données, identifierons votre opportunité IA au meilleur ROI et vous donnerons un chemin clair de là où vous êtes à 200+ modèles en production — en 90 jours ou moins."
            : locale === "es"
            ? "Auditaremos sus datos, identificaremos su oportunidad de IA con mayor ROI y le daremos un camino claro desde donde está hasta 200+ modelos en producción — en 90 días o menos."
            : "We'll audit your data, identify your highest-ROI AI opportunity, and give you a clear path from where you are to 200+ models in production — in 90 days or less."}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Pensez Plus Grand" : locale === "es" ? "Piense en Grande" : "Think Bigger"}
          </MagneticButton>
          <MagneticButton as="a" href="/contact">
            {locale === "fr" ? "Essai Gratuit" : locale === "es" ? "Prueba Gratuita" : "Start Free Trial"}
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
