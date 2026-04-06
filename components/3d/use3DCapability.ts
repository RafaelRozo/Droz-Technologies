"use client";

import { useState, useEffect } from "react";

export type Capability = "full" | "reduced" | "none";

export default function use3DCapability(): Capability {
  const [capability, setCapability] = useState<Capability>("none");

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setCapability("none");
        return;
      }

      // Check device capability
      const cores = navigator.hardwareConcurrency || 2;
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      const dpr = window.devicePixelRatio || 1;

      if (isMobile || cores <= 2) {
        setCapability("none");
      } else if (cores <= 4 || dpr > 2) {
        setCapability("reduced");
      } else {
        setCapability("full");
      }
    } catch {
      setCapability("none");
    }
  }, []);

  return capability;
}
