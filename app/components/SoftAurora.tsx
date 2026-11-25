"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Soft aurora hero wash — CSS blobs on first paint (no shader blocking LCP).
 * Subtle parallax vs page scroll when motion is allowed.
 */
export function SoftAurora() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <m.div
      ref={ref}
      className="soft-aurora"
      aria-hidden="true"
      style={reduce ? undefined : { y }}
    >
      <div className="soft-aurora__blob soft-aurora__blob--a" />
      <div className="soft-aurora__blob soft-aurora__blob--b" />
      <div className="soft-aurora__blob soft-aurora__blob--c" />
    </m.div>
  );
}
