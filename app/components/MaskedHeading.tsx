"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  /**
   * Hero / above-the-fold: keep text visible for LCP (no opacity:0 before paint).
   * Below-fold headings get a single-block blur/opacity reveal (word spans would
   * break background-clip on .masked-heading).
   */
  priority?: boolean;
};

/** Huge tight headline with purple-tail mask. */
export function MaskedHeading({
  children,
  className = "",
  as = "h1",
  priority = false,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  const classes = `masked-heading !text-transparent ${className}`;

  if (reduce || priority) {
    const Static = as;
    return <Static className={classes}>{children}</Static>;
  }

  return (
    <Tag
      className={classes}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
