import type { Metadata } from "next";
import { BookLink } from "../components/BookLink";
import { CTA } from "../components/CTA";
import {
  DemoA1TextBack,
  DemoA2Estimator,
  DemoA3Reviews,
  DemoA4Salon,
  DemoA5IgDm,
  DemoA6Receptionist,
  DemoA7LeadBoard,
  DemoA8BookingChat,
  DemoA9Tracking,
} from "../components/demos";

export const metadata: Metadata = {
  title: "Automations — Missed-call text-back, quotes, booking",
  description:
    "Interactive simulated demos: missed-call text-back, photo-to-quote, reviews, salon booking, IG DM, receptionist, lead board, AI booking chat, and tracking.",
  alternates: { canonical: "/automations/" },
};

const TOC = [
  { href: "#text-back", label: "Text-back" },
  { href: "#estimator", label: "Estimator" },
  { href: "#reviews", label: "Reviews" },
  { href: "#booking", label: "Salon booking" },
  { href: "#ig-dm", label: "IG DM" },
  { href: "#receptionist", label: "Receptionist" },
  { href: "#lead-board", label: "Lead board" },
  { href: "#ai-booking", label: "AI booking" },
  { href: "#tracking", label: "Tracking" },
];

export default function AutomationsPage() {
  return (
    <div className="pt-28">
      <div className="container-x section !pt-0 !pb-8">
        <p className="eyebrow">Automations</p>
        <h1 className="mt-3 text-4xl md:text-6xl">See each fix work</h1>
        <p className="section-lede">
          Every demo is scripted and labelled simulated — no real SMS, call, or AI runs.
          Fictional businesses only. Starting price on a 15-min call.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <BookLink>Book a 15-min call</BookLink>
          <BookLink className="btn btn-secondary">Get a free demo</BookLink>
        </div>
        <nav
          className="mt-8 flex flex-wrap gap-2"
          aria-label="Automation demos"
        >
          {TOC.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm font-semibold"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container-x space-y-16 pb-20">
        <section aria-labelledby="a1-heading">
          <h2 id="a1-heading" className="sr-only">
            Missed-call text-back
          </h2>
          <DemoA1TextBack />
        </section>
        <section aria-labelledby="a2-heading">
          <h2 id="a2-heading" className="sr-only">
            Estimator
          </h2>
          <DemoA2Estimator />
        </section>
        <section aria-labelledby="a3-heading">
          <h2 id="a3-heading" className="sr-only">
            Reviews
          </h2>
          <DemoA3Reviews />
        </section>
        <section aria-labelledby="a4-heading">
          <h2 id="a4-heading" className="sr-only">
            Salon booking
          </h2>
          <DemoA4Salon />
        </section>
        <section aria-labelledby="a5-heading">
          <h2 id="a5-heading" className="sr-only">
            IG DM
          </h2>
          <DemoA5IgDm />
        </section>
        <section aria-labelledby="a6-heading">
          <h2 id="a6-heading" className="sr-only">
            Receptionist
          </h2>
          <DemoA6Receptionist />
        </section>
        <section aria-labelledby="a7-heading">
          <h2 id="a7-heading" className="sr-only">
            Lead board
          </h2>
          <DemoA7LeadBoard />
        </section>
        <section aria-labelledby="a8-heading">
          <h2 id="a8-heading" className="sr-only">
            AI booking
          </h2>
          <DemoA8BookingChat />
        </section>
        <section aria-labelledby="a9-heading">
          <h2 id="a9-heading" className="sr-only">
            Tracking
          </h2>
          <DemoA9Tracking />
        </section>
      </div>
      <CTA />
    </div>
  );
}
