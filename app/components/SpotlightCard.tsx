"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Cursor-reactive spotlight card — soft lilac glow follows pointer. */
export function SpotlightCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      onMouseMove={onMove}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
