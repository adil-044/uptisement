"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Lenis smooth scroll — skipped entirely when prefers-reduced-motion is on.
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let destroyed = false;
    let rafId = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [reduce]);

  return null;
}
