"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts, LOCALE_LABELS, Locale } from "@/lib/i18n";

const locales: Locale[] = ["en", "fr", "es"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = getTexts(locale);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on ESC key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

        {/* Center Nav Links — hidden on mobile via .nav-links class */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 48 }}>
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

          <a href="#login" className="nav-links" style={{
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

          {/* Hamburger — shown only on mobile via .nav-mobile-toggle class */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              flexDirection: "column", justifyContent: "center", alignItems: "center",
              gap: 5, padding: 8, width: 40, height: 40,
            }}
          >
            <span style={{
              display: "block", width: 22, height: 2, background: "#f0f0f0",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block", width: 22, height: 2, background: "#f0f0f0",
              transition: "opacity 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 22, height: 2, background: "#f0f0f0",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        id="mobile-nav-menu"
        className={`nav-mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 6vw, 2.25rem)",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.color = "rgba(255,255,255,0.85)"; }}
          >
            {item.label}
          </a>
        ))}

        {/* Language switcher inside mobile menu */}
        <div role="group" aria-label="Language selection" style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
          {locales.map((l, i) => (
            <span key={l} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => { setLocale(l); closeMenu(); }}
                aria-label={`Switch language to ${LOCALE_LABELS[l]}`}
                aria-current={locale === l ? "true" : undefined}
                style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: locale === l ? 500 : 400,
                  letterSpacing: "0.06em", color: locale === l ? "#fff" : "rgba(255,255,255,0.4)",
                  background: "none", border: "none", cursor: "pointer", padding: "4px 8px",
                  transition: "color 0.2s ease",
                }}
              >
                {LOCALE_LABELS[l]}
              </button>
              {i < locales.length - 1 && (
                <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>/</span>
              )}
            </span>
          ))}
        </div>

        {/* Login button inside mobile menu */}
        <a
          href="#login"
          onClick={closeMenu}
          style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 400, letterSpacing: "0.03em",
            padding: "12px 32px", borderRadius: 9999, marginTop: 8,
            border: "1px solid rgba(255,255,255,0.2)", background: "transparent",
            color: "#f0f0f0", textDecoration: "none",
            transition: "border-color 0.3s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.5)"; el.style.background = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.2)"; el.style.background = "transparent"; }}
        >
          {t.nav.login}
        </a>
      </div>
    </nav>
  );
}
