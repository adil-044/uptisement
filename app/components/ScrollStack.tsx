import type { ReactNode } from "react";

type Item = {
  title: string;
  body: string;
  n?: string;
};

type Props = {
  items: Item[];
  className?: string;
};

/** Sticky stacking cards for How it works — CSS sticky, no heavy JS. */
export function ScrollStack({ items, className = "" }: Props) {
  return (
    <div className={`scroll-stack ${className}`.trim()}>
      {items.map((item, i) => (
        <article
          key={item.title}
          className="scroll-stack__card"
          style={{ ["--stack-i" as string]: i }}
        >
          <span className="text-sm font-semibold tracking-wide text-[var(--color-lilac)]">
            {item.n ?? String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-2xl text-[var(--color-text)] md:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-xl text-[var(--color-muted)]">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
