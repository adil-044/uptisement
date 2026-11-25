import type { Metadata } from "next";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { SpotlightCard } from "@/app/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Websites for salons, spas and barbers in Ontario",
  description:
    "Websites for salons, spas and barbers in Ontario. Online booking, appointment reminders, and a polite ask for a Google review. Free demo within 24 hours.",
  alternates: { canonical: "/salons/" },
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
    title: "A website built around booking.",
    body: "Your services, your location, and a clear booking button on the first screen, including after hours.",
    span: "bento-7",
    highlight: true,
  },
  {
    title: "Booking reminders.",
    body: "Clients get a reminder before their appointment, so you’re not chasing confirmations between appointments.",
    diagram: "booking-reminders" as const,
    span: "bento-5",
  },
  {
    title: "Review requests.",
    body: "After a visit, a polite nudge to leave a Google review, without you writing the same text every time.",
    diagram: "review-requests" as const,
    span: "bento-5",
  },
  {
    title: "Missed-call text-back, if calls still matter for you.",
    body: "If someone calls and you can’t pick up mid-appointment, they can get a text in seconds with a way to book.",
    diagram: "missed-call" as const,
    span: "bento-7",
  },
  {
    title: "AI consulting.",
    body: "If you’re not sure whether to start with booking, reminders, or reviews, we’ll look at how you work today and suggest one or two changes in plain English.",
    span: "bento-12",
  },
];

export default function SalonsPage() {
  return (
    <>
      <section className="section pb-8 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Salons · Spas · Barbers · Southern Ontario</p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Websites for salons, spas and barbers in Ontario.
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
                A new client finds you at 9pm, wants to book a cut, colour, or
                treatment, and your site asks them to call during open hours. A
                lot of them won’t wait.
              </p>
              <p className="mt-3 text-[var(--color-muted)]">
                The ones who do book can still forget. An empty chair is a quiet
                loss. And even happy clients often leave without a Google review,
                unless someone remembers to ask.
              </p>
              <p className="mt-3 text-[var(--color-muted)]">
                If booking, reminders and follow-up all depend on you, the day
                gets heavier than the work in the chair.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal className="bento-6" delay={0.06}>
            <SpotlightCard className="h-full compare-card--highlight">
              <h2 className="font-display text-2xl text-[var(--color-text)]">
                What we do for salons, spas and barbers
              </h2>
              <p className="mt-4 text-[var(--color-muted)]">
                We build a booking-first website that makes it easy to book on a
                phone, then add simple automations if you want them. You see a
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

      <DemoFormSection headline="See a free preview of your salon or spa website." />
    </>
  );
}
