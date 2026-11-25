import type { Metadata } from "next";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { FAQList } from "@/app/components/FAQList";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free website demo. Websites from $300, one time. Hosting $30 a month. Automations and consulting priced on a 15-minute call.",
  alternates: { canonical: "/pricing/" },
};

const ROWS = [
  {
    title: "Free demo — $0",
    body: "See a personalised preview of your website before you pay anything. It arrives within 24 hours of sending the form.",
    highlight: true,
  },
  {
    title: "Website — from $300, one time",
    body: "A booking-first site, built for you. Go live if you love the demo.",
  },
  {
    title: "Hosting — $30/month",
    body: null,
    remy:
      "What’s covered in hosting? I asked my boss Adil to spell it out, but he’s on a call with a client. Ask him when you book yours. — Remy",
  },
  {
    title: "Automations and consulting — priced on a 15-min call",
    body: "Based on what you actually need. Start with one automation if you want, and add more later.",
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
        <div className="container-x wrap grid gap-4">
          {ROWS.map((row, i) => (
            <Reveal key={row.title} delay={i * 0.05}>
              <div
                className={`rounded-xl border p-5 md:p-6 ${
                  row.highlight
                    ? "border-[color-mix(in_srgb,var(--color-lilac)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-lilac)_10%,transparent)]"
                    : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_65%,transparent)]"
                }`}
              >
                <h2 className="font-display text-xl text-[var(--color-text)] md:text-2xl">
                  {row.title}
                </h2>
                {row.body ? (
                  <p className="mt-3 text-[var(--color-muted)]">
                    {row.body}
                  </p>
                ) : null}
                {row.remy ? <p className="remy-note mt-4">{row.remy}</p> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl text-[var(--color-text)]">FAQ</h2>
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
                    "Your demo arrives within 24 hours. After you approve it, we’ll plan the go-live with you — book a call if you want to talk timing.",
                },
                {
                  question: "What’s included in the website?",
                  answer:
                    "It depends on your business. Book a 15-min call and Adil will walk you through the starting site.",
                },
                {
                  question: "What’s included in hosting?",
                  answer:
                    "Book a 15-min call and we’ll go over what’s covered, and how it works month to month.",
                },
                {
                  question: "Do I own my website?",
                  answer: (
                    <p className="remy-note">
                      I’d love to put a simple yes here. I asked Adil to sign
                      off, and he’s still with a client. Book a 15-min call and
                      you can ask him yourself. — Remy
                    </p>
                  ),
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
