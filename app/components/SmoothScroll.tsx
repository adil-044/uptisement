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

    const start = () => {
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
    };

    // Defer past first paint / LCP
    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    let idleId = 0;
    let timeoutId = 0;
    if (ric) {
      idleId = ric(start, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(start, 400);
    }

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      if (idleId && "cancelIdleCallback" in window) {
        (
          window as Window & { cancelIdleCallback: (id: number) => void }
        ).cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      lenis?.destroy();
    };
  }, [reduce]);

  return null;
}
