"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SmoothAccordionItem {
  title: string;
  content: React.ReactNode;
}

interface SmoothAccordionProps {
  items: SmoothAccordionItem[];
  allowMultiple?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function SmoothAccordion({
  items,
  allowMultiple = false,
  style,
  className,
}: SmoothAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className={className} style={style}>
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div
            key={i}
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ margin: 0 }}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${i}`}
                id={`accordion-header-${i}`}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 16,
                  fontWeight: 400,
                  textAlign: "left",
                }}
              >
                <span>{item.title}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: 20,
                    color: "rgba(255,255,255,0.4)",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${i}`}
                  role="region"
                  aria-labelledby={`accordion-header-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3, delay: 0.1 },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      paddingBottom: 20,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 15,
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
