"use client";

import { m, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { BOOK_URL } from "@/app/lib/config";

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * Superdesign BookCallCta: slide-in blur entrance + mouse-move glow + arrow shift.
 * Still uses BOOK_URL only — no invented booking path.
 */
export function BookCallCta({
  children = "Book a 15-min call",
  className = "",
  id,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, color-mix(in srgb, var(--color-mint) 55%, transparent), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <m.a
      ref={ref}
      id={id}
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-book
      data-superdesign="bookcallcta"
      className={`btn btn-book book-call-cta ${className}`}
      onMouseMove={onMove}
      initial={false}
      whileInView={reduce ? undefined : { y: [10, 0] }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.985, y: 1 }}
    >
      {!reduce && (
        <m.span
          className="book-call-cta__glow"
          style={{ background: glow }}
          aria-hidden
        />
      )}
      <span className="book-call-cta__label">{children}</span>
      <span className="book-call-cta__arrow" aria-hidden>
        →
      </span>
    </m.a>
  );
}
