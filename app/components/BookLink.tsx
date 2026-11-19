"use client";

import { m, useReducedMotion } from "motion/react";
import { BOOK_URL } from "@/app/lib/config";

type Props = {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  id?: string;
  onClick?: () => void;
};

/** Primary booking CTA — mint fill by default; spring hover/press via Motion. */
export function BookLink({
  children,
  className = "btn btn-book",
  onClick,
  id,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  return (
    <m.a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-book
      id={id}
      onClick={onClick}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      {...rest}
    >
      {children}
    </m.a>
  );
}
