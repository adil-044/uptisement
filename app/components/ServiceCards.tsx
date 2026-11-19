"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";
import {
  AUTOMATION_PRICE,
  CONSULTING_PRICE,
  HOSTING_MONTHLY,
  WEBSITE_FROM_SHORT,
} from "@/app/lib/prices";
import { BookLink } from "./BookLink";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "web-design",
    title: "Web design",
    price: WEBSITE_FROM_SHORT,
    note: HOSTING_MONTHLY,
    points: [
      "Booking-first sites built around one job: getting the call or booking",
      "Book on the first screen of every page",
      "Service pages for your trade and the Ontario towns you cover",
      "Google Business Profile links, reviews section, basic local SEO",
    ],
  },
  {
    id: "automations",
    title: "AI automations",
    price: AUTOMATION_PRICE,
    // PRICE: confirm with Adil
    note: "Missed-call text-back · Quote estimator · Lead CRM",
    points: [
      "Missed-call text-back within a minute — replies on the phone you already use",
      "Quote estimator: job notes in, rough range out, you approve before it sends",
      "Lead board so every call, text and form lands in one place",
      "Fixed written quote after the call",
    ],
  },
  {
    id: "consulting",
    title: "AI consulting",
    price: CONSULTING_PRICE,
    // PRICE: confirm with Adil
    note: "Practical advising for Ontario owners",
    points: [
      "What to automate first — and what not to touch yet",
      "Honest fit for owner-run shops, not franchise stacks",
      "Clear next steps with a written scope and price",
      "Works alongside web design or automations, or on its own",
    ],
  },
];

export function ServiceCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      gsap.from(root.current.querySelectorAll("[data-reveal]"), {
        y: 40,
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
    <section
      ref={root}
      id="services"
      className="section"
      aria-labelledby="services-title"
    >
      <div className="container-x">
        <p className="eyebrow" data-reveal>
          Three services
        </p>
        <h2 id="services-title" className="mt-3 max-w-[18ch] text-3xl md:text-5xl" data-reveal>
          Websites, automations, and advice — à la carte.
        </h2>
        <p className="section-lede" data-reveal>
          For owner-run Ontario trades that want a booking-first site and faster follow-up —
          not franchises, ad-only retainers, or $50,000 brand films.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              id={service.id}
              data-reveal
              className="flex flex-col border-t-2 border-[var(--color-ink)] pt-6"
            >
              <h3 className="text-2xl">{service.title}</h3>
              <p className="mt-3 font-display text-xl font-bold text-[var(--color-accent-deep)]">
                {service.price}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{service.note}</p>
              <ul className="mt-5 flex-1 space-y-3 text-[0.98rem] text-[var(--color-ink-soft)]">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 before:absolute before:left-0 before:content-['–']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[var(--color-muted)]" data-reveal>
          Not sure which? Book a 15-min call — or ask for a free demo of your site. A fixed
          written quote follows the call.
        </p>
        <div className="mt-5 flex flex-wrap gap-3" data-reveal>
          <BookLink>Book a 15-min call</BookLink>
          <BookLink className="btn btn-secondary">Get a free demo</BookLink>
        </div>
      </div>
    </section>
  );
}
