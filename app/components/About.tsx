"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FOUNDER, SINCE_YEAR } from "@/app/lib/config";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.from(root.current.querySelectorAll("[data-reveal]"), {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="section" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-10 md:grid-cols-[auto_1fr]">
        <div
          data-reveal
          className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--color-ink)] font-display text-4xl font-bold text-white md:h-36 md:w-36 md:text-5xl"
          aria-hidden="true"
        >
          A
        </div>
        <div>
          <p className="eyebrow" data-reveal>
            Founder
          </p>
          <h2 id="about-title" className="mt-3 text-3xl md:text-5xl" data-reveal>
            About {FOUNDER}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-ink-soft)]" data-reveal>
            I&apos;m Adil. I build booking-first websites, AI automations, and practical AI
            consulting for owner-run trades and local businesses across Ontario — based in
            Southern Ontario, in business since {SINCE_YEAR}.
          </p>
          <p className="mt-4 max-w-2xl text-[var(--color-muted)]" data-reveal>
            No pitch deck on the call — just where you&apos;re losing jobs, and the one fix
            I&apos;d ship first. When you book, you talk to me.
          </p>
        </div>
      </div>
    </section>
  );
}
