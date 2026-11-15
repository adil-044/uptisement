"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { REVIEWS } from "@/app/lib/reviews";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Reviews() {
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
    <section
      ref={root}
      id="reviews"
      className="section"
      aria-labelledby="reviews-title"
    >
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          Client words
        </p>
        <h2 id="reviews-title" className="mt-3 text-3xl md:text-5xl" data-reveal>
          What clients say
        </h2>
        <p className="section-lede" data-reveal>
          Real notes from people Adil has worked with. No star ratings or invented counts.
        </p>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <li key={review.attribution} data-reveal className="border-t border-[var(--color-line)] pt-6">
              <blockquote>
                <p className="font-display text-xl font-semibold leading-snug md:text-2xl">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-bold text-[var(--color-teal)]">
                  — {review.attribution}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
