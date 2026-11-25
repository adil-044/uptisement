import type { Metadata } from "next";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { SpotlightCard } from "@/app/components/SpotlightCard";

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

const SERVICES = [
  {
    title: "A website that works on a phone.",
    body: "Your name, your services, and a clear way to book or request a visit, without making people call during business hours.",
    span: "bento-7",
    highlight: true,
  },
  {
    title: "Missed-call text-back.",
    body: "You miss a call on the job. The customer gets a text in seconds. The job has a better chance of staying yours.",
    diagram: "missed-call" as const,
    span: "bento-5",
  },
  {
    title: "Instant quotes.",
    body: "Customers get a rough price range online. You approve it before it goes out, so the first number doesn’t sit in your drafts for days.",
    diagram: "instant-quotes" as const,
    span: "bento-5",
  },
  {
    title: "Review requests and booking reminders, if you want them later.",
    body: "A polite ask for a Google review after a job, or a reminder before a booked visit. Priced on a 15-min call.",
    span: "bento-7",
  },
  {
    title: "AI consulting.",
    body: "If you’re not sure what to automate first, we’ll look at how you work today and point to the one or two places that save real time.",
    span: "bento-12",
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
        <div className="container-x wrap bento">
          <Reveal className="bento-6">
            <SpotlightCard className="h-full">
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
            </SpotlightCard>
          </Reveal>

          <Reveal className="bento-6" delay={0.06}>
            <SpotlightCard className="h-full compare-card--highlight">
              <h2 className="font-display text-2xl text-[var(--color-text)]">
                What we do for trades
              </h2>
              <p className="mt-4 text-[var(--color-muted)]">
                We build a booking-first website around your services and your
                area, then add simple automations if you want them. You see a
                free preview first, within 24 hours.
              </p>
              <p className="mt-3 text-[var(--color-muted)]">
                Websites start at $300. Hosting is $30 a month. Automations are
                priced on a 15-min call.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)] md:text-3xl">
              Which services fit
            </h2>
          </Reveal>
          <div className="bento mt-6">
            {SERVICES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className={item.span}>
                <SpotlightCard
                  className={`h-full ${item.highlight ? "compare-card--highlight" : ""}`}
                >
                  <h3 className="font-display text-xl text-[var(--color-text)] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[var(--color-muted)]">{item.body}</p>
                  {"diagram" in item && item.diagram ? (
                    <AutomationDiagram kind={item.diagram} className="mt-4" />
                  ) : null}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)] md:text-3xl">
              How it works
            </h2>
          </Reveal>
          <ol className="bento mt-6 list-none">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.08}
                as="li"
                className={i === 2 ? "bento-12" : "bento-4"}
              >
                <SpotlightCard className="h-full">
                  <span className="font-display text-sm font-bold text-[var(--color-lilac)]">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-[var(--color-text)] md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-muted)]">{step.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <DemoFormSection headline="See a free preview of your trade website." />
    </>
  );
}
