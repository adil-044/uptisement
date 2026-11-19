"use client";

import { m, useReducedMotion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

/** Spring hover/press for DOM buttons (demos, toggles). */
export function MotionButton({
  children,
  className = "btn btn-secondary",
  type = "button",
  onClick,
  disabled,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  return (
    <m.button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      whileHover={reduce || disabled ? undefined : { scale: 1.03 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      {...rest}
    >
      {children}
    </m.button>
  );
}
