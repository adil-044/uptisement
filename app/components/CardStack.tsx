"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import type { Review } from "@/app/lib/reviews";

type Props = {
  reviews: Review[];
};

/** Animata-style click-through testimonial deck. */
export function CardStack({ reviews }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const current = reviews[index];

  function next() {
    setIndex((i) => (i + 1) % reviews.length);
  }

  return (
    <div className="relative mx-auto max-w-xl">
      <div className="relative min-h-[14rem]">
        {/* Back cards */}
        {reviews.map((_, i) => {
          const offset = (i - index + reviews.length) % reviews.length;
          if (offset === 0 || offset > 2) return null;
          return (
            <div
              key={`back-${i}`}
              aria-hidden
              className="absolute inset-x-0 top-0 rounded-[1.15rem] border border-[var(--color-border)] bg-[var(--color-surface)]"
              style={{
                transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.03})`,
                opacity: 1 - offset * 0.2,
                zIndex: 2 - offset,
              }}
            >
              <div className="invisible p-6 md:p-8">
                <p className="font-display text-2xl leading-snug">&nbsp;</p>
                <p className="mt-4 text-sm">&nbsp;</p>
              </div>
            </div>
          );
        })}

        <AnimatePresence mode="wait">
          <m.blockquote
            key={current.attribution}
            className="relative z-[3] rounded-[1.15rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <p className="font-display text-2xl leading-snug text-[var(--color-text)] md:text-3xl">
              “{current.quote}”
            </p>
            <footer className="mt-5 text-sm font-semibold tracking-wide text-[var(--color-lilac)]">
              {current.attribution}
            </footer>
          </m.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-muted)]">
          {index + 1} / {reviews.length}
        </p>
        <button
          type="button"
          className="halo-btn !min-h-10 !px-4 !text-sm"
          onClick={next}
        >
          Next review
        </button>
      </div>
    </div>
  );
}
