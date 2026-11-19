"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/app/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  href?: string;
};

type Props = {
  cards: Card[];
  className?: string;
};

/**
 * Superdesign stacking-cards: sticky deck as the next card slides over.
 * GSAP ScrollTrigger only — UI hover stays on Motion elsewhere.
 */
export function StackingCards({ cards, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>(
        root.current.querySelectorAll("[data-stack-card]"),
      );
      items.forEach((card, i) => {
        if (i === items.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=88",
          endTrigger: items[items.length - 1],
          end: "top top+=88",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const scale = 1 - self.progress * 0.04;
            const y = self.progress * -12;
            gsap.set(card, {
              scale,
              y,
              filter: `brightness(${1 - self.progress * 0.12})`,
            });
          },
        });
      });
    },
    { scope: root, dependencies: [cards.length] },
  );

  return (
    <div
      ref={root}
      className={`stacking-cards ${className}`}
      data-superdesign="stacking-cards"
    >
      {cards.map((card, i) => {
        const Inner = (
          <>
            {card.eyebrow && <p className="eyebrow">{card.eyebrow}</p>}
            <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
              {card.title}
            </h3>
            <p className="mt-3 max-w-prose text-[var(--color-ink-soft)]">{card.body}</p>
          </>
        );
        return (
          <article
            key={card.id}
            data-stack-card
            className="stacking-cards__card m-card"
            style={{ zIndex: i + 1 }}
          >
            {card.href ? (
              <a href={card.href} className="block">
                {Inner}
              </a>
            ) : (
              Inner
            )}
          </article>
        );
      })}
    </div>
  );
}
