import type { Metadata } from "next";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { SlideUpHeadline } from "@/app/components/SlideUpHeadline";

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
      <section className="section pb-8 pt-28 md:pt-32">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">
            HVAC · Plumbing · Roofing · Electrical · Southern Ontario
          </p>
          <SlideUpHeadline className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-white">
            Websites for HVAC and trades in Ontario.
          </SlideUpHeadline>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">
              The problem
            </h2>
            <p className="mt-4 text-[color-mix(in_srgb,white_74%,transparent)]">
              You’re on a job, and the phone rings in the truck. You can’t pick
              up. By the time you call back, they’ve already tried the next
              company on the list.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              The same thing happens after hours. A homeowner looks you up at
              7pm, can’t book or even leave a clear request, and moves on. Or
              they ask for a price, wait, and go cold.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              If your site is slow or hard to use on a phone, a lot of that
              starts before you ever hear the call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">
              What we do for trades
            </h2>
            <p className="mt-4 text-[color-mix(in_srgb,white_74%,transparent)]">
              We build a booking-first website around your services and your
              area, then add simple automations if you want them. You see a free
              preview first, within 24 hours.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Websites start at $300. Hosting is $30 a month. Automations are
              priced on a 15-min call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap grid max-w-3xl gap-6">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">
              Which services fit
            </h2>
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              A website that works on a phone.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Your name, your services, and a clear way to book or request a
              visit, without making people call during business hours.
            </p>
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              Missed-call text-back.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              You miss a call on the job. The customer gets a text in seconds.
              The job has a better chance of staying yours.
            </p>
            <AutomationDiagram kind="missed-call" className="mt-4" />
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              Instant quotes.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Customers get a rough price range online. You approve it before it
              goes out, so the first number doesn’t sit in your drafts for days.
            </p>
            <AutomationDiagram kind="instant-quotes" className="mt-4" />
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              Review requests and booking reminders, if you want them later.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              A polite ask for a Google review after a job, or a reminder before
              a booked visit. Priced on a 15-min call.
            </p>
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              AI consulting.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              If you’re not sure what to automate first, we’ll look at how you
              work today and point to the one or two places that save real time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">
              How it works
            </h2>
          </Reveal>
          <ol className="mt-6 grid gap-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} as="li">
                <div className="surface-panel p-5">
                  <span className="font-display text-sm font-bold text-[var(--color-mint)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
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
