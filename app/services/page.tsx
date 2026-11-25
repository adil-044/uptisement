import type { Metadata } from "next";
import Link from "next/link";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { SlideUpHeadline } from "@/app/components/SlideUpHeadline";

export const metadata: Metadata = {
  title: "Websites, AI automations and consulting",
  description:
    "Booking-first websites from $300, simple AI automations, and plain-English consulting for local businesses in Southern Ontario. Free demo within 24 hours.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section pb-10 pt-28 md:pt-32">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Services · Southern Ontario</p>
          <SlideUpHeadline className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-white">
            Websites, automations and consulting that help people book you.
          </SlideUpHeadline>
          <Reveal delay={0.1}>
            <p className="section-lede">
              Three things, done for you: a website built to get bookings, small
              automations that run while you’re working, and straight advice on
              where AI actually helps.
            </p>
            <p className="mt-4 text-[color-mix(in_srgb,white_72%,transparent)]">
              Start with the free demo. Add an automation later if you need one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap grid gap-8">
          <Reveal className="surface-panel p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Websites and hosting
            </h2>
            <p className="mt-4 text-[color-mix(in_srgb,white_74%,transparent)]">
              Fast, mobile-first sites built around one thing: getting customers
              to book.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Your demo is a real preview with your name, your services and a
              booking button. If you want to go live, websites start at $300, one
              time. Hosting is $30 a month.
            </p>
            <p className="remy-note mt-5">
              I asked Adil to write the full list of what’s included, but he’s
              busy helping clients. Book a 15-min call and he’ll go through it
              with you. — Remy
            </p>
            <p className="mt-5">
              <Link
                href="/pricing/"
                className="font-semibold text-[var(--color-mint)] underline underline-offset-2"
              >
                See pricing →
              </Link>
            </p>
          </Reveal>

          <Reveal className="surface-panel p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              AI automations
            </h2>
            <p className="mt-4 text-[color-mix(in_srgb,white_74%,transparent)]">
              Small systems that work while you’re on the job. Start with one,
              add more when you’re ready.
            </p>
            <p className="mt-3 text-[color-mix(in_srgb,white_74%,transparent)]">
              Each one is priced on a 15-min call, based on what you actually
              need.
            </p>

            <div className="mt-8 grid gap-6">
              <article>
                <h3 className="font-display text-xl font-bold text-white">
                  Missed-call text-back
                </h3>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">What it does.</strong> If you
                  miss a call, the customer gets a text in seconds asking when
                  they’d like you out. Their reply comes back to you, so the job
                  stays yours.
                </p>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">Who it’s for.</strong> Trades
                  and other local services that take calls while they’re on a
                  job, and anyone who loses after-hours leads.
                </p>
                <AutomationDiagram kind="missed-call" className="mt-4" />
                <p className="mt-3 text-sm font-semibold text-[var(--color-mint)]">
                  Price: Priced on a 15-min call.
                </p>
              </article>

              <article>
                <h3 className="font-display text-xl font-bold text-white">
                  Instant quotes
                </h3>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">What it does.</strong> Customers
                  can get a rough price range online. You approve it before it
                  goes out.
                </p>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">Who it’s for.</strong> Trades
                  and home-service businesses that spend too long writing the
                  first ballpark, and lose leads while they wait.
                </p>
                <AutomationDiagram kind="instant-quotes" className="mt-4" />
                <p className="mt-3 text-sm font-semibold text-[var(--color-mint)]">
                  Price: Priced on a 15-min call.
                </p>
              </article>

              <article>
                <h3 className="font-display text-xl font-bold text-white">
                  Review requests
                </h3>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">What it does.</strong> After a
                  visit, happy customers get a polite nudge to leave a Google
                  review, so you’re not chasing them yourself.
                </p>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">Who it’s for.</strong> Any local
                  business that relies on Google reviews, including salons, spas,
                  barbers and trades.
                </p>
                <AutomationDiagram kind="review-requests" className="mt-4" />
                <p className="mt-3 text-sm font-semibold text-[var(--color-mint)]">
                  Price: Priced on a 15-min call.
                </p>
              </article>

              <article>
                <h3 className="font-display text-xl font-bold text-white">
                  Booking reminders
                </h3>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">What it does.</strong> Clients
                  get a reminder before their appointment, so you’re not the one
                  chasing.
                </p>
                <p className="mt-2 text-[color-mix(in_srgb,white_74%,transparent)]">
                  <strong className="text-white">Who it’s for.</strong> Salons,
                  spas, barbers and clinics, and any trade that books
                  appointments.
                </p>
                <AutomationDiagram kind="booking-reminders" className="mt-4" />
                <p className="mt-3 text-sm font-semibold text-[var(--color-mint)]">
                  Price: Priced on a 15-min call.
                </p>
              </article>
            </div>
          </Reveal>

          <Reveal className="surface-panel p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              AI consulting
            </h2>
            <p className="mt-4 text-[color-mix(in_srgb,white_74%,transparent)]">
              Not sure where AI fits in your business? We’ll look at how you
              work today and show you the one or two places it saves real time.
              Plain English, no jargon.
            </p>
            <p className="mt-3 text-sm font-semibold text-[var(--color-mint)]">
              Price: Priced on a 15-min call.
            </p>
          </Reveal>
        </div>
      </section>

      <DemoFormSection />
    </>
  );
}
