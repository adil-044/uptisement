import type { Metadata } from "next";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { EMAIL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: {
    absolute: "About Uptisement | Southern Ontario, since 2023",
  },
  description:
    "Uptisement is run by Adil Khatri in Southern Ontario. Free demo first, then a booking-first website and automations one step at a time. Since 2023.",
  alternates: { canonical: "/about/" },
};

const HOW_I_WORK = [
  "You see a demo first. You tell us about your business, and within 24 hours you get a free, personalised preview of a booking-first website.",
  "If you love it, you can go live from $300. If you don’t, you keep the ideas, no hard feelings.",
  "After that, we go one step at a time. A website first. Hosting if you want it. An automation when you’re ready, not a pile of tools on day one.",
];

export default function AboutPage() {
  return (
    <>
      <section className="section pb-8 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">About · Southern Ontario · Since 2023</p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Built for local owners, by someone who works the same way.
          </MaskedHeading>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap max-w-3xl grid gap-10">
          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              Who’s behind Uptisement
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              Uptisement is run by Adil Khatri, in Southern Ontario, and has been
              since 2023.
            </p>
            <p className="mt-3 text-[var(--color-muted)]">
              We work with owner-run local businesses: trades first, and also
              salons, spas, barbers and dental clinics.
            </p>
            <p className="remy-note mt-5">
              I asked my boss Adil for a photo and the story of why he started
              Uptisement, but he’s busy helping clients. Check back soon, or just
              ask him on a call. — Remy
            </p>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-display text-2xl text-[var(--color-text)]">
                How I work
              </h2>
            </Reveal>
            <ol className="mt-6 grid gap-4">
              {HOW_I_WORK.map((line, i) => (
                <Reveal key={line} delay={i * 0.08} as="li">
                  <div className="spotlight-card p-5">
                    <span className="font-display text-sm font-bold text-[var(--color-lilac)]">
                      {i + 1}
                    </span>
                    <p className="mt-2 text-[var(--color-muted)]">
                      {line}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[var(--color-muted)]">
                Everything is done remotely.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <h2 className="font-display text-2xl text-[var(--color-text)]">
              Get in touch
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              Claim a free demo with the form below, or book a 15-min call if
              you’d rather talk first.
            </p>
            <p className="mt-3">
              Email:{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="link-plain"
              >
                {EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <DemoFormSection />
    </>
  );
}
