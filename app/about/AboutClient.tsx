"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";
import PageHero from "@/components/shared/PageHero";
import {
  TextReveal,
  MagneticButton,
  StaggerGrid,
  TiltCard,
  CounterSpring,
  SectionDivider,
  ScrollVelocityText,
  NoiseOverlay,
  ScrollProgressBar,
  SplitReveal,
  BlurFade,
} from "@/components/animations";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";

// ─── Pill ─────────────────────────────────────────────────────────────────────

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 11,
        fontWeight: 500,
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 24,
        padding: "5px 14px",
        borderRadius: 100,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </span>
  );
}

// ─── Origin sentence block ─────────────────────────────────────────────────────

function OriginSentence({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <TextReveal
      as="p"
      mode="word"
      stagger={0.05}
      delay={delay}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 300,
        fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
        color: "rgba(255,255,255,0.58)",
        lineHeight: 1.85,
        display: "block",
      }}
    >
      {children}
    </TextReveal>
  );
}

// ─── How We Work card ─────────────────────────────────────────────────────────

interface WorkCardProps {
  number: string;
  title: string;
  body: string;
  delay?: number;
}

function WorkCard({ number, title, body, delay = 0 }: WorkCardProps) {
  return (
    <TiltCard tiltDegree={4} glowOpacity={0.06} style={{ height: "100%" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#111",
          padding: "40px 32px",
          borderRadius: 20,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4)",
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
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.22) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "3.5rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.10)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          {number}
        </span>
        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "#fff",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
            flexGrow: 1,
          }}
        >
          {body}
        </p>
      </motion.div>
    </TiltCard>
  );
}

// ─── Stat block ───────────────────────────────────────────────────────────────

interface StatBlockProps {
  target: number;
  suffix?: string;
  label: string;
}

