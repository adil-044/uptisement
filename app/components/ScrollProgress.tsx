"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin accent progress line at the top of the viewport. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <m.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[210] h-[2px] origin-left bg-[var(--color-purple)]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
