import { TRADES } from "@/app/lib/work";

export function TradesMarquee() {
  const items = [...TRADES, ...TRADES];
  return (
    <section className="border-y border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] py-5" aria-label="Trades we work with">
      <div className="marquee">
        <div className="marquee-track" aria-hidden="true">
          {items.map((trade, i) => (
            <span
              key={`${trade}-${i}`}
              className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-ink-soft)]"
            >
              {trade}
              <span className="ml-10 text-[var(--color-accent)]">·</span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{TRADES.join(", ")}</p>
    </section>
  );
}