function StatBlock({ target, suffix = "", label }: StatBlockProps) {
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
        <CounterSpring target={target} suffix={suffix} duration={2.4} overshoot={0.06} />
      </span>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);

  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const onlyWeRef = useRef<HTMLDivElement>(null);
  const onlyWeInView = useInView(onlyWeRef as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const workCards = [
    {
      number: "01",
      title: locale === "fr" ? "Valeurs catholiques" : locale === "es" ? "Valores católicos" : "Catholic values",
      body:
        locale === "fr"
          ? "Nous ne vendons pas ce que nous ne pouvons pas livrer. Chaque engagement commence par l'intégrité."
          : locale === "es"
            ? "No vendemos lo que no podemos entregar. Cada compromiso comienza con integridad."
            : "We don't sell what we can't deliver. We don't promise what we haven't done. Every engagement starts with integrity.",
      delay: 0,
    },
    {
      number: "02",
      title: locale === "fr" ? "Détermination latino" : locale === "es" ? "Garra latina" : "Latino grit",
      body:
        locale === "fr"
          ? "Nous avons été formés dans des usines d'Amérique du Sud. Nous savons ce que c'est de travailler sous pression réelle."
          : locale === "es"
            ? "Nos formamos en plantas industriales de América del Sur. Sabemos lo que es trabajar bajo presión real."
            : "We were forged in South American industrial plants. We know what it means to work under real pressure, with real stakes.",
      delay: 0.1,
    },
    {
      number: "03",
      title: locale === "fr" ? "Précision canadienne" : locale === "es" ? "Precisión canadiense" : "Canadian precision",
      body:
        locale === "fr"
          ? "Les résultats mesurables ne sont pas une option. Ils sont l'unique définition du succès dans chaque mandat."
          : locale === "es"
            ? "Los resultados medibles no son opcionales. Son la única definición de éxito en cada encargo."
            : "Measurable results are not optional. They are the only definition of success in every engagement we take.",
      delay: 0.2,
    },
  ];

  const splitBefore = [
    locale === "fr"
      ? "Fournisseur d'équipement qui ne peut pas écrire un logiciel"
      : locale === "es"
        ? "Proveedor de equipos que no puede escribir software"
        : "Equipment vendor who can't write software",
    locale === "fr"
      ? "Fournisseur de logiciels qui n'a jamais calibré un capteur"
      : locale === "es"
        ? "Proveedor de software que nunca ha calibrado un sensor"
        : "Software vendor who's never calibrated a sensor",
    locale === "fr"
      ? "Consultant IA qui n'a jamais mis les pieds sur un plancher d'usine"
      : locale === "es"
        ? "Consultor de IA que nunca ha pisado una planta industrial"
        : "AI consultant who's never been on a factory floor",
    locale === "fr"
      ? "Trois factures, trois points de contact, personne ne parle à l'autre"
      : locale === "es"
        ? "Tres facturas, tres puntos de contacto, nadie habla con el otro"
        : "Three invoices, three points of contact, none of them talking to each other",
  ];

  const splitAfter = [
    locale === "fr"
      ? "Une entreprise qui fait les cinq — équipement, logiciel, IA, fabrication, construction"
      : locale === "es"
        ? "Una empresa que hace los cinco — equipos, software, IA, fabricación, construcción"
        : "One company that does all five — equipment, software, AI, manufacturing, construction",
    locale === "fr"
      ? "Des ingénieurs qui ont aligné des rotors et écrit le code qui les surveille"
      : locale === "es"
        ? "Ingenieros que han alineado rotores y escrito el código que los monitorea"
        : "Engineers who've aligned rotors and written the code that monitors them",
    locale === "fr"
      ? "Résultats mesurables. Pas des présentations PowerPoint."
      : locale === "es"
        ? "Resultados medibles. No presentaciones de PowerPoint."
        : "Measurable results. Not PowerPoint presentations.",
    locale === "fr"
      ? "Un interlocuteur. Cinq divisions. Chaque capacité sous un même toit."
      : locale === "es"
        ? "Un interlocutor. Cinco divisiones. Cada capacidad bajo un mismo techo."
        : "One contact. Five divisions. Every capability under one roof.",
  ];

  return (
    <>
      <ScrollProgressBar />

      <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <PageHero
          title={t.about.heading}
          subtitle={
            locale === "fr"
              ? "Nous n'avons pas commencé dans une salle de conseil. Nous avons commencé dans une aciérie."
              : locale === "es"
                ? "No empezamos en una sala de juntas. Empezamos en una acería."
                : "We didn't start in a boardroom. We started in a steel mill."
          }
          pill={
            locale === "fr"
              ? "Notre histoire"
              : locale === "es"
                ? "Nuestra historia"
                : "The Story"
          }
          textRevealMode="word"
          showMesh
          showNoise={false}
        />

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Origin section ───────────────────────────────── */}
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
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
                gap: isMobile ? 24 : 80,
                alignItems: "start",
              }}
            >
              {/* Left: section label + heading */}
              <div style={{ position: "sticky", top: 120 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 24,
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
                      ? "Venezuela → Canada"
                      : locale === "es"
                        ? "Venezuela → Canadá"
                        : "Venezuela → Canada"}
                  </span>
                </div>

                <BlurFade delay={0.1} blur="10px" duration={0.7} as="div">
                <TextReveal
                  as="h2"
                  mode="word"
                  stagger={0.07}
                  duration={0.65}
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    display: "block",
                    marginBottom: 20,
                  }}
                >
                  {locale === "fr"
                    ? "Forgés dans l'industrie lourde"
                    : locale === "es"
                      ? "Forjados en la industria pesada"
                      : "Forged in heavy industry"}
                </TextReveal>
                </BlurFade>

                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.75,
                    maxWidth: 300,
                  }}
                >
                  {locale === "fr"
                    ? "Pas une levée de fonds. Pas un pivot. Un parcours construit aligner à aligner, boulons, données, résultats."
                    : locale === "es"
                      ? "Sin rondas de inversión. Sin pivotes. Un camino construido alineación por alineación, tuerca por tuerca, resultado por resultado."
                      : "No funding rounds. No pivots. A path built one alignment, one bolt, one result at a time."}
                </p>
              </div>

              {/* Right: origin story sentences */}
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <OriginSentence delay={0}>
                  {locale === "fr"
                    ? "L'entreprise a commencé dans les années 90, dans des aciéries vénézuéliennes. Pas de capital-risque. Pas d'incubateur. Juste des ingénieurs sur le plancher de l'usine, apprenant à diagnostiquer les défaillances d'équipements à la main."
                    : locale === "es"
                      ? "La empresa comenzó en los años 90, en acerías venezolanas. Sin capital de riesgo. Sin incubadoras. Solo ingenieros en el piso de la planta, aprendiendo a diagnosticar fallas de equipos con las manos."
                      : "The company started in the 1990s, in Venezuelan steel mills. No venture capital. No incubators. Just engineers on the factory floor, learning to diagnose equipment failures by hand."}
                </OriginSentence>

                <OriginSentence delay={0.1}>
                  {locale === "fr"
                    ? "Nous avons aligné des rotors pour PDVSA. Nous avons équilibré des machines pour Holcim. Nous avons appris ce qu'un palier défaillant ressent — à 3h du matin, dans une chaleur de 40 degrés, avec une ligne de production arrêtée derrière vous."
                    : locale === "es"
                      ? "Alineamos rotores para PDVSA. Balanceamos máquinas para Holcim. Aprendimos lo que se siente un cojinete fallando — a las 3 de la mañana, con 40 grados de calor, con una línea de producción parada detrás de ti."
                      : "We aligned rotors for PDVSA. We balanced machines for Holcim. We learned what a failing bearing feels like — at 3 AM, in 40-degree heat, with a production line stopped behind you."}
                </OriginSentence>

                <OriginSentence delay={0.2}>
                  {locale === "fr"
                    ? "Vingt ans plus tard, nous avons traversé la frontière vers le Canada — et nous avons amené ce que personne d'autre n'avait : vingt ans de connaissances de plancher d'usine, maintenant codifiées dans des logiciels, de l'IA et des systèmes automatisés."
                    : locale === "es"
                      ? "Veinte años después, cruzamos la frontera hacia Canadá — y trajimos lo que nadie más tenía: veinte años de conocimiento de planta industrial, ahora codificado en software, IA y sistemas automatizados."
                      : "Twenty years later, we crossed into Canada — and we brought what nobody else had: twenty years of factory-floor knowledge, now codified into software, AI, and automated systems."}
                </OriginSentence>

                <OriginSentence delay={0.3}>
                  {locale === "fr"
                    ? "Aujourd'hui : cinq divisions. Six pays. Westinghouse, Unilever, le gouvernement du Canada. Les mêmes ingénieurs qui ont appris dans ces usines vénézuéliennes sont ceux qui se présenteront dans votre installation cette semaine."
                    : locale === "es"
                      ? "Hoy: cinco divisiones. Seis países. Westinghouse, Unilever, el gobierno de Canadá. Los mismos ingenieros que aprendieron en esas plantas venezolanas son los que se presentarán en tu instalación esta semana."
                      : "Today: five divisions. Six countries. Westinghouse, Unilever, the Government of Canada. The same engineers who learned in those Venezuelan plants are the ones who will show up at your facility this week."}
                </OriginSentence>
              </div>
            </div>
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
          <ScrollVelocityText baseVelocity={-0.55}>
            {locale === "fr"
              ? "Venezuela · Canada · 20+ ans · Le terrain avant tout · Cinq divisions · Un seul standard · Foi · Détermination · Précision"
              : locale === "es"
                ? "Venezuela · Canadá · 20+ años · El campo primero · Cinco divisiones · Un solo estándar · Fe · Garra · Precisión"
                : "Venezuela · Canada · 20+ Years · Factory Floor First · Five Divisions · One Standard · Faith · Grit · Precision"}
          </ScrollVelocityText>
        </div>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Why We Exist — CORE differentiator ──────────── */}
        <section
          ref={missionRef}
          style={{
            position: "relative",
            padding: "120px 6%",
            background: "#0a0a0a",
            overflow: "hidden",
          }}
        >
          {/* Radial glow backdrop */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 400,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.018) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
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
                {t.about.mission}
              </span>
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#fff",
                lineHeight: 1.25,
                letterSpacing: "-0.025em",
                maxWidth: 900,
              }}
            >
              {t.about.missionBody}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={missionInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 80,
                height: 1,
                background: "rgba(255,255,255,0.12)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Split reveal: the problem ─────────────────────── */}
        <SplitReveal
          beforeTitle={
            locale === "fr"
              ? "Ce que vous avez maintenant"
              : locale === "es"
                ? "Lo que tienes ahora"
                : "What you have now"
          }
          afterTitle={
            locale === "fr"
              ? "Ce que nous apportons"
              : locale === "es"
                ? "Lo que nosotros aportamos"
                : "What we bring"
          }
          beforeItems={splitBefore}
          afterItems={splitAfter}
        />

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── How We Work ──────────────────────────────────── */}
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
                {t.about.values}
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
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 56,
                display: "block",
              }}
            >
              {t.about.valuesBody}
            </TextReveal>

            <StaggerGrid
              columns={3}
              gap={16}
              stagger={0.1}
              mode="wave"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              }}
            >
              {workCards.map((card) => (
                <WorkCard
                  key={card.number}
                  number={card.number}
                  title={card.title}
                  body={card.body}
                  delay={card.delay}
                />
              ))}
            </StaggerGrid>
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Stats strip ──────────────────────────────────── */}
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
            <StatBlock
              target={20}
              suffix="+"
              label={locale === "fr" ? "Ans sur les planchers d'usine" : locale === "es" ? "Años en plantas industriales" : "Years on factory floors"}
            />
            <StatBlock
              target={6}
              label={locale === "fr" ? "Pays. Même standard." : locale === "es" ? "Países. El mismo estándar." : "Countries. Same standard."}
            />
            <StatBlock
              target={5}
              label={locale === "fr" ? "Divisions. Une entreprise." : locale === "es" ? "Divisiones. Una empresa." : "Divisions. One company."}
            />
            <StatBlock
              target={50}
              suffix="+"
              label={locale === "fr" ? "Clients entreprise retenus" : locale === "es" ? "Clientes empresariales retenidos" : "Enterprise clients retained"}
            />
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Only We pull quote ────────────────────────────── */}
        <section
          ref={onlyWeRef}
          style={{
            padding: "160px 6%",
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
              height: 350,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.015) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {/* Opening quote mark */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={onlyWeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "6rem",
                lineHeight: 0.8,
                color: "rgba(255,255,255,0.07)",
                marginBottom: 24,
                userSelect: "none",
              }}
            >
              &ldquo;
            </motion.span>

            <BlurFade delay={0.2} blur="10px" duration={0.7} as="div">
            <motion.blockquote
              initial={{ opacity: 0, y: 32 }}
              animate={onlyWeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "#fff",
                lineHeight: 1.35,
                letterSpacing: "-0.025em",
                margin: 0,
                maxWidth: 960,
              }}
            >
              {t.narrative.onlyWe}
            </motion.blockquote>
            </BlurFade>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={onlyWeInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 40,
                width: 64,
                height: 1,
                background: "rgba(255,255,255,0.15)",
                transformOrigin: "left center",
              }}
            />
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
            {locale === "fr" ? "À vous de jouer" : locale === "es" ? "Su turno" : "Your move"}
          </p>

          <BlurFade delay={0.15} blur="10px" duration={0.7} as="div" style={{ position: "relative", zIndex: 1 }}>
          <TextReveal
            as="h2"
            mode="word"
            stagger={0.07}
            duration={0.7}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 24,
              maxWidth: 640,
              position: "relative",
              zIndex: 1,
            }}
          >
            {locale === "fr"
              ? "Parlez à l'ingénieur qui connaît votre secteur"
              : locale === "es"
                ? "Hable con el ingeniero que conoce su sector"
                : "Talk to the engineer who knows your industry"}
          </TextReveal>
          </BlurFade>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 460,
              lineHeight: 1.7,
              marginBottom: 40,
              position: "relative",
              zIndex: 1,
            }}
          >
            {t.contact.body}
          </motion.p>

          <div style={{ position: "relative", zIndex: 1 }}>
            <MagneticButton href="/contact" as="a" strength={0.4} radius={140}>
              {t.contact.cta}
            </MagneticButton>
          </div>
        </section>
      </main>
    </>
  );
}
