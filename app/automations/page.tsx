import type { Metadata } from "next";
import { BookLink } from "../components/BookLink";
import { CTA } from "../components/CTA";
import { StackingCards } from "../components/StackingCards";
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

const STACK = [
  {
    id: "text-back",
    eyebrow: "For trades",
    title: "Missed-call text-back",
    body: "Auto text within a minute. Replies on the phone you already use. Simulated only.",
    href: "#text-back",
  },
  {
    id: "estimator",
    eyebrow: "Quotes",
    title: "Photo-to-quote estimator",
    body: "Rough written range the same night — you approve before it goes.",
    href: "#estimator",
  },
  {
    id: "reviews",
    eyebrow: "After the job",
    title: "Thank-you + review link",
    body: "Same link to everyone. No review gating.",
    href: "#reviews",
  },
  {
    id: "booking",
    eyebrow: "For salons",
    title: "Salon backfill & IG DM",
    body: "Cancels get waitlisted; DMs get answered and booked.",
    href: "#booking",
  },
  {
    id: "board",
    eyebrow: "Ops hub",
    title: "Receptionist, lead board, chat, tracking",
    body: "One night, many shops — routing stays simple. All demos simulated.",
    href: "#receptionist",
  },
];

export default function AutomationsPage() {
  return (
    <div className="pt-28 page-inner-ink">
      <div className="container-x wrap section !pt-0 !pb-8">
        <p className="eyebrow font-mono !text-[0.65rem] !tracking-[0.16em]">Automations</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] md:text-6xl lg:text-7xl">
          See each fix work
        </h1>
        <p className="section-lede text-[var(--color-ink-soft)] md:text-[1.1rem]">
          Interactive demos of each automation — no real SMS, call, or AI runs. Fictional
          businesses only. Starting price on a 15-min call.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <BookLink>Book a 15-min call</BookLink>
          <BookLink className="btn btn-secondary">Get a free demo</BookLink>
        </div>
      </div>

      <div className="container-x wrap pb-10">
        <StackingCards cards={STACK} />
      </div>

      <div className="container-x wrap space-y-16 pb-20">
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
