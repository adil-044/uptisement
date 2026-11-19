"use client";

import {
  AUTOMATION_PRICE,
  CONSULTING_PRICE,
  HOSTING_MONTHLY,
  WEBSITE_FROM_SHORT,
} from "@/app/lib/prices";
import { BookLink } from "./BookLink";
import { StackingCards } from "./StackingCards";

const SERVICES = [
  {
    id: "web-design",
    eyebrow: "Web design",
    title: `Booking-first sites · ${WEBSITE_FROM_SHORT}`,
    body: `Book on screen one, service pages for your towns, GBP links. ${HOSTING_MONTHLY}.`,
    href: "/services/#web-design",
  },
  {
    id: "automations",
    eyebrow: "AI automations",
    title: `Catch the lead · ${AUTOMATION_PRICE}`,
    body: "Missed-call text-back, quote estimator you approve, lead board in one place.",
    href: "/automations/",
  },
  {
    id: "consulting",
    eyebrow: "AI consulting",
    title: `What to automate first · ${CONSULTING_PRICE}`,
    body: "Practical fit for owner-run Ontario shops — written scope after the call.",
    href: "/services/#consulting",
  },
];

export function ServiceCards() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container-x wrap">
        <p className="eyebrow">Three services</p>
        <h2
          id="services-title"
          className="mt-3 max-w-[18ch] font-display text-3xl font-extrabold tracking-[-0.03em] md:text-5xl"
        >
          Websites, automations, and advice — à la carte.
        </h2>
        <p className="section-lede">
          For owner-run Ontario trades that want a booking-first site and faster follow-up —
          not franchises, ad-only retainers, or $50,000 brand films.
        </p>

        <div className="mt-10">
          <StackingCards cards={SERVICES} />
        </div>

        <p className="mt-6 text-[var(--color-muted)]">
          Not sure which? Book a 15-min call — or ask for a free demo of your site. A fixed
          written quote follows the call.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <BookLink>Book a 15-min call</BookLink>
          <BookLink className="btn btn-secondary">Get a free demo</BookLink>
        </div>
      </div>
    </section>
  );
}
