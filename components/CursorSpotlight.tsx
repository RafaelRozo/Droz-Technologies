"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let show = false;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      const hero = document.querySelector("[data-hero]");
      if (hero) {
        const r = hero.getBoundingClientRect();
        // Hero is active (sticky) while scrolling through it
        show = r.bottom < window.innerHeight;
      } else {
        show = true;
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`;
      el.style.opacity = show ? "1" : "0";
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 700,
        height: 700,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 30%, transparent 60%)",
        pointerEvents: "none",
        zIndex: 40,
        opacity: 0,
        transition: "opacity 0.5s ease",
        willChange: "transform",
      }}
    />
  );
}
