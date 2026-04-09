"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";
import {
  TextReveal,
  MagneticButton,
  StaggerGrid,
  TiltCard,
  CounterSpring,
  SectionDivider,
  SmoothAccordion,
  ScrollVelocityText,
  NoiseOverlay,
  ScrollProgressBar,
  BlurFade,
} from "@/components/animations";
import VerticalCutReveal from "@/components/animations/VerticalCutReveal";
import AnimatedGridBg from "@/components/animations/AnimatedGridBg";
import PageHero from "@/components/shared/PageHero";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CultureValue {
  index: string;
  headline: string;
  body: string;
}

interface BenefitStat {
  target: number;
  suffix: string;
  prefix: string;
  label: string;
}

interface Position {
  title: string;
  department: string;
  content: string;
}

// BENEFIT_STATS and POSITIONS are locale-aware — built inside the component below

// ─── Culture card ─────────────────────────────────────────────────────────────

function CultureCard({ value }: { value: CultureValue }) {
  return (
    <TiltCard tiltDegree={5} glowOpacity={0.07} glowSize={480} style={{ height: "100%" }}>
      <div
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: 20,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.28) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          {value.index}
        </span>

        <h3
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
            color: "#fff",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
          }}
        >
          {value.headline}
        </h3>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.75,
            flexGrow: 1,
          }}
        >
          {value.body}
        </p>
      </div>
    </TiltCard>
  );
}

// ─── Benefit stat block ───────────────────────────────────────────────────────

