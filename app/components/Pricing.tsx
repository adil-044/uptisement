"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";
import { BookLink } from "./BookLink";

gsap.registerPlugin(ScrollTrigger);

const PACKAGES = [
  {
    title: "Booking-first website",
    price: "From $300",
    // PRICE: confirmed starter; adjust if Adil changes
    items: [
      "Mobile-first site built around getting the call or booking",
      "Book and Call on screen one",
      "Service + town pages, GBP links, basic local SEO",
      "Hosting & updates: $30/mo",
    ],
  },
  {
    title: "Missed-call text-back",
    price: "Starting price on a quick call",
    // PRICE: fill in
    items: [
      "Auto text within minutes of a missed call",
      "Replies on the phone you already use",
      "Optional after-hours emergency message",
      "Monthly summary of calls caught",
    ],
  },
  {
    title: "Booked-Jobs Bundle",
    price: "Starting price on a quick call",
    // PRICE: fill in
    items: [
      "Website + missed-call text-back",
      "Quote estimator with your approval step",
      "Lead board for calls, texts and forms",
      "Hosting & updates available at $30/mo",
    ],
  },
];

export function Pricing() {
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
    <section ref={root} id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          Offer
        </p>
        <h2 id="pricing-title" className="mt-3 text-3xl md:text-5xl" data-reveal>
          Pick what fixes the leak first
        </h2>
        <p className="section-lede" data-reveal>
          Prices are starting points. You get a fixed quote in writing after a 15-min call.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.title}
              data-reveal
              className="bg-[color-mix(in_srgb,white_70%,transparent)] p-6 md:p-7"
            >
              <h3 className="text-xl">{pkg.title}</h3>
              <p className="mt-3 font-display text-2xl font-bold">{pkg.price}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-[var(--color-ink-soft)]">
                {pkg.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[var(--color-muted)]" data-reveal>
          AI consulting is scoped on the same call. Not sure which package? I&apos;ll tell you
          which one fixes the most lost jobs first.
        </p>
        <div className="mt-5 flex flex-wrap gap-3" data-reveal>
          <BookLink>Book a 15-min call</BookLink>
          <BookLink className="btn btn-secondary">Get a free demo</BookLink>
        </div>
      </div>
    </section>
  );
}
