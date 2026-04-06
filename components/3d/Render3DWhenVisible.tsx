"use client";

import { useRef, useState, useEffect } from "react";

interface Render3DWhenVisibleProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  margin?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Render3DWhenVisible({
  children,
  fallback = null,
  margin = "200px",
  style,
  className,
}: Render3DWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: margin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? children : fallback}
    </div>
  );
}
