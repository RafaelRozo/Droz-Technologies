"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateX(60px)";

    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.45s cubic-bezier(0.85,0,0.15,1), transform 0.45s cubic-bezier(0.85,0,0.15,1)";
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    });
  }, [pathname]);

  return (
    <div ref={ref} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
