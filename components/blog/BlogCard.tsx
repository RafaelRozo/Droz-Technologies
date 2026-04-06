"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

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
    month: "short",
    day: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const accentColor = DIVISION_COLORS[post.division] ?? "rgba(255,255,255,0.4)";
  const divisionLabel = DIVISION_LABELS[post.division] ?? post.division;
  const excerpt =
    post.description.length > 120
      ? post.description.slice(0, 120).trimEnd() + "…"
      : post.description;

  return (
    <a
      href={`/blog/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: 16,
        border: hovered
          ? "1px solid rgba(255,255,255,0.16)"
          : "1px solid rgba(255,255,255,0.07)",
        background: hovered ? "rgba(255,255,255,0.025)" : "#0f0f0f",
        overflow: "hidden",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
          : "none",
        transition:
          "transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          borderRadius: "14px 14px 0 0",
          overflow: "hidden",
          background: "#141414",
        }}
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ) : (
          /* Placeholder gradient when no image */
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${accentColor}1a 0%, #141414 100%)`,
            }}
          />
        )}

        {/* Division pill overlay */}
        {post.division && (
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accentColor,
              background: `rgba(10,10,10,0.82)`,
              border: `1px solid ${accentColor}50`,
              padding: "4px 12px",
              borderRadius: 9999,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {divisionLabel}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "24px 26px 26px" }}>
        {/* Title */}
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "1.25rem",
            color: hovered ? "#fff" : "rgba(255,255,255,0.92)",
            lineHeight: 1.3,
            marginBottom: 10,
            transition: "color 0.2s ease",
          }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          {excerpt}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.03em",
            }}
          >
            {formatDate(post.date)}
          </span>
          <span
            aria-hidden="true"
            style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}
          >
            ·
          </span>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {post.readingTime} min read
          </span>

          {/* Read arrow */}
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
              transition: "color 0.25s ease, transform 0.25s ease",
              display: "inline-block",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
            }}
            aria-hidden="true"
          >
            Read →
          </span>
        </div>
      </div>
    </a>
  );
}
