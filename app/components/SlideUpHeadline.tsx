"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

/** Cinematic slide-up headline — static final state when reduced motion. */
export function SlideUpHeadline({
  children,
  className,
  as = "h1",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
