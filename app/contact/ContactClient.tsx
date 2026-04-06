"use client";

import { useState, useRef, useCallback, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";
import PageHero from "@/components/shared/PageHero";
import {
  MagneticButton,
  SectionDivider,
  TextReveal,
  NoiseOverlay,
  ScrollProgressBar,
  PlanStep,
  BlurFade,
} from "@/components/animations";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";

// ─── Floating label input ─────────────────────────────────────────────────────

interface FloatingInputProps {
  label: string;
  type?: string;
  textarea?: boolean;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function FloatingInput({
  label,
  type = "text",
  textarea = false,
  name,
  value,
  required = false,
  onChange,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const inputId = `contact-field-${name}`;

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "#111",
    border: "1px solid",
    borderColor: focused ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: textarea ? "32px 20px 16px" : "26px 20px 10px",
    color: "#fff",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 300,
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: focused ? "0 0 0 3px rgba(255,255,255,0.03)" : "none",
    resize: "none",
    lineHeight: 1.6,
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    left: 20,
    top: active ? (textarea ? 10 : 8) : textarea ? 20 : 18,
    fontSize: active ? 10 : 15,
    fontFamily: "'Outfit', sans-serif",
    fontWeight: active ? 500 : 300,
    color: active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.22)",
    transition: "all 0.2s ease",
    pointerEvents: "none",
    letterSpacing: active ? "0.08em" : "0",
    textTransform: active ? "uppercase" : "none",
  };

  const handlers = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={inputId} style={labelStyle}>
        {label}{required && <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.5)", marginLeft: 2 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={inputId}
          name={name}
          rows={6}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          style={fieldStyle as React.CSSProperties}
          {...handlers}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          style={fieldStyle}
          {...handlers}
        />
      )}
    </div>
  );
}

