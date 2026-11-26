import type { Metadata } from "next";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { FAQList } from "@/app/components/FAQList";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { Reveal } from "@/app/components/Reveal";
import { SpotlightCard } from "@/app/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free website demo. Websites from $300, one time. Hosting $30 a month. Automations and consulting priced on a 15-minute call.",
  alternates: { canonical: "/pricing/" },
};

type PriceRow = {
  title: string;
  body: string | null;
  /** Optional Remy aside, shown after the factual body. */
  remy?: string | null;
  highlight?: boolean;
  span: string;
};

const ROWS: PriceRow[] = [
  {
    title: "Free demo — $0",
    body: "See a personalised preview of your website before you pay anything. It arrives within 24 hours of sending the form.",
    highlight: true,
    span: "bento-7",
  },
  {
    title: "Website — from $300, one time",
    body: "A booking-first site, built for you. After you approve the demo, a complete website is delivered within 24 hours, including 2 rounds of revisions.",
    span: "bento-5",
  },
  {
    title: "Hosting — $30/month",
    body: "Hosting for your website (up to 5 pages), plus admin access so you can log in and manage your site yourself.",
    remy: null,
    span: "bento-5",
  },
  {
    title: "Automations and consulting — priced on a 15-min call",
    body: "Based on what you actually need. Start with one automation if you want, and add more later.",
    span: "bento-7",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="section pb-8 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Pricing</p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Simple pricing. See your site first.
          </MaskedHeading>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap bento">
          {ROWS.map((row, i) => (
            <Reveal key={row.title} stagger={i} className={row.span}>
              <SpotlightCard
                className={`h-full ${row.highlight ? "compare-card--highlight" : ""}`}
              >
                <h2 className="font-display text-2xl text-[var(--color-text)] md:text-3xl">
                  {row.title}
                </h2>
                {row.body ? (
                  <p className="mt-4 text-[var(--color-muted)]">{row.body}</p>
                ) : null}
                {row.remy ? <p className="remy-note mt-5">{row.remy}</p> : null}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              Hosting cancellation
            </h2>
            <p className="section-lede mt-4">
              Applies to websites and ecommerce stores. Month to month — no
              contract.
            </p>
          </Reveal>
          <ul className="mt-6 space-y-4 text-[var(--color-muted)]">
            <li>
              Cancel any time with 30 days&apos; notice by email or text.
            </li>
            <li>
              You keep everything. You own your site and domain, so on
              cancelling we hand over the site files and domain access. For
              stores, that includes an export of products, orders and customer
              data.
            </li>
            <li>
              No partial-month refunds. Hosting runs to the end of the paid
              month, then stops.
            </li>
            <li>
              Missed payments: we send a reminder, the site stays up for a
              14-day grace period, and after that it&apos;s paused (not
              deleted). Paying the balance restores it.
            </li>
            <li>
              Data is kept for 30 days after cancelling, then deleted, so
              there&apos;s time to grab anything.
            </li>
          </ul>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-[var(--color-text)]">
              FAQ
            </h2>
          </Reveal>
          <div className="mt-6">
            <FAQList
              items={[
                {
                  question: "Is the demo really free?",
                  answer:
                    "Yes. No card, no contract. If you don’t love it, you walk away.",
                },
                {
                  question: "How fast is the demo?",
                  answer:
                    "Your demo arrives within 24 hours of sending the form.",
                },
                {
                  question: "How do I pay, and when?",
                  answer:
                    "We’ll go over payment on a 15-min call, based on your project.",
                },
                {
                  question: "How long after I say yes until the site is live?",
                  answer:
                    "After you approve the demo, a complete website is delivered within 24 hours, including 2 rounds of revisions.",
                },
                {
                  question: "What’s included in the website?",
                  answer:
                    "It depends on your business. Book a 15-min call and Adil will walk you through the starting site.",
                },
                {
                  question: "What’s included in hosting?",
                  answer:
                    "Hosting is $30 a month. It covers hosting for a website of up to 5 pages, plus admin access so you can log in and manage your site yourself.",
                },
                {
                  question: "Can I cancel hosting?",
                  answer:
                    "Yes. Hosting is month to month — no contract. Cancel any time with 30 days’ notice by email or text. You keep your site and domain; we hand over the files and access. No partial-month refunds. Full details are in Hosting cancellation above.",
                },
                {
                  question: "Do I own my website?",
                  answer:
                    "Yes. You own your website and your domain.",
                },
                {
                  question: "What happens after I go live?",
                  answer:
                    "You can add an automation later if you want one. For anything else after launch, book a 15-min call and we’ll talk it through.",
                },
                {
                  question: "Do you only work with trades?",
                  answer:
                    "Trades first, but we also build for salons, spas, barbers and dental clinics.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <DemoFormSection />
    </>
  );
}