function BenefitBlock({ stat }: { stat: BenefitStat }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "48px 24px",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        flex: 1,
        width: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
          fontWeight: 400,
          color: "#fff",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        <CounterSpring
          target={stat.target}
          suffix={stat.suffix}
          prefix={stat.prefix}
          duration={2.2}
          overshoot={0.07}
        />
      </span>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

// ─── Accordion items ──────────────────────────────────────────────────────────

function buildAccordionItems(positions: Position[]) {
  return positions.map((p) => ({
    title: p.title,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {p.department}
        </span>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
          }}
        >
          {p.content}
        </span>
      </div>
    ),
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);

  const BENEFIT_STATS: BenefitStat[] = [
    {
      target: 80,
      suffix: "+",
      prefix: "",
      label:
        locale === "fr"
          ? "Membres d'équipe"
          : locale === "es"
            ? "Miembros del equipo"
            : "Team Members",
    },
    {
      target: 6,
      suffix: "",
      prefix: "",
      label:
        locale === "fr"
          ? "Pays"
          : locale === "es"
            ? "Países"
            : "Countries",
    },
    {
      target: 5,
      suffix: "",
      prefix: "",
      label:
        locale === "fr"
          ? "Divisions"
          : locale === "es"
            ? "Divisiones"
            : "Divisions",
    },
    {
      target: 30,
      suffix: "+",
      prefix: "",
      label:
        locale === "fr"
          ? "Projets / An"
          : locale === "es"
            ? "Proyectos / Año"
            : "Projects / Year",
    },
  ];

  const POSITIONS: Position[] = [
    {
      title:
        locale === "fr"
          ? "Ingénieur logiciel senior"
          : locale === "es"
            ? "Ingeniero de software senior"
            : "Senior Software Engineer",
      department:
        locale === "fr"
          ? "Développement logiciel"
          : locale === "es"
            ? "Desarrollo de software"
            : "Software Development",
      content:
        locale === "fr"
          ? "Développement full-stack avec React, Node.js et infrastructure cloud. Vous concevrez des plateformes évolutives, dirigerez des révisions techniques et encadrerez des ingénieurs juniors sur des projets d'entreprise et gouvernementaux. Vous livrerez. Pas des feuilles de route."
          : locale === "es"
            ? "Desarrollo full-stack con React, Node.js e infraestructura cloud. Usted diseñará plataformas escalables, liderará revisiones técnicas y mentorizará ingenieros junior en proyectos empresariales y gubernamentales. Usted entregará. No hojas de ruta."
            : "Full-stack development with React, Node.js, and cloud infrastructure. You will architect scalable platforms, lead technical reviews, and mentor junior engineers across enterprise and government projects. You'll ship. Not roadmap.",
    },
    {
      title:
        locale === "fr"
          ? "Ingénieur IA / ML"
          : locale === "es"
            ? "Ingeniero IA / ML"
            : "AI / ML Engineer",
      department:
        locale === "fr"
          ? "Conseil en IA"
          : locale === "es"
            ? "Consultoría de IA"
            : "AI Consulting",
      content:
        locale === "fr"
          ? "Construction de modèles prédictifs et déploiement de pipelines ML en production — pas en démo. Vous travaillerez en vision par ordinateur, NLP et prévisions de séries temporelles, en faisant le lien entre la recherche et l'impact industriel réel. ROI dès le premier mois."
          : locale === "es"
            ? "Construcción de modelos predictivos y despliegue de pipelines de ML en producción — no en demos. Usted trabajará en visión por computadora, NLP y pronóstico de series de tiempo, conectando la investigación con el impacto industrial real. ROI desde el primer mes."
            : "Building predictive models and deploying ML pipelines in production — not in demos. You will work across computer vision, NLP, and time-series forecasting, bridging research and real industrial impact. ROI from month one.",
    },
    {
      title:
        locale === "fr"
          ? "Gestionnaire de projet en construction"
          : locale === "es"
            ? "Gerente de proyecto en construcción"
            : "Construction Project Manager",
      department:
        locale === "fr"
          ? "Construction intelligente"
          : locale === "es"
            ? "Construcción inteligente"
            : "Intelligent Construction",
      content:
        locale === "fr"
          ? "Direction de projets de bâtiments intelligents avec intégration IoT. Vous coordonnerez des équipes multidisciplinaires, gérerez les parties prenantes et assurerez la livraison réussie de mises à niveau de construction pilotées par la technologie. Des bâtiments qui performent vraiment."
          : locale === "es"
            ? "Liderazgo de proyectos de edificios inteligentes con integración IoT. Usted coordinará equipos multidisciplinarios, gestionará partes interesadas y asegurará la entrega exitosa de actualizaciones de construcción impulsadas por tecnología. Edificios que realmente funcionan."
            : "Leading smart building projects with IoT integration. You will coordinate multidisciplinary teams, manage stakeholders, and ensure the successful delivery of technology-driven construction upgrades. Buildings that actually perform.",
    },
    {
      title:
        locale === "fr"
          ? "Analyste en vibrations"
          : locale === "es"
            ? "Analista de vibraciones"
            : "Vibration Analyst",
      department:
        locale === "fr"
          ? "Maintenance prédictive"
          : locale === "es"
            ? "Mantenimiento predictivo"
            : "Predictive Maintenance",
      content:
        locale === "fr"
          ? "Maintenance prédictive et diagnostic d'équipements par alignement laser, équilibrage de rotors et thermographie. Vous réduirez les temps d'arrêt pour des clients comme Westinghouse, Holcim et Unilever. Le travail concret qui donne tout son sens au logiciel."
          : locale === "es"
            ? "Mantenimiento predictivo y diagnóstico de equipos mediante alineación láser, balanceo de rotores y termografía. Usted reducirá el tiempo de inactividad para clientes como Westinghouse, Holcim y Unilever. El trabajo práctico que hace que el software importe."
            : "Predictive maintenance and equipment diagnostics using laser alignment, rotor balancing, and thermography. You will reduce downtime for clients like Westinghouse, Holcim, and Unilever. The hands-on work that makes the software matter.",
    },
    {
      title:
        locale === "fr"
          ? "Directeur du développement des affaires"
          : locale === "es"
            ? "Director de desarrollo de negocios"
            : "Business Development Manager",
      department:
        locale === "fr"
          ? "Corporatif"
          : locale === "es"
            ? "Corporativo"
            : "Corporate",
      content:
        locale === "fr"
          ? "Développement de notre présence sur de nouveaux marchés en Amérique du Nord, en Amérique latine et en Europe. Vous identifierez des partenariats, construirez un pipeline et représenterez Droz Technologies au niveau exécutif. Vous vendrez ce que nous livrons vraiment."
          : locale === "es"
            ? "Expansión de nuestra presencia en nuevos mercados de América del Norte, América Latina y Europa. Usted identificará asociaciones, construirá pipeline y representará a Droz Technologies a nivel ejecutivo. Usted venderá lo que realmente entregamos."
            : "Growing our presence across new markets in North America, Latin America, and Europe. You will identify partnerships, build pipeline, and represent Droz Technologies at the executive level. You'll sell what we actually deliver.",
    },
  ];

  const accordionItems = buildAccordionItems(POSITIONS);

  const cultureValues: CultureValue[] = [
    {
      index: "01",
      headline:
        locale === "fr"
          ? "On se présente"
          : locale === "es"
            ? "Nos presentamos"
            : "We Show Up",
      body:
        locale === "fr"
          ? "Nos ingénieurs ont été sur des planchers d'usine cette semaine. Pas dans une salle de conférence. Pas en train de rédiger des spécifications. Sur le terrain — avec de l'huile de machine sur les bottes."
          : locale === "es"
            ? "Nuestros ingenieros han estado en plantas industriales esta semana. No en una sala de conferencias. No redactando especificaciones. En el campo — con aceite de máquina en las botas."
            : "Our engineers have been on factory floors this week. Not in a conference room. Not writing specifications. On the ground — with machine oil on their boots.",
    },
    {
      index: "02",
      headline:
        locale === "fr"
          ? "On livre"
          : locale === "es"
            ? "Entregamos"
            : "We Ship",
      body:
        locale === "fr"
          ? "Pas de feuilles de route de 18 mois. Pas de cycles de révision interminables. Nous déployons en semaines, pas en années. Si ça ne tourne pas en production, ça n'existe pas."
          : locale === "es"
            ? "Sin hojas de ruta de 18 meses. Sin ciclos de revisión interminables. Implementamos en semanas, no en años. Si no funciona en producción, no existe."
            : "No 18-month roadmaps. No endless revision cycles. We deploy in weeks, not years. If it doesn't run in production, it doesn't count.",
    },
    {
      index: "03",
      headline:
        locale === "fr"
          ? "On assume"
          : locale === "es"
            ? "Nos hacemos responsables"
            : "We Own It",
      body:
        locale === "fr"
          ? "Valeurs catholiques, détermination latino. Nous ne promettons pas ce que nous ne pouvons pas livrer. Nous ne vendons pas ce que nous n'avons pas fait. Chaque engagement commence par l'intégrité."
          : locale === "es"
            ? "Valores católicos, garra latina. No prometemos lo que no podemos entregar. No vendemos lo que no hemos hecho. Cada compromiso comienza con integridad."
            : "Catholic values, Latino grit. We don't promise what we can't deliver. We don't sell what we haven't done. Every engagement starts with integrity.",
    },
    {
      index: "04",
      headline:
        locale === "fr"
          ? "On grandit"
          : locale === "es"
            ? "Crecemos"
            : "We Grow",
      body:
        locale === "fr"
          ? "Chaque division est un nouvel ensemble de compétences. Formation croisée en ingénierie, logiciels, construction, fabrication et IA. Vous n'êtes jamais bloqué dans un seul couloir."
          : locale === "es"
            ? "Cada división es un nuevo conjunto de habilidades. Formación cruzada en ingeniería, software, construcción, fabricación e IA. Nunca estás atascado en un solo carril."
            : "Every division is a new skill set. Cross-train across engineering, software, construction, manufacturing, and AI. You're never stuck in one lane.",
    },
  ];

  const onlyWeRef = useRef<HTMLDivElement>(null);
  const onlyWeInView = useInView(onlyWeRef as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      <ScrollProgressBar />

      <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <PageHero
          title={
            locale === "fr"
              ? "Rejoignez notre équipe"
              : locale === "es"
                ? "Únase a nuestro equipo"
                : "Join Our Team"
          }
          subtitle={
            locale === "fr"
              ? "Aidez-nous à construire le futur des technologies industrielles. D'une aciérie au Venezuela à des usines dans 6 pays."
              : locale === "es"
                ? "Ayúdenos a construir el futuro de la tecnología industrial. De una acería en Venezuela a plantas en 6 países."
                : "Help us build the future of industrial technology. From a steel mill in Venezuela to plants across 6 countries."
          }
          pill={locale === "fr" ? "Carrières" : locale === "es" ? "Carreras" : "Careers"}
          textRevealMode="word"
          showNoise
          showMesh
        />

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Culture section ───────────────────────────────── */}
        <section
          style={{
            position: "relative",
            padding: "100px 6% 80px",
            background: "#0a0a0a",
            overflow: "hidden",
          }}
        >

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                {locale === "fr"
                  ? "Notre culture"
                  : locale === "es"
                    ? "Nuestra cultura"
                    : "Our Culture"}
              </span>
            </div>

            <BlurFade delay={0.1} blur="10px" duration={0.7} as="div">
            <TextReveal
              as="h2"
              mode="word"
              stagger={0.08}
              duration={0.65}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 16,
                display: "block",
              }}
            >
              {locale === "fr"
                ? "Pourquoi Droz ?"
                : locale === "es"
                  ? "¿Por qué Droz?"
                  : "Why Droz?"}
            </TextReveal>
            </BlurFade>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.75,
                maxWidth: 540,
                marginBottom: 56,
              }}
            >
              {locale === "fr"
                ? "Nous ne sommes pas une startup tech qui joue à l'industriel. Nous sommes une entreprise industrielle qui a appris la technologie sur le terrain — et vous pouvez vous former dans les deux."
                : locale === "es"
                  ? "No somos una startup tecnológica que juega a ser industrial. Somos una empresa industrial que aprendió tecnología en el campo — y usted puede formarse en ambos."
                  : "We're not a tech startup playing at industrial. We're an industrial company that learned technology in the field — and you can train across both."}
            </p>

            <StaggerGrid
              columns={2}
              gap={16}
              stagger={0.1}
              mode="wave"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
              }}
            >
              {cultureValues.map((v) => (
                <CultureCard key={v.index} value={v} />
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* ── Velocity marquee ─────────────────────────────── */}
        <div
          style={{
            padding: "20px 0",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <ScrollVelocityText baseVelocity={-0.2}>
            {locale === "fr"
              ? "On se présente · On livre · On assume · On grandit · Le terrain avant tout · Pas de feuilles de route · Foi · Détermination · Précision"
              : locale === "es"
                ? "Nos presentamos · Entregamos · Nos hacemos responsables · Crecemos · El campo primero · Sin hojas de ruta · Fe · Garra · Precisión"
                : "We Show Up · We Ship · We Own It · We Grow · Factory Floor First · No Roadmaps · Faith · Grit · Precision"}
          </ScrollVelocityText>
        </div>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Only We pull quote ────────────────────────────── */}
        <section
          ref={onlyWeRef}
          style={{
            padding: "80px 6%",
            background: "#0a0a0a",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              height: 300,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.015) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={onlyWeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 860,
              margin: "0 auto",
              padding: isMobile ? "32px 24px" : "48px 56px",
              background: "rgba(255,255,255,0.012)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.18) 60%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            <span
              style={{
                display: "block",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "3rem",
                lineHeight: 0.8,
                color: "rgba(255,255,255,0.05)",
                marginBottom: 20,
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>

            <VerticalCutReveal
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
                justifyContent: "center",
              }}
              delay={0.2}
            >
              {locale === "fr"
                ? "Aucune autre entreprise sur terre ne combine 20 ans d'analyse des vibrations, des logiciels d'entreprise personnalisés, du conseil en IA, de la fabrication et de la construction sous un même toit. C'est pour ça que vous voudrez travailler ici."
                : locale === "es"
                  ? "Ninguna otra empresa en la tierra combina 20 años de análisis de vibraciones, software empresarial personalizado, consultoría de IA, fabricación y construcción bajo un mismo techo. Por eso querrá trabajar aquí."
                  : t.narrative.onlyWe}
            </VerticalCutReveal>
          </motion.div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Benefit stats strip ───────────────────────────── */}
        <section
          style={{
            background: "#0d0d0d",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
            }}
          >
            {BENEFIT_STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ flex: 1, display: "flex" }}
              >
                <BenefitBlock stat={s} />
              </motion.div>
            ))}
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Open positions ────────────────────────────────── */}
        <section
          style={{
            padding: "100px 6% 80px",
            background: "#0a0a0a",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
                gap: isMobile ? 24 : 80,
                alignItems: "start",
              }}
            >
              {/* Left: heading */}
              <div style={{ position: "sticky", top: 120 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                    }}
                  >
                    {locale === "fr"
                      ? "On recrute"
                      : locale === "es"
                        ? "Contratando ahora"
                        : "Now Hiring"}
                  </span>
                </div>

                <TextReveal
                  as="h2"
                  mode="word"
                  stagger={0.08}
                  duration={0.65}
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  {locale === "fr"
                    ? "Postes ouverts"
                    : locale === "es"
                      ? "Posiciones abiertas"
                      : "Open Positions"}
                </TextReveal>

                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.33)",
                    lineHeight: 1.75,
                    maxWidth: 280,
                    marginBottom: 36,
                  }}
                >
                  {locale === "fr"
                    ? "On grandit dans toutes les divisions. Cliquez sur un rôle pour voir à quoi ça ressemble vraiment."
                    : locale === "es"
                      ? "Estamos creciendo en todas las divisiones. Seleccione un rol para ver cómo se ve realmente."
                      : "We're growing across all five divisions. Select a role to see what the opportunity actually looks like — not a job description, a real picture."}
                </p>

                {/* Live count badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    background: "#141414",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 9999,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.45)",
                      animation: "node-pulse 2s ease-in-out infinite",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.38)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {POSITIONS.length}{" "}
                    {locale === "fr"
                      ? "postes ouverts"
                      : locale === "es"
                        ? "posiciones abiertas"
                        : "positions open"}
                  </span>
                </div>
              </div>

              {/* Right: accordion */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <SmoothAccordion
                  items={accordionItems}
                  allowMultiple={false}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── CTA ──────────────────────────────────────────── */}
        <section
          style={{
            padding: "120px 6% 140px",
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatedGridBg />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 300,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 28,
              position: "relative",
              zIndex: 1,
            }}
          >
            {locale === "fr"
              ? "La porte est ouverte"
              : locale === "es"
                ? "La puerta está abierta"
                : "Open door"}
          </p>

          <VerticalCutReveal
            as="h2"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 24,
              maxWidth: 680,
              position: "relative",
              zIndex: 1,
              justifyContent: "center",
            }}
            delay={0.15}
          >
            {locale === "fr"
              ? "Vous ne voyez pas votre rôle ? Écrivez-nous quand même."
              : locale === "es"
                ? "¿No ve su rol? Escríbanos de todas formas."
                : "Don't see your role? Reach out anyway."}
          </VerticalCutReveal>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              color: "rgba(255,255,255,0.38)",
              maxWidth: 460,
              lineHeight: 1.7,
              marginBottom: 40,
              position: "relative",
              zIndex: 1,
            }}
          >
            {locale === "fr"
              ? "Si vous êtes le genre de personne qui montre avant de demander — on veut vous connaître."
              : locale === "es"
                ? "Si usted es el tipo de persona que muestra antes de pedir — queremos conocerle."
                : "If you're the kind of person who shows before they ask — we want to know you."}
          </motion.p>

          <div style={{ position: "relative", zIndex: 1 }}>
            <MagneticButton href="/contact" as="a" strength={0.35} radius={140}>
              {locale === "fr"
                ? "Prenez contact"
                : locale === "es"
                  ? "Contáctenos"
                  : "Reach Out"}
            </MagneticButton>
          </div>
        </section>
      </main>
    </>
  );
}
