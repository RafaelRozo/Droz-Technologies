"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useIsMobile from "@/lib/useIsMobile";
import PageHero from "@/components/shared/PageHero";
import { TextReveal, SectionDivider } from "@/components/animations";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";

/* ─── Pill badge ─── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 11,
        fontWeight: 500,
        color: "rgba(255,255,255,0.45)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 20,
        padding: "5px 14px",
        borderRadius: 100,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </span>
  );
}

/* ─── Single policy section ─── */
interface PolicySectionProps {
  heading: string;
  children: React.ReactNode;
  index: number;
}

function PolicySection({ heading, children, index }: PolicySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(4px)" }}
      transition={{
        duration: 0.75,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
        gap: isMobile ? 16 : 48,
        alignItems: "start",
        padding: "48px 0",
      }}
    >
      {/* Section number + heading */}
      <div style={{ paddingTop: 4 }}>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: 14,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <TextReveal
          as="h2"
          mode="word"
          stagger={0.06}
          duration={0.6}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
            color: "#fff",
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            display: "block",
          }}
        >
          {heading}
        </TextReveal>
      </div>

      {/* Body copy */}
      <div>{children}</div>
    </motion.div>
  );
}

/* ─── Body paragraph ─── */
function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 300,
        fontSize: 15,
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.85,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

/* ─── Bullet list ─── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "16px 0 0",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              flexShrink: 0,
              marginTop: 10,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Page content definition by locale ─── */
interface PolicyContent {
  lastUpdated: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
    extra?: string;
  }[];
  contactClosing: string;
}

