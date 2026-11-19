"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CHAPTERS } from "@/app/lib/chapters";
import { REVIEWS } from "@/app/lib/reviews";
import { WORK_ITEMS } from "@/app/lib/work";
import { SINCE_YEAR } from "@/app/lib/config";
import { prefersReducedMotion } from "@/app/lib/motion";
import { BookLink } from "./BookLink";
import { ChapterSection } from "./ChapterSection";
import { ReviewQuote } from "./ReviewQuote";
import { SceneCanvas } from "./SceneCanvas";
import { LabelPill } from "./LabelPill";
import {
  DemoA1TextBack,
  DemoA2Estimator,
  DemoA3Reviews,
  DemoA4Salon,
  DemoA5IgDm,
  DemoA7LeadBoard,
} from "./demos";

gsap.registerPlugin(ScrollTrigger);

export function HomeStory() {
  const root = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useGSAP(
    () => {
      if (!root.current) return;

      if (prefersReducedMotion()) {
        progressRef.current = 0;
        return;
      }

      const story = root.current.querySelector("[data-story-track]");
      if (!story) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        });
        return () => st.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const st = ScrollTrigger.create({
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        });
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const hero = CHAPTERS[0];
  const c704 = CHAPTERS[1];
  const without = CHAPTERS[2];
  const rewind = CHAPTERS[3];
  const textback = CHAPTERS[4];
  const quote = CHAPTERS[5];
  const booked = CHAPTERS[6];
  const after = CHAPTERS[7];
  const notTrade = CHAPTERS[8];
  const site = CHAPTERS[9];
  const proof = CHAPTERS[10];
  const book = CHAPTERS[11];

  const workStrip = WORK_ITEMS.filter((w) => w.group !== "other").slice(0, 6);

  return (
    <div ref={root}>
      <SceneCanvas progressRef={progressRef} variant="story" />
      <div data-story-track>
        <ChapterSection chapter={hero} id="hero" className="pt-28 md:pt-36">
          <div className="mt-8 flex flex-wrap gap-3">
            <BookLink id="book-cta-hero">Book a 15-min call</BookLink>
            <BookLink className="btn btn-secondary">Get a free demo</BookLink>
            <a href="#chapter-704" className="btn btn-secondary">
              See it work
            </a>
          </div>
        </ChapterSection>

        <ChapterSection chapter={c704} />
        <ChapterSection chapter={without} />
        <ChapterSection chapter={rewind} />

        <ChapterSection chapter={textback}>
          <div className="mt-6 max-w-xl">
            <DemoA1TextBack compact />
          </div>
        </ChapterSection>

        <ChapterSection chapter={quote}>
          <div className="mt-6 max-w-xl">
            <DemoA2Estimator />
          </div>
        </ChapterSection>

        <ChapterSection chapter={booked}>
          <div className="mt-6 max-w-2xl">
            <DemoA7LeadBoard />
          </div>
        </ChapterSection>

        <ChapterSection chapter={after}>
          <div className="mt-6 max-w-xl">
            <DemoA3Reviews />
          </div>
        </ChapterSection>

        <ChapterSection chapter={notTrade}>
          <div className="mt-6 grid max-w-3xl gap-6 lg:grid-cols-2">
            <DemoA4Salon />
            <DemoA5IgDm />
          </div>
        </ChapterSection>

        <ChapterSection chapter={site}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workStrip.map((item) => {
              const body = (
                <>
                  <LabelPill kind={item.label} />
                  <p className="mt-2 font-display text-lg font-bold">{item.title}</p>
                  <p className="text-sm text-[var(--color-muted)]">{item.subline}</p>
                  {item.offline && (
                    <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">
                      Site offline
                    </p>
                  )}
                </>
              );
              if (item.offline || !item.href) {
                return (
                  <div key={item.title} className="block">
                    {body}
                  </div>
                );
              }
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="block"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {body}
                </a>
              );
            })}
          </div>
          <div className="mt-6">
            <a href="/work/" className="btn btn-secondary">
              See all work
            </a>
          </div>
        </ChapterSection>

        <ChapterSection chapter={proof}>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <ReviewQuote key={r.attribution} review={r} />
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            In business since {SINCE_YEAR} · Built by Adil in Southern Ontario.
          </p>
        </ChapterSection>

        <ChapterSection chapter={book} id="book">
          <div className="mt-8 flex flex-wrap gap-3">
            <BookLink id="book-cta-final">Book a 15-min call</BookLink>
            <BookLink className="btn btn-secondary">Get a free demo</BookLink>
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Prefer email?{" "}
            <a className="underline" href="mailto:sales@uptisement.com">
              sales@uptisement.com
            </a>
          </p>
        </ChapterSection>
      </div>
    </div>
  );
}
