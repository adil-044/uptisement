"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CHAPTERS } from "@/app/lib/chapters";
import { REVIEWS } from "@/app/lib/reviews";
import { WORK_ITEMS } from "@/app/lib/work";
import { SINCE_YEAR } from "@/app/lib/config";
import { prefersReducedMotion } from "@/app/lib/motion";
import { BookLink } from "./BookLink";
import { BookCallCta } from "./BookCallCta";
import { ChapterSection } from "./ChapterSection";
import { ReviewQuote } from "./ReviewQuote";
import { SceneCanvas } from "./SceneCanvas";
import { LabelPill } from "./LabelPill";
import { DemoLazy } from "./DemoLazy";
import { JourneyLine } from "./JourneyLine";
import { StoryPhone } from "./StoryPhone";
import { Pricing } from "./Pricing";

const loadA1 = () =>
  import("./demos/DemoA1TextBack").then((m) => ({ default: m.DemoA1TextBack }));
const loadA2 = () =>
  import("./demos/DemoA2Estimator").then((m) => ({ default: m.DemoA2Estimator }));
const loadA3 = () =>
  import("./demos/DemoA3Reviews").then((m) => ({ default: m.DemoA3Reviews }));
const loadA4 = () =>
  import("./demos/DemoA4Salon").then((m) => ({ default: m.DemoA4Salon }));
const loadA5 = () =>
  import("./demos/DemoA5IgDm").then((m) => ({ default: m.DemoA5IgDm }));
const loadA7 = () =>
  import("./demos/DemoA7LeadBoard").then((m) => ({ default: m.DemoA7LeadBoard }));

/**
 * GSAP ScrollTrigger only drives three.js progress / camera + journey line sync.
 * UI motion lives in Motion (LazyMotion) components.
 */
export function HomeStory() {
  const root = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.story = "1";
    return () => {
      delete document.documentElement.dataset.story;
    };
  }, []);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) {
      progressRef.current = 0;
      return;
    }

    let killed = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (killed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);

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
      revert = () => mm.revert();
    })();

    return () => {
      killed = true;
      revert?.();
    };
  }, []);

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
      <JourneyLine progressRef={progressRef} />
      <StoryPhone progressRef={progressRef} />
      <div data-story-track>
        <ChapterSection chapter={hero} id="hero" dataEnter>
          <div className="mt-6 flex flex-wrap gap-3" data-enter-rest>
            <BookLink id="book-cta-hero" className="btn btn-book">
              Book a 15-min call
            </BookLink>
            <BookLink className="btn btn-secondary">Get a free demo</BookLink>
            <a href="#chapter-704" className="btn btn-secondary">
              See the demos
            </a>
          </div>
        </ChapterSection>

        <ChapterSection chapter={c704} />
        <ChapterSection chapter={without} />
        <ChapterSection chapter={rewind} />

        <ChapterSection chapter={textback}>
          <div className="mt-6 max-w-xl">
            <DemoLazy load={loadA1} props={{ compact: true }} />
          </div>
        </ChapterSection>

        <ChapterSection chapter={quote}>
          <div className="mt-6 max-w-xl">
            <DemoLazy load={loadA2} />
          </div>
        </ChapterSection>

        <ChapterSection chapter={booked}>
          <div className="mt-6 max-w-2xl">
            <DemoLazy load={loadA7} />
          </div>
        </ChapterSection>

        <ChapterSection chapter={after}>
          <div className="mt-6 max-w-xl">
            <DemoLazy load={loadA3} />
          </div>
        </ChapterSection>

        <ChapterSection chapter={notTrade}>
          <div className="mt-6 grid max-w-3xl gap-6 lg:grid-cols-2">
            <DemoLazy load={loadA4} />
            <DemoLazy load={loadA5} />
          </div>
        </ChapterSection>

        <ChapterSection chapter={site}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workStrip.map((item) => {
              const media = (
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-paper-warm)] m-zoom-frame">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover m-zoom-img"
                    unoptimized={item.image.startsWith("http")}
                  />
                </div>
              );
              const meta = (
                <>
                  {/* Honest labels stay — Uptisement rule wins over taste-skill no-caption */}
                  <div className="mt-3">
                    <LabelPill kind={item.label} />
                  </div>
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
                  <div key={item.title} className="block m-card m-nolift">
                    {media}
                    {meta}
                  </div>
                );
              }
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="block m-card"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {media}
                  {meta}
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

        <section
          id="moment-proof"
          data-moment="type-statement"
          data-chapter={proof.id}
          data-theme={proof.theme}
          className="chapter"
          aria-labelledby="moment-proof-title"
        >
          <div className="container-x wrap w-full">
            <div className="chapter-panel measure">
              <p className="eyebrow">Proof</p>
              <h2
                id="moment-proof-title"
                className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em]"
              >
                Four notes. Word for word.
              </h2>
              <p className="chapter-body mt-4 text-lg">
                In business since {SINCE_YEAR} · Built by Adil in Southern Ontario.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {REVIEWS.map((r) => (
                  <ReviewQuote key={r.attribution} review={r} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing mid-close — Superdesign pricing-section layout */}
        <section
          data-theme="paper"
          className="chapter !min-h-0 !py-16"
          aria-label="Pricing"
        >
          <Pricing compact />
        </section>

        <ChapterSection chapter={book} id="book">
          <div className="mt-8 flex flex-wrap gap-3">
            <BookCallCta id="book-cta-final" />
            <BookLink className="btn btn-secondary">Get a free demo</BookLink>
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Prefer email?{" "}
            <a className="underline link" href="mailto:sales@uptisement.com">
              sales@uptisement.com
            </a>
          </p>
        </ChapterSection>
      </div>
    </div>
  );
}
