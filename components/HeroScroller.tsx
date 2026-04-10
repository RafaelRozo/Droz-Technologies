"use client";

import { useRef, useState, useCallback, useEffect, createRef } from "react";
import HeroTextPanel from "./HeroTextPanel";
import { useLocale } from "@/lib/LocaleContext";
import { getTexts } from "@/lib/i18n";

const PLAYBACK_FPS = 50;
const CATCHUP_FPS = 90; // faster when catching up after fast scroll
const DIVISION_COUNT = 3;
const SCROLL_HEIGHT_VH = 250; // tighter scroll zones

// Per-transition config: frame count, file extension, zero-pad width
const TRANSITIONS: { dir: string; frames: number; ext: "jpg" | "png"; pad: number }[] = [
  { dir: "pm-to-software", frames: 240, ext: "jpg", pad: 4 },
  { dir: "software-to-ai", frames: 161, ext: "png", pad: 3 },
];

function getFramePath(transitionIndex: number, frameNum: number): string {
  const t = TRANSITIONS[transitionIndex];
  if (!t) return "";
  const num = Math.max(1, Math.min(frameNum, t.frames));
  return `/frames/${t.dir}/frame_${String(num).padStart(t.pad, "0")}.${t.ext}`;
}

function getPosterPath(divisionIndex: number): string {
  if (divisionIndex === 0) {
    return getFramePath(0, 1);
  }
  const t = TRANSITIONS[divisionIndex - 1];
  return getFramePath(divisionIndex - 1, t.frames);
}

