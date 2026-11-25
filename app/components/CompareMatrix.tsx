"use client";

import { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";

export type CompareRow = {
  criterion: string;
  group?: "cost" | "time" | "ownership" | "other";
  uptisement: string;
  diy: string;
  agency: string;
  freelancer: string;
  /** When true, show check for Uptisement and cross/neutral for others when answers are yes/no-like */
  binary?: boolean;
};

const COLS = [
  { key: "uptisement", label: "Uptisement", featured: true },
  { key: "diy", label: "DIY builders", featured: false },
  { key: "agency", label: "A big agency", featured: false },
  { key: "freelancer", label: "A freelancer", featured: false },
] as const;

function CellIcon({ text, featured }: { text: string; featured?: boolean }) {
  const lower = text.toLowerCase();
  const isYes =
    lower.startsWith("yes") ||
    lower.startsWith("free demo") ||
    lower.includes("you work directly");
  const isNo =
    lower.startsWith("no.") ||
    lower.startsWith("uncommon") ||
    lower === "varies." ||
    lower.startsWith("you build it yourself");

  if (isYes) {
    return (
      <span className="inline-flex items-start gap-2">
        <span className="icon-check mt-0.5" aria-hidden>
          ✓
        </span>
        <span>{text}</span>
      </span>
    );
  }
  if (isNo && !featured) {
    return (
      <span className="inline-flex items-start gap-2">
        <span className="icon-cross mt-0.5" aria-hidden>
          ✕
        </span>
        <span>{text}</span>
      </span>
    );
  }
  return <span>{text}</span>;
}

type Props = {
  rows: CompareRow[];
};

/** Premium 4-column compare matrix; swipeable cards on mobile. */
export function CompareMatrix({ rows }: Props) {
  const [mobileCol, setMobileCol] = useState(0);

  return (
    <>
      {/* Desktop matrix */}
      <div className="compare-matrix hidden lg:block" role="table" aria-label="How we compare">
        <div className="compare-matrix__head" role="row">
          <div className="compare-matrix__colhead" role="columnheader">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Criterion
            </span>
          </div>
          {COLS.map((col) => (
            <div
              key={col.key}
              role="columnheader"
              className={`compare-matrix__colhead ${
                col.featured ? "compare-matrix__colhead--featured" : ""
              }`}
            >
              {col.featured ? (
                <span className="label-pill mb-2" data-kind="Recommended">
                  Recommended
                </span>
              ) : null}
              <p className="font-display text-xl text-[var(--color-text)]">
                {col.label}
              </p>
              {col.key === "diy" ? (
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Wix, Squarespace and similar
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="compare-matrix__body">
          {rows.map((row) => (
            <div key={row.criterion} className="compare-matrix__row" role="row">
              <div
                className="compare-matrix__cell compare-matrix__cell--label"
                role="rowheader"
              >
                {row.criterion}
              </div>
              <div
                className="compare-matrix__cell compare-matrix__cell--featured"
                role="cell"
              >
                <CellIcon text={row.uptisement} featured />
              </div>
              <div className="compare-matrix__cell" role="cell">
                <CellIcon text={row.diy} />
              </div>
              <div className="compare-matrix__cell" role="cell">
                <CellIcon text={row.agency} />
              </div>
              <div className="compare-matrix__cell" role="cell">
                <CellIcon text={row.freelancer} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet — stacked spotlight cards, one option at a time */}
      <div className="lg:hidden">
        <div className="mb-4 flex flex-wrap gap-2">
          {COLS.map((col, i) => (
            <button
              key={col.key}
              type="button"
              onClick={() => setMobileCol(i)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                mobileCol === i
                  ? "border-[color-mix(in_srgb,var(--color-purple)_50%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-purple)_12%,transparent)] text-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)]"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        <SpotlightCard
          className={
            COLS[mobileCol].featured ? "compare-card--highlight !border-[color-mix(in_srgb,var(--color-purple)_45%,var(--color-border))]" : ""
          }
        >
          {COLS[mobileCol].featured ? (
            <span className="label-pill" data-kind="Recommended">
              Recommended
            </span>
          ) : null}
          <h3 className="mt-3 font-display text-2xl text-[var(--color-text)]">
            {COLS[mobileCol].label}
          </h3>
          {COLS[mobileCol].key === "diy" ? (
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Wix, Squarespace and similar
            </p>
          ) : null}
          <ul className="mt-6 grid gap-4">
            {rows.map((row) => {
              const key = COLS[mobileCol].key;
              const value = row[key];
              return (
                <li
                  key={row.criterion}
                  className="border-t border-[var(--color-border)] pt-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    {row.criterion}
                  </p>
                  <p className="mt-2 text-[var(--color-text)]">
                    <CellIcon
                      text={value}
                      featured={COLS[mobileCol].featured}
                    />
                  </p>
                </li>
              );
            })}
          </ul>
        </SpotlightCard>

        <div className="mt-4 flex justify-between gap-3">
          <button
            type="button"
            className="link-plain text-sm"
            onClick={() =>
              setMobileCol((i) => (i - 1 + COLS.length) % COLS.length)
            }
          >
            ← Previous
          </button>
          <button
            type="button"
            className="link-plain text-sm"
            onClick={() => setMobileCol((i) => (i + 1) % COLS.length)}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
}
