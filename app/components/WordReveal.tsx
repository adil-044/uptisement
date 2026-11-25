"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Hero / LCP: paint visible immediately; no opacity:0 before JS. */
  priority?: boolean;
  /** Animate when entering viewport (default). Ignored when priority. */
  whileInView?: boolean;
};

/**
 * Word-by-word blur/opacity reveal for headlines.
 * Priority headlines stay visible for LCP; below-fold headlines animate in view.
 */
export function WordReveal({
  children,
  className = "",
  as = "h2",
  priority = false,
  whileInView = true,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  const words = children.split(/(\s+)/);

  if (reduce || priority) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(whileInView
        ? { whileInView: "show", viewport: { once: true, amount: 0.35 } }
        : { animate: "show" })}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.045, delayChildren: 0.04 },
        },
      }}
    >
      {words.map((chunk, i) => {
        if (/^\s+$/.test(chunk)) {
          return <span key={`s-${i}`}>{chunk}</span>;
        }
        return (
          <m.span
            key={`w-${i}-${chunk}`}
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {chunk}
          </m.span>
        );
      })}
    </Tag>
  );
}

/** Wrap arbitrary nodes with a one-shot section reveal. */
export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
