"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";
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
  BlurFade,
} from "@/components/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Division {
  name: string;
  slug: string;
  painPoint: string;
  solution: string;
  cta: string;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

// STATS are built inside the component to access locale — see below

// ─── Solution card ────────────────────────────────────────────────────────────

function SolutionCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <TiltCard tiltDegree={5} glowOpacity={0.07} glowSize={500} style={{ height: "100%" }}>
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
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            flexGrow: 1,
          }}
        >
          {desc}
        </p>

        <div
          style={{
            width: 32,
            height: 1,
            background: "rgba(255,255,255,0.1)",
            marginTop: 8,
          }}
        />
      </div>
    </TiltCard>
  );
}

// ─── Stat block ───────────────────────────────────────────────────────────────

function StatBlock({ target, suffix, prefix, label }: { target: number; suffix: string; prefix: string; label: string }) {
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
        <CounterSpring target={target} suffix={suffix} prefix={prefix} duration={2.4} overshoot={0.06} />
      </span>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Division link card ───────────────────────────────────────────────────────

function DivisionCard({ name, slug, painPoint, solution, cta }: Division) {
  return (
    <Link
      href={`/divisions/${slug}`}
      style={{
        display: "block",
        padding: "28px 32px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 16,
        textDecoration: "none",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.01)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.12)";
        el.style.background = "rgba(255,255,255,0.05)";
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2), 0 0 12px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.02)";
        el.style.transform = "translateY(-2px)";
        const arrow = e.currentTarget.querySelector('.division-card-arrow') as HTMLElement;
        if (arrow) { arrow.style.color = "rgba(255,255,255,0.6)"; arrow.style.transform = "rotate(-45deg) translate(2px, -2px)"; }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.05)";
        el.style.background = "rgba(255,255,255,0.02)";
        el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.01)";
        el.style.transform = "";
        const arrow = e.currentTarget.querySelector('.division-card-arrow') as HTMLElement;
        if (arrow) { arrow.style.color = "rgba(255,255,255,0.2)"; arrow.style.transform = "rotate(-45deg)"; }
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "#fff",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {name}
        </h3>
        <span
          className="division-card-arrow"
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.2)",
            transform: "rotate(-45deg)",
            display: "inline-block",
            flexShrink: 0,
            marginTop: 2,
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
        >
          ↗
        </span>
      </div>

      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.65,
          marginBottom: 12,
          fontStyle: "italic",
        }}
      >
        {painPoint}
      </p>

      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          fontWeight: 400,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.6,
        }}
      >
        {solution}
      </p>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {cta}
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>→</span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SolutionsClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);

  const STATS: { target: number; suffix: string; prefix: string; label: string }[] = [
    {
      target: 100,
      suffix: "+",
      prefix: "",
      label:
        locale === "fr"
          ? "Solutions livrées"
          : locale === "es"
            ? "Soluciones entregadas"
            : "Solutions Delivered",
    },
    {
      target: 12,
      suffix: "",
      prefix: "",
      label:
        locale === "fr"
          ? "Industries desservies"
          : locale === "es"
            ? "Industrias atendidas"
            : "Industries Served",
    },
    {
      target: 6,
      suffix: "",
      prefix: "",
      label:
        locale === "fr"
          ? "Pays actifs"
          : locale === "es"
            ? "Países activos"
            : "Countries Active",
    },
    {
      target: 95,
      suffix: "%",
      prefix: "",
      label:
        locale === "fr"
          ? "Rétention clients"
          : locale === "es"
            ? "Retención de clientes"
            : "Client Retention",
    },
  ];

  const divisions: Division[] = t.divisionsGrid.map((d) => ({
    name: d.name,
    slug: d.slug,
    painPoint: d.painPoint,
    solution: d.solution,
    cta: d.cta,
  }));

  return (
    <>
      <ScrollProgressBar />

      <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <PageHero
          title={t.solutions.heading}
          subtitle={t.solutions.subtitle}
          pill={
            locale === "fr"
              ? "Ce qu'on livre"
              : locale === "es"
                ? "Lo que entregamos"
                : "What We Deliver"
          }
          textRevealMode="word"
          showNoise
          showMesh
        />

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Only We statement ────────────────────────────── */}
        <section
          style={{
            padding: "140px 6%",
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
              width: 900,
              height: 400,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.016) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
              gap: isMobile ? 24 : 80,
              alignItems: "center",
            }}
          >
            {/* Left: label + line */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 28,
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
                    ? "Ce que personne d'autre ne fait"
                    : locale === "es"
                      ? "Lo que nadie más hace"
                      : "Only We"}
                </span>
              </div>

              <BlurFade delay={0.2} blur="10px" duration={0.7} as="div">
              <TextReveal
                as="h2"
                mode="word"
                stagger={0.07}
                duration={0.65}
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  color: "#fff",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  display: "block",
                }}
              >
                {locale === "fr"
                  ? "L'avantage que personne d'autre n'a"
                  : locale === "es"
                    ? "La ventaja que nadie más tiene"
                    : "The advantage nobody else has"}
              </TextReveal>
              </BlurFade>
            </div>

            {/* Right: onlyWe statement */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  padding: isMobile ? "32px 24px" : "48px 48px",
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top border gradient */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 40%, rgba(255,255,255,0.20) 60%, transparent 100%)",
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
                    color: "rgba(255,255,255,0.06)",
                    marginBottom: 20,
                    userSelect: "none",
                  }}
                >
                  &ldquo;
                </span>

                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t.narrative.onlyWe}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Solutions grid ────────────────────────────────── */}
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
                marginBottom: 64,
              }}
            >
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.2)" }} />
              <TextReveal
                as="span"
                mode="char"
                stagger={0.025}
                duration={0.45}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {locale === "fr"
                  ? "Systèmes en production"
                  : locale === "es"
                    ? "Sistemas en producción"
                    : "Running Systems"}
              </TextReveal>
            </div>

            <StaggerGrid
              columns={3}
              gap={16}
              stagger={0.09}
              mode="wave"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              }}
            >
              {t.solutions.items.map((item, i) => (
                <SolutionCard key={i} title={item.title} desc={item.desc} index={i} />
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
          <ScrollVelocityText baseVelocity={-0.6}>
            {locale === "fr"
              ? "Analytique prédictive · Logiciels d'entreprise · IoT industriel · Intégration IA · Jumeaux numériques · Systèmes d'automatisation · En production. Mesuré. Prouvé."
              : locale === "es"
                ? "Analítica predictiva · Software empresarial · IoT industrial · Integración de IA · Gemelos digitales · Sistemas de automatización · En producción. Medido. Comprobado."
                : "Predictive Analytics · Enterprise Software · Industrial IoT · AI Integration · Digital Twins · Automation Systems · Running. Measured. Proven."}
          </ScrollVelocityText>
        </div>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Division connections ──────────────────────────── */}
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
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
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
                      ? "L'avantage des cinq divisions"
                      : locale === "es"
                        ? "La ventaja de cinco divisiones"
                        : "The five-division advantage"}
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
                    marginBottom: 20,
                    display: "block",
                  }}
                >
                  {locale === "fr"
                    ? "Cinq divisions. Une vision unifiée."
                    : locale === "es"
                      ? "Cinco divisiones. Una visión unificada."
                      : "Five divisions, one unified vision"}
                </TextReveal>
                </BlurFade>

                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 15,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.75,
                    maxWidth: 360,
                    marginBottom: 40,
                  }}
                >
                  {locale === "fr"
                    ? "Chaque solution est livrée par une ou plusieurs de nos divisions spécialisées. Une expertise profonde, réunie pour une transformation opérationnelle totale."
                    : locale === "es"
                      ? "Cada solución es entregada por una o más de nuestras divisiones especializadas. Experiencia profunda, reunida para una transformación operacional total."
                      : "Each solution is delivered through one or more of our specialized divisions — deep expertise brought together for total operational transformation. No subcontracting. No handoffs."}
                </p>

                <MagneticButton href="/#divisions" as="a" strength={0.3} radius={120}>
                  {locale === "fr"
                    ? "Explorer les divisions"
                    : locale === "es"
                      ? "Explorar divisiones"
                      : "Explore All Divisions"}
                </MagneticButton>
              </div>

              {/* Right: division cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {divisions.map((d) => (
                  <DivisionCard
                    key={d.slug}
                    name={d.name}
                    slug={d.slug}
                    painPoint={d.painPoint}
                    solution={d.solution}
                    cta={d.cta}
                  />
                ))}
              </div>
            </div>
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
            {STATS.map((s, i) => (
              <StatBlock
                key={i}
                target={s.target}
                suffix={s.suffix}
                prefix={s.prefix}
                label={s.label}
              />
            ))}
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
            {locale === "fr" ? "Votre problème, notre terrain" : locale === "es" ? "Su problema, nuestro terreno" : "Your problem, our terrain"}
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
              ? "Pas de slides. Des systèmes qui tournent."
              : locale === "es"
                ? "Sin diapositivas. Sistemas que funcionan."
                : "No slides. Running systems."}
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
            <MagneticButton href="/contact" as="a" strength={0.35} radius={140}>
              {t.contact.cta}
            </MagneticButton>
          </div>
        </section>
      </main>
    </>
  );
}
