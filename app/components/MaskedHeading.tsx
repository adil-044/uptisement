"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

/** Huge tight headline with lilac/champagne mask drift. */
export function MaskedHeading({
  children,
  className = "",
  as = "h1",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  const classes = `masked-heading !text-transparent ${className}`;

  if (reduce) {
    const Static = as;
    return <Static className={classes}>{children}</Static>;
  }

  return (
    <Tag
      className={classes}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
