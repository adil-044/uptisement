"use client";

import { m, useReducedMotion } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  id?: string;
  "data-book"?: boolean;
};

/** Cult UI–style Halo Button — primary CTA only. */
export function HaloButton({
  children,
  className = "",
  href,
  type = "button",
  disabled,
  onClick,
  id,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  const cls = `halo-btn ${className}`.trim();

  if (href) {
    return (
      <m.a
        href={href}
        className={cls}
        id={id}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={reduce ? undefined : { scale: 1.02 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        {...rest}
      >
        {children}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      id={id}
      whileHover={reduce || disabled ? undefined : { scale: 1.02 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
      {...rest}
    >
      {children}
    </m.button>
  );
}