function getPrivacyContent(locale: string): PolicyContent {
  if (locale === "fr") {
    return {
      lastUpdated: "Dernière mise à jour : 1er janvier 2026",
      intro:
        "Droz Technologies Inc. s'engage à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles.",
      sections: [
        {
          heading: "Collecte d'informations",
          body: "Nous collectons des informations que vous nous fournissez directement lorsque vous utilisez nos services, soumettez des formulaires de contact ou interagissez avec notre site.",
          bullets: [
            "Nom, adresse courriel et nom de l'entreprise via les formulaires de contact",
            "Informations sur le projet fournies volontairement",
            "Données d'utilisation et analyses techniques (anonymisées)",
            "Données de cookies et de préférences du navigateur",
          ],
        },
        {
          heading: "Utilisation des données",
          body: "Vos informations sont utilisées exclusivement pour répondre à vos demandes et améliorer nos services.",
          bullets: [
            "Répondre à vos demandes de contact et de projet",
            "Personnaliser votre expérience sur notre site",
            "Améliorer nos offres de services et notre site web",
            "Respecter nos obligations légales et réglementaires",
          ],
          extra:
            "Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers à des fins de marketing sans votre consentement explicite.",
        },
        {
          heading: "Cookies",
          body: "Notre site utilise des cookies pour améliorer votre expérience de navigation.",
          bullets: [
            "Cookies essentiels : nécessaires au bon fonctionnement du site",
            "Cookies analytiques : Google Analytics pour les statistiques d'utilisation anonymisées",
            "Cookies de préférence : mémoriser vos paramètres de langue",
          ],
          extra:
            "Vous pouvez contrôler ou désactiver les cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter les fonctionnalités du site.",
        },
        {
          heading: "Services tiers",
          body: "Nous utilisons des services tiers de confiance pour faire fonctionner notre site et analyser son utilisation.",
          bullets: [
            "Google Analytics (analyse de trafic anonymisée)",
            "Meta Pixel (mesure des performances publicitaires)",
            "Fournisseurs d'hébergement et d'infrastructure cloud",
          ],
          extra:
            "Ces fournisseurs sont liés par des accords de traitement des données stricts et ne peuvent pas utiliser vos données à leurs propres fins.",
        },
        {
          heading: "Conservation et sécurité",
          body: "Nous conservons vos données personnelles uniquement le temps nécessaire aux fins pour lesquelles elles ont été collectées.",
          bullets: [
            "Les données de formulaire de contact sont conservées pendant 24 mois",
            "Les données analytiques sont anonymisées et conservées pendant 14 mois maximum",
            "Les données de projet peuvent être conservées pour la durée de notre relation commerciale",
          ],
          extra:
            "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations contre tout accès non autorisé.",
        },
        {
          heading: "Nous contacter",
          body: "Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits en matière de protection des données, contactez-nous à :",
          extra: "privacy@droztechnologies.com\nDroz Technologies Inc.\nBurlington, Ontario, Canada",
        },
      ],
      contactClosing:
        "Nous nous engageons à répondre à toutes les demandes dans les 30 jours suivant leur réception.",
    };
  }

  if (locale === "es") {
    return {
      lastUpdated: "Última actualización: 1 de enero de 2026",
      intro:
        "Droz Technologies Inc. se compromete a proteger su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal.",
      sections: [
        {
          heading: "Recopilación de información",
          body: "Recopilamos información que usted nos proporciona directamente cuando utiliza nuestros servicios, envía formularios de contacto o interactúa con nuestro sitio.",
          bullets: [
            "Nombre, correo electrónico y nombre de empresa a través de formularios de contacto",
            "Información sobre proyectos proporcionada voluntariamente",
            "Datos de uso y análisis técnicos (anonimizados)",
            "Datos de cookies y preferencias del navegador",
          ],
        },
        {
          heading: "Uso de datos",
          body: "Su información se utiliza exclusivamente para responder a sus consultas y mejorar nuestros servicios.",
          bullets: [
            "Responder a sus consultas de contacto y proyecto",
            "Personalizar su experiencia en nuestro sitio",
            "Mejorar nuestras ofertas de servicios y sitio web",
            "Cumplir con nuestras obligaciones legales y reglamentarias",
          ],
          extra:
            "No vendemos, arrendamos ni compartimos su información personal con terceros con fines de marketing sin su consentimiento explícito.",
        },
        {
          heading: "Cookies",
          body: "Nuestro sitio utiliza cookies para mejorar su experiencia de navegación.",
          bullets: [
            "Cookies esenciales: necesarias para el correcto funcionamiento del sitio",
            "Cookies analíticas: Google Analytics para estadísticas de uso anonimizadas",
            "Cookies de preferencia: recordar su configuración de idioma",
          ],
          extra:
            "Puede controlar o desactivar las cookies a través de la configuración de su navegador. Tenga en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio.",
        },
        {
          heading: "Servicios de terceros",
          body: "Utilizamos servicios de terceros de confianza para operar nuestro sitio y analizar su uso.",
          bullets: [
            "Google Analytics (análisis de tráfico anonimizado)",
            "Meta Pixel (medición del rendimiento publicitario)",
            "Proveedores de alojamiento e infraestructura en la nube",
          ],
          extra:
            "Estos proveedores están sujetos a estrictos acuerdos de procesamiento de datos y no pueden utilizar sus datos para sus propios fines.",
        },
        {
          heading: "Retención y seguridad",
          body: "Conservamos sus datos personales solo durante el tiempo necesario para los fines para los que fueron recopilados.",
          bullets: [
            "Los datos del formulario de contacto se conservan durante 24 meses",
            "Los datos analíticos se anonimizan y conservan por un máximo de 14 meses",
            "Los datos del proyecto pueden conservarse durante la duración de nuestra relación comercial",
          ],
          extra:
            "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información contra el acceso no autorizado.",
        },
        {
          heading: "Contáctenos",
          body: "Para cualquier pregunta sobre esta política de privacidad o para ejercer sus derechos de protección de datos, contáctenos en:",
          extra: "privacy@droztechnologies.com\nDroz Technologies Inc.\nBurlington, Ontario, Canadá",
        },
      ],
      contactClosing:
        "Nos comprometemos a responder todas las solicitudes dentro de los 30 días posteriores a su recepción.",
    };
  }

  // English (default)
  return {
    lastUpdated: "Last updated: January 1, 2026",
    intro:
      "Droz Technologies Inc. is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you interact with our website and services.",
    sections: [
      {
        heading: "Information Collection",
        body: "We collect information you provide directly when using our services, submitting contact forms, or otherwise interacting with our website.",
        bullets: [
          "Name, email address, and company name via contact forms",
          "Project information provided voluntarily",
          "Usage data and technical analytics (anonymised)",
          "Cookie and browser preference data",
        ],
      },
      {
        heading: "Data Usage",
        body: "Your information is used solely to respond to your enquiries and continuously improve our services.",
        bullets: [
          "Responding to contact and project enquiries",
          "Personalising your experience on our site",
          "Improving our service offerings and website",
          "Meeting our legal and regulatory obligations",
        ],
        extra:
          "We do not sell, rent, or share your personal information with third parties for marketing purposes without your explicit consent.",
      },
      {
        heading: "Cookies",
        body: "Our website uses cookies to enhance your browsing experience and provide usage analytics.",
        bullets: [
          "Essential cookies: required for the site to function correctly",
          "Analytics cookies: Google Analytics for anonymised usage statistics",
          "Preference cookies: remembering your language and display settings",
        ],
        extra:
          "You may control or disable cookies through your browser settings. Please note that disabling certain cookies may affect site functionality.",
      },
      {
        heading: "Third Parties",
        body: "We work with trusted third-party service providers to operate our website and analyse its usage.",
        bullets: [
          "Google Analytics (anonymised traffic analysis)",
          "Meta Pixel (advertising performance measurement)",
          "Cloud infrastructure and hosting providers",
        ],
        extra:
          "These providers are bound by strict data processing agreements and may not use your data for their own purposes.",
      },
      {
        heading: "Retention & Security",
        body: "We retain your personal data only as long as necessary for the purposes it was collected.",
        bullets: [
          "Contact form data is retained for 24 months",
          "Analytics data is anonymised and retained for a maximum of 14 months",
          "Project data may be retained for the duration of our business relationship",
        ],
        extra:
          "We implement appropriate technical and organisational security measures to protect your information against unauthorised access, loss, or disclosure.",
      },
      {
        heading: "Contact Us",
        body: "For any questions about this Privacy Policy or to exercise your data protection rights, please reach us at:",
        extra: "privacy@droztechnologies.com\nDroz Technologies Inc.\nBurlington, Ontario, Canada",
      },
    ],
    contactClosing:
      "We are committed to responding to all requests within 30 days of receipt.",
  };
}

