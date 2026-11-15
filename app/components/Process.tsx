"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Call",
    body: "15 minutes. Your site + how calls are handled. Where you're losing leads.",
  },
  {
    num: "02",
    title: "Scope",
    body: "One primary fix. Price and timeline in writing.",
  },
  {
    num: "03",
    title: "Ship",
    body: "Live booking path. You approve from your phone.",
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.from(root.current.querySelectorAll("[data-reveal]"), {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="how" className="section" aria-labelledby="how-title">
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          How it works
        </p>
        <h2 id="how-title" className="mt-3 text-3xl md:text-5xl" data-reveal>
          Call → Scope → Ship
        </h2>
        <p className="section-lede" data-reveal>
          Tight scopes. Ontario shops. One primary fix at a time.
        </p>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.num} data-reveal>
              <span className="font-display text-sm font-bold tracking-[0.14em] text-[var(--color-accent)]">
                {step.num}
              </span>
              <h3 className="mt-3 text-2xl">{step.title}</h3>
              <p className="mt-2 text-[var(--color-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
