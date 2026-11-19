"use client";

import { m, useReducedMotion } from "motion/react";
import {
  AUTOMATION_PRICE,
  BUNDLE_PRICE,
  HOSTING_MONTHLY,
  WEBSITE_FROM_SHORT,
} from "@/app/lib/prices";
import { BookLink } from "./BookLink";
import { PriceTag } from "./PriceTag";

const PACKAGES = [
  {
    id: "website",
    title: "Booking-first website",
    description: "Book on screen one for owner-run Ontario trades.",
    price: WEBSITE_FROM_SHORT,
    items: [
      "Mobile-first site built around getting the call or booking",
      "Book on screen one",
      "Service pages, GBP links, basic local SEO",
      HOSTING_MONTHLY,
    ],
  },
  {
    id: "textback",
    title: "Missed-call text-back",
    description: "Catch the lead while you're still on the job.",
    price: AUTOMATION_PRICE,
    items: [
      "Auto text within a minute of a missed call",
      "Replies on the phone you already use",
      "Optional after-hours emergency message",
      "Monthly summary of calls caught",
    ],
  },
  {
    id: "bundle",
    title: "Booked-Jobs Bundle",
    description: "Site + text-back + quote path + lead board.",
    price: BUNDLE_PRICE,
    items: [
      "Website + missed-call text-back",
      "Quote estimator with your approval step",
      "Lead board for calls, texts and forms",
      HOSTING_MONTHLY,
    ],
  },
];

type Props = { compact?: boolean };

/**
 * Superdesign pricing-section: split layout, orange checks, depth on the Book button.
 * Prices stay from prices.ts — nothing invented.
 */
export function Pricing({ compact = false }: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="pricing"
      className={compact ? "w-full" : "section"}
      aria-labelledby="pricing-title"
      data-superdesign="pricing-section"
    >
      <div className="container-x wrap">
        <p className="eyebrow">Offer</p>
        <h2
          id="pricing-title"
          className="mt-3 font-display text-3xl font-extrabold tracking-[-0.03em] md:text-5xl"
        >
          Pick what fixes the leak first
        </h2>
        <p className="section-lede">
          Websites from $300. Hosting &amp; updates $30/mo. Everything else: starting price on
          a 15-min call — fixed quote in writing after.
        </p>

        <div className="pricing-stack mt-10 space-y-5">
          {PACKAGES.map((pkg, i) => (
            <m.article
              key={pkg.id}
              className="pricing-card m-card"
              /* Visible at rest (scripts-off); Motion only lifts slightly */
              initial={false}
              whileInView={reduce ? undefined : { y: [8, 0] }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.45,
                delay: reduce ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="pricing-card__summary">
                <h3 className="font-display text-xl font-bold md:text-2xl">{pkg.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{pkg.description}</p>
                <PriceTag
                  label={pkg.price}
                  className="mt-4 font-display text-2xl font-bold md:text-3xl"
                />
                <BookLink className="btn btn-book pricing-card__btn mt-5 w-full sm:w-auto">
                  Book a 15-min call
                </BookLink>
              </div>
              <ul className="pricing-card__features">
                {pkg.items.map((item) => (
                  <li key={item}>
                    <span className="pricing-card__check" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </m.article>
          ))}
        </div>

        {!compact && (
          <>
            <p className="mt-8 text-[var(--color-muted)]">
              AI consulting is scoped on the same call. Not sure which package? I&apos;ll tell you
              which one fixes the most lost jobs first.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <BookLink>Book a 15-min call</BookLink>
              <BookLink className="btn btn-secondary">Get a free demo</BookLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
