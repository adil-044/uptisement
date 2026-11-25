import type { Metadata } from "next";
import Link from "next/link";
import { AutomationDiagram } from "./components/AutomationDiagram";
import { DemoForm } from "./components/DemoForm";
import { DemoFormSection } from "./components/DemoFormSection";
import { FAQList } from "./components/FAQList";
import { Reveal } from "./components/Reveal";
import { SlideUpHeadline } from "./components/SlideUpHeadline";
import { REVIEWS } from "./lib/reviews";

export const metadata: Metadata = {
  title: {
    absolute: "See your new website before you pay a cent | Uptisement",
  },
  description:
    "Tell us about your business. Within 24 hours we’ll send a free, personalised preview of a booking-first website built for you. From $300. Southern Ontario.",
  alternates: { canonical: "/" },
};

const HOW_STEPS = [
  {
    n: "1",
    title: "Tell us about your business.",
    body: "Two minutes, the form above.",
  },
  {
    n: "2",
    title: "We build your demo.",
    body: "A real preview of your site, with your name, services and a booking button. In your inbox within 24 hours.",
  },
  {
    n: "3",
    title: "You decide.",
    body: "Love it? Go live from $300. Not for you? Keep the ideas, no hard feelings.",
  },
];

const PRICING = [
  { label: "Free demo", value: "$0", note: "See your site first." },
  { label: "Website", value: "from $300", note: "One time." },
  { label: "Hosting", value: "$30/month", note: "" },
  {
    label: "Automations and consulting",
    value: "Priced on a 15-min call",
    note: "Based on what you actually need.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — form beside headline */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pt-32">
        <div
          className="glow-orb glow-orb--drift absolute -left-10 top-16 h-64 w-64"
          aria-hidden
        />
        <div
          className="glow-orb absolute -right-16 top-40 h-72 w-72 opacity-30"
          aria-hidden
        />
        <div className="container-x wrap grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,22.5rem)]">
          <div className="relative z-10">
            <p className="eyebrow">
              Websites + AI for local businesses in Southern Ontario
            </p>
            <SlideUpHeadline className="mt-4 max-w-2xl font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold tracking-tight text-white">
              See your new website before you pay a cent.
            </SlideUpHeadline>
            <Reveal delay={0.12}>
              <p className="section-lede mt-5 text-lg">
                Tell us about your business. Within 24 hours we&apos;ll send you
                a free, personalised preview of a booking-first website built for
                you.
              </p>
            </Reveal>
          </div>
          <div className="relative z-10">
            <DemoForm id="demo-hero" compact />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <Reveal>
        <section className="border-y border-[color-mix(in_srgb,white_8%,transparent)] py-5">
          <p className="container-x wrap text-center text-sm font-semibold tracking-wide text-[color-mix(in_srgb,white_70%,transparent)]">
            Serving Southern Ontario since 2023 · Trusted by RHR Tax · Kuzz
            Kreations · Miami Hair Spa · Chocor
          </p>
        </section>
      </Reveal>

      {/* Problem */}
      <section className="section">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Your next customer is searching right now.
            </h2>
            <p className="section-lede">
              If your site is slow, hard to use on a phone, or makes people call
              during business hours, they book someone else. Most owners never
              find out how many jobs they lost.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section pt-0">
        <div className="container-x wrap">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              Three steps. You stay in control.
            </h2>
          </Reveal>
          <ol className="relative mt-10 grid gap-6 md:grid-cols-3">
            {HOW_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} as="li" className="relative">
                <div className="surface-panel h-full p-5">
                  <span className="font-display text-sm font-bold text-[var(--color-mint)]">
                    Step {step.n}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[color-mix(in_srgb,white_72%,transparent)]">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="section border-t border-[color-mix(in_srgb,white_8%,transparent)]">
        <div className="container-x wrap">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              Websites, automations, consulting.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Reveal className="surface-panel cursor-card p-5">
              <h3 className="font-display text-xl font-bold text-white">
                Websites and hosting
              </h3>
              <p className="mt-3 text-[color-mix(in_srgb,white_72%,transparent)]">
                Fast, mobile-first sites built around one thing: getting
                customers to book. From $300, hosting $30/month.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="surface-panel cursor-card p-5 lg:col-span-2">
              <h3 className="font-display text-xl font-bold text-white">
                AI automations
              </h3>
              <p className="mt-3 text-[color-mix(in_srgb,white_72%,transparent)]">
                Small systems that work while you&apos;re on the job. Start with
                one, add more when it pays for itself.
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                <li>
                  <p className="text-sm font-semibold text-white">
                    Missed-call text-back
                  </p>
                  <p className="mt-1 text-sm text-[color-mix(in_srgb,white_68%,transparent)]">
                    Miss a call, the customer gets a text in seconds, the job
                    stays yours.
                  </p>
                  <AutomationDiagram kind="missed-call" className="mt-3" />
                </li>
                <li>
                  <p className="text-sm font-semibold text-white">
                    Instant quotes
                  </p>
                  <p className="mt-1 text-sm text-[color-mix(in_srgb,white_68%,transparent)]">
                    Customers get a rough price range online; you approve before
                    it goes out.
                  </p>
                  <AutomationDiagram kind="instant-quotes" className="mt-3" />
                </li>
                <li>
                  <p className="text-sm font-semibold text-white">
                    Review requests
                  </p>
                  <p className="mt-1 text-sm text-[color-mix(in_srgb,white_68%,transparent)]">
                    Happy customers get a polite nudge to leave a Google review.
                  </p>
                  <AutomationDiagram kind="review-requests" className="mt-3" />
                </li>
                <li>
                  <p className="text-sm font-semibold text-white">
                    Booking reminders
                  </p>
                  <p className="mt-1 text-sm text-[color-mix(in_srgb,white_68%,transparent)]">
                    Fewer no-shows, without you chasing anyone.
                  </p>
                  <AutomationDiagram kind="booking-reminders" className="mt-3" />
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="surface-panel cursor-card p-5 lg:col-span-3">
              <h3 className="font-display text-xl font-bold text-white">
                AI consulting
              </h3>
              <p className="mt-3 max-w-3xl text-[color-mix(in_srgb,white_72%,transparent)]">
                Not sure where AI fits in your business? We&apos;ll look at how
                you work today and show you the one or two places it saves real
                time. Plain English, no jargon.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="section">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Real sites for real local businesses.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Reveal className="surface-panel cursor-card p-5">
              <span className="label-pill" data-kind="Client site">
                Client site
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                RHR Tax
              </h3>
              <a
                href="https://rhrtax.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex font-semibold text-[var(--color-mint)] underline underline-offset-2"
              >
                rhrtax.ca →
              </a>
            </Reveal>
            <Reveal delay={0.08} className="surface-panel p-5">
              <span className="label-pill" data-kind="Site offline">
                Site offline
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                Chocor
              </h3>
              <p className="mt-3 text-sm text-[color-mix(in_srgb,white_60%,transparent)]">
                Client site — currently offline
              </p>
            </Reveal>
          </div>
          <p className="mt-5">
            <Link
              href="/work/"
              className="font-semibold text-[var(--color-mint)] underline underline-offset-2"
            >
              See all work →
            </Link>
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="section pt-0">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white">
              Reviews
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.attribution} delay={i * 0.06} as="li">
                <blockquote className="surface-panel h-full p-5">
                  <p className="text-lg text-white">&ldquo;{r.quote}&rdquo;</p>
                  <footer className="mt-3 text-sm font-semibold text-[var(--color-mint)]">
                    {r.attribution}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="section border-t border-[color-mix(in_srgb,white_8%,transparent)]">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Simple pricing
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3">
            {PRICING.map((row, i) => (
              <Reveal key={row.label} delay={i * 0.05}>
                <div
                  className={`flex flex-wrap items-baseline justify-between gap-3 rounded-xl border px-4 py-4 ${
                    i === 0
                      ? "border-[color-mix(in_srgb,var(--color-mint)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-mint)_10%,transparent)]"
                      : "border-[color-mix(in_srgb,white_10%,transparent)] bg-[color-mix(in_srgb,var(--color-ink-soft)_60%,transparent)]"
                  }`}
                >
                  <div>
                    <p className="font-display text-lg font-bold text-white">
                      {row.label}
                    </p>
                    {row.note ? (
                      <p className="text-sm text-[color-mix(in_srgb,white_65%,transparent)]">
                        {row.note}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-display text-xl font-bold text-[var(--color-mint)]">
                    {row.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5">
            <Link
              href="/pricing/"
              className="font-semibold text-[var(--color-mint)] underline underline-offset-2"
            >
              Full pricing →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-white">FAQ</h2>
          </Reveal>
          <div className="mt-6">
            <FAQList
              items={[
                {
                  question: "Is the demo really free?",
                  answer:
                    "Yes. No card, no contract. If you don't love it, you walk away.",
                },
                {
                  question: "How fast is it?",
                  answer:
                    "Your demo arrives within 24 hours of sending the form.",
                },
                {
                  question: "What do I need to give you?",
                  answer:
                    "Just the form. That's enough to get your demo started.",
                },
                {
                  question: "Do I own my website?",
                  answer: (
                    <p className="remy-note">
                      I asked my boss Adil to confirm this in writing, but
                      he&apos;s busy helping a client. Book a 15-min call and
                      he&apos;ll walk you through it. — Remy
                    </p>
                  ),
                },
                {
                  question: "Do you only work with trades?",
                  answer:
                    "Trades first, but we also build for salons, spas, barbers and dental clinics.",
                },
                {
                  question: "Where are you based?",
                  answer: "Southern Ontario. Everything is done remotely, fast.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <DemoFormSection headline="Your free demo is 24 hours away." formId="demo-home-bottom" />
    </>
  );
}
