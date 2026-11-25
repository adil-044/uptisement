import type { Metadata } from "next";
import { DemoFormSection } from "@/app/components/DemoFormSection";
import { Reveal } from "@/app/components/Reveal";
import { SlideUpHeadline } from "@/app/components/SlideUpHeadline";
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
      <section className="section pb-8 pt-28 md:pt-32">
        <div className="container-x wrap max-w-3xl">
          <p className="eyebrow">Work · Since 2023</p>
          <SlideUpHeadline className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold text-white">
            Real sites for real local businesses.
          </SlideUpHeadline>
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
              <article className="surface-panel p-6 md:p-7">
                <span className="label-pill" data-kind={item.label}>
                  {item.label}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold text-white">
                  {item.title}
                </h2>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex font-semibold text-[var(--color-mint)] underline underline-offset-2"
                  >
                    rhrtax.ca →
                  </a>
                ) : null}
                <p className="remy-note mt-5">{item.remyNote}</p>
                <blockquote className="mt-5 border-t border-[color-mix(in_srgb,white_10%,transparent)] pt-4">
                  <p className="text-lg text-white">
                    “{item.review.quote}”
                  </p>
                  <footer className="mt-2 text-sm font-semibold text-[var(--color-mint)]">
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
