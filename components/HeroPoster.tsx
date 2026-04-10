/* Static hero poster — renders instantly with zero JS.
   Replaced by the interactive HeroScroller once it loads. */

export default function HeroPoster() {
  return (
    <div style={{ height: "250vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        {/* First frame as LCP image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/frames/pm-to-software/frame_0001.jpg"
          alt="Droz Technologies — Predictive Maintenance"
          fetchPriority="high"
          decoding="sync"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />

        {/* Bottom gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "25%",
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Glassmorphism text panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 6vw",
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "55%",
              height: "100%",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              maskImage:
                "linear-gradient(90deg, black 0%, black 50%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, black 0%, black 50%, transparent 100%)",
              zIndex: -1,
            }}
          />

          <h1
            style={{
              fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(3rem, 6.5vw, 6rem)",
              lineHeight: 1.02,
              color: "white",
              fontWeight: 400,
              maxWidth: 600,
            }}
          >
            <span style={{ display: "block" }}>Predictive</span>
            <span style={{ display: "block" }}>Maintenance</span>
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-sans), 'Outfit', sans-serif",
              fontSize: "clamp(0.85rem, 1vw, 1rem)",
              fontWeight: 300,
              lineHeight: 1.65,
              color: "#d0d0d0",
              maxWidth: 460,
            }}
          >
            Vibration analysis, laser alignment, thermography, and rotor balancing.
            We diagnose equipment failures before they happen — 20 years of field
            expertise turned into predictive technology.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", marginTop: "2rem" }}>
            <a
              href="/divisions/predictive-maintenance"
              style={{
                padding: "0.7rem 1.75rem",
                borderRadius: 9999,
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans), 'Outfit', sans-serif",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                textDecoration: "none",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                letterSpacing: "0.02em",
              }}
            >
              Explore Predictive Maintenance
            </a>
            <a
              href="/contact"
              style={{
                padding: "0.7rem 1.75rem",
                borderRadius: 9999,
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans), 'Outfit', sans-serif",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                textDecoration: "none",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                letterSpacing: "0.02em",
              }}
            >
              Talk to an Engineer
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            zIndex: 10,
            opacity: 0.5,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans), 'Outfit', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 28,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
            }}
          />
        </div>

        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            right: "2.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            zIndex: 10,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? 10 : 7,
                height: i === 0 ? 10 : 7,
                borderRadius: "50%",
                backgroundColor: i === 0 ? "#fff" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