// ─── Info item ────────────────────────────────────────────────────────────────

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again or email us directly at ricardorozo@droztechnologies.com");
      setSubmitting(false);
    }
  };

  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef as React.RefObject<Element>, { once: true, margin: "-60px" });

  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef as React.RefObject<Element>, { once: true, margin: "-60px" });

  const planSteps = [
    {
      number: 1,
      title:
        locale === "fr"
          ? "On vous appelle"
          : locale === "es"
            ? "Le llamamos"
            : "We call you",
      description:
        locale === "fr"
          ? "Un ingénieur, pas un représentant commercial. Dans les 24 heures."
          : locale === "es"
            ? "Un ingeniero, no un representante de ventas. Dentro de 24 horas."
            : "An engineer, not a sales rep. Within 24 hours.",
      direction: "left" as const,
      delay: 0,
    },
    {
      number: 2,
      title:
        locale === "fr"
          ? "On vous écoute"
          : locale === "es"
            ? "Lo escuchamos"
            : "We listen",
      description:
        locale === "fr"
          ? "Dites-nous ce qui est brisé. Nous vous dirons ce que nous avons déjà vu."
          : locale === "es"
            ? "Cuéntenos qué está roto. Le diremos lo que ya hemos visto."
            : "Tell us what's breaking. We'll tell you what we've seen — because we've likely seen it before.",
      direction: "center" as const,
      delay: 0.1,
    },
    {
      number: 3,
      title:
        locale === "fr"
          ? "On vous montre"
          : locale === "es"
            ? "Le mostramos"
            : "We show you",
      description:
        locale === "fr"
          ? "Une évaluation personnalisée de votre situation. Pas de démos génériques."
          : locale === "es"
            ? "Una evaluación personalizada de su situación. Sin demos genéricas."
            : "A custom assessment of your situation. No generic demos. No dog-and-pony shows.",
      direction: "right" as const,
      delay: 0.2,
    },
  ];

  const infoItems: InfoItemProps[] = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: locale === "fr" ? "Adresse" : locale === "es" ? "Dirección" : "Address",
      value: "Burlington, Ontario, Canada",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: locale === "fr" ? "Courriel" : locale === "es" ? "Correo" : "Email",
      value: "hello@droztechnologies.com",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      label: locale === "fr" ? "Présence" : locale === "es" ? "Presencia" : "Presence",
      value:
        locale === "fr"
          ? "6 pays — Amériques et au-delà"
          : locale === "es"
            ? "6 países — Américas y más allá"
            : "6 countries — Americas & beyond",
    },
  ];

  return (
    <>
      <ScrollProgressBar />

      <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <PageHero
          title={t.contact.heading}
          subtitle={t.contact.body}
          pill={
            locale === "fr"
              ? "À vous de jouer"
              : locale === "es"
                ? "Su turno"
                : "Your Move"
          }
          textRevealMode="word"
          showMesh
          showNoise={false}
        />

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── What happens next ─────────────────────────────── */}
        <section
          style={{
            padding: "100px 6% 80px",
            background: "#0a0a0a",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
                  ? "Ce qui se passe ensuite"
                  : locale === "es"
                    ? "Qué pasa después"
                    : "What happens next"}
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
                marginBottom: 64,
                display: "block",
                maxWidth: 700,
              }}
            >
              {locale === "fr"
                ? "Aucun script de vente. Seulement des ingénieurs honnêtes."
                : locale === "es"
                  ? "Sin guión de ventas. Solo ingenieros honestos."
                  : "No sales script. Just honest engineers."}
            </TextReveal>
            </BlurFade>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: 48,
              }}
            >
              {planSteps.map((step) => (
                <PlanStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  direction={step.direction}
                  isLast={step.number === planSteps.length}
                  delay={step.delay}
                />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider style={{ margin: "0 10%" }} />

        {/* ── Content split: company info + form ───────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: isMobile ? "48px 20px" : "120px 6% 160px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? 32 : 80,
            alignItems: "start",
          }}
        >
          {/* ── Left: company info ── */}
          <div ref={leftRef}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 48 }}
            >
              <BlurFade delay={0.2} blur="10px" duration={0.7} as="div">
              <TextReveal
                as="h2"
                mode="word"
                stagger={0.07}
                duration={0.65}
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  display: "block",
                  marginBottom: 16,
                }}
              >
                {locale === "fr"
                  ? "Vous parlerez à un ingénieur"
                  : locale === "es"
                    ? "Hablará con un ingeniero"
                    : "You'll talk to an engineer"}
              </TextReveal>
              </BlurFade>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.75,
                  marginBottom: 8,
                }}
              >
                {locale === "fr"
                  ? "Pas un représentant commercial qui va transmettre votre demande à quelqu'un d'autre. Un ingénieur qui a été sur un plancher d'usine cette semaine."
                  : locale === "es"
                    ? "No un representante de ventas que va a pasar su solicitud a otra persona. Un ingeniero que ha estado en una planta industrial esta semana."
                    : "Not a sales rep who will forward your inquiry to someone else. An engineer who's been on a factory floor this week."}
              </p>
            </motion.div>

            {/* Contact info items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}
            >
              {infoItems.map((item) => (
                <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
              ))}
            </motion.div>

            {/* Response time + division cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: "24px 20px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    marginBottom: 8,
                  }}
                >
                  {locale === "fr" ? "Délai de réponse" : locale === "es" ? "Tiempo de respuesta" : "Response time"}
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {locale === "fr" ? "Sous 24 heures" : locale === "es" ? "Menos de 24 horas" : "Under 24 hours"}
                </p>
              </div>
              <div
                style={{
                  padding: "24px 20px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    marginBottom: 8,
                  }}
                >
                  {locale === "fr" ? "Divisions" : locale === "es" ? "Divisiones" : "Divisions"}
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {locale === "fr"
                    ? "5 divisions spécialisées"
                    : locale === "es"
                      ? "5 divisiones especializadas"
                      : "5 specialized divisions"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <div ref={rightRef}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={rightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "48px 40px",
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
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.18) 60%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: "center", padding: "40px 0" }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 28px",
                    }}
                  >
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "1.75rem",
                      color: "#fff",
                      marginBottom: 12,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {locale === "fr"
                      ? "Message envoyé"
                      : locale === "es"
                        ? "Mensaje enviado"
                        : "Message sent"}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.7,
                      maxWidth: 340,
                      margin: "0 auto",
                    }}
                  >
                    {locale === "fr"
                      ? "Un ingénieur vous contactera dans les 24 heures. Pas un commercial — quelqu'un qui comprend votre problème."
                      : locale === "es"
                        ? "Un ingeniero se comunicará con usted dentro de las 24 horas. No un vendedor — alguien que entiende su problema."
                        : "An engineer will reach out within 24 hours. Not a salesperson — someone who understands your problem."}
                  </p>
                </motion.div>
              ) : (
                /* ── Form fields ── */
                <form onSubmit={handleSubmit} aria-label="Contact form" noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ marginBottom: 8 }}>
                    <h3
                      style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "1.5rem",
                        color: "#fff",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        marginBottom: 6,
                      }}
                    >
                      {locale === "fr"
                        ? "Décrivez votre problème"
                        : locale === "es"
                          ? "Describa su problema"
                          : "Describe your problem"}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: 1.6,
                      }}
                    >
                      {locale === "fr"
                        ? "Pas de jargon requis. Parlez comme vous parleriez à votre équipe."
                        : locale === "es"
                          ? "No se requiere jerga. Hable como hablaría con su equipo."
                          : "No jargon required. Talk to us like you'd talk to your team."}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <FloatingInput
                      label={t.contact.form.name}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <FloatingInput
                      label={t.contact.form.email}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <FloatingInput
                    label={t.contact.form.company}
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />

                  <FloatingInput
                    label={t.contact.form.message}
                    textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />

                  <div
                    style={{
                      height: 1,
                      background: "rgba(255,255,255,0.06)",
                      margin: "4px 0",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.30)",
                        lineHeight: 1.6,
                        maxWidth: 200,
                      }}
                    >
                      {locale === "fr"
                        ? "Vos données ne seront jamais partagées."
                        : locale === "es"
                          ? "Sus datos nunca serán compartidos."
                          : "Your data will never be shared."}
                    </p>

                    {error && (
                      <p style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 400,
                        color: "#ff6b6b", textAlign: "center", marginBottom: 12,
                        padding: "12px 16px", borderRadius: 8,
                        background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.15)",
                      }}>
                        {error}
                      </p>
                    )}

                    <MagneticButton
                      as="button"
                      strength={0.35}
                      disabled={submitting}
                      aria-disabled={submitting}
                      style={
                        submitting
                          ? { opacity: 0.6, cursor: "not-allowed" }
                          : {}
                      }
                    >
                      {submitting
                        ? locale === "fr"
                          ? "Envoi..."
                          : locale === "es"
                            ? "Enviando..."
                            : "Sending..."
                        : t.contact.form.send}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
