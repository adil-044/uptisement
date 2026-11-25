import type { Metadata } from "next";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";

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
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              The problem
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              A new client finds you at 9pm, wants to book a cut, colour, or
              treatment, and your site asks them to call during open hours. A lot
              of them won’t wait.
            </p>
            <p className="mt-3 text-[var(--color-muted)]">
              The ones who do book can still forget. An empty chair is a quiet
              loss. And even happy clients often leave without a Google review,
              unless someone remembers to ask.
            </p>
            <p className="mt-3 text-[var(--color-muted)]">
              If booking, reminders and follow-up all depend on you, the day gets
              heavier than the work in the chair.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              What we do for salons, spas and barbers
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              We build a booking-first website that makes it easy to book on a
              phone, then add simple automations if you want them. You see a free
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
              A website built around booking.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              Your services, your location, and a clear booking button on the
              first screen, including after hours.
            </p>
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              Booking reminders.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              Clients get a reminder before their appointment, so you’re not
              chasing confirmations between appointments.
            </p>
            <AutomationDiagram kind="booking-reminders" className="mt-4" />
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              Review requests.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              After a visit, a polite nudge to leave a Google review, without you
              writing the same text every time.
            </p>
            <AutomationDiagram kind="review-requests" className="mt-4" />
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              Missed-call text-back, if calls still matter for you.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              If someone calls and you can’t pick up mid-appointment, they can
              get a text in seconds with a way to book.
            </p>
            <AutomationDiagram kind="missed-call" className="mt-4" />
          </Reveal>

          <Reveal className="spotlight-card p-5">
            <h3 className="font-display text-xl text-[var(--color-text)]">
              AI consulting.
            </h3>
            <p className="mt-3 text-[var(--color-muted)]">
              If you’re not sure whether to start with booking, reminders, or
              reviews, we’ll look at how you work today and suggest one or two
              changes in plain English.
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

      <DemoFormSection headline="See a free preview of your salon or spa website." />
    </>
  );
}
