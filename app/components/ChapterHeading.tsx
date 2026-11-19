"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  as?: "h1" | "h2";
  id: string;
  text: string;
  className?: string;
  /** Hero uses load entrance; other chapters use whileInView */
  dataEnter?: boolean;
};

/**
 * Cinematic slide-up (Superdesign) via Motion — plain text first so scripts-off
 * and SSR stay readable (taste-skill hidden-content).
 */
export function ChapterHeading({
  as = "h2",
  id,
  text,
  className = "",
  dataEnter = false,
}: Props) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const Static = as === "h1" ? "h1" : "h2";

  if (reduce || !ready) {
    return (
      <Static id={id} className={className}>
        {text}
      </Static>
    );
  }

  const Tag = as === "h1" ? m.h1 : m.h2;
  const words = text.split(" ");

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...(dataEnter
        ? { animate: "show" }
        : {
            whileInView: "show",
            viewport: { once: true, amount: 0.55 },
          })}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.035,
            delayChildren: dataEnter ? 0.08 : 0.04,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0"
          data-enter-line={dataEnter ? String(i + 1) : undefined}
        >
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
