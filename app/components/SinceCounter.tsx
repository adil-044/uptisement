"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SINCE_YEAR } from "@/app/lib/config";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function SinceCounter() {
  const root = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!root.current || !num.current) return;
      if (prefersReducedMotion()) {
        num.current.textContent = String(SINCE_YEAR);
        return;
      }
      const obj = { value: 2018 };
      gsap.to(obj, {
        value: SINCE_YEAR,
        duration: 1.4,
        ease: "power2.out",
        snap: { value: 1 },
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(obj.value));
        },
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <aside
      ref={root}
      className="border-y border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] py-10"
      aria-label={`In business since ${SINCE_YEAR}`}
    >
      <div className="container-x flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">In business since</p>
          <p className="mt-2 font-display text-6xl font-extrabold tracking-tight md:text-7xl">
            <span ref={num}>{SINCE_YEAR}</span>
          </p>
        </div>
        <p className="max-w-sm text-[var(--color-muted)]">
          Founder-led from Southern Ontario. You talk to Adil — not a handoff queue.
        </p>
      </div>
    </aside>
  );
}
