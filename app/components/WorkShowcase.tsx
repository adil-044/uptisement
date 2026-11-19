"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { WORK_DISCLAIMER, WORK_ITEMS } from "@/app/lib/work";
import { prefersReducedMotion } from "@/app/lib/motion";
import { BookLink } from "./BookLink";

gsap.registerPlugin(ScrollTrigger);

const FEATURED = WORK_ITEMS.filter((w) => w.group === "client" || w.group === "trades");

export function WorkShowcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || !track.current || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const totalScroll = () =>
          Math.max(0, track.current!.scrollWidth - window.innerWidth + 64);

        gsap.to(track.current, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${totalScroll() + window.innerHeight * 0.35}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="work"
      className="section !pb-8"
      aria-labelledby="work-title"
    >
      <div className="container-x">
        <p className="eyebrow">Work</p>
        <h2 id="work-title" className="mt-3 text-3xl md:text-5xl">
          Client sites, demos &amp; pitch concepts
        </h2>
        <p className="section-lede">{WORK_DISCLAIMER}</p>
      </div>

      <div
        ref={track}
        className="mt-10 flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory md:overflow-visible md:px-[max(1rem,calc((100vw-1120px)/2))] touch-pan-x"
        style={{ scrollbarWidth: "thin" }}
      >
        {FEATURED.map((item, index) => {
          const inner = (
            <>
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-paper-warm)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 900px) 85vw, 560px"
                  className={`object-cover object-top ${item.offline ? "opacity-80" : ""}`}
                />
              </div>
              <div data-work-cap className="mt-4">
                <div className="flex items-center gap-3">
                  <span className="label-pill" data-kind={item.label}>
                    {item.label}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-muted)]">
                    {String(index + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{item.subline}</p>
                {item.offline && (
                  <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">
                    Site offline
                  </p>
                )}
              </div>
            </>
          );

          const className =
            "block w-[min(85vw,560px)] shrink-0 snap-center focus-visible:outline-offset-4";

          if (item.offline || !item.href) {
            return (
              <div key={item.title} className={className} data-work-card="">
                {inner}
              </div>
            );
          }

          return item.external || item.href.startsWith("http") || item.href.endsWith(".html") ? (
            <a
              key={item.title}
              href={item.href}
              className={className}
              data-work-card=""
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {inner}
            </a>
          ) : (
            <Link key={item.title} href={item.href} className={className} data-work-card="">
              {inner}
            </Link>
          );
        })}
      </div>

      <div className="container-x mt-10 flex flex-wrap items-center gap-4">
        <p className="text-[var(--color-muted)]">Want one of these built for your shop, for real?</p>
        <BookLink>Book a 15-min call</BookLink>
        <Link href="/work/" className="btn btn-secondary">
          See all work
        </Link>
      </div>
    </section>
  );
}
