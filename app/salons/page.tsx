import type { Metadata } from "next";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { SlideUpHeadline } from "@/app/components/SlideUpHeadline";

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
      <section className="section pb-8 pt-28 md:pt-32">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Salons · Spas · Barbers · Southern Ontario</p>
          <SlideUpHeadline className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-white">
            Websites for salons, spas and barbers in Ontario.
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
              A new client finds you at 9pm, wants to book a cut, colour, or
              treatment, and your site asks them to call during open hours. A lot
              of them won’t wait.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              The ones who do book can still forget. An empty chair is a quiet
              loss. And even happy clients often leave without a Google review,
              unless someone remembers to ask.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              If booking, reminders and follow-up all depend on you, the day gets
              heavier than the work in the chair.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-white">
              What we do for salons, spas and barbers
            </h2>
            <p className="mt-4 text-[color-mix(in_srgb,white_74%,transparent)]">
              We build a booking-first website that makes it easy to book on a
              phone, then add simple automations if you want them. You see a free
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
              A website built around booking.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Your services, your location, and a clear booking button on the
              first screen, including after hours.
            </p>
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              Booking reminders.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Clients get a reminder before their appointment, so you’re not
              chasing confirmations between appointments.
            </p>
            <AutomationDiagram kind="booking-reminders" className="mt-4" />
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              Review requests.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              After a visit, a polite nudge to leave a Google review, without you
              writing the same text every time.
            </p>
            <AutomationDiagram kind="review-requests" className="mt-4" />
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              Missed-call text-back, if calls still matter for you.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              If someone calls and you can’t pick up mid-appointment, they can
              get a text in seconds with a way to book.
            </p>
            <AutomationDiagram kind="missed-call" className="mt-4" />
          </Reveal>

          <Reveal className="surface-panel p-5">
            <h3 className="font-display text-xl font-bold text-white">
              AI consulting.
            </h3>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
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

      <DemoFormSection headline="See a free preview of your salon or spa website." />
    </>
  );
}
