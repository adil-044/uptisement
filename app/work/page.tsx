import type { Metadata } from "next";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { MaskedHeading } from "@/app/components/MaskedHeading";
import { WORK_ITEMS } from "@/app/lib/work";

export const metadata: Metadata = {
  title: "Work and client reviews",
  description:
    "Real work and verbatim reviews from local businesses, including RHR Tax, Kuzz Kreations, Miami Hair Spa and Chocor.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <>
      <section className="section pb-8 pt-32 md:pt-40">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Work · Since 2023</p>
          <MaskedHeading className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02]">
            Real sites for real local businesses.
          </MaskedHeading>
          <Reveal delay={0.1}>
            <p className="section-lede">
              A short look at businesses we’ve worked with. Reviews are their
              words, shown as they wrote them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x wrap grid gap-5">
          {WORK_ITEMS.map((item, i) => {
            const card = (
              <article className="spotlight-card p-6 md:p-7">
                <span className="label-pill" data-kind={item.label}>
                  {item.label}
                </span>
                <h2 className="mt-3 font-display text-2xl text-[var(--color-text)]">
                  {item.title}
                </h2>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex link-plain"
                  >
                    rhrtax.ca →
                  </a>
                ) : null}
                <p className="remy-note mt-5">{item.remyNote}</p>
                <blockquote className="mt-5 border-t border-[var(--color-border)] pt-4">
                  <p className="text-lg text-[var(--color-text)]">
                    “{item.review.quote}”
                  </p>
                  <footer className="mt-2 text-sm font-semibold text-[var(--color-lilac)]">
                    — {item.review.attribution}
                  </footer>
                </blockquote>
              </article>
            );

            return (
              <Reveal
                key={item.title}
                delay={i * 0.06}
                className={item.href ? "cursor-card" : undefined}
              >
                {card}
              </Reveal>
            );
          })}
        </div>
      </section>

      <DemoFormSection headline="Want to see a preview for your business?" />
    </>
  );
}