export default function HeroScroller() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const frameCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const playbackRafRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef = useRef<any>(null);

  const { locale } = useLocale();
  const t = getTexts(locale);
  const divisions = t.hero.divisions;

  const textPanelRefs = useRef(
    Array.from({ length: DIVISION_COUNT }, () => createRef<HTMLDivElement>())
  );

  // Draw image to canvas with "cover" behavior + devicePixelRatio
  const drawFrame = useCallback((src: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (img: HTMLImageElement) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;

      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
      }

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

      if (imgRatio > canvasRatio) {
        sw = img.naturalHeight * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasRatio;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    };

    const cached = frameCache.current.get(src);
    if (cached && cached.complete && cached.naturalWidth > 0) {
      draw(cached);
      return;
    }

    const img = new Image();
    img.onload = () => {
      frameCache.current.set(src, img);
      draw(img);
    };
    img.src = src;
  }, []);

  const preloadTransition = useCallback((transitionIndex: number) => {
    const t = TRANSITIONS[transitionIndex];
    if (!t) return;
    for (let i = 1; i <= t.frames; i++) {
      const path = getFramePath(transitionIndex, i);
      if (!frameCache.current.has(path)) {
        const img = new Image();
        img.src = path;
        frameCache.current.set(path, img);
      }
    }
  }, []);

  // Auto-play through frame sequence
  const playFrameSequence = useCallback(
    (
      transitionIndex: number,
      direction: "forward" | "reverse",
      fps: number,
      onComplete: () => void
    ) => {
      const t = TRANSITIONS[transitionIndex];
      if (!t) {
        onComplete();
        return;
      }
      const totalFrames = t.frames;
      const startFrame = direction === "forward" ? 1 : totalFrames;
      const endFrame = direction === "forward" ? totalFrames : 1;
      const step = direction === "forward" ? 1 : -1;
      const frameDuration = 1000 / fps;

      let currentFrame = startFrame;
      let lastTime = performance.now();

      cancelAnimationFrame(playbackRafRef.current);

      const tick = (now: number) => {
        const elapsed = now - lastTime;

        if (elapsed >= frameDuration) {
          const framesToAdvance = Math.floor(elapsed / frameDuration);
          currentFrame += step * framesToAdvance;
          lastTime = now - (elapsed % frameDuration);

          if (direction === "forward" && currentFrame >= endFrame) {
            currentFrame = endFrame;
          } else if (direction === "reverse" && currentFrame <= endFrame) {
            currentFrame = endFrame;
          }

          drawFrame(getFramePath(transitionIndex, currentFrame));

          if (currentFrame === endFrame) {
            onComplete();
            return;
          }
        }

        playbackRafRef.current = requestAnimationFrame(tick);
      };

      playbackRafRef.current = requestAnimationFrame(tick);
    },
    [drawFrame]
  );

  // Step one division toward the target
  const stepTransition = useCallback(
    (direction: "forward" | "reverse") => {
      if (isTransitioningRef.current) return;

      const fromIndex = activeIndexRef.current;
      const toIndex = direction === "forward" ? fromIndex + 1 : fromIndex - 1;

      if (toIndex < 0 || toIndex >= DIVISION_COUNT) return;

      const transitionIndex =
        direction === "forward" ? fromIndex : toIndex;

      if (!TRANSITIONS[transitionIndex]) return;

      isTransitioningRef.current = true;

      const fromPanel = textPanelRefs.current[fromIndex]?.current;
      const toPanel = textPanelRefs.current[toIndex]?.current;
      const g = gsapRef.current;

      if (!g) {
        isTransitioningRef.current = false;
        return;
      }

      // Determine speed — faster if we need to catch up
      const stepsRemaining = Math.abs(targetIndexRef.current - toIndex);
      const fps = stepsRemaining > 0 ? CATCHUP_FPS : PLAYBACK_FPS;

      const tl = g.timeline();

      if (fromPanel) {
        tl.to(fromPanel, {
          opacity: 0,
          y: direction === "forward" ? -20 : 20,
          duration: 0.5,
          ease: "power2.inOut",
        }, 0);
      }

      if (toPanel) {
        g.set(toPanel, {
          y: direction === "forward" ? 20 : -20,
          opacity: 0,
        });
        tl.to(toPanel, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onStart: () => {
            if (toPanel) toPanel.style.pointerEvents = "auto";
          },
        }, 0.1);
      }

      if (fromPanel) {
        fromPanel.style.pointerEvents = "none";
      }

      playFrameSequence(transitionIndex, direction, fps, () => {
        activeIndexRef.current = toIndex;
        setActiveIndex(toIndex);
        isTransitioningRef.current = false;

        // Preload next
        if (direction === "forward" && toIndex < TRANSITIONS.length) {
          preloadTransition(toIndex);
        } else if (direction === "reverse" && toIndex > 0) {
          preloadTransition(toIndex - 1);
        }

        // Check if we need to continue toward target
        const target = targetIndexRef.current;
        if (target > toIndex) {
          requestAnimationFrame(() => stepTransition("forward"));
        } else if (target < toIndex) {
          requestAnimationFrame(() => stepTransition("reverse"));
        }
      });
    },
    [playFrameSequence, preloadTransition]
  );

  // Compute target division from scroll position
  const updateTarget = useCallback(
    (scrollProgress: number) => {
      // Map progress to division index
      const raw = scrollProgress * (DIVISION_COUNT - 1);
      // Snap to nearest when past midpoint of each zone
      const newTarget = Math.min(
        Math.round(raw),
        DIVISION_COUNT - 1
      );

      if (newTarget !== targetIndexRef.current) {
        targetIndexRef.current = newTarget;

        // Preload what we'll need
        if (newTarget > activeIndexRef.current && newTarget - 1 < TRANSITIONS.length) {
          preloadTransition(newTarget - 1);
        }

        // Start stepping if not already transitioning
        if (!isTransitioningRef.current) {
          const current = activeIndexRef.current;
          if (newTarget > current) {
            stepTransition("forward");
          } else if (newTarget < current) {
            stepTransition("reverse");
          }
        }
      }
    },
    [stepTransition, preloadTransition]
  );

  // Initial setup — draw poster only, defer ALL preloading until first scroll
  const hasStartedPreload = useRef(false);

  useEffect(() => {
    drawFrame(getPosterPath(0));

    const firstPanel = textPanelRefs.current[0]?.current;
    if (firstPanel) {
      firstPanel.style.opacity = "1";
      firstPanel.style.transform = "translateY(0)";
      firstPanel.style.pointerEvents = "auto";
    }

    // Start preloading frames only after first scroll interaction
    const onFirstScroll = () => {
      if (hasStartedPreload.current) return;
      hasStartedPreload.current = true;
      window.removeEventListener("scroll", onFirstScroll);

      // Preload first transition in batches to avoid flooding the network
      const firstFrameCount = TRANSITIONS[0].frames;
      let batch = 0;
      const loadBatch = () => {
        const start = batch * 30 + 1;
        const end = Math.min(start + 29, firstFrameCount);
        for (let i = start; i <= end; i++) {
          const path = getFramePath(0, i);
          if (!frameCache.current.has(path)) {
            const img = new window.Image();
            img.src = path;
            frameCache.current.set(path, img);
          }
        }
        batch++;
        if (start + 29 < firstFrameCount) {
          setTimeout(loadBatch, 100);
        }
      };
      loadBatch();
    };

    window.addEventListener("scroll", onFirstScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onFirstScroll);
  }, [drawFrame]);

  // Canvas resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(getPosterPath(activeIndexRef.current));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // ScrollTrigger — single progress tracker
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      gsapMod.gsap.registerPlugin(stMod.ScrollTrigger);
      gsapRef.current = gsapMod.gsap;

      ctx = gsapMod.gsap.context(() => {
        if (!wrapperRef.current) return;

        stMod.ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            updateTarget(self.progress);
          },
        });

        // Restore scroll position on load
        const wh = window.innerHeight;
        const totalHeight = wh * SCROLL_HEIGHT_VH / 100;
        const progress = Math.min(window.scrollY / (totalHeight - wh), 1);
        const initialSection = Math.min(
          Math.round(progress * (DIVISION_COUNT - 1)),
          DIVISION_COUNT - 1
        );
        if (initialSection > 0) {
          activeIndexRef.current = initialSection;
          targetIndexRef.current = initialSection;
          setActiveIndex(initialSection);
          drawFrame(getPosterPath(initialSection));
          const panel = textPanelRefs.current[initialSection]?.current;
          if (panel) {
            gsapMod.gsap.set(panel, { opacity: 1, y: 0 });
            panel.style.pointerEvents = "auto";
          }
          const firstPanel = textPanelRefs.current[0]?.current;
          if (firstPanel && initialSection !== 0) {
            gsapMod.gsap.set(firstPanel, { opacity: 0 });
            firstPanel.style.pointerEvents = "none";
          }
        }
      });
    };

    init();
    return () => ctx?.revert();
  }, [updateTarget, drawFrame]);

  useEffect(() => {
    return () => cancelAnimationFrame(playbackRafRef.current);
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-hero
      style={{ height: `${SCROLL_HEIGHT_VH}vh`, position: "relative" }}
    >
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
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "25%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {divisions.map((div, i) => (
          <HeroTextPanel
            key={i}
            ref={textPanelRefs.current[i]}
            title={div.title}
            subtitle={div.subtitle}
            buttons={div.buttons}
            objectLabel={div.objectLabel}
          />
        ))}

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
          {divisions.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeIndex === i ? "10px" : "7px",
                height: activeIndex === i ? "10px" : "7px",
                borderRadius: "50%",
                backgroundColor:
                  activeIndex === i ? "#fff" : "rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {activeIndex === 0 && (
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
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {t.hero.scroll}
            </span>
            <div
              style={{
                width: "1px",
                height: "28px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
