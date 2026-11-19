"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ~70px off-white circle with arrow on CTAs — desktop fine pointer only.
 * Native cursor everywhere else.
 */
export function CursorCircle() {
  const el = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const root = el.current;
    if (!root) return;

    let visible = false;
    const move = (e: PointerEvent) => {
      root.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const enter = () => {
      visible = true;
      setOn(true);
      document.documentElement.dataset.cursorCircle = "1";
    };
    const leave = () => {
      visible = false;
      setOn(false);
      delete document.documentElement.dataset.cursorCircle;
    };

    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor='circle'], [data-book]");
      if (t) enter();
      else if (visible) leave();
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver, true);
      delete document.documentElement.dataset.cursorCircle;
    };
  }, []);

  return (
    <div
      ref={el}
      className={`cursor-circle${on ? " is-on" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}
