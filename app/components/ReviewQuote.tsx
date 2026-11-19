import type { Review } from "@/app/lib/reviews";

export function ReviewQuote({ review }: { review: Review }) {
  return (
    <blockquote className="border-l-2 border-[var(--color-mint)] pl-4">
      <p className="text-[var(--color-ink-soft)]">&ldquo;{review.quote}&rdquo;</p>
      <footer className="mt-2 text-sm font-semibold text-[var(--color-muted)]">
        — {review.attribution}
      </footer>
    </blockquote>
  );
}
