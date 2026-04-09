"use client";

import type { BlogPost } from "@/lib/blog";
import { BlurFade, MagneticButton } from "@/components/animations";
import useIsMobile from "@/lib/useIsMobile";
import BlogContent from "@/components/blog/BlogContent";
import BlogCard from "@/components/blog/BlogCard";

const DIVISION_COLORS: Record<string, string> = {
  "predictive-maintenance": "#3B82A0",
  "software-development": "#6366A0",
  "intelligent-construction": "#A08B3B",
  "industrial-manufacturing": "#7C8B3B",
  "ai-consulting": "#A03B6E",
};

const DIVISION_LABELS: Record<string, string> = {
  "predictive-maintenance": "Predictive Maintenance",
  "software-development": "Software Development",
  "intelligent-construction": "Intelligent Construction",
  "industrial-manufacturing": "Industrial Manufacturing",
  "ai-consulting": "AI Consulting",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogPostClientProps {
  post: BlogPost & { htmlContent?: string };
  related: BlogPost[];
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function BlogPostClient({
  post,
  related,
  prevPost,
  nextPost,
}: BlogPostClientProps) {
  const isMobile = useIsMobile();
  const accentColor =
    DIVISION_COLORS[post.division] ?? "rgba(255,255,255,0.4)";
  const divisionLabel =
    DIVISION_LABELS[post.division] ?? post.division;

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://droztechnologies.com/blog/${post.slug}`;

  return (
    <main>
      {/* ── Hero image ── */}
      <section
        style={{
          position: "relative",
          background: "#0a0a0a",
          paddingTop: 100,
        }}
      >
        {post.image && (
          <BlurFade delay={0} duration={0.7} yOffset={12}>
            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: isMobile ? "0 20px" : "0 48px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 7",
                  borderRadius: 18,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </BlurFade>
        )}

        {/* Header text */}
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: isMobile ? "32px 20px 0" : "52px 48px 0",
          }}
        >
          {/* Division pill */}
          {post.division && (
            <BlurFade delay={0.1}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                  background: `${accentColor}14`,
                  padding: "5px 14px",
                  borderRadius: 9999,
                  marginBottom: 24,
                }}
              >
                {divisionLabel}
              </span>
            </BlurFade>
          )}

          <BlurFade delay={0.18}>
            <h1
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              {post.title}
            </h1>
          </BlurFade>

          <BlurFade delay={0.26}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: 36,
              }}
            >
              {post.description}
            </p>
          </BlurFade>

          {/* Metadata bar */}
          <BlurFade delay={0.32}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 20,
                paddingTop: 20,
                paddingBottom: 32,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                marginBottom: 56,
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                By {post.author}
              </span>
              <span
                aria-hidden="true"
                style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}
              >
                ·
              </span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {formatDate(post.date)}
              </span>
              <span
                aria-hidden="true"
                style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}
              >
                ·
              </span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {post.readingTime} min read
              </span>

              {/* Share links */}
              <div
                style={{ marginLeft: "auto", display: "flex", gap: 12 }}
                aria-label="Share this article"
              >
                <a
                  href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X (Twitter)"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "5px 14px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.02)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "#fff";
                    el.style.borderColor = "rgba(255,255,255,0.2)";
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "rgba(255,255,255,0.35)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background = "rgba(255,255,255,0.02)";
                    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.04)";
                  }}
                >
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "5px 14px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.02)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "#fff";
                    el.style.borderColor = "rgba(255,255,255,0.2)";
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "rgba(255,255,255,0.35)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background = "rgba(255,255,255,0.02)";
                    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.04)";
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── Body content ── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: isMobile ? "0 20px 60px" : "0 48px 100px",
        }}
      >
        <BlurFade delay={0.1} once>
          <BlogContent htmlContent={post.htmlContent ?? ""} />
        </BlurFade>
      </section>

      {/* ── Tags ── */}
      {post.tags.length > 0 && (
        <section
          style={{
            background: "#0a0a0a",
            padding: isMobile ? "0 20px 48px" : "0 48px 80px",
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  letterSpacing: "0.04em",
                  background: "rgba(255,255,255,0.02)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA banner ── */}
      <section
        style={{
          background: "#0f0f0f",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: isMobile ? "48px 20px" : "80px 48px",
          textAlign: "center",
        }}
      >
        <BlurFade delay={0} once>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: 20,
            }}
          >
            Ready to apply this?
          </p>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#fff",
              marginBottom: 36,
              lineHeight: 1.25,
            }}
          >
            Talk to an Engineer
          </h2>
          <MagneticButton as="a" href="/contact" aria-label="Contact Droz Technologies">
            Start the conversation
          </MagneticButton>
        </BlurFade>
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section
          style={{
            background: "#0a0a0a",
            padding: isMobile ? "48px 20px" : "80px 48px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.75rem",
                color: "#fff",
                marginBottom: 36,
              }}
            >
              More from {divisionLabel}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(related.length, 3)}, 1fr)`,
                gap: 24,
              }}
            >
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Prev / Next navigation ── */}
      {(prevPost || nextPost) && (
        <nav
          aria-label="Post navigation"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#0a0a0a",
            padding: isMobile ? "32px 20px 48px" : "48px 48px 80px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 24,
            }}
          >
            {/* Previous (older) */}
            {prevPost ? (
              <a
                href={`/blog/${prevPost.slug}`}
                style={{
                  display: "block",
                  padding: "24px 28px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  textDecoration: "none",
                  background: "transparent",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.18)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 8,
                  }}
                >
                  Previous
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.35,
                  }}
                >
                  {prevPost.title}
                </p>
              </a>
            ) : (
              <div />
            )}

            {/* Next (newer) */}
            {nextPost ? (
              <a
                href={`/blog/${nextPost.slug}`}
                style={{
                  display: "block",
                  padding: "24px 28px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  textDecoration: "none",
                  background: "transparent",
                  textAlign: "right",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.18)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 8,
                  }}
                >
                  Next
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.35,
                  }}
                >
                  {nextPost.title}
                </p>
              </a>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
