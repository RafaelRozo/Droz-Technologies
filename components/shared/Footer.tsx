"use client";

import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";
import useIsMobile from "@/lib/useIsMobile";

export default function Footer() {
  const { locale } = useLocale();
  const t = getTexts(locale);
  const isMobile = useIsMobile();

  return (
    <footer aria-label="Site footer" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: isMobile ? "48px 20px 32px" : "80px 48px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 32 : 60, marginBottom: 48 }}>
        <div>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "1.75rem", color: "#fff", fontWeight: 400, marginBottom: 4 }}>
            Droz
          </h2>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(255,255,255,0.4)", fontWeight: 400, marginBottom: 4 }}>
            Droz Technologies
          </p>
          <p aria-hidden="true" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 16 }}>
            5 Divisions, 1 Company.
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: 320 }}>
            {t.footer.tagline}
          </p>
          <div style={{ marginTop: 20, fontSize: 14, color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
            <p>{t.footer.company}</p>
            <p>{t.footer.location}</p>
            <p style={{ marginTop: 8 }}>
              <a href="mailto:ricardorozo@droztechnologies.com" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.25s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}>
                ricardorozo@droztechnologies.com
              </a>
            </p>
          </div>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
            {t.footer.quickLinks}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { label: t.nav.about, href: "/about" },
              { label: t.nav.solutions, href: "/solutions" },
              { label: "Insights", href: "/blog" },
              { label: t.nav.contact, href: "/contact" },
              { label: locale === "fr" ? "Confidentialite" : locale === "es" ? "Privacidad" : "Privacy", href: "/privacy" },
            ].map((link) => (
              <li key={link.label} style={{ marginBottom: 14 }}>
                <a href={link.href} className="link-slide" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "4px 10px", marginLeft: -10, borderRadius: 8, transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { const el = e.target as HTMLElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { const el = e.target as HTMLElement; el.style.color = "rgba(255,255,255,0.5)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
            {t.footer.divisions}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { name: t.divisionsGrid[0]?.name, href: "/divisions/predictive-maintenance" },
              { name: t.divisionsGrid[1]?.name, href: "/divisions/software-development" },
              { name: t.divisionsGrid[2]?.name, href: "/divisions/intelligent-construction" },
              { name: t.divisionsGrid[3]?.name, href: "/divisions/industrial-manufacturing" },
              { name: t.divisionsGrid[4]?.name, href: "/divisions/ai-consulting" },
            ].map((div) => (
              <li key={div.name} style={{ marginBottom: 14 }}>
                <a href={div.href} className="link-slide" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "4px 10px", marginLeft: -10, borderRadius: 8, transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { const el = e.target as HTMLElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { const el = e.target as HTMLElement; el.style.color = "rgba(255,255,255,0.5)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}>
                  {div.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "center" : "center", gap: isMobile ? 12 : 0 }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'Outfit', sans-serif" }}>{t.footer.copyright}</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Outfit', sans-serif", fontWeight: 300, letterSpacing: "0.04em" }}>
          Also known as Rozo Industries
        </p>
        <a href="mailto:ricardorozo@droztechnologies.com" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "'Outfit', sans-serif", transition: "color 0.25s ease" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}>
          ricardorozo@droztechnologies.com
        </a>
      </div>
    </footer>
  );
}
