"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { BookLink } from "./BookLink";
import { prefersReducedMotion } from "@/app/lib/motion";
import { SINCE_YEAR } from "@/app/lib/config";

const HEADLINE = "Stop losing jobs to missed calls.";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const words = root.current.querySelectorAll("[data-hero-word]");
      const rest = root.current.querySelectorAll("[data-hero-fade]");
      gsap.set(words, { y: 24, opacity: 0 });
      gsap.set(rest, { y: 16, opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(words, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
      }).to(
        rest,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
        },
        "-=0.35",
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] pb-16 pt-28 md:pt-36"
      aria-labelledby="hero-title"
    >
      <div className="container-x">
        <p className="eyebrow" data-hero-fade>
          Web design, AI automations &amp; AI consulting for Ontario trades · Since{" "}
          {SINCE_YEAR}
        </p>
        <h1
          id="hero-title"
          className="mt-5 max-w-[14ch] text-[clamp(2.6rem,9vw,5.4rem)] font-extrabold tracking-[-0.035em]"
        >
          {HEADLINE.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0">
              <span data-hero-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="mt-6 max-w-xl text-lg text-[var(--color-muted)] md:text-xl"
          data-hero-fade
        >
          Booking-first websites, missed-call text-back, and practical AI consulting for
          owner-run HVAC, roofing, and other local businesses across Ontario.
        </p>
        <div className="mt-8 flex flex-wrap gap-3" data-hero-fade>
          <BookLink>Book a 15-min call</BookLink>
          <BookLink className="btn btn-secondary">Get a free demo</BookLink>
        </div>
        <p
          className="mt-6 max-w-lg text-sm text-[var(--color-muted)]"
          data-hero-fade
        >
          Built by Adil in Southern Ontario. Fixed scope, price and timeline in writing. In
          business since {SINCE_YEAR}.
        </p>
      </div>
    </section>
  );
}