/* ─── Page ─── */
export default function PrivacyClient() {
  const isMobile = useIsMobile();
  const { locale } = useLocale();
  const t = getTexts(locale);
  const content = getPrivacyContent(locale);

  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef as React.RefObject<Element>, { once: true, margin: "-60px" });

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <PageHero
        title={locale === "fr" ? "Politique de confidentialité" : locale === "es" ? "Política de privacidad" : "Privacy Policy"}
        pill={locale === "fr" ? "Juridique" : locale === "es" ? "Legal" : "Legal"}
        showMesh={false}
        showNoise={false}
      />

      {/* ── Last updated + intro ── */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "80px 48px 0",
        }}
      >
        <motion.div
          ref={introRef}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={introInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(4px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            padding: "32px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            marginBottom: 64,
          }}
        >
          <div
            style={{
              width: 4,
              alignSelf: "stretch",
              minHeight: 40,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 10,
              }}
            >
              {content.lastUpdated}
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
              }}
            >
              {content.intro}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Policy sections ── */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 48px 80px",
        }}
      >
        {content.sections.map((section, i) => (
          <div key={section.heading}>
            <PolicySection heading={section.heading} index={i}>
              <BodyText>{section.body}</BodyText>
              {section.bullets && <BulletList items={section.bullets} />}
              {section.extra && (
                <div style={{ marginTop: section.bullets ? 20 : 0 }}>
                  {section.extra.split("\n").map((line, li) => (
                    <p
                      key={li}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: line.includes("@") || line.includes(".com") ? 400 : 300,
                        fontSize: 15,
                        color: line.includes("@") || line.includes(".com")
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(255,255,255,0.4)",
                        lineHeight: 1.7,
                        marginBottom: 4,
                        letterSpacing: line.includes("@") ? "0.01em" : 0,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </PolicySection>
            {i < content.sections.length - 1 && (
              <SectionDivider color="rgba(255,255,255,0.05)" />
            )}
          </div>
        ))}

        {/* ── Closing note ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 64,
            padding: "32px",
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <Pill>
            {locale === "fr" ? "Droz Technologies" : locale === "es" ? "Droz Technologies" : "Droz Technologies"}
          </Pill>
          <p
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.6,
              maxWidth: 480,
              margin: "0 auto 16px",
              letterSpacing: "-0.01em",
            }}
          >
            {content.contactClosing}
          </p>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {t.footer.copyright}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
