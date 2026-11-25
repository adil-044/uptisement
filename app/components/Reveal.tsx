"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article";
  /** Stagger index for card grids (multiplies into delay). */
  stagger?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  once = true,
  as = "div",
  stagger = 0,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  const resolvedDelay = delay + stagger * 0.06;

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: resolvedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
