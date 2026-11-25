import type { Metadata } from "next";
import Link from "next/link";
import { AutomationDiagram } from "@/app/components/AutomationDiagram";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { Reveal } from "@/app/components/Reveal";
import { SpotlightCard } from "@/app/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Websites, AI automations and consulting",
  description:
    "Booking-first websites from $300, simple AI automations, and plain-English consulting for local businesses in Southern Ontario. Free demo within 24 hours.",
  alternates: { canonical: "/services/" },
};

const AUTOMATIONS = [
  {
    title: "Missed-call text-back",
    does:
      "If you miss a call, the customer gets a text in seconds asking when they’d like you out. Their reply comes back to you, so the job stays yours.",
    who: "Trades and other local services that take calls while they’re on a job, and anyone who loses after-hours leads.",
    kind: "missed-call" as const,
  },
  {
    title: "Instant quotes",
    does:
      "Customers can get a rough price range online. You approve it before it goes out.",
    who: "Trades and home-service businesses that spend too long writing the first ballpark, and lose leads while they wait.",
    kind: "instant-quotes" as const,
  },
  {
    title: "Review requests",
    does:
      "After a visit, happy customers get a polite nudge to leave a Google review, so you’re not chasing them yourself.",
    who: "Any local business that relies on Google reviews, including salons, spas, barbers and trades.",
    kind: "review-requests" as const,
  },
  {
    title: "Booking reminders",
    does:
      "Clients get a reminder before their appointment, so you’re not the one chasing.",
    who: "Salons, spas, barbers and clinics, and any trade that books appointments.",
    kind: "booking-reminders" as const,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="section pb-10 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Services · Southern Ontario</p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Websites, automations and consulting that help people book you.
          </MaskedHeading>
          <Reveal delay={0.1}>
            <p className="section-lede">
              Three things, done for you: a website built to get bookings, small
              automations that run while you’re working, and straight advice on
              where AI actually helps.
            </p>
            <p className="mt-4 text-[var(--color-muted)]">
              Start with the free demo. Add an automation later if you need one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap bento">
          <Reveal className="bento-7">
            <SpotlightCard className="h-full p-6 md:p-8">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                Websites and hosting
              </h2>
              <p className="mt-4 text-[var(--color-muted)]">
                Fast, mobile-first sites built around one thing: getting
                customers to book.
              </p>
              <p className="mt-3 text-[var(--color-muted)]">
                Your demo is a real preview with your name, your services and a
                booking button. If you want to go live, websites start at $300,
                one time. Hosting is $30 a month.
              </p>
              <p className="remy-note mt-5">
                I asked Adil to write the full list of what’s included, but he’s
                busy helping clients. Book a 15-min call and he’ll go through it
                with you. — Remy
              </p>
              <p className="mt-5">
                <Link href="/pricing/" className="link-plain">
                  See pricing →
                </Link>
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal className="bento-5" delay={0.06}>
            <SpotlightCard className="h-full p-6 md:p-8">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                AI consulting
              </h2>
              <p className="mt-4 text-[var(--color-muted)]">
                Not sure where AI fits in your business? We’ll look at how you
                work today and show you the one or two places it saves real time.
                Plain English, no jargon.
              </p>
              <p className="mt-5 text-sm font-semibold text-[var(--color-muted)]">
                Price: Priced on a 15-min call.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal className="bento-12" delay={0.08}>
            <SpotlightCard className="p-6 md:p-8">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                AI automations
              </h2>
              <p className="mt-4 max-w-3xl text-[var(--color-muted)]">
                Small systems that work while you’re on the job. Start with one,
                add more when you’re ready.
              </p>
              <p className="mt-3 text-[var(--color-muted)]">
                Each one is priced on a 15-min call, based on what you actually
                need.
              </p>

              <div className="bento mt-8">
                {AUTOMATIONS.map((item) => (
                  <article key={item.title} className="bento-6">
                    <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
                      <h3 className="font-display text-xl text-[var(--color-text)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-[var(--color-muted)]">
                        <strong className="text-[var(--color-text)]">
                          What it does.
                        </strong>{" "}
                        {item.does}
                      </p>
                      <p className="mt-2 text-sm text-[var(--color-muted)]">
                        <strong className="text-[var(--color-text)]">
                          Who it’s for.
                        </strong>{" "}
                        {item.who}
                      </p>
                      <AutomationDiagram kind={item.kind} className="mt-4" />
                      <p className="mt-3 text-sm font-semibold text-[var(--color-muted)]">
                        Price: Priced on a 15-min call.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <DemoFormSection />
    </>
  );
}
