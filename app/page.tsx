import type { Metadata } from "next";
import Link from "next/link";
import { AutomationDiagram } from "./components/AutomationDiagram";
import { CardStack } from "./components/CardStack";
import { DemoForm } from "./components/DemoForm";
import { DemoFormSection } from "./components/DemoFormSection";
import { FAQList } from "./components/FAQList";
import { LogoLoop } from "./components/LogoLoop";
import { MaskedHeading } from "./components/MaskedHeading";
import { Reveal } from "./components/Reveal";
import { ScrollStack } from "./components/ScrollStack";
import { SoftAurora } from "./components/SoftAurora";
import { SpotlightCard } from "./components/SpotlightCard";
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
    n: "01",
    title: "Tell us about your business.",
    body: "Two minutes, the form above.",
  },
  {
    n: "02",
    title: "We build your demo.",
    body: "A real preview of your site, with your name, services and a booking button. In your inbox within 24 hours.",
  },
  {
    n: "03",
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
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
        <SoftAurora />
        <div className="container-x wrap relative z-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,23rem)]">
          <div>
            <p className="wordmark wordmark-metallic text-3xl md:text-4xl">
              uptisement
            </p>
            <p className="eyebrow mt-8">
              Websites + AI for local businesses in Southern Ontario
            </p>
            <MaskedHeading className="mt-5 max-w-[11ch] font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95]">
              See your new website before you pay a cent.
            </MaskedHeading>
            <Reveal delay={0.15}>
              <p className="section-lede mt-6 text-lg md:text-xl">
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

      {/* Trust strip — Logo Loop */}
      <section className="border-y border-[var(--color-border)] py-8">
        <div className="container-x wrap">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Serving Southern Ontario since 2023 · Trusted by
          </p>
          <LogoLoop
            names={["RHR Tax", "Kuzz Kreations", "Miami Hair Spa", "Chocor"]}
          />
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-4xl text-[var(--color-text)] md:text-5xl">
              Your next customer is searching right now.
            </h2>
            <p className="section-lede text-lg">
              If your site is slow, hard to use on a phone, or makes people call
              during business hours, they book someone else. Most owners never
              find out how many jobs they lost.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works — Scroll Stack */}
      <section className="section pt-0">
        <div className="container-x wrap">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl text-[var(--color-text)] md:text-5xl">
              Three steps. You stay in control.
            </h2>
          </Reveal>
          <div className="mt-12">
            <ScrollStack items={HOW_STEPS} />
          </div>
        </div>
      </section>

      {/* Services — Spotlight / bento */}
      <section className="section border-t border-[var(--color-border)]">
        <div className="container-x wrap">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 font-display text-4xl text-[var(--color-text)] md:text-5xl">
              Websites, automations, consulting.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <SpotlightCard className="lg:col-span-1">
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                Websites and hosting
              </h3>
              <p className="mt-4 text-[var(--color-muted)]">
                Fast, mobile-first sites built around one thing: getting
                customers to book. From $300, hosting $30/month.
              </p>
            </SpotlightCard>

            <SpotlightCard className="lg:col-span-2">
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                AI automations
              </h3>
              <p className="mt-4 text-[var(--color-muted)]">
                Small systems that work while you&apos;re on the job. Start with
                one, add more when it pays for itself.
              </p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                <li>
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Missed-call text-back
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Miss a call, the customer gets a text in seconds, the job
                    stays yours.
                  </p>
                  <AutomationDiagram kind="missed-call" className="mt-3" />
                </li>
                <li>
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Instant quotes
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Customers get a rough price range online; you approve before
                    it goes out.
                  </p>
                  <AutomationDiagram kind="instant-quotes" className="mt-3" />
                </li>
                <li>
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Review requests
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Happy customers get a polite nudge to leave a Google review.
                  </p>
                  <AutomationDiagram kind="review-requests" className="mt-3" />
                </li>
                <li>
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Booking reminders
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Fewer no-shows, without you chasing anyone.
                  </p>
                  <AutomationDiagram kind="booking-reminders" className="mt-3" />
                </li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="lg:col-span-3">
              <h3 className="font-display text-2xl text-[var(--color-text)]">
                AI consulting
              </h3>
              <p className="mt-4 max-w-3xl text-[var(--color-muted)]">
                Not sure where AI fits in your business? We&apos;ll look at how
                you work today and show you the one or two places it saves real
                time. Plain English, no jargon.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="section">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-4xl text-[var(--color-text)] md:text-5xl">
              Real sites for real local businesses.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <SpotlightCard>
              <span className="label-pill" data-kind="Client site">
                Client site
              </span>
              <h3 className="mt-4 font-display text-3xl text-[var(--color-text)]">
                RHR Tax
              </h3>
              <a
                href="https://rhrtax.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="link-plain mt-4 inline-flex"
              >
                rhrtax.ca →
              </a>
            </SpotlightCard>
            <SpotlightCard>
              <span className="label-pill" data-kind="Site offline">
                Site offline
              </span>
              <h3 className="mt-4 font-display text-3xl text-[var(--color-text)]">
                Chocor
              </h3>
              <p className="mt-4 text-sm text-[var(--color-muted)]">
                Client site — currently offline
              </p>
            </SpotlightCard>
          </div>
          <p className="mt-6">
            <Link href="/work/" className="link-plain">
              See all work →
            </Link>
          </p>
        </div>
      </section>

      {/* Reviews — Card Stack */}
      <section className="section pt-0">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="mb-10 font-display text-4xl text-[var(--color-text)]">
              Reviews
            </h2>
          </Reveal>
          <CardStack reviews={REVIEWS} />
        </div>
      </section>

      {/* Pricing */}
      <section className="section border-t border-[var(--color-border)]">
        <div className="container-x wrap">
          <Reveal>
            <h2 className="font-display text-4xl text-[var(--color-text)] md:text-5xl">
              Simple pricing
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3">
            {PRICING.map((row, i) => (
              <Reveal key={row.label} delay={i * 0.05}>
                <div
                  className={`flex flex-wrap items-baseline justify-between gap-3 rounded-2xl border px-5 py-5 ${
                    i === 0
                      ? "border-[color-mix(in_srgb,var(--color-lilac)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-lilac)_8%,transparent)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)]"
                  }`}
                >
                  <div>
                    <p className="font-display text-xl text-[var(--color-text)]">
                      {row.label}
                    </p>
                    {row.note ? (
                      <p className="text-sm text-[var(--color-muted)]">
                        {row.note}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-display text-2xl text-[var(--color-lilac)]">
                    {row.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/pricing/" className="link-plain">
              Full pricing →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-4xl text-[var(--color-text)]">
              FAQ
            </h2>
          </Reveal>
          <div className="mt-8">
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

      <DemoFormSection
        headline="Your free demo is 24 hours away."
        formId="demo-home-bottom"
      />
    </>
  );
}
