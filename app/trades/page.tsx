import type { Metadata } from "next";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";

export const metadata: Metadata = {
  title: "Websites for HVAC and trades in Ontario",
  description:
    "Websites for HVAC, plumbing, roofing and electrical businesses in Ontario. Catch missed calls, send a first quote faster, and let people book you on their phone. Free demo within 24 hours.",
  alternates: { canonical: "/trades/" },
};

const STEPS = [
  {
    title: "Tell us about your business.",
    body: "Two minutes, the form below.",
  },
  {
    title: "We build your demo.",
    body: "A real preview of your site, with your name, services and a booking button. In your inbox within 24 hours.",
  },
  {
    title: "You decide.",
    body: "Love it? Go live from $300. Not for you? Keep the ideas, no hard feelings.",
  },
];

export default function TradesPage() {
  return (
    <>
      <section className="section pb-8 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">
            HVAC · Plumbing · Roofing · Electrical · Southern Ontario
          </p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Websites for HVAC and trades in Ontario.
          </MaskedHeading>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              The problem
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              You’re on a job, and the phone rings in the truck. You can’t pick
              up. By the time you call back, they’ve already tried the next
              company on the list.
            </p>
            <p className="mt-3 text-[var(--color-muted)]">
              The same thing happens after hours. A homeowner looks you up at
              7pm, can’t book or even leave a clear request, and moves on. Or
              they ask for a price, wait, and go cold.
            </p>
            <p className="mt-3 text-[var(--color-muted)]">
              If your site is slow or hard to use on a phone, a lot of that
              starts before you ever hear the call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              What we do for trades
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              We build a booking-first website around your services and your
              area, then add simple automations if you want them. You see a free
              preview first, within 24 hours.
            </p>
            <p className="mt-3 text-[var(--color-muted)]">
              Websites start at $300. Hosting is $30 a month. Automations are
              priced on a 15-min call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap grid max-w-3xl gap-6">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              Which services fit
            </h2>
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              A website that works on a phone.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              Your name, your services, and a clear way to book or request a
              visit, without making people call during business hours.
            </p>
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              Missed-call text-back.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              You miss a call on the job. The customer gets a text in seconds.
              The job has a better chance of staying yours.
            </p>
            <AutomationDiagram kind="missed-call" className="mt-4" />
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              Instant quotes.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              Customers get a rough price range online. You approve it before it
              goes out, so the first number doesn’t sit in your drafts for days.
            </p>
            <AutomationDiagram kind="instant-quotes" className="mt-4" />
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              Review requests and booking reminders, if you want them later.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              A polite ask for a Google review after a job, or a reminder before
              a booked visit. Priced on a 15-min call.
            </p>
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              AI consulting.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              If you’re not sure what to automate first, we’ll look at how you
              work today and point to the one or two places that save real time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              How it works
            </h2>
          </Reveal>
          <ol className="mt-6 grid gap-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} as="li">
                <div className="spotlight-card p-5">
                  <span className="font-display text-sm font-bold text-[var(--color-lilac)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-[var(--color-text)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-muted)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <DemoFormSection headline="See a free preview of your trade website." />
    </>
  );
}
