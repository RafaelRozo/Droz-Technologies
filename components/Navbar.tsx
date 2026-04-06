"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts, LOCALE_LABELS, Locale } from "@/lib/i18n";

const locales: Locale[] = ["en", "fr", "es"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = getTexts(locale);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.divisions, href: "/#divisions" },
    { label: t.nav.solutions, href: "/solutions" },
    { label: "Insights", href: "/blog" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <nav aria-label="Main navigation" style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
      background: scrolled ? "rgba(10,10,10,0.72)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "padding 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease",
      padding: scrolled ? "16px 48px" : "24px 48px",
    }}>
      <div style={{
        maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" aria-label="Droz Technologies - Home" style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: scrolled ? "1.375rem" : "1.5rem",
          color: "#f0f0f0", textDecoration: "none", letterSpacing: "0.02em",
          transition: "font-size 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.2s ease",
        }}
          onMouseEnter={(e) => { (e.currentTarget).style.transform = "scale(1.02)"; }}
          onMouseLeave={(e) => { (e.currentTarget).style.transform = "scale(1)"; }}
        >
          Droz
        </a>

        {/* Center Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="link-slide" style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: 14, color: "rgba(255,255,255,0.55)",
              textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.25s ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget).style.color = "rgba(255,255,255,1)"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = "rgba(255,255,255,0.55)"; }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: Language + Login */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div role="group" aria-label="Language selection" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {locales.map((l, i) => (
              <span key={l} style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => setLocale(l)}
                  aria-label={`Switch language to ${LOCALE_LABELS[l]}`}
                  aria-current={locale === l ? "true" : undefined}
                  style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: locale === l ? 500 : 400,
                    letterSpacing: "0.06em", color: locale === l ? "#fff" : "rgba(255,255,255,0.35)",
                    background: "none", border: "none", cursor: "pointer", padding: "4px 6px",
                    transition: "color 0.25s ease, opacity 0.25s ease",
                  }}
                  onMouseEnter={(e) => { if (locale !== l) (e.currentTarget).style.color = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { if (locale !== l) (e.currentTarget).style.color = "rgba(255,255,255,0.35)"; }}
                >
                  {LOCALE_LABELS[l]}
                </button>
                {i < locales.length - 1 && (
                  <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, margin: "0 2px" }}>/</span>
                )}
              </span>
            ))}
          </div>

          <a href="#login" style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.03em",
            padding: "8px 22px", borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
            color: "#f0f0f0", textDecoration: "none",
            transition: "border-color 0.3s ease, background 0.3s ease",
          }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.4)"; el.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.15)"; el.style.background = "transparent"; }}
          >
            {t.nav.login}
          </a>
        </div>
      </div>
    </nav>
  );
}
