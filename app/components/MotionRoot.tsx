"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * LazyMotion + domAnimation keeps the Motion bundle small.
 * reducedMotion="user" honours prefers-reduced-motion.
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
