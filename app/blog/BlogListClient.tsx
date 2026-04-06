"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";
import useIsMobile from "@/lib/useIsMobile";
import PageHero from "@/components/shared/PageHero";
import BlogCard from "@/components/blog/BlogCard";

interface BlogListClientProps {
  posts: BlogPost[];
}

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Predictive Maintenance", value: "predictive-maintenance" },
  { label: "Software", value: "software-development" },
  { label: "Construction", value: "intelligent-construction" },
  { label: "Manufacturing", value: "industrial-manufacturing" },
  { label: "AI", value: "ai-consulting" },
];

export default function BlogListClient({ posts }: BlogListClientProps) {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.division === activeFilter);

  return (
    <main>
      <PageHero
        title="Insights"
        subtitle="Technical expertise from five divisions"
        pill="Knowledge Base"
      />

      <section style={{ background: "#0a0a0a", padding: isMobile ? "32px 20px 80px" : "64px 48px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Filter pills */}
          <div
            role="group"
            aria-label="Filter posts by division"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 56,
            }}
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  aria-pressed={active}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: active ? 500 : 300,
                    fontSize: 13,
                    letterSpacing: "0.03em",
                    padding: "8px 20px",
                    borderRadius: 9999,
                    border: active
                      ? "1px solid rgba(255,255,255,0.5)"
                      : "1px solid rgba(255,255,255,0.12)",
                    background: active
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition:
                      "border-color 0.25s ease, color 0.25s ease, background 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.28)";
                      el.style.color = "rgba(255,255,255,0.7)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.12)";
                      el.style.color = "rgba(255,255,255,0.45)";
                    }
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Post count */}
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              marginBottom: 32,
              letterSpacing: "0.04em",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: "rgba(255,255,255,0.35)",
                textAlign: "center",
                padding: "80px 0",
              }}
            >
              No articles published yet for this division. Check back soon.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: 28,
              }}
            >
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
