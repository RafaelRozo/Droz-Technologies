"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts, LOCALE_LABELS, Locale } from "@/lib/i18n";

const locales: Locale[] = ["en", "fr", "es"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);
  const [mobileLoginHovered, setMobileLoginHovered] = useState(false);
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
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 50,
      padding: scrolled ? "10px 16px" : "16px 16px",
      transition: "padding 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* ── Glass capsule container ── */}
      <div style={{
        maxWidth: 1360,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background: scrolled
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.005)",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
        border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)"}`,
        boxShadow: scrolled
          ? [
              "0 8px 32px rgba(0,0,0,0.4)",
              "0 2px 8px rgba(0,0,0,0.2)",
              "inset 0 1px 0 rgba(255,255,255,0.1)",
              "inset 0 -1px 0 rgba(255,255,255,0.02)",
            ].join(", ")
          : "0 0 0 rgba(0,0,0,0)",
        padding: scrolled ? "12px 32px" : "14px 36px",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Top specular highlight — the glass "bubble" sheen */}
        <span style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "50%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)",
          borderRadius: "16px 16px 50% 50%",
          pointerEvents: "none",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.5s ease",
        }} />

        {/* Inner flex layout */}
        <div style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* ── Logo ── */}
          <a href="/" aria-label="Droz Technologies - Home" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: scrolled ? "1.375rem" : "1.5rem",
            color: "#f0f0f0",
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "font-size 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.2s ease, text-shadow 0.3s ease",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.textShadow = "0 0 24px rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.textShadow = "none";
            }}
          >
            Droz
          </a>

          {/* ── Center Nav Links — glass pill hovers ── */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="link-slide" style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                padding: "7px 16px",
                borderRadius: 10,
                background: "transparent",
                transition: "color 0.25s ease, background 0.3s ease, box-shadow 0.3s ease",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "rgba(255,255,255,1)";
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "rgba(255,255,255,0.55)";
                  el.style.background = "transparent";
                  el.style.boxShadow = "none";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── Right: Language + Login + Hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

            {/* Glass pill language switcher */}
            <div role="group" aria-label="Language selection" style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 9999,
              padding: "2px 3px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.15)",
            }}>
              {locales.map((l, i) => (
                <span key={l} style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => setLocale(l)}
                    aria-label={`Switch language to ${LOCALE_LABELS[l]}`}
                    aria-current={locale === l ? "true" : undefined}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 11,
                      fontWeight: locale === l ? 500 : 400,
                      letterSpacing: "0.06em",
                      color: locale === l ? "#fff" : "rgba(255,255,255,0.35)",
                      background: locale === l ? "rgba(255,255,255,0.08)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "5px 10px",
                      borderRadius: 9999,
                      transition: "all 0.25s ease",
                      boxShadow: locale === l
                        ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)"
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (locale !== l) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (locale !== l) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                  {i < locales.length - 1 && (
                    <span aria-hidden="true" style={{
                      width: 1,
                      height: 12,
                      background: "rgba(255,255,255,0.08)",
                      flexShrink: 0,
                    }} />
                  )}
                </span>
              ))}
            </div>

            {/* ── 3D Glass Login Button ── */}
            <a href="#login" className="nav-links" style={{
              position: "relative",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "0.03em",
              padding: "9px 26px",
              borderRadius: 9999,
              border: `1px solid ${loginHovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)"}`,
              background: loginHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
              color: "#f0f0f0",
              textDecoration: "none",
              overflow: "hidden",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transform: loginHovered ? "translateY(-1px)" : "translateY(0)",
              boxShadow: loginHovered
                ? [
                    "0 8px 24px rgba(0,0,0,0.35)",
                    "0 2px 6px rgba(0,0,0,0.2)",
                    "0 0 20px rgba(255,255,255,0.08)",
                    "inset 0 1px 0 rgba(255,255,255,0.2)",
                    "inset 0 -1px 0 rgba(255,255,255,0.03)",
                  ].join(", ")
                : [
                    "0 4px 16px rgba(0,0,0,0.3)",
                    "0 1px 3px rgba(0,0,0,0.15)",
                    "inset 0 1px 0 rgba(255,255,255,0.15)",
                    "inset 0 -1px 0 rgba(255,255,255,0.02)",
                  ].join(", "),
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
              onMouseEnter={() => setLoginHovered(true)}
              onMouseLeave={() => setLoginHovered(false)}
            >
              {/* Specular highlight — top "light bubble" */}
              <span style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: loginHovered ? "55%" : "45%",
                background: loginHovered
                  ? "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)",
                borderRadius: "9999px 9999px 50% 50%",
                pointerEvents: "none",
                transition: "all 0.3s ease",
                filter: "blur(0.5px)",
              }} />
              <span style={{ position: "relative", zIndex: 1 }}>
                {t.nav.login}
              </span>
            </a>

            {/* ── Glass Hamburger ── */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              style={{
                position: "relative",
                background: menuOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${menuOpen ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12,
                cursor: "pointer",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                padding: 8,
                width: 42,
                height: 42,
                overflow: "hidden",
                boxShadow: menuOpen
                  ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 12px rgba(0,0,0,0.25)"
                  : "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Hamburger specular */}
              <span style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "45%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
                borderRadius: "12px 12px 50% 50%",
                pointerEvents: "none",
              }} />
              <span style={{
                display: "block", width: 18, height: 1.5, background: "#f0f0f0",
                borderRadius: 1, position: "relative", zIndex: 1,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none",
              }} />
              <span style={{
                display: "block", width: 18, height: 1.5, background: "#f0f0f0",
                borderRadius: 1, position: "relative", zIndex: 1,
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: 18, height: 1.5, background: "#f0f0f0",
                borderRadius: 1, position: "relative", zIndex: 1,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile overlay menu ── */}
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
              padding: "8px 28px",
              borderRadius: 12,
              transition: "color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "#fff";
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = "rgba(255,255,255,0.85)";
              el.style.background = "transparent";
              el.style.boxShadow = "none";
            }}
          >
            {item.label}
          </a>
        ))}

        {/* Mobile glass language switcher */}
        <div role="group" aria-label="Language selection" style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 9999,
          padding: "3px 4px",
          marginTop: 8,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.2)",
        }}>
          {locales.map((l, i) => (
            <span key={l} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => { setLocale(l); closeMenu(); }}
                aria-label={`Switch language to ${LOCALE_LABELS[l]}`}
                aria-current={locale === l ? "true" : undefined}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  fontWeight: locale === l ? 500 : 400,
                  letterSpacing: "0.06em",
                  color: locale === l ? "#fff" : "rgba(255,255,255,0.4)",
                  background: locale === l ? "rgba(255,255,255,0.1)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 14px",
                  borderRadius: 9999,
                  transition: "all 0.2s ease",
                  boxShadow: locale === l
                    ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 3px rgba(0,0,0,0.25)"
                    : "none",
                }}
              >
                {LOCALE_LABELS[l]}
              </button>
              {i < locales.length - 1 && (
                <span aria-hidden="true" style={{
                  width: 1,
                  height: 14,
                  background: "rgba(255,255,255,0.1)",
                  flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </div>

        {/* Mobile 3D glass login button */}
        <a
          href="#login"
          onClick={closeMenu}
          style={{
            position: "relative",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: "0.03em",
            padding: "13px 36px",
            borderRadius: 9999,
            marginTop: 8,
            border: `1px solid ${mobileLoginHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)"}`,
            background: mobileLoginHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
            color: "#f0f0f0",
            textDecoration: "none",
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: mobileLoginHovered ? "translateY(-1px)" : "translateY(0)",
            boxShadow: mobileLoginHovered
              ? [
                  "0 8px 24px rgba(0,0,0,0.35)",
                  "0 2px 6px rgba(0,0,0,0.2)",
                  "0 0 20px rgba(255,255,255,0.08)",
                  "inset 0 1px 0 rgba(255,255,255,0.22)",
                  "inset 0 -1px 0 rgba(255,255,255,0.03)",
                ].join(", ")
              : [
                  "0 4px 16px rgba(0,0,0,0.3)",
                  "0 1px 3px rgba(0,0,0,0.15)",
                  "inset 0 1px 0 rgba(255,255,255,0.15)",
                  "inset 0 -1px 0 rgba(255,255,255,0.02)",
                ].join(", "),
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={() => setMobileLoginHovered(true)}
          onMouseLeave={() => setMobileLoginHovered(false)}
        >
          {/* Mobile specular highlight */}
          <span style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: mobileLoginHovered ? "55%" : "45%",
            background: mobileLoginHovered
              ? "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)",
            borderRadius: "9999px 9999px 50% 50%",
            pointerEvents: "none",
            transition: "all 0.3s ease",
            filter: "blur(0.5px)",
          }} />
          <span style={{ position: "relative", zIndex: 1 }}>
            {t.nav.login}
          </span>
        </a>
      </div>
    </nav>
  );
}
